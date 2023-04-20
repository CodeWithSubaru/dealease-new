<?php

namespace App\Http\Controllers;

use App\Models\ReportUser;
use Illuminate\Http\Request;

class ReportUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ReportUser::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'reason' => ['required'],
            'description'  => ['required'],
            'proof' => ['required', 'images'],
            'violation'  => ['required'],
        ]);

        ReportUser::create([
            'user_id' => $request->user_id,
            'reason' => $request->reason,
            'description'  => $request->description,
            'proof' => $request->proof,
            'violation'  => $request->violation
        ]);

        return response()->json(['message' => 'User Reported Successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return ReportUser::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        ReportUser::where('id', $request->id)->update([]);

        return response()->json(['message' => 'User Banned Successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReportUser $reportUser)
    {
        //
    }
}
