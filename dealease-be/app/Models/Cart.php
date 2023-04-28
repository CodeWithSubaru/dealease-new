<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $guarded;

    public function product()
    {
        return  $this->hasOne(\App\Models\Product::class, 'id', 'product_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function user_details()
    {
        return $this->belongsTo(UserDetail::class, 'user_details_id', 'user_details_id');
    }
}
