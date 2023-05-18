<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;

class ManageProfile extends Controller
{
    public function editProfile(Request $request, $id)
    {
        $user = User::find($id)->update([
            'first_name' => $request->first_name,
        ]);

        if ($user) {
            UserDetail::where('user_details_id', $id)->update([
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'ext_name' => $request->ext_name,
            ]);

            if ($user) {
                UserDetail::where('user_details_id', $id)->update([
                    'middle_name' => $request->middle_name,
                    'last_name' => $request->last_name,
                    'ext_name' => $request->ext_name,
                ]);
            }
        }
    }
}
