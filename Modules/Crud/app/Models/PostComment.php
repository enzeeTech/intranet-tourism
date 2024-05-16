<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\QueryableApi;

class PostComment extends Model
{
<<<<<<< HEAD:Modules/Crud/app/Models/PostComment.php
    use Authorizable, HasFactory, QueryableApi;

=======
    use QueryableApi;
>>>>>>> dcf2146ac26fd5066fb93545f00491bc13ce2e46:app/Models/PostComment.php
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
                    'id' => ['string', 'required'],
                    'post_id' => ['string', 'required'],
                    'comment_id' => ['string', 'required'],
                    'user_id' => ['string', 'required'],
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
                    'comment_id' => ['string', 'required'],
                    'user_id' => ['string', 'required'],
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
