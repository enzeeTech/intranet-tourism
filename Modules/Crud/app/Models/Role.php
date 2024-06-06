<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Role extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'roles';

    protected $fillable = [
        'name',
        'guard_name',
        'description',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'name' => ['string', 'required'],
                    'guard_name' => ['string', 'required'],
                    'description' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'name' => ['string', 'required'],
                    'guard_name' => ['string', 'required'],
                    'description' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function s()
    {
        return $this->hasMany(ModelHasRole::class);
    }

    public function hasPermissions()
    {
        return $this->hasMany(RoleHasPermission::class);
    }
}
