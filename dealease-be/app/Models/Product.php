<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'stocks_per_kg',
        'price_per_kg',
        'user_id'
    ];

    public function postedByUser()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
