<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class Cache extends Model
{
    use QueryableApi;

    protected $table = 'cache';

    protected $fillable = ['key',
        'value',
        'expiration',
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
