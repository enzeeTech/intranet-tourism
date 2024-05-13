<?php

namespace App\Overides;

use Illuminate\Support\Facades\URL;
use Illuminate\Pagination\LengthAwarePaginator as BaseLengthAwarePaginator;

class LengthAwarePaginator  extends BaseLengthAwarePaginator
{

    public function path()
    {
        return  URL::current();
    }
}
