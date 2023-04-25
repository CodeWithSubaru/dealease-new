<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentTransaction extends Model
{
    use HasFactory;

    protected $primaryKey = "payment_number";

    protected $guarded;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
