<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'departments';

    protected $fillable = [
        'name',
        'banner',
        'description',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'name' => ['string'],
                    'banner' => ['string'],
                    'description' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'name' => ['string'],
                    'banner' => ['string'],
                    'description' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function preferences()
    {
        return $this->hasMany(DepartmentPreference::class);
    }

    public function employmentPosts()
    {
        return $this->hasMany(EmploymentPost::class);
    }
}
