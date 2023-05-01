<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'user_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded;

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function user_details()
    {
        return  $this->belongsTo(\App\Models\UserDetail::class, 'user_details_id', 'user_details_id');
    }

    public function wallet()
    {
        return $this->hasOne(\App\Models\Wallet::class, 'user_id', 'user_id');
    }

    public function product()
    {
        return  $this->belongsTo(\App\Models\Product::class, 'user_id', 'user_id');
    }

    protected function getRoleTypeAttribute()
    {
        if ($this->attributes['role_type'] == 1) {
            return $this->attributes['role_type'] = 'User';
        }

        if ($this->attributes['role_type'] == 3) {
            return $this->attributes['role_type'] = 'Admin';
        }
    }

    protected function getProfImg()
    {
        return 'images/' . $this->attributes['prof_img'];
    }
}
