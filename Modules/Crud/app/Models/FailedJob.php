<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FailedJob extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'failed_jobs';

    protected $fillable = ['id',
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
