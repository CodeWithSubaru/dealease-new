<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderTransaction extends Model
{
    use HasFactory;

    protected $guarded;

    protected $primaryKey = 'order_trans_id';

    public function order()
    {
        return  $this->belongsTo(\App\Models\Order::class, 'order_number', 'order_number');
    }

    public function order_trans()
    {
        return  $this->hasOne(\App\Models\Deliveries::class, 'order_trans_id', 'order_trans_id');
    }

    public function seller()
    {
        return  $this->hasOne(\App\Models\User::class, 'user_id', 'seller_id');
    }

    public function buyer()
    {
        return  $this->hasOne(\App\Models\User::class, 'user_id', 'buyer_id');
    }

    public function product()
    {
        return  $this->belongsTo(\App\Models\Product::class, 'id', 'product_id');
    }

    public function user_details()
    {
        return  $this->belongsTo(\App\Models\UserDetail::class, 'user_details_id', 'user_details_id');
    }
}
