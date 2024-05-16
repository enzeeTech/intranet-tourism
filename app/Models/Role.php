<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\QueryableApi;

class Role extends Model
{
    use QueryableApi;
    protected $table = 'roles';

    protected $fillable = ['id',
        'name',
        'guard_name',
        'description',
        'created_at',
        'updated_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'id' => ['string', 'required'],
                    'name' => ['string', 'required'],
                    'guard_name' => ['string', 'required'],
                    'description' => ['string'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'name' => ['string', 'required'],
                    'guard_name' => ['string', 'required'],
                    'description' => ['string'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
