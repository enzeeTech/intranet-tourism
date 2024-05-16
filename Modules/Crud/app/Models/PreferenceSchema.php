<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\QueryableApi;

class PreferenceSchema extends Model
{
<<<<<<< HEAD:Modules/Crud/app/Models/PreferenceSchema.php
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'preference_schemas';
=======
    use QueryableApi;
    protected $table = 'posts';
>>>>>>> dcf2146ac26fd5066fb93545f00491bc13ce2e46:app/Models/Post.php

    protected $fillable = ['id',
        'preferencable_type',
        'preferencable_id',
        'group_name',
        'subgroup_name',
        'item',
        'value_type',
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
                    'id' => ['string', 'required'],
                    'preferencable_type' => ['string', 'required'],
                    'preferencable_id' => ['string', 'required'],
                    'group_name' => ['string', 'required'],
                    'subgroup_name' => ['string'],
                    'item' => ['string', 'required'],
                    'value_type' => ['string', 'required'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                    'created_by' => ['string', 'required'],
                    'updated_by' => ['string', 'required'],
                    'deleted_at' => ['string'],
                    'deleted_by' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'preferencable_type' => ['string', 'required'],
                    'preferencable_id' => ['string', 'required'],
                    'group_name' => ['string', 'required'],
                    'subgroup_name' => ['string'],
                    'item' => ['string', 'required'],
                    'value_type' => ['string', 'required'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                    'created_by' => ['string', 'required'],
                    'updated_by' => ['string', 'required'],
                    'deleted_at' => ['string'],
                    'deleted_by' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
