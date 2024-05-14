<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use QueryableApi;

    protected $table = 'posts';

    protected $fillable = ['id',
        'user_id',
        'title',
        'content',
        'tag',
        'visibility',
        'pool_posting',
        'mention',
        'create_date',
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
