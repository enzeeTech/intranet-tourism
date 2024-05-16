<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\QueryableApi;

class PostAccessibility extends Model
{
    use QueryableApi;
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
                    'id' => ['string', 'required'],
                    'post_id' => ['string', 'required'],
                    'accessable_type' => ['string', 'required'],
                    'accessable_id' => ['string', 'required'],
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
                    'post_id' => ['string', 'required'],
                    'accessable_type' => ['string', 'required'],
                    'accessable_id' => ['string', 'required'],
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
