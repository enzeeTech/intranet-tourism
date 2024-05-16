<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostAccessibility extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'post_accessibilities';

    protected $fillable = ['id',
        'post_id',
        'accessable_type',
        'accessable_id',
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
                    'post_id' => ['string', 'required'],
                    'accessable_type' => ['string', 'required'],
                    'accessable_id' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'post_id' => ['string', 'required'],
                    'accessable_type' => ['string', 'required'],
                    'accessable_id' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
