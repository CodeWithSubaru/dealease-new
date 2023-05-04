<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderTransaction extends Model
{
    use HasFactory;

    protected $guarded;

    protected $primaryKey = 'order_number';

    public $incrementing = false;

    public function order()
    {
        return  $this->hasMany(\App\Models\Order::class, 'order_number', 'order_number');
    }

    public function user()
    {
        return  $this->belongsTo(\App\Models\User::class, 'user_id', 'user_id');
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
