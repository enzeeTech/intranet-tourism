<?php

namespace App\Providers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(\Illuminate\Pagination\LengthAwarePaginator::class, \App\Overides\LengthAwarePaginator::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerMacros();
    }

    private function registerMacros()
    {
        Blueprint::macro('auditable', function () {
            $this->timestamps();
            $this->string('created_by')->nullable();
            $this->string('updated_by')->nullable();
            $this->softDeletes();
            $this->string('deleted_by')->nullable();
        });
    }
}
