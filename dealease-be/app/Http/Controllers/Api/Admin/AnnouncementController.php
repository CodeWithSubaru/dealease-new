<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{

    public function publicAnnouncement()
    {
        return Announcement::latest()->get();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Announcement::withTrashed()->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image'],
            'title' => ['required'],
            'description' => ['required'],
        ]);

        $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
        $request->file('image')->move(public_path('images'), $imageName);

        Announcement::create([
            'image' => $imageName,
            'title' => $request->title,
            'description' => $request->description,
            'is_published' => $request->is_published,
        ]);

        return response()->json(['status' => 'Announcement created successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Announcement::withTrashed()->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'description' => ['required'],
            'is_published' => ['boolean'],
        ]);

        $imageName = Announcement::find($request->id)->image;

        if ($request->has('image') && $request->image !== $imageName) {
            // uploading image
            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();

            $request->file('image')->move(public_path('images'), $imageName);
        }

        Announcement::where('id', $request->id)->update([
            'image' => $imageName,
            'title' => $request->title,
            'description' => $request->description,
            'is_published' => $request->is_published,
        ]);

        return response()->json(['status' => 'Announcement created successfully'], 200);
    }

    public function softDelete($id)
    {
        Announcement::find($id)->delete();
        return response()->json(['status' => 'Deleted announcement successfully'], 200);
    }

    public function restore($id)
    {
        Announcement::withTrashed()->find($id)->restore();
        return response()->json(['status' => 'Restored announcement successfully'], 200);
    }

    public function publish($id)
    {
        Announcement::find($id)->update(['is_published' => 1]);
        return response()->json(['status' => 'Announcement published successfully'], 200);
    }

    public function draft($id)
    {
        Announcement::find($id)->update(['is_published' => 0]);
        return response()->json(['status' => 'Announcement drafted successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Announcement::withTrashed()->find($id)->forceDelete();
        return response()->json(['status' => 'Announcement deleted Successfully'], 200);
    }
}
