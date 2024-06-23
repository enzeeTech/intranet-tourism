<?php

namespace Modules\Events\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Event extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi, HasUuids;

    protected $table = 'events';

    protected $fillable = [
        'title',
        'description',
        'venue',
        'url',
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
                    'venue' => ['string', 'required'],
                    'url' => ['string'],
                    'description' => ['string'],
                    'color' => ['string'],
                    'start_at' => ['string', 'required'],
                    'end_at' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'title' => ['string', 'required'],
                    'venue' => ['string', 'required'],
                    'description' => ['string'],
                    'url' => ['string'],
                    'color' => ['string'],
                    'start_at' => ['string', 'required'],
                    'end_at' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function attendances()
    {
        return $this->hasMany(EventAttendance::class);
    }
}
