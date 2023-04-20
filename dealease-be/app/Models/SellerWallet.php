<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellerWallet extends Model
{
    use HasFactory;

    protected $primaryKey = 'seller_wallet_id';
    protected $fillable = ['shell_coin_amount', 'user_id'];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
