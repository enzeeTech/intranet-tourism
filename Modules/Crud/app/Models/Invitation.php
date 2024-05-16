<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'invitations';

    protected $fillable = [
        'user_id',
        'invitable_type',
        'invitable_id',
        'status',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'user_id' => ['string', 'required'],
                    'invitable_type' => ['string', 'required'],
                    'invitable_id' => ['string', 'required'],
                    'status' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'user_id' => ['string', 'required'],
                    'invitable_type' => ['string', 'required'],
                    'invitable_id' => ['string', 'required'],
                    'status' => ['string', 'required'],
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
