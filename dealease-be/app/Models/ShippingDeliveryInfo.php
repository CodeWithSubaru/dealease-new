<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingDeliveryInfo extends Model
{
    use HasFactory;

    protected $primaryKey = 'shipping_delivery_id';

    protected $guarded;



    public function rider()
    {
        return  $this->belongsTo(\App\Models\User::class, 'user_id', 'rider_id');
    }

    public function user_details()
    {
        return  $this->belongsTo(\App\Models\UserDetails::class, 'user_details_id', 'user_details_id');
    }
}
