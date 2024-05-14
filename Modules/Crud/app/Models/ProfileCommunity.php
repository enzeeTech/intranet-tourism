<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class ProfileCommunity extends Model
{
    use QueryableApi;

    protected $table = 'profile_communities';

    protected $fillable = ['id',
        'profile_id',
        'community_id',
        'created_at',
        'updated_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [],
            'update' => [],
        ];

        return $rules[$scenario];
    }
}
