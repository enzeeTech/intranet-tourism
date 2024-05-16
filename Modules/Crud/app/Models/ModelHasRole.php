<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelHasRole extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'model_has_roles';

    protected $fillable = [
        'role_id',
        'model_type',
        'model_id',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'role_id' => ['string', 'required'],
                    'model_type' => ['string', 'required'],
                    'model_id' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'role_id' => ['string', 'required'],
                    'model_type' => ['string', 'required'],
                    'model_id' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
