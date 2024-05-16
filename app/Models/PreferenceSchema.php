<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreferenceSchema extends Model
{
    protected $table = 'preference_schemas';

    protected $fillable = ['id',
        'preferencable_type',
        'preferencable_id',
        'group_name',
        'subgroup_name',
        'item',
        'value_type',
        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
        'deleted_at',
        'deleted_by',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'id' => ['string', 'required'],
                    'preferencable_type' => ['string', 'required'],
                    'preferencable_id' => ['string', 'required'],
                    'group_name' => ['string', 'required'],
                    'subgroup_name' => ['string'],
                    'item' => ['string', 'required'],
                    'value_type' => ['string', 'required'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                    'created_by' => ['string', 'required'],
                    'updated_by' => ['string', 'required'],
                    'deleted_at' => ['string'],
                    'deleted_by' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'preferencable_type' => ['string', 'required'],
                    'preferencable_id' => ['string', 'required'],
                    'group_name' => ['string', 'required'],
                    'subgroup_name' => ['string'],
                    'item' => ['string', 'required'],
                    'value_type' => ['string', 'required'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                    'created_by' => ['string', 'required'],
                    'updated_by' => ['string', 'required'],
                    'deleted_at' => ['string'],
                    'deleted_by' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
