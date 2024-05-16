<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CacheLock extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'cache_locks';

    protected $fillable = ['key',
        'owner',
        'expiration',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'key' => ['string', 'required'],
                    'owner' => ['string', 'required'],
                    'expiration' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'key' => ['string', 'required'],
                    'owner' => ['string', 'required'],
                    'expiration' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
