<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CacheLock extends Model
{
    protected $table = 'cache_locks';

    protected $fillable = ['key',
        'owner',
        'expiration',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'key' => ['string', 'required'],
                    'owner' => ['string', 'required'],
                    'expiration' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'key' => ['string', 'required'],
                    'owner' => ['string', 'required'],
                    'expiration' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
