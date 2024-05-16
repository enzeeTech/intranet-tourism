<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, HasPermissions, HasRoles, Notifiable;
    use QueryableApi;
    use QueryableApi;
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function rules($scenario = 'default')
    {
        $rules = [
            'default' => [
                [
                    'name' => 'required',
                    'email' => 'required',
                    'password' => 'required',
                ],
            ],
            'register' => [
                [
                    'name' => ['required', 'string', 'max:255'],
                    'email' => ['required', 'string', 'email', 'unique:users', 'max:255'],
                    'password' => ['required', 'confirmed'],
                ],
                [
                    'email.unique' => 'Emel telah berdaftar. Sila set semula kata laluan sekiranya anda terlupa kata laluan',
                ],
            ],
        ];

        return $rules[$scenario];
    }
}
