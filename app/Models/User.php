<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\QueryableApi;

class User extends Model
{
    use QueryableApi;
    protected $table = 'users';

    protected $fillable = ['id',
        'name',
        'email',
        'email_verified_at',
        'password',
        'remember_token',
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
                    'email' => ['string', 'required'],
                    'email_verified_at' => ['string'],
                    'password' => ['string', 'required'],
                    'remember_token' => ['string'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'name' => ['string', 'required'],
                    'email' => ['string', 'required'],
                    'email_verified_at' => ['string'],
                    'password' => ['string', 'required'],
                    'remember_token' => ['string'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
