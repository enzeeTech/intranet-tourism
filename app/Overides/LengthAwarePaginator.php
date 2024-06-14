<?php

namespace App\Overides;

use Illuminate\Pagination\LengthAwarePaginator as BaseLengthAwarePaginator;
use Illuminate\Support\Facades\URL;

class LengthAwarePaginator extends BaseLengthAwarePaginator
{
    public function path()
    {
        return URL::current();
    }
}
