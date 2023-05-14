<?php

namespace App\Http\Controllers\Api\Admin;

use Rules\Password;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UsersController extends Controller
{
    public function numberOfUsers()
    {
        $listOfUsers = User::with('user_details')->where('role_type', '!=', 3)->latest()->get();
        return $listOfUsers->count();
    }

    public function numberOfUnverifiedUser()
    {
        $listOfUsers = User::with('user_details')->where('role_type', '!=', 3)->where('avr_id', '!=', null)->where('verified_user', 0)->latest()->get();
        return $listOfUsers->count();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $listOfUsers = User::with('user_details')->where('role_type', '!=', 3)->latest()->get();
        return response()->json(['listOfUser' => $listOfUsers], 200);
    }

    public function getTenUsers()
    {
        $listOfUsers = User::with('user_details')->take('10')->where('role_type', '!=', 3)->latest()->get();
        return response()->json(['listOfUser' => $listOfUsers], 200);
    }

    public function unverifiedUsers()
    {
        $listOfUsers = User::with('user_details')->where('role_type', '!=', 3)->where('avr_id', '!=', null)->where('verified_user', 0)->latest()->get();
        return response()->json(['listOfUser' => $listOfUsers], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'prof_img' => ['image'],
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'barangay' => ['required'],
            'birth_date' => ['required'],
            'contact_number' => ['required', 'min:11', 'max:11'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'user_type' => ['required'],
        ]);

        $imageName = 'default_profile.jpg';

        if ($request->has('prof_img')) {
            // uploading image
            $imageName = time() . '.' . $request->file('prof_img')->getClientOriginalExtension();

            $request->file('prof_img')->move(public_path('images'), $imageName);
        }

        $user = new User();
        $user->prof_img = $imageName;
        $user->first_name = $request->first_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role_type = $request->user_type;
        $user->user_details_id = 0;
        $user->save();
        $user->update(['user_details_id' => $user->user_id]);

        if ($user) {
            $userDetails = UserDetail::create([
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'ext_name' => $request->ext_name,
                'region' => 'Region III (Central Luzon)',
                'province' => 'Bulacan',
                'city' => 'Obando',
                'barangay' => $request->barangay,
                'street' => $request->street,
                'birth_date' => $request->birth_date,
                'contact_number' =>  $request->contact_number,
            ]);

            return response()->json(['message' => 'User Created Successfully'], 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $foundUserById = User::with('avr', 'user_details')->where('user_id', $id)->get();
        return response()->json(['foundUserById' => $foundUserById], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        $request->validate([
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'barangay' => ['required'],
            'street' => ['required'],
            'birth_date' => ['required'],
            'contact_number' => ['required', 'min:11', 'max:11'],
        ]);

        $imageName = User::find($request->user_id)->prof_img;

        if ($request->has('prof_img') && $request->prof_img !== $imageName) {
            // uploading image
            $imageName = time() . '.' . $request->file('prof_img')->getClientOriginalExtension();

            $request->file('prof_img')->move(public_path('images'), $imageName);
        }

        $role_type = User::where('user_id', $request->user_id)->get(['role_type'])[0]->role_type;

        if ($request->user_type === 'User' || $request->user_type == 1 || $role_type == 'User') {
            $role_type = 1;
        }
        if ($request->user_type === 'Rider' || $request->user_type == 2 || $role_type == 'Rider') {
            $role_type = 2;
        } elseif ($request->user_type === 'Admin' || $request->user_type == 3 || $role_type == 'Admin') {
            $role_type = 3;
        }

        User::where('user_id', $request->user_id)->update([
            'prof_img' => $imageName,
            'first_name' => $request->first_name,
            'email' => $request->email,
            'role_type' => $role_type,
        ]);

        UserDetail::where('user_details_id', $request->user_id)->update([
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'ext_name' => $request->ext_name,
            'barangay' => $request->barangay,
            'street' => $request->street,
            'birth_date' => $request->birth_date,
            'contact_number' => $request->contact_number,
        ]);

        return response()->json(['message' => 'User Updated Successfully'], 200);
    }

    public function verifyUser(Request $request, $id)
    {
        User::find($id)->update(['verified_user' => 1]);

        return response()->json(['message' => 'User Verified Successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deleteUser = User::with('user_details')->find($id);
        $deleteUser->delete();
        return response()->json(['message' => 'User deleted Successfully'], 200);
    }
}
