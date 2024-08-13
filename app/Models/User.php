<?php

namespace App\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Modules\Communities\Models\CommunityMember;
use Modules\Department\Models\EmploymentPost;
use Modules\Events\Models\EventAttendance;
use Modules\Posts\Models\Post;
use Modules\Profile\Models\Invitation;
use Modules\Profile\Models\Profile;
use Modules\Resources\Models\Resource;
use Modules\Resources\Models\ResourceAccess;
use Modules\Settings\Models\UserPreference;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use Authorizable, HasFactory, QueryableApi , HasApiTokens, HasPermissions, HasRoles, Notifiable;


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
        return $this->hasMany(CommunityMember::class);
    }

    public function employmentPost()
    {
        return $this->hasOne(EmploymentPost::class)->latestOfMany();
    }

    public function employmentPosts()
    {
        return $this->hasMany(EmploymentPost::class);
    }

    public function eventAttendances()
    {
        return $this->hasMany(EventAttendance::class);
    }

    public function invitations()
    {
        return $this->hasMany(Invitation::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function profiles()
    {
        return $this->hasMany(Profile::class);
    }

    public function resources()
    {
        return $this->hasMany(Resource::class);
    }

    public function resourceAccesses()
    {
        return $this->hasMany(ResourceAccess::class);
    }

    public function preferences()
    {
        return $this->hasMany(UserPreference::class);
    }
}
