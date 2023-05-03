<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderTransaction extends Model
{
    use HasFactory;

    protected $primaryKey = 'order_number';

    public $incrementing = false;

    protected $guarded;

    public function order()
    {
        return  $this->hasOne(\App\Models\Order::class, 'order_number', 'order_number');
    }
}
