<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded;

    public function postedByUser()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function seller()
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }

    public function userDetails()
    {
        return $this->belongsTo(UserDetail::class, 'user_detais_id', 'user_detais_id');
    }
}
