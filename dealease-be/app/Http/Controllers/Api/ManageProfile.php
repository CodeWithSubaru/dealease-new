<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;

class ManageProfile extends Controller
{
    public function editProfile(Request $request)
    {
        $request->validate([
            'contact_number' => ['required', 'min:11', 'max:11'],
        ]);

        UserDetail::where('user_details_id', auth()->user()->user_id)->update([
            'contact_number' => $request->contact_number,
        ]);

        return response()->json(['status' => 'Profile Updated Successfully'], 200);
    }
}
