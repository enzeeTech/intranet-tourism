<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordResetToken extends Model
{
    use Authorizable, HasFactory, QueryableApi;

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
                ],
                // [],
            ],
            'update' => [
                [
                    'email' => ['string', 'required'],
                    'token' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
