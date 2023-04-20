<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;


    protected $fillable = [
        'middle_name',
        'last_name',
        'ext_name',
        'birth_date',
        'region',
        'province',
        'city',
        'barangay',
        'street',
        'contact_number',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_details_id', 'user_details_id');
    }
}
