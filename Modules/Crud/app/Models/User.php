<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use Authorizable, HasFactory, QueryableApi;

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
                    'name' => ['string', 'required'],
                    'email' => ['string', 'required'],
                    'email_verified_at' => ['string'],
                    'password' => ['string', 'required'],
                    'remember_token' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'name' => ['string', 'required'],
                    'email' => ['string', 'required'],
                    'email_verified_at' => ['string'],
                    'password' => ['string', 'required'],
                    'remember_token' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
