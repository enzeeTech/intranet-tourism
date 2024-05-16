<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Migration extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'migrations';

    protected $fillable = [
        'migration',
        'batch',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'migration' => ['string', 'required'],
                    'batch' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'migration' => ['string', 'required'],
                    'batch' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
