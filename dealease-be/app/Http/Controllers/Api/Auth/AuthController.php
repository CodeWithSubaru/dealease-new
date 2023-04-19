<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Support\Str;
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
        $auth_user = $auth_user->makeHidden([$auth_user[0]->coin_owner_type === 0 ? 'buyer_amount' : 'seller_amount'])->toArray();
        return $auth_user;
    }

    public function register(Request $request)
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
        if ($explodedUserType[0] === 'is_buyer') {
            $is_buyer = $explodedUserType[1];
            $is_seller = 0;
        } elseif ($explodedUserType[0] === 'is_seller') {
            $is_seller = $explodedUserType[1];
            $is_buyer = 0;
        }


        $imageName = 'default_profile.jpg';

        if ($request->has('profile_image')) {
            // uploading image
            $imageName = time() . '.' . $request->file('profile_image')->getClientOriginalExtension();

            $request->file('profile_image')->move(public_path('images'), $imageName);
        }

        $user = User::create([
            'prof_img' => $imageName,
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

        if ($user->role_type == 'Admin') {
            return response()->json(['errors' => ['email' => ['Account update failed. This action is not allowed.!']]], 422);
        }

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

        if (!Auth::attempt($request->only('email', 'password', 'is_buyer', 'is_seller', 'role_type'))) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $auth_user = User::with('user_details')->where('email', $request->email);

        $auth_user->update(['coin_owner_type' => $request->coin_owner_type]);

        $token = $request->user()->createToken($auth_user->get()[0]->email)->plainTextToken;

        $data = [
            'message' => 'Welcome ' . Auth::user()->first_name . '. You are Login Succesfully',
            'coin_owner_type' => $auth_user->get([$request->coin_owner_type === 0 ? 'buyer_amount' : 'seller_amount'])->makeHidden(['user_details'])->toArray(),
            'user' => $auth_user->get()->makeHidden(['coin_owner_type', 'seller_amount', 'buyer_amount'])->toArray(),
            'token' => $token,
        ];

        return response()->json($data, 200);
    }

    /**
     * Logout
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Come back again. You have logged out successfully'], 200);
    }

    public function changePass(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'old_password' => ['required', 'current_password'],
            'new_password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($request->old_password === $request->new_password) {
            return response()->json(['errors' => ['new_password' => ['Please ensure that you have entered a new password.']]], 422);
        }

        $user->update(['password' => Hash::make($request->new_password)]);

        return response()->json(['message' => 'Password changed successfully']);
    }
}
