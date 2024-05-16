<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'sessions';

    protected $fillable = ['id',
        'user_id',
        'ip_address',
        'user_agent',
        'payload',
        'last_activity',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'id' => ['string', 'required'],
                    'user_id' => ['string'],
                    'ip_address' => ['string'],
                    'user_agent' => ['string'],
                    'payload' => ['string', 'required'],
                    'last_activity' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'user_id' => ['string'],
                    'ip_address' => ['string'],
                    'user_agent' => ['string'],
                    'payload' => ['string', 'required'],
                    'last_activity' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
