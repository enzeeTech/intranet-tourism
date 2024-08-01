<?php

use Illuminate\Support\Facades\Route;
use Modules\Permission\Http\Controllers\RoleHasPermissionController;
// use Modules\Crud\Models\RoleHasPermission;
use Modules\Profile\Http\Controllers\ProfileController;

Route::group(['middleware' => ['auth:api']], function () {
    Route::apiResources([
        'role-has-permissions' => RoleHasPermissionController::class
    ]);
    // Route::put('/assign-role/{id}', [RoleHasPermissionController::class, 'assignRole'])->name('assign-role');

});
