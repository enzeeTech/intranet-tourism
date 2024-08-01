<?php

namespace Modules\Permission\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class ModelHasRole extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'model_has_roles';

    protected $fillable = [
        'role_id',
        'model_type',
        'model_id',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'role_id' => [ 'required'],
                    // 'model_type' => [ 'required'],
                    'model_id' => [ 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'role_id' => [ 'required'],
                    // 'model_type' => [ 'required'],
                    'model_id' => [ 'required'],
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
}
