<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'departments';

    protected $fillable = ['id',
        'name',
        'banner',
        'description',
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
                    'name' => ['string'],
                    'banner' => ['string'],
                    'description' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'name' => ['string'],
                    'banner' => ['string'],
                    'description' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
