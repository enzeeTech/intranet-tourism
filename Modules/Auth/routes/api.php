<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\AuthorizationController;
use Modules\Auth\Http\Controllers\ChangePasswordController;
use Modules\Auth\Http\Controllers\LoginController;
use Modules\Auth\Http\Controllers\NewPasswordController;
use Modules\Auth\Http\Controllers\RegisterationController;
use Modules\Auth\Http\Controllers\EmailVerifcationController;

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::post('user/{user}/sync-roles', [AuthorizationController::class, 'syncRoles'])->name('sync-roles');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('change-password', ChangePasswordController::class)->name('password.change');
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');
});

Route::middleware('guest')->group(function () {
    Route::post('register', [RegisterationController::class, 'store'])->name('register');
    Route::post('login', [LoginController::class, 'login']);
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});

Route::prefix('email')
    ->group(function () {
        Route::get('verify/{id}/{hash}', [EmailVerifcationController::class, 'verify'])->name('verification.verify')->middleware(['signed']);
        Route::post('resend-verification/{user?}', [EmailVerifcationController::class, 'resendVerification'])
            ->middleware(['throttle:6,1'])
            ->name('verification.send');
    });

require_once 'email.php';
