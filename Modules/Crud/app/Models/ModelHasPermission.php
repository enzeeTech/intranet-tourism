<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelHasPermission extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'model_has_permissions';

    protected $fillable = [
        'permission_id',
        'model_type',
        'model_id',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'permission_id' => ['string', 'required'],
                    'model_type' => ['string', 'required'],
                    'model_id' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'permission_id' => ['string', 'required'],
                    'model_type' => ['string', 'required'],
                    'model_id' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }
}
