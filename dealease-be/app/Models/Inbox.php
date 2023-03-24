<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inbox extends Model
{
    use HasFactory;

    protected $guarded;

    public function sender()
    {
        return  $this->hasOne(\App\Models\User::class, 'user_id', 'user_id');
    }

    public function recipient()
    {
        return  $this->hasOne(\App\Models\User::class, 'user_id', 'recipient_id');
    }

    public function last_message()
    {
        return  $this->hasOne(\App\Models\Message::class, 'message_id', 'message_id');
    }

    const UPDATED_AT = null;
}
