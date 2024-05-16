<?php

namespace Modules\Crud\Models;

use App\Models\Traits\Authorizable;
use App\Models\Traits\QueryableApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use Authorizable, HasFactory, QueryableApi;

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
                ],
                // [],
            ],
            'update' => [
                [
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
                ],
                // [],
            ],
        ];

        return $rules[$scenario];
    }
}
