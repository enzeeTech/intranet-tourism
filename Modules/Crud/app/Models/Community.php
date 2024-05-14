<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use QueryableApi;

    protected $table = 'communities';

    protected $fillable = ['id',
        'name',
        'banner',
        'description',
        'type',
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
