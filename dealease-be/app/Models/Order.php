<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'order_number';

    public $incrementing = false;

    protected $guarded;

    public function product()
    {
        return  $this->hasOne(\App\Models\Product::class, 'id', 'product_id');
    }

    public function order_by()
    {
        return  $this->belongsTo(\App\Models\User::class, 'order_by', 'user_id');
    }

    public function user_details()
    {
        return  $this->belongsTo(\App\Models\UserDetails::class, 'user_details_id', 'user_details_id');
    }
}
