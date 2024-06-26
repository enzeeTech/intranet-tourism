<?php

namespace Modules\Profile\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function map(): void
    {
        // Route::middleware('web')
        //     ->group(module_path('Profile', '/routes/web.php'));


        Route::middleware('api')
            ->prefix('api/profile')
            ->group(module_path('Profile', '/routes/api.php'));
    }
}
