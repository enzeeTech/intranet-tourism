<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessScheme extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'business_schemes';

    protected $fillable = [
        'code',
        'title',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'code' => ['string', 'required'],
                    'title' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'code' => ['string', 'required'],
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
