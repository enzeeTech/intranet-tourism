<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordResetToken extends Model
{
    protected $table = 'password_reset_tokens';

    protected $fillable = ['email',
        'token',
        'created_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'email' => ['string', 'required'],
                    'token' => ['string', 'required'],
                    'created_at' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'email' => ['string', 'required'],
                    'token' => ['string', 'required'],
                    'created_at' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
