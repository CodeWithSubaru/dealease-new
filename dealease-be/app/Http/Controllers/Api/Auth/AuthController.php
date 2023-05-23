<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use App\Models\Wallet;
use App\Models\UserDetail;
use App\Models\UsersWallet;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\AccountVerificationRequirement;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $auth_user = User::with('user_details', 'wallet')->where('user_id', Auth::id())->get();
        return $auth_user;
    }

    public function register(Request $request)
    {

        $request->validate([
            'profile_image' => ['image'],
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'barangay' => ['required'],
            'birth_date' => ['required'],
            'contact_number' => ['required', 'min:11', 'max:11'],
            'username' => ['required', 'string', 'regex:/\w*$/', 'min:3', 'max:255', 'unique:users,username'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'first_valid_id' => $request->has('first_valid_id') ? ['required', 'image'] : '',
            'second_valid_id' =>  $request->has('second_valid_id') ? ['required', 'image'] : '',
        ]);

        $imageName = 'default_profile.jpg';

        if ($request->has('profile_image')) {
            // uploading image
            $imageName = time() . '.' . $request->file('profile_image')->getClientOriginalExtension();

            $request->file('profile_image')->move(public_path('images'), $imageName);
        }

        $user = new User();
        $avr = '';
        if ($request->has('first_valid_id') && $request->has('second_valid_id')) {
            // uploading first valid id
            $firstValidId = time() . '.' . $request->file('first_valid_id')->getClientOriginalExtension();
            $request->file('first_valid_id')->move(public_path('images/valid-id/'), $firstValidId);

            // uploading second valid id
            $secondValidId = time() . '.' . $request->file('second_valid_id')->getClientOriginalExtension();
            $request->file('second_valid_id')->move(public_path('images/valid-id'), $secondValidId);

            $avr = AccountVerificationRequirement::create([
                'valid_id_1' => $firstValidId,
                'valid_id_2' => $secondValidId,
            ]);
        }

        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role_type = $request->user_type ? $request->user_type : 1;
        $user->prof_img = $imageName;
        $user->user_details_id = 0;
        $user->avr_id = $avr ? $avr->avr_id : null;
        $user->save();
        $user->user_details_id = $user->user_id;
        $user->save();

        if ($user) {
            $userDetails = UserDetail::create([
                'first_name' => $request->first_name,
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

            UsersWallet::create([
                'shell_coin_amount' => 0,
                'user_id' => $user->user_id,
            ]);

            $user->sendEmailVerificationNotification();

            return response()->json(['message' => 'User Created Successfully', 'email_verified' => false, 'email_verified_status' => "Please verify your email. We've sent you an email verification to your account", 'is_registration_done' => true], 200);
        }
    }

    public function updateAccess(Request $request)
    {
        $isInvalidFront = false;
        $isInvalidBack = false;

        if (!$request->has('valid_id_front')) {
            $isInvalidFront = true;
        }

        if (!$request->has('valid_id_back')) {
            $isInvalidBack = true;
        }

        if ($isInvalidFront && $isInvalidBack) {
            return response()->json([
                'errors' => [
                    'valid_id_front' => ['Please put a valid picture (front)'],
                    'valid_id_back' => ['Please put a valid picture (back)']
                ],
            ], 422);
        }

        if ($isInvalidFront) {
            return response()->json([
                'errors' => [
                    'valid_id_front' => 'Please put a valid picture (front)',
                ]
            ], 422);
        }

        if ($isInvalidBack) {
            return response()->json([
                'errors' => [
                    'valid_id_back' => 'Please put a valid picture (back)'
                ]
            ], 422);
        }

        $request->validate([
            'valid_id_front' => ['image'],
            'valid_id_back' => ['image'],
            'terms_and_conditions' => ['accepted'],
        ]);

        if ($request->has('valid_id_front') && $request->has('valid_id_back')) {
            // uploading image
            $imageNameFront = Str::random() . '.' . $request->file('valid_id_front')->getClientOriginalExtension();

            $request->file('valid_id_front')->move(public_path('images'), $imageNameFront);

            $imageNameBack = Str::random() . '.' . $request->file('valid_id_back')->getClientOriginalExtension();

            $request->file('valid_id_back')->move(public_path('images'), $imageNameBack);
        }

        $AccountVerificationRequirement =  AccountVerificationRequirement::create([
            'valid_id_1' => $imageNameFront,
            'valid_id_2' => $imageNameBack
        ]);

        if ($AccountVerificationRequirement) {
            User::where('user_id', auth()->user()->user_id)->update(['avr_id' => $AccountVerificationRequirement->avr_id]);
        }

        return response()->json(['status' => 'Request Submitted Successfully'], 200);
    }
    /**
     * Login for each user
     */

    public function login(Request $request)
    {
        $loginField = '';
        $loginValue = '';

        $loginField = filter_var(
            $request->input('login'),
            FILTER_VALIDATE_EMAIL
        ) ? 'email' : 'username';
        $loginValue = $request->input('login');
        $request->merge([$loginField => $loginValue]);

        $validated = $request->validate([
            'username' => ['required_without:email', 'string', 'max:255'], // validation for username : 'regex:/\w*$/', , 'unique:users', 
            'email' => ['required_without:username', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($request->only($loginField, 'password', 'role_type'))) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $auth_user = User::with('user_details', 'wallet')->where($loginField, $loginValue);

        $token = $request->user()->createToken($auth_user->first()->email ? $auth_user->first()->email : $auth_user->first()->username)->plainTextToken;

        $data = [
            'message' => 'Welcome ' . Auth::user()->username . '. You are Login Succesfully',
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
