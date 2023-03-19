<?php

use App\Http\Controllers\Api\Admin\AnalyticsControllers;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Admin\UsersController;
use App\Http\Controllers\Api\Admin\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Api's
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/register-exist', [AuthController::class, 'registerExist']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'index']);
    Route::post('/change-password', [AuthController::class, 'changePass']);
    Route::post('/logout', [AuthController::class, 'destroy'])
        ->middleware('auth')
        ->name('logout');

    // Admin route
    Route::apiResource('/admin/users', UsersController::class);
    Route::apiResource('/admin/messages', MessageController::class);
    Route::get('/admin/get-number-of-user', [AnalyticsControllers::class, 'getNumOfUsers']);
    Route::get('/admin/get-number-of-message', [AnalyticsControllers::class, 'getNumOfMessages']);
});
