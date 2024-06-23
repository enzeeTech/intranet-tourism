<?php

namespace Modules\Department\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Database\Factories\BusinessGradeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class BusinessGrade extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'business_grades';

    protected static function newFactory()
    {
        return BusinessGradeFactory::new();
    }

    protected $fillable = [
        'code',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'code' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'code' => ['string', 'required'],
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
