<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class PasswordResetToken extends Model
{
    use QueryableApi;

    protected $table = 'password_reset_tokens';

    protected $fillable = ['email',
        'token',
        'created_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [],
            'update' => [],
        ];

        return $rules[$scenario];
    }
}
