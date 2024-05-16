<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobBatch extends Model
{
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
            'create' => [
                [
                    'id' => ['string', 'required'],
                    'name' => ['string', 'required'],
                    'total_jobs' => ['string', 'required'],
                    'pending_jobs' => ['string', 'required'],
                    'failed_jobs' => ['string', 'required'],
                    'failed_job_ids' => ['string', 'required'],
                    'options' => ['string'],
                    'cancelled_at' => ['string'],
                    'created_at' => ['string', 'required'],
                    'finished_at' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'name' => ['string', 'required'],
                    'total_jobs' => ['string', 'required'],
                    'pending_jobs' => ['string', 'required'],
                    'failed_jobs' => ['string', 'required'],
                    'failed_job_ids' => ['string', 'required'],
                    'options' => ['string'],
                    'cancelled_at' => ['string'],
                    'created_at' => ['string', 'required'],
                    'finished_at' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
