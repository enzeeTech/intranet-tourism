<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostComment extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'post_comments';

    protected $fillable = ['id',
        'post_id',
        'comment_id',
        'user_id',
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
                    'comment_id' => ['string', 'required'],
                    'user_id' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'post_id' => ['string', 'required'],
                    'comment_id' => ['string', 'required'],
                    'user_id' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
