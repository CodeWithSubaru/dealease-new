<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $primaryKey = 'payment_number';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
