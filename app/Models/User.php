<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Traits\QueryableApi;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles, HasPermissions;
    use QueryableApi;

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
                    'employee_no' => 'required',
                    'department_id' => 'required',
                    'email' => 'required',
                    'password' => 'required',
                ]
            ],
            'register' => [
                [
                    'name' => ['required', 'string', 'max:255'],
                    'email' => ['required', 'string', 'email', 'unique:users', 'max:255'],
                    'password' => ['required', 'confirmed'],
                ],
                [
                    'email.unique' => 'Emel telah berdaftar. Sila set semula kata laluan sekiranya anda terlupa kata laluan',
                    'employee_no.unique' => 'No Pekerja telah berdaftar. Sila set semula kata laluan sekiranya anda terlupa kata laluan atau semak semula No Pekerja anda',
                ]
            ],
        ];

        return $rules[$scenario];
    }
}
