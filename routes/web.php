<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Commmmunity;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\StaffDirectoryController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         //'laravelVersion' => Application::VERSION,
//         // 'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Redirect to login page
Route::get('/', function () {
    return redirect()->route('login');
});

// Logout route
Route::post('/logout', function () {
    Auth::logout();  // Call Laravel's built-in logout method
    return redirect('/');  // Redirect to home or login page
})->name('logout');


Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');
    Route::get('/calendar/events', [CalendarController::class, 'getEvents'])->name('calendar.events');
    Route::post('/calendar/event', [CalendarController::class, 'handleDateSelect'])->name('calendar.event');
    Route::put('/calendar/event/{id}', [CalendarController::class, 'updateEvent'])->name('calendar.update');
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::get('/staffDirectory', [StaffDirectoryController::class, 'index'])->name('staffDirectory');
    Route::get('/community', [Commmmunity::class, 'index'])->name('Community');
});

require __DIR__ . '/auth.php';