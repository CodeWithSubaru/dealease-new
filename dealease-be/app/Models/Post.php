<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_description',
        'post_image',
        'user_id',
    ];

    public function postedByUser()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

}
