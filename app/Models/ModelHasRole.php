<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\QueryableApi;

class ModelHasRole extends Model
{
    use QueryableApi;
    protected $table = 'model_has_roles';

    protected $fillable = ['role_id',
        'model_type',
        'model_id',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'role_id' => ['string', 'required'],
                    'model_type' => ['string', 'required'],
                    'model_id' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'role_id' => ['string', 'required'],
                    'model_type' => ['string', 'required'],
                    'model_id' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
