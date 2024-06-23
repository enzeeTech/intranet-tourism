<?php

namespace Modules\Department\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Database\Factories\BusinessUnitFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class BusinessUnit extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'business_units';

    protected static function newFactory()
    {
        return BusinessUnitFactory::new();
    }

    protected $fillable = [
        'name',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'name' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'name' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
