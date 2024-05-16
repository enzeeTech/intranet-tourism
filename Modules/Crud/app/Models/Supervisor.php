<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supervisor extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'supervisors';

    protected $fillable = ['id',
        'child_id',
        'parent_id',
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
                    'child_id' => ['string', 'required'],
                    'parent_id' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'child_id' => ['string', 'required'],
                    'parent_id' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
