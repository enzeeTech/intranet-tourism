<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $table = 'jobs';

    protected $fillable = ['id',
        'queue',
        'payload',
        'attempts',
        'reserved_at',
        'available_at',
        'created_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'id' => ['string', 'required'],
                    'queue' => ['string', 'required'],
                    'payload' => ['string', 'required'],
                    'attempts' => ['string', 'required'],
                    'reserved_at' => ['string'],
                    'available_at' => ['string', 'required'],
                    'created_at' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'queue' => ['string', 'required'],
                    'payload' => ['string', 'required'],
                    'attempts' => ['string', 'required'],
                    'reserved_at' => ['string'],
                    'available_at' => ['string', 'required'],
                    'created_at' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
