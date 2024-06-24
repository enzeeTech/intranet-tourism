<?php

use Illuminate\Support\Facades\Route;
use Modules\Crud\Http\Controllers\CrudController;
use Modules\Crud\Http\Controllers\ExternalLinkController;
use Modules\Crud\Http\Controllers\PostController;
use Modules\Settings\Http\Controllers\CommunityPreferenceController;
use Modules\Settings\Http\Controllers\DepartmentPreferenceController;
use Modules\Settings\Http\Controllers\PreferenceSchemaController;
use Modules\Settings\Http\Controllers\SettingController;
use Modules\Settings\Http\Controllers\UserPreferenceController;

/*
 *--------------------------------------------------------------------------
 * API Routes
 *--------------------------------------------------------------------------
 *
 * Here is where you can register API routes for your application. These
 * routes are loaded by the RouteServiceProvider within a group which
 * is assigned the "api" middleware group. Enjoy building your API!
 *
*/

// Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
//     Route::apiResource('crud', CrudController::class)->names('crud');
// });

// require_once 'crud.php';
Route::apiResources([

    'community_preferences' => CommunityPreferenceController::class,
    'department_preferences' => DepartmentPreferenceController::class,
    'external_links' => ExternalLinkController::class,
    'preference_schemas' => PreferenceSchemaController::class,
    'settings' => SettingController::class,
    'user_preferences' => UserPreferenceController::class,
]);
