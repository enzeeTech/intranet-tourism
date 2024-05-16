<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use Authorizable, HasFactory, QueryableApi;

    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'description',
        'color',
        'start_at',
        'end_at',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'title' => ['string', 'required'],
                    'description' => ['string'],
                    'color' => ['string'],
                    'start_at' => ['string'],
                    'end_at' => ['string'],
                ],
                // [],
            ],
            'update' => [
                [
                    'title' => ['string', 'required'],
                    'description' => ['string'],
                    'color' => ['string'],
                    'start_at' => ['string'],
                    'end_at' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function items()
    {
        return $this->hasMany(TaskItem::class);
    }
}
