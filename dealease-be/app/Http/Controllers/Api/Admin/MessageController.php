<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Inbox;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class MessageController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $inbox = Inbox::join('messages', 'messages.message_id', 'inboxes.last_message_id')->with('sender', 'lastMessage.receiver')
            ->where('sender_id', auth()->id())
            ->orWhere('messages.receiver_id', auth()->id())
            ->get();

        return response()->json($inbox, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(['message' => ['required']]);

        $message = Message::create([
            'message' => $request->message,
            'receiver_id' => $request->receiver_id,
        ]);

        $inbox = Inbox::join('messages', 'messages.message_id', 'inboxes.last_message_id')
            ->where('sender_id', $request->sender_id)
            ->where('messages.message_id', $message->message_id);

        if (count($inbox->get()) > 0) {
            $inbox->update(['last_message_id' => $message->message_id]);
        } else {
            Inbox::create([
                'sender_id' => $request->sender_id,
                'last_message_id' => $message->message_id,
            ]);
        }

        return response()->json(['status' => 'Message Sent'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($clicked_user)
    {
        $getMessage = Message::join('inboxes', 'inboxes.last_message_id', 'messages.message_id')->with(
            'sender:user_id,first_name',
            'receiver:user_id,first_name'
        )
            ->where('inboxes.sender_id', auth()->id())
            ->where('receiver_id', $clicked_user)
            ->orWhere('inboxes.sender_id', $clicked_user)
            ->where('receiver_id', auth()->id())
            ->get();

        return response()->json($getMessage, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function softDelete($id)
    {
        Inbox::find($id)->delete();
        return response()->json(['status' => 'Deleted message successfully'], 200);
    }

    public function restore($id)
    {
        Inbox::withTrashed()->find($id)->restore();
        return response()->json(['status' => 'Restored message successfully'], 200);
    }
}
