<?php

namespace App\Models\Traits;

use Nwidart\Modules\Facades\Module;

trait QueryableApi
{
    public function scopeQueryable($query)
    {
        $query->when(request()->has('with'), function ($query) {
            $query->with(request('with'));
        });

        $query->when(request()->has('filter'), function ($query) {
            foreach (request('filter') as $filter) {
                foreach ($filter as $filterBy => $value) {
                    $query->$filterBy($value);
                }
            }
        });

        $query->when(request()->has('scope'), function ($query) {
            foreach (request('scope') as $scope) {
                foreach ($scope as $scopeBy => $value) {
                    if ($value == null || is_bool($value)) {
                        $query->$scopeBy();
                    } else {
                        $query->$scopeBy($value);
                    }
                }
            }
        });
    }

    public function scopeWithModuleRelation($query, $module, $relation)
    {
        if (is_callable($relation)) {
            $query->when(Module::find($module) && Module::isEnabled($module), $relation);
        } else {
            $query->when(Module::find($module) && Module::isEnabled($module), fn ($query) => $query->with($relation));
        }
    }
}
