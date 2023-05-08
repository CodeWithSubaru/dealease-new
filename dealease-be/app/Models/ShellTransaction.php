<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShellTransaction extends Model
{
    use HasFactory;

    protected $primaryKey = "shells_trans_id";

    protected $guarded;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function user_details()
    {
        return  $this->belongsTo(\App\Models\UserDetail::class, 'user_details_id', 'user_details_id');
    }
}
