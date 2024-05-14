<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class JobBatch extends Model
{
    use QueryableApi;

    protected $table = 'job_batches';

    protected $fillable = ['id',
        'name',
        'total_jobs',
        'pending_jobs',
        'failed_jobs',
        'failed_job_ids',
        'options',
        'cancelled_at',
        'created_at',
        'finished_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [],
            'update' => [],
        ];

        return $rules[$scenario];
    }
}
