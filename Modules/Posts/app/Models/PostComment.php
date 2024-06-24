<?php

namespace Modules\Posts\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class PostComment extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'post_comment';

    protected $fillable = [
        'post_id',
        'comment_id',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'post_id' => ['string', 'required'],
                    'comment_id' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'post_id' => ['string', 'required'],
                    'comment_id' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function comment()
    {
        return $this->belongsTo(Post::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
