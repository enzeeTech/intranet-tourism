<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use Authorizable, HasFactory, QueryableApi;

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
                    'user_id' => ['string', 'required'],
                    'type' => ['string', 'required'],
                    'content' => ['string', 'required'],
                    'title' => ['string'],
                    'tag' => ['string'],
                    'visibility' => ['string', 'required'],
                    'pool_posting' => ['string'],
                    'likes' => ['string'],
                    'mentions' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'user_id' => ['string', 'required'],
                    'type' => ['string', 'required'],
                    'content' => ['string', 'required'],
                    'title' => ['string'],
                    'tag' => ['string'],
                    'visibility' => ['string', 'required'],
                    'pool_posting' => ['string'],
                    'likes' => ['string'],
                    'mentions' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
