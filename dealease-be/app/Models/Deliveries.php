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

}
