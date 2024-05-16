<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Notification extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'notifications';

    protected $fillable = [
        'type',
        'notifiable_type',
        'notifiable_id',
        'data',
        'read_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'type' => ['string', 'required'],
                    'notifiable_type' => ['string', 'required'],
                    'notifiable_id' => ['string', 'required'],
                    'data' => ['string', 'required'],
                    'read_at' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'type' => ['string', 'required'],
                    'notifiable_type' => ['string', 'required'],
                    'notifiable_id' => ['string', 'required'],
                    'data' => ['string', 'required'],
                    'read_at' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
