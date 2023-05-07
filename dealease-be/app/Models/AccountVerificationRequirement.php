<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountVerificationRequirement extends Model
{
    use HasFactory;

    protected $primaryKey = 'avr_id';

    protected $guarded;
}
