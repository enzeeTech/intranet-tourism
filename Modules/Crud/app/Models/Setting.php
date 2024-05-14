<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use QueryableApi;

    protected $table = 'settings';

    protected $fillable = ['id',
        'site_name',
        'logo',
        'themes_color',
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
