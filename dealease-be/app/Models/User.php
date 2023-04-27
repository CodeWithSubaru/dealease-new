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
        return  $this->hasOne(\App\Models\UserDetail::class, 'user_details_id', 'user_details_id');
    }

    public function buyerWallet()
    {
        return $this->hasOne(\App\Models\BuyerWallet::class, 'user_id', 'user_id');
    }

    public function sellerWallet()
    {
        return $this->hasOne(\App\Models\SellerWallet::class, 'user_id', 'user_id');
    }

    public function messagesSender()
    {
        return  $this->belongsTo(\App\Models\Message::class, 'sender', 'user_id');
    }

    public function messagesReceiver()
    {
        return  $this->hasMany(\App\Models\Message::class, 'receiver', 'user_id');
    }

    public function product()
    {
        return  $this->belongsTo(\App\Models\Product::class, 'user_id', 'user_id');
    }

    protected function getIsBuyerAttribute()
    {
        if ($this->attributes['is_buyer'] && $this->attributes['is_seller']) {
            $this->attributes['is_seller'] = 'Buyer_seller2';
            return $this->attributes['is_buyer'] = 'Buyer_seller1';
        }
        if ($this->attributes['is_buyer']) {
            return $this->attributes['is_buyer'] = 'Buyer';
        } else {
            return $this->attributes['is_buyer'];
        }
    }

    protected function getIsSellerAttribute()
    {
        if ($this->attributes['is_seller'] && $this->attributes['is_buyer']) {
            $this->attributes['is_buyer'] = 'Buyer_seller1';
            return $this->attributes['is_seller'] = 'Buyer_seller2';
        }
        if ($this->attributes['is_seller']) {
            return $this->attributes['is_seller'] = 'Seller';
        } else {
            return $this->attributes['is_seller'];
        }
    }

    protected function getRoleTypeAttribute()
    {
        if ($this->attributes['role_type']) {
            return $this->attributes['role_type'] = 'Admin';
        } else {
            return $this->attributes['role_type'] = 'User';
        }
    }

    protected function getProfImg()
    {
        return 'images/' . $this->attributes['prof_img'];
    }
}
