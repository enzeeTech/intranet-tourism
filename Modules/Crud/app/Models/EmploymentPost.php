<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmploymentPost extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'employment_posts';

    protected $fillable = ['id',
        'department_id',
        'business_post_id',
        'business_grade_id',
        'business_scheme_id',
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
                    'department_id' => ['string', 'required'],
                    'business_post_id' => ['string', 'required'],
                    'business_grade_id' => ['string', 'required'],
                    'business_scheme_id' => ['string', 'required'],
                    'user_id' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'department_id' => ['string', 'required'],
                    'business_post_id' => ['string', 'required'],
                    'business_grade_id' => ['string', 'required'],
                    'business_scheme_id' => ['string', 'required'],
                    'user_id' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
