<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'roles';

    protected $fillable = ['id',
        'name',
        'guard_name',
        'description',
        'created_at',
        'updated_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'name' => ['string', 'required'],
                    'guard_name' => ['string', 'required'],
                    'description' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'name' => ['string', 'required'],
                    'guard_name' => ['string', 'required'],
                    'description' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
