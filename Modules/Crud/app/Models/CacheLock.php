<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class CacheLock extends Model
{
    use QueryableApi;

    protected $table = 'cache_locks';

    protected $fillable = ['key',
        'owner',
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
