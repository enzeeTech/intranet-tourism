<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'profiles';

    protected $fillable = [
        'user_id',
        'bio',
        'image',
        'cover_photo',
        'phone_no',
        'dob',
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
