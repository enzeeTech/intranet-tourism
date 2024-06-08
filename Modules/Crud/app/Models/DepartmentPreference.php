<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class DepartmentPreference extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'department_preferences';

    protected $fillable = [
        'department_id',
        'group',
        'subgroup',
        'key',
        'value',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'department_id' => ['string', 'required'],
                    'group' => ['string', 'required'],
                    'subgroup' => ['string'],
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'department_id' => ['string', 'required'],
                    'group' => ['string', 'required'],
                    'subgroup' => ['string'],
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
