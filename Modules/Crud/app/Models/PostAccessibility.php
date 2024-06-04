<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class PostAccessibility extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'post_accessibilities';

    protected $fillable = [
        'post_id',
        'accessable_type',
        'accessable_id',
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

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
