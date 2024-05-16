<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartmentPreference extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'department_preferences';

    protected $fillable = ['id',
        'department_id',
        'group',
        'subgroup',
        'key',
        'value',
        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
        'deleted_at',
        'deleted_by',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'id' => ['string', 'required'],
                    'department_id' => ['string', 'required'],
                    'group' => ['string', 'required'],
                    'subgroup' => ['string'],
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                    'created_by' => ['string', 'required'],
                    'updated_by' => ['string', 'required'],
                    'deleted_at' => ['string'],
                    'deleted_by' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'department_id' => ['string', 'required'],
                    'group' => ['string', 'required'],
                    'subgroup' => ['string'],
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                    'created_by' => ['string', 'required'],
                    'updated_by' => ['string', 'required'],
                    'deleted_at' => ['string'],
                    'deleted_by' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}