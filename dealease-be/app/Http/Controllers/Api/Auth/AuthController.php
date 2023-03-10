<?php

namespace App\Http\Controllers\Api\Auth;

use Rules\Password;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $auth_user = User::with('user_details')->where('user_id', Auth::id())->get();
        return $auth_user;
    }

    public function register(Request $request)
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

    public function registerExist(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'exists:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user->is_buyer && $user->is_seller) {
            return response()->json(['errors' => ['email' => ['User updated already']]], 422);
        }

        if ($user->is_buyer) {
            User::where('email', $request->email)->update(['is_seller' => '1']);
            return response()->json(['message' => 'User Updated to Seller Successfully'], 200);
        }

        if ($user->is_seller) {
            User::where('email', $request->email)->update(['is_buyer' => '1']);
            return response()->json(['message' => 'User Update To Buyer Successfully'], 200);
        }
    }

    /**
     * Login for each user
     */

    public function login(Request $request)
    {

        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($request->only('email', 'password', 'role_type', 'is_buyer', 'is_seller'), $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }


        $auth_user = User::with('user_details')->where('email', $request->email)->get();


        $token = $request->user()->createToken($auth_user[0]->email)->plainTextToken;


        $obj = [
            'message' => 'User Login Succesfully',
            'user' => $auth_user,
            'token' => $token,
        ];
        return response()->json($obj, 200);
    }

    /**
     * Logout
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->user()->tokens()->delete();

        return response()->json(['message' => 'User loggedout successfully'], 200);
    }
}
