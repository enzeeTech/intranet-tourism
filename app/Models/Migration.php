<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Migration extends Model
{
    protected $table = 'migrations';

    protected $fillable = ['id',
        'migration',
        'batch',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'id' => ['string', 'required'],
                    'migration' => ['string', 'required'],
                    'batch' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'migration' => ['string', 'required'],
                    'batch' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
