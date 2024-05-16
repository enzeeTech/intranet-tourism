<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'profiles';

    protected $fillable = ['id',
        'user_id',
        'bio',
        'image',
        'cover_photo',
        'phone_no',
        'dob',
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
                    'user_id' => ['string', 'required'],
                    'bio' => ['string'],
                    'image' => ['string'],
                    'cover_photo' => ['string'],
                    'phone_no' => ['string'],
                    'dob' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'user_id' => ['string', 'required'],
                    'bio' => ['string'],
                    'image' => ['string'],
                    'cover_photo' => ['string'],
                    'phone_no' => ['string'],
                    'dob' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
