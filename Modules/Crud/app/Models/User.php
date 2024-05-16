<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'password',
        'remember_token',
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

    public function communityMembers()
    {
        return $this->hasMany(CommunityMember::class);
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
