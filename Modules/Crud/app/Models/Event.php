<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use QueryableApi;

    protected $table = 'events';

    protected $fillable = ['id',
        'title',
        'description',
        'start_time',
        'end_time',
        'attendance',
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
