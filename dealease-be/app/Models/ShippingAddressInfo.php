<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingAddressInfo extends Model
{
    use HasFactory;

    protected $primaryKey = 'delivery_address_id';

    protected $guarded;
}
