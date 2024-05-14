<?php

namespace App\Models;

use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Model;

class Migration extends Model
{
    use QueryableApi;

    protected $table = 'migrations';

    protected $fillable = ['id',
        'migration',
        'batch',
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
