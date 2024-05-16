<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class PreferenceSchema extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'preference_schemas';

    protected $fillable = [
        'preferencable_type',
        'preferencable_id',
        'group_name',
        'subgroup_name',
        'item',
        'value_type',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'preferencable_type' => ['string', 'required'],
                    'preferencable_id' => ['string', 'required'],
                    'group_name' => ['string', 'required'],
                    'subgroup_name' => ['string'],
                    'item' => ['string', 'required'],
                    'value_type' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'preferencable_type' => ['string', 'required'],
                    'preferencable_id' => ['string', 'required'],
                    'group_name' => ['string', 'required'],
                    'subgroup_name' => ['string'],
                    'item' => ['string', 'required'],
                    'value_type' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
