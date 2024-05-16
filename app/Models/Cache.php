<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cache extends Model
{
    protected $table = 'cache';

    protected $fillable = ['key',
        'value',
        'expiration',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                    'expiration' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                    'expiration' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
