<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Message;
use App\Models\Inbox;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $inbox = Inbox::with('recipient', 'last_message')->where('user_id', auth()->id())->get();
        return response()->json($inbox, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate(['chat' => ['required']]);

        $message = Message::create([
            'chat' => $request->chat,
            'sender' => $request->sender,
            'receiver' => $request->receiver,
        ]);

        // get last message
        $inbox = Inbox::where('user_id', $request->sender)->where('recipient_id', $request->receiver)->orWhere('recipient_id', $request->sender)
            ->update([
                'message_id' => $message->message_id,
            ]);
        if ($inbox) {
            return response()->json($inbox, 200);
        }

        Inbox::create([
            'user_id' => $request->sender,
            'message_id' => $message->message_id,
            'recipient_id' => $message->receiver
        ]);

        return response()->json(['message' => 'sent'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($clicked_user): JsonResponse
    {
        $getMessage = Message::with(
            'sender:user_id,first_name,middle_name,last_name,ext_name',
            'receiver:user_id,first_name,middle_name,last_name,ext_name'
        )
            ->where('sender', auth()->id())
            ->where('receiver', $clicked_user)
            ->orWhere('sender', $clicked_user)
            ->where('receiver', auth()->id())
            ->get();
        return response()->json($getMessage, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message): JsonResponse
    {
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message): JsonResponse
    {
        return response()->json();
    }
}
