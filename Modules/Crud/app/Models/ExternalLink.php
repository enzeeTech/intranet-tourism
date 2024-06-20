<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class ExternalLink extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'external_links';

    protected $fillable = [
        'label',
        'url',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'label' => ['string', 'required'],
                    'url' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'label' => ['string', 'required'],
                    'url' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
