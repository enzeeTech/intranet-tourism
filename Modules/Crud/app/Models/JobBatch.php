<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class JobBatch extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'job_batches';

    protected $fillable = [
        'name',
        'total_jobs',
        'pending_jobs',
        'failed_jobs',
        'failed_job_ids',
        'options',
        'cancelled_at',
        'finished_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'name' => ['string', 'required'],
                    'total_jobs' => ['string', 'required'],
                    'pending_jobs' => ['string', 'required'],
                    'failed_jobs' => ['string', 'required'],
                    'failed_job_ids' => ['string', 'required'],
                    'options' => ['string'],
                    'cancelled_at' => ['string'],
                    'finished_at' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'name' => ['string', 'required'],
                    'total_jobs' => ['string', 'required'],
                    'pending_jobs' => ['string', 'required'],
                    'failed_jobs' => ['string', 'required'],
                    'failed_job_ids' => ['string', 'required'],
                    'options' => ['string'],
                    'cancelled_at' => ['string'],
                    'finished_at' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
