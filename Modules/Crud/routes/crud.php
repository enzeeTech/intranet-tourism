<?php
use Illuminate\Support\Facades\Route;

Route::apiResources([
    'audits' => \App\Http\Controllers\AuditController::class,
    'cache' => \App\Http\Controllers\CacheController::class,
    'cache_locks' => \App\Http\Controllers\CacheLockController::class,
    'comments' => \App\Http\Controllers\CommentController::class,
    'communities' => \App\Http\Controllers\CommunityController::class,
    'departments' => \App\Http\Controllers\DepartmentController::class,
    'events' => \App\Http\Controllers\EventController::class,
    'failed_jobs' => \App\Http\Controllers\FailedJobController::class,
    'files' => \App\Http\Controllers\FileController::class,
    'galleries' => \App\Http\Controllers\GalleryController::class,
    'jobs' => \App\Http\Controllers\JobController::class,
    'job_batches' => \App\Http\Controllers\JobBatchController::class,
    'migrations' => \App\Http\Controllers\MigrationController::class,
    'password_reset_tokens' => \App\Http\Controllers\PasswordResetTokenController::class,
    'posts' => \App\Http\Controllers\PostController::class,
    'post_accessibilities' => \App\Http\Controllers\PostAccessibilityController::class,
    'profiles' => \App\Http\Controllers\ProfileController::class,
    'profile_communities' => \App\Http\Controllers\ProfileCommunityController::class,
    'profile_departments' => \App\Http\Controllers\ProfileDepartmentController::class,
    'sessions' => \App\Http\Controllers\SessionController::class,
    'settings' => \App\Http\Controllers\SettingController::class,
    'stories' => \App\Http\Controllers\StoryController::class,
    'users' => \App\Http\Controllers\UserController::class,
]);
