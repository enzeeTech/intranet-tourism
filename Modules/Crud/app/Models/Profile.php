<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use QueryableApi;

    protected $table = 'profiles';

    protected $fillable = ['id',
        'user_id',
        'bio',
        'profile_picture',
        'phone_no',
        'office_no',
        'cover_photo',
        'job_title',
        'date_of_birth',
        'created_at',
        'updated_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [],
            'update' => [],
        ];

        return $rules[$scenario];
    }
}
