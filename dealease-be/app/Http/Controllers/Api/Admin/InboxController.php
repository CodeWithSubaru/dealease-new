<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inbox;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class InboxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        return response()->json();
    }

    /**
     * Display the specified resource.
     */
    public function show(Inbox $inbox): JsonResponse
    {
        return response()->json();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inbox $inbox): JsonResponse
    {
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inbox $inbox): JsonResponse
    {
        return response()->json();
    }
}
