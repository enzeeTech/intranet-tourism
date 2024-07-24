<?php

namespace App\Models;

use App\Models\Traits\Authorizable;
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
    use Authorizable, HasFactory, QueryableApi;
    use HasApiTokens, HasPermissions, HasRoles, Notifiable;

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
            'default' => [
                [
                    'name' => 'string',
                    'email' => 'email',
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

        return !empty($rules[$scenario]) ? $rules[$scenario] : $rules['default'];
    }


    public function communityMembers()
    {
        return $this->hasMany(\Modules\Crud\Models\CommunityMember::class);
    }

    public function employmentPost()
    {
        return $this->hasOne(\Modules\Crud\Models\EmploymentPost::class)->latestOfMany();
    }

    public function employmentPosts()
    {
        return $this->hasMany(\Modules\Crud\Models\EmploymentPost::class);
    }

    public function eventAttendances()
    {
        return $this->hasMany(\Modules\Crud\Models\EventAttendance::class);
    }

    public function invitations()
    {
        return $this->hasMany(\Modules\Crud\Models\Invitation::class);
    }

    public function posts()
    {
        return $this->hasMany(\Modules\Crud\Models\Post::class);
    }

    public function profiles()
    {
        return $this->hasMany(\Modules\Crud\Models\Profile::class);
    }

    public function resources()
    {
        return $this->hasMany(\Modules\Crud\Models\Resource::class);
    }

    public function resourceAccesses()
    {
        return $this->hasMany(\Modules\Crud\Models\ResourceAccess::class);
    }

    public function preferences()
    {
        return $this->hasMany(\Modules\Crud\Models\UserPreference::class);
    }
}
