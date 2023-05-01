<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use App\Models\BuyerWallet;
use App\Models\SellerWallet;
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
        $wallet = Auth::user()->coin_owner_type == '0' ? 'buyerWallet' : 'sellerWallet';
        $auth_user = User::with('user_details', $wallet)->where('user_id', Auth::id())->get();
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

        $user = new User();
        $user->first_name = $request->first_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->is_buyer = $is_buyer;
        $user->is_seller  = $is_seller;
        $user->role_type = 0;
        $user->prof_img = $imageName;
        $user->coin_owner_type = $is_buyer ? 0 : 1;
        $user->user_details_id = 0;
        $user->save();
        $user->user_details_id = $user->user_id;
        $user->save();

        if ($user) {
            $userDetails = UserDetail::create([
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

            $wallet = $is_buyer ? BuyerWallet::class : SellerWallet::class;
            $wallet::create([
                'shell_coin_amount' => 0,
                'user_id' => $user->user_id,
            ]);

            $user->sendEmailVerificationNotification();

            return response()->json(['message' => 'User Created Successfully', 'email_verified' => false, 'email_verified_status' => "Please verify your email. We've sent you an email verification to your account", 'is_registration_done' => true], 200);
        }
    }

    public function updateAccess(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'exists:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::where('email', $request->email)->first();

        $wallet = $user->coin_owner_type ? BuyerWallet::class : SellerWallet::class;

        $wallet::create([
            'shell_coin_amount' => 0,
            'user_id' => $user->user_id,
        ]);

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

        if (!Auth::attempt($request->only('email', 'password', 'role_type'))) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $auth_user = User::with('user_details', 'wallet')->where('email', $request->email);

        $token = $request->user()->createToken($auth_user->get()[0]->email)->plainTextToken;

        $data = [
            'message' => 'Welcome ' . Auth::user()->first_name . '. You are Login Succesfully',
            'user' => $auth_user->get(),
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
