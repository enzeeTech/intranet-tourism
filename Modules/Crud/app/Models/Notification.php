<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'notifications';

    protected $fillable = ['id',
        'type',
        'notifiable_type',
        'notifiable_id',
        'data',
        'read_at',
        'created_at',
        'updated_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'id' => ['string', 'required'],
                    'type' => ['string', 'required'],
                    'notifiable_type' => ['string', 'required'],
                    'notifiable_id' => ['string', 'required'],
                    'data' => ['string', 'required'],
                    'read_at' => ['string'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'type' => ['string', 'required'],
                    'notifiable_type' => ['string', 'required'],
                    'notifiable_id' => ['string', 'required'],
                    'data' => ['string', 'required'],
                    'read_at' => ['string'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
