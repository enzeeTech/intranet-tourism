<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\QueryableApi;

class Resource extends Model
{
<<<<<<< HEAD:Modules/Crud/app/Models/Resource.php
    use Authorizable, HasFactory, QueryableApi;

=======
    use QueryableApi;
>>>>>>> dcf2146ac26fd5066fb93545f00491bc13ce2e46:app/Models/Resource.php
    protected $table = 'resources';

    protected $fillable = ['id',
        'user_id',
        'attachable_type',
        'attachable_id',
        'for',
        'path',
        'extension',
        'mime_type',
        'filesize',
        'duration',
        'metadata',
        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
        'deleted_at',
        'deleted_by',
    ];

    public static function rules($scenario = 'create')
    {
        $rules = [
            'create' => [
                [
                    'id' => ['string', 'required'],
                    'user_id' => ['string', 'required'],
                    'attachable_type' => ['string', 'required'],
                    'attachable_id' => ['string', 'required'],
                    'for' => ['string', 'required'],
                    'path' => ['string', 'required'],
                    'extension' => ['string', 'required'],
                    'mime_type' => ['string', 'required'],
                    'filesize' => ['string', 'required'],
                    'duration' => ['string'],
                    'metadata' => ['string', 'required'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                    'created_by' => ['string', 'required'],
                    'updated_by' => ['string', 'required'],
                    'deleted_at' => ['string'],
                    'deleted_by' => ['string', 'required'],
                ],
                // [],
            ],
            'update' => [
                [
                    'id' => ['string', 'required'],
                    'user_id' => ['string', 'required'],
                    'attachable_type' => ['string', 'required'],
                    'attachable_id' => ['string', 'required'],
                    'for' => ['string', 'required'],
                    'path' => ['string', 'required'],
                    'extension' => ['string', 'required'],
                    'mime_type' => ['string', 'required'],
                    'filesize' => ['string', 'required'],
                    'duration' => ['string'],
                    'metadata' => ['string', 'required'],
                    'created_at' => ['string'],
                    'updated_at' => ['string'],
                    'created_by' => ['string', 'required'],
                    'updated_by' => ['string', 'required'],
                    'deleted_at' => ['string'],
                    'deleted_by' => ['string', 'required'],
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
