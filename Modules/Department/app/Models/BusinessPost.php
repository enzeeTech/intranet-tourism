<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Database\Factories\BusinessPostFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class BusinessPost extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'business_posts';

    protected static function newFactory()
    {
        return BusinessPostFactory::new();
    }

    protected $fillable = [
        'title',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'title' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'title' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function employmentPosts()
    {
        return $this->hasMany(EmploymentPost::class);
    }
}
