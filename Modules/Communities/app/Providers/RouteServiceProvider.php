<?php

namespace Modules\Communities\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function map(): void
    {
      

        Route::middleware('api')
            ->prefix('api/communities')
            ->group(module_path('Communities', '/routes/api.php'));
    }
}
