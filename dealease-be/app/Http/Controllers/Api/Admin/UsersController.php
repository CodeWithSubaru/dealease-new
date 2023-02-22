<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $listOfUsers = User::with('user_details')->get();
        return response()->json(['listOfUser' => $listOfUsers], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
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
        if ($explodedUserType[0] === 'is_buyer') {
            $is_buyer = $explodedUserType[1];
            $is_seller = 0;
        } elseif ($explodedUserType[0] === 'is_seller') {
            $is_seller = $explodedUserType[1];
            $is_buyer = 0;
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'ext_name' => $request->ext_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_buyer' => $is_buyer,
            'is_seller' => $is_seller,
            'role_type' => 0,
        ]);

        if ($user) {
            $user = UserDetail::create([
                'region' => $request->region,
                'province' => $request->province,
                'city' => $request->city,
                'barangay' => $request->barangay,
                'street' => $request->street,
                'birth_date' => $request->birth_date,
                'contact_number' =>  $request->contact_number,
                'user_id' => $user->user_id
            ]);

            return response()->json(['message' => 'User Created Successfully'], 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
