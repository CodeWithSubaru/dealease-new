<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $primaryKey = 'message_id';

    protected $guarded;

    public function sender()
    {
        return $this->hasOne(\App\Models\User::class, 'user_id', 'sender');
    }

    public function receiver()
    {
        return $this->hasOne(\App\Models\User::class, 'user_id', 'receiver');
    }

    const UPDATED_AT = null;
}
