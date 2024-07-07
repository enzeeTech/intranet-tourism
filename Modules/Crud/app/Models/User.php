<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class User extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'password',
        'remember_token',
        'is_active',
        'order',
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
                    'is_active' => ['boolean'],
                    'order' => ['integer'],
                ],
                // [],
            ],
            // 'update' => [
            //     [
            //         'name' => ['string', 'required'],
            //         'email' => ['string', 'required'],
            //         'email_verified_at' => ['string'],
            //         'password' => ['string', 'required'],
            //         'remember_token' => ['string'],
            //         'is_active' => ['boolean'],
            //     ],
            //     // [],
            // ],
            'update' => [
                [
                    'name' => ['sometimes', 'string'],
                    'email' => ['sometimes', 'string'],
                    'email_verified_at' => ['nullable', 'string'],
                    'password' => ['sometimes', 'string'],
                    'remember_token' => ['nullable', 'string'],
                    'is_active' => ['sometimes', 'boolean'],
                    'order' => ['sometimes', 'integer'],
                ],
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

    public function employmentPost()
    {
        return $this->hasOne(EmploymentPost::class)->latestOfMany();
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

    // public function profiles()
    // {
    //     return $this->hasMany(Profile::class);
    // }

    public function profile()
    {
        return $this->hasOne(Profile::class);
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
