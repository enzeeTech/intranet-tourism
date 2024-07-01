<?php

namespace Modules\User\Models;

use App\Models\BaseModel as Model;
use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class BirthdayReminder extends Model implements AuditableContract
{
    use Auditable, Authorizable, HasFactory, QueryableApi, HasUuids;

    protected $table = 'birthday_reminders';

    protected $fillable = [
        'user_id',
        'reminder_date',
        'message',

    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'user_id' => ['string', 'required'],
                    'reminder_date' => ['string', 'required'],
                    'message' => ['string'],

                ],
                // [],
            ],
            'update' => [
                [
                    'user_id' => ['string', 'required'],
                    'reminder_date' => ['string', 'required'],
                    'message' => ['string'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
