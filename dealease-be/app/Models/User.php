<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
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
        return  $this->hasOne(\App\Models\UserDetail::class, 'user_id', 'user_id');
    }


    public function messagesSender()
    {
        return  $this->belongsTo(\App\Models\Message::class, 'sender', 'user_id');
    }

    public function messagesReceiver()
    {
        return  $this->hasMany(\App\Models\Message::class, 'receiver', 'user_id');
    }

    protected function getIsBuyerAttribute()
    {
        if ($this->attributes['is_buyer'] === '1' && $this->attributes['is_seller'] === '1') {
            $this->attributes['is_seller'] = 'Buyer_Seller';
            return $this->attributes['is_buyer'] = 'Buyer_Seller';
        }
        if ($this->attributes['is_buyer'] === '1') {
            return $this->attributes['is_buyer'] = 'Buyer';
        } else {
            return $this->attributes['is_buyer'];
        }
    }

    protected function getIsSellerAttribute()
    {
        if ($this->attributes['is_seller'] === '1' && $this->attributes['is_buyer'] === '1') {
            $this->attributes['is_buyer'] = 'Buyer_Seller';
            return $this->attributes['is_seller'] = 'Buyer_Seller';
        }
        if ($this->attributes['is_seller'] === '1') {
            return $this->attributes['is_seller'] = 'Seller';
        } else {
            return $this->attributes['is_seller'];
        }
    }

    protected function getRoleTypeAttribute()
    {
        if ($this->attributes['role_type'] === '1') {
            return $this->attributes['role_type'] = 'Admin';
        } else {
            return $this->attributes['role_type'] = 'User';
        }
    }
}
