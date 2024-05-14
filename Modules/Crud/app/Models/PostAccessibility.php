<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class PostAccessibility extends Model
{
    use QueryableApi;

    protected $table = 'post_accessibilities';

    protected $fillable = ['id',
        'post_id',
        'accesable_type_type',
        'accesable_type_id',
        'accessable_id',
        'created_by',
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
