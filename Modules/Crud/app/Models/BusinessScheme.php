<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessScheme extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'business_schemes';

    protected $fillable = ['id',
        'code',
        'title',
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
                    'code' => ['string', 'required'],
                    'title' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'code' => ['string', 'required'],
                    'title' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
