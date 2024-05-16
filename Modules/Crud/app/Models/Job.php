<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Job extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'jobs';

    protected $fillable = [
        'queue',
        'payload',
        'attempts',
        'reserved_at',
        'available_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'queue' => ['string', 'required'],
                    'payload' => ['string', 'required'],
                    'attempts' => ['string', 'required'],
                    'reserved_at' => ['string'],
                    'available_at' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'queue' => ['string', 'required'],
                    'payload' => ['string', 'required'],
                    'attempts' => ['string', 'required'],
                    'reserved_at' => ['string'],
                    'available_at' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
