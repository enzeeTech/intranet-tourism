<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Cache extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'cache';

    protected $fillable = [
        'key',
        'value',
        'expiration',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                    'expiration' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                    'expiration' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
