<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Setting extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'settings';

    protected $fillable = [
        'group',
        'key',
        'value',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'group' => ['string', 'required'],
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'group' => ['string', 'required'],
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
