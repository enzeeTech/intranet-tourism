<?php

use Illuminate\Support\Facades\Route;
use Modules\Crud\Http\Controllers\CrudController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([], function () {
    Route::resource('crud', CrudController::class)->names('crud');
});
require __DIR__.'/crud.php';
