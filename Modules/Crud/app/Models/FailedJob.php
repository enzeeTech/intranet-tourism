<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class FailedJob extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'failed_jobs';

    protected $fillable = [
        'uuid',
        'connection',
        'queue',
        'payload',
        'exception',
        'failed_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'uuid' => ['string', 'required'],
                    'connection' => ['string', 'required'],
                    'queue' => ['string', 'required'],
                    'payload' => ['string', 'required'],
                    'exception' => ['string', 'required'],
                    'failed_at' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'uuid' => ['string', 'required'],
                    'connection' => ['string', 'required'],
                    'queue' => ['string', 'required'],
                    'payload' => ['string', 'required'],
                    'exception' => ['string', 'required'],
                    'failed_at' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
