<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';

    protected $fillable = ['id',
        'user_id',
        'type',
        'content',
        'title',
        'tag',
        'visibility',
        'pool_posting',
        'likes',
        'mentions',
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
                    'user_id' => ['string', 'required'],
                    'type' => ['string', 'required'],
                    'content' => ['string', 'required'],
                    'title' => ['string'],
                    'tag' => ['string'],
                    'visibility' => ['string', 'required'],
                    'pool_posting' => ['string'],
                    'likes' => ['string'],
                    'mentions' => ['string'],
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
                    'user_id' => ['string', 'required'],
                    'type' => ['string', 'required'],
                    'content' => ['string', 'required'],
                    'title' => ['string'],
                    'tag' => ['string'],
                    'visibility' => ['string', 'required'],
                    'pool_posting' => ['string'],
                    'likes' => ['string'],
                    'mentions' => ['string'],
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
