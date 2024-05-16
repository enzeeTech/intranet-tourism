<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    protected $table = 'audits';

    protected $fillable = ['id',
        'user_type',
        'user_id',
        'event',
        'auditable_type',
        'auditable_id',
        'old_values',
        'new_values',
        'url',
        'ip_address',
        'user_agent',
        'tags',
        'created_at',
        'updated_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'id' => ['string', 'required'],
                    'user_type' => ['string'],
                    'user_id' => ['string'],
                    'event' => ['string', 'required'],
                    'auditable_type' => ['string', 'required'],
                    'auditable_id' => ['string', 'required'],
                    'old_values' => ['string'],
                    'new_values' => ['string'],
                    'url' => ['string'],
                    'ip_address' => ['string'],
                    'user_agent' => ['string'],
                    'tags' => ['string'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'user_type' => ['string'],
                    'user_id' => ['string'],
                    'event' => ['string', 'required'],
                    'auditable_type' => ['string', 'required'],
                    'auditable_id' => ['string', 'required'],
                    'old_values' => ['string'],
                    'new_values' => ['string'],
                    'url' => ['string'],
                    'ip_address' => ['string'],
                    'user_agent' => ['string'],
                    'tags' => ['string'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
