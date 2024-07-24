<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Modules\Communities\Models\Community;
use Modules\Department\Models\Department;

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
        $this->relationMapping();

        Event::listen(function (\SocialiteProviders\Manager\SocialiteWasCalled $event) {
            $event->extendSocialite('azure', \SocialiteProviders\Azure\Provider::class);
        });
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

    private function relationMapping()
    {
        Relation::morphMap([
            'departments' => Department::class,
            'communities' => Community::class,
            'users' => User::class,
        ]);
    }
}
