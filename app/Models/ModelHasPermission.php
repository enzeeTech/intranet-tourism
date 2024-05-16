<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModelHasPermission extends Model
{
    protected $table = 'model_has_permissions';

    protected $fillable = ['permission_id',
        'model_type',
        'model_id',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'permission_id' => ['string', 'required'],
                    'model_type' => ['string', 'required'],
                    'model_id' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'permission_id' => ['string', 'required'],
                    'model_type' => ['string', 'required'],
                    'model_id' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
