<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class ProfileDepartment extends Model
{
    use QueryableApi;

    protected $table = 'profile_departments';

    protected $fillable = ['id',
        'profile_id',
        'department_id',
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
