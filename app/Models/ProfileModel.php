<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileModel extends Model
{
    use HasFactory;

    // Specify the correct table name if it's not 'profile_models'
    protected $table = 'profiles'; // Replace 'profiles' with your actual table name

    protected $fillable = [
        'user_id',  // Ensure 'user_id' is included in the fillable array
        'bio',
    ];
}
