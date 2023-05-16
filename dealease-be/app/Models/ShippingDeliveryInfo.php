<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingDeliveryInfo extends Model
{
    use HasFactory;

    protected $primaryKey = 'shipping_delivery_id';

    protected $guarded;
}
