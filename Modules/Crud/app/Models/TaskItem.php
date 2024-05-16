<?php

namespace Modules\Crud\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class TaskItem extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi;

    protected $table = 'task_items';

    protected $fillable = [
        'task_id',
        'description',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'task_id' => ['string', 'required'],
                    'description' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'task_id' => ['string', 'required'],
                    'description' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
