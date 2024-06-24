<?php

use Illuminate\Support\Facades\Route;
use Modules\Communities\Http\Controllers\CommunityController;
use Modules\Communities\Http\Controllers\CommunityMemberController;

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



Route::apiResources([

    'communities' => CommunityController::class,
    'community_members' => CommunityMemberController::class,

]);
