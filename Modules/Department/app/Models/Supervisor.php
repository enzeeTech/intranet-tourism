<?php

namespace Modules\Department\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Supervisor extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'supervisors';

    protected $fillable = [
        'child_id',
        'parent_id',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'child_id' => ['string', 'required'],
                    'parent_id' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'child_id' => ['string', 'required'],
                    'parent_id' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function child()
    {
        return $this->belongsTo(EmploymentPost::class);
    }

    public function parent()
    {
        return $this->belongsTo(EmploymentPost::class);
    }
}
