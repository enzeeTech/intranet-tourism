<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessGrade extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'business_grades';

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
