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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $listOfUsers = User::with('user_details')->where('role_type', '!=', 1)->latest()->get();
        return response()->json(['listOfUser' => $listOfUsers], 200);
    }

    public function getTenUsers()
    {
        $listOfUsers = User::with('user_details')->take('10')->where('role_type', '!=', 1)->latest('created_at')->get();
        return response()->json(['listOfUser' => $listOfUsers], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'profile_image' => ['image'],
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'region' => ['required'],
            'province' => ['required'],
            'city' => ['required'],
            'barangay' => ['required'],
            'birth_date' => ['required'],
            'contact_number' => ['required', 'min:11', 'max:11'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'user_type' => ['required'],
        ]);

        $explodedUserType = explode(' ', $request->user_type);

        if ($explodedUserType[0] === 'buyer') {
            $is_buyer = 1;
            $is_seller = 0;
            $role_type = 0;
        } elseif ($explodedUserType[0] === 'seller') {
            $is_buyer = 0;
            $is_seller = 1;
            $role_type = 0;
        } elseif ($explodedUserType[0] === 'buyer_seller') {
            $is_buyer = 1;
            $is_seller = 1;
            $role_type = 0;
        } elseif ($explodedUserType[0] === 'admin') {
            $is_seller = 0;
            $is_buyer = 0;
            $role_type = 1;
        }

        $imageName = 'default_profile.jpg';

        if ($request->has('profile_image')) {
            // uploading image
            $imageName = time() . '.' . $request->file('profile_image')->getClientOriginalExtension();

            $request->file('profile_image')->move(public_path('images'), $imageName);
        }

        $user = new User();
        $user->prof_img = $imageName;
        $user->first_name = $request->first_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->is_buyer = $is_buyer;
        $user->is_seller = $is_seller;
        $user->role_type = $role_type;
        $user->user_details_id = $user->user_id;

        if ($user) {
            $user = UserDetail::create([
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'ext_name' => $request->ext_name,
                'region' => $request->region,
                'province' => $request->province,
                'city' => $request->city,
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
        $foundUserById = User::with('user_details')->where('user_id', $id)->get();
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
            'region' => ['required'],
            'province' => ['required'],
            'city' => ['required'],
            'barangay' => ['required'],
            'street' => ['required'],
            'birth_date' => ['required'],
            'contact_number' => ['required', 'min:11', 'max:11'],
        ]);

        if (!isset($request->user_type)) {
            $user = User::find($request->user_id);
            $is_buyer = ($user->is_buyer == 'Buyer' ? 1 : $user->is_buyer == 'Buyer_seller1') ? 1 : 0;
            $is_seller = ($user->is_seller == 'Seller' ? 1 : $user->is_seller == 'Buyer_seller2') ? 1 : 0;
            $role_type = $user->role_type == 'Admin' ? 1 : 0;
        }

        if ($request->user_type === 'admin') {
            $is_buyer = 0;
            $is_seller = 0;
            $role_type = 1;
        } elseif ($request->user_type === 'buyer_seller') {
            $role_type = 0;
            $is_buyer = 1;
            $is_seller = 1;
        } elseif ($request->user_type === 'buyer') {
            $role_type = 0;
            $is_buyer = 1;
            $is_seller = 0;
        } elseif ($request->user_type === 'seller') {
            $role_type = 0;
            $is_buyer = 0;
            $is_seller = 1;
        }

        $imageName = User::find($request->user_id)->prof_img;

        if ($request->has('prof_img') && $request->prof_img !== $imageName) {
            // uploading image
            $imageName = time() . '.' . $request->file('prof_img')->getClientOriginalExtension();

            $request->file('prof_img')->move(public_path('images'), $imageName);
        }

        User::where('user_id', $request->user_id)->update([
            'prof_img' => $imageName,
            'first_name' => $request->first_name,
            'email' => $request->email,
            'is_buyer' => $is_buyer,
            'is_seller' => $is_seller,
            'role_type' => $role_type,
        ]);

        UserDetail::where('user_id', $request->user_id)->update([
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'ext_name' => $request->ext_name,
            'region' => $request->region,
            'province' => $request->province,
            'city' => $request->province,
            'barangay' => $request->barangay,
            'street' => $request->street,
            'birth_date' => $request->birth_date,
            'contact_number' => $request->contact_number,
        ]);

        return response()->json(['message' => 'User Updated Successfully'], 200);
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
