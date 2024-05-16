<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'jobs';

    protected $fillable = ['id',
        'queue',
        'payload',
        'attempts',
        'reserved_at',
        'available_at',
        'created_at',
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
