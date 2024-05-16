<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'communities';

    protected $fillable = ['id',
        'name',
        'banner',
        'description',
        'type',
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
                    'name' => ['string', 'required'],
                    'banner' => ['string'],
                    'description' => ['string'],
                    'type' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'name' => ['string', 'required'],
                    'banner' => ['string'],
                    'description' => ['string'],
                    'type' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
