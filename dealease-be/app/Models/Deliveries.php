<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deliveries extends Model
{
    use HasFactory;

    protected $guarded;

    public function orderToDeliver()
    {
        return  $this->belongsTo(\App\Models\OrderTransaction::class, 'order_trans_id', 'order_trans_id');
    }

    public function buyer()
    {
        return  $this->belongsTo(\App\Models\User::class, 'user_id', 'buyer_id');
    }

    public function user_details()
    {
        return  $this->belongsTo(\App\Models\UserDetail::class, 'user_details_id', 'user_details_id');
    }
}
