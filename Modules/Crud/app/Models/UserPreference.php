<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'user_preferences';

    protected $fillable = [
        'user_id',
        'group',
        'subgroup',
        'key',
        'value',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'user_id' => ['string', 'required'],
                    'group' => ['string', 'required'],
                    'subgroup' => ['string'],
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'user_id' => ['string', 'required'],
                    'group' => ['string', 'required'],
                    'subgroup' => ['string'],
                    'key' => ['string', 'required'],
                    'value' => ['string', 'required'],
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
