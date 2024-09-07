<?php

namespace Modules\Permission\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use Modules\Communities\Models\Community;


class ModelHasRole extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'model_has_roles';

    protected $fillable = [
        'role_id',
        'model_type',
        'model_id',
        'department_id',
        'community_id',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'role_id' => ['required'],
                    // 'model_type' => [ 'required'],
                    'model_id' => ['required'],
                    'department_id' => ['nullable', 'integer'],
                    'community_id' => ['nullable', 'array'],
                    'community_id.*' => ['integer'],

                ],
                // [],
            ],
            'update' => [
                [
                    'role_id' => ['required'],
                    // 'model_type' => [ 'required'],
                    'model_id' => ['required'],
                    'department_id' => ['nullable', 'integer'],
                    'community_id' => ['nullable', 'array'],
                    'community_id.*' => ['integer'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function communities()
    {
        return $this->belongsToMany(Community::class, 'model_has_roles_communities', 'model_id', 'community_id', 'model_id', 'id')
            ->select('community_id');
    }
}
