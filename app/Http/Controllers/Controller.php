<?php

namespace App\Http\Controllers;

abstract class Controller
{
    //
    protected function shouldPaginate($query)
    {
        if (request()->has('first')) {
            return ['data' => $query->first()];
        }

        if (request()->has('latest')) {
            return ['data' => $query->latest()->first()];
        }
        return request()->has('paginate')
            && (request('paginate') === 'false' || request('paginate') == '0')
            ? ['data' => $query->get()]
            : $query->paginate(request('perpage'));
    }
}
