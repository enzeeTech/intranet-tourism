<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use QueryableApi;

    protected $table = 'galleries';

    protected $fillable = ['id',
        'post_id',
        'user_id',
        'file_name',
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
