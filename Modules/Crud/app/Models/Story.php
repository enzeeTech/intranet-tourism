<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use QueryableApi;

    protected $table = 'stories';

    protected $fillable = ['id',
        'user_id',
        'file_name',
        'description',
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
