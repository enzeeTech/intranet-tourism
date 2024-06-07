<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class BaseModel extends Model
{
    protected static function boot()
    {
        static::creating(function ($model) {
            if (auth()->check() && Schema::hasColumn($model->table, 'created_by')) {
                $model->created_by = auth()->id();
            }

            if (Schema::hasColumn($model->table, 'created_at')) {
                $model->created_at = now();
            }
        });

        static::updating(function ($model) {
            if (auth()->check() && Schema::hasColumn($model->table, 'updated_by')) {
                $model->updated_by = auth()->id();
            }

            if (Schema::hasColumn($model->table, 'updated_at')) {
                $model->updated_at = now();
            }
        });
        parent::boot();
    }
}
