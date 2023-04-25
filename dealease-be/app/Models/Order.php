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
}
