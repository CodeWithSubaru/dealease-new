<?php

use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReportUserController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Admin\UsersController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Api\Admin\MessageController;
use App\Http\Controllers\Api\Seller\ProductContoller;
use App\Http\Controllers\Api\Admin\AnalyticsControllers;
use App\Http\Controllers\Api\Admin\AnnouncementController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;


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

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/update-access', [AuthController::class, 'updateAccess']);
Route::get('/public/product', [ProductContoller::class, 'getProductsForPublic']);
Route::get('/announcement', [AnnouncementController::class, 'publicAnnouncement']);
Route::post('/admin/announcement/{id}', [AnnouncementController::class, 'update']);
Route::post('/recharge', [PaymentController::class, 'recharge']);
Route::post('/payment', [PaymentController::class, 'payment']);
Route::post('/request-withdrawal', [PaymentController::class, 'widthdraw'])
    ->middleware('throttle:5,1');


// Seller Route
Route::post('/seller/product/{id}', [ProductContoller::class, 'update']);
Route::apiResource('/seller/product', ProductContoller::class);
Route::post('product/{id}', [ProductContoller::class, 'destroy']);

Route::get('email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');

Route::middleware(['auth:sanctum'])->group(function () {

    // Buyer
    Route::apiResource('/transactions', PaymentController::class);
    Route::get('/orders/items-in-cart-count', [OrderController::class, 'fetchCountOfOrders']);
    Route::apiResource('/orders', OrderController::class);

    Route::get('email/resend', [VerificationController::class, 'resend']);
    Route::get('/user', [AuthController::class, 'index']);
    Route::post('/change-password', [AuthController::class, 'changePass']);
    Route::post('/logout', [AuthController::class, 'destroy'])
        ->middleware('auth');

    Route::get('/users', [UsersController::class, 'index']);
    Route::apiResource('/report-user', ReportUserController::class);

    Route::apiResource('/messages', MessageController::class);

    // Admin route
    Route::post('/admin/users/{id}', [UsersController::class, 'update']);
    Route::apiResource('/admin/users', UsersController::class);
    Route::get('/admin/users-by-10', [UsersController::class, 'getTenUsers']);
    Route::post('/messages/inbox/delete/{id}', [MessageController::class, 'softDelete']);
    Route::post('/messages/inbox/restore/{id}', [MessageController::class, 'restore']);
    Route::get('/admin/get-number-of-user', [AnalyticsControllers::class, 'getNumOfUsers']);
    Route::get('/admin/get-number-of-message', [AnalyticsControllers::class, 'getNumOfMessages']);
    Route::post('/admin/announcement/{id}', [AnnouncementController::class, 'update']);
    Route::apiResource('/admin/announcement', AnnouncementController::class);
    Route::post('/admin/announcement/publish/{id}', [AnnouncementController::class, 'publish']);
    Route::post('/admin/announcement/draft/{id}', [AnnouncementController::class, 'draft']);
    Route::post('/admin/announcement/delete/{id}', [AnnouncementController::class, 'softDelete']);
    Route::post('/admin/announcement/restore/{id}', [AnnouncementController::class, 'restore']);
    Route::post('/admin/announcement/update-status', [AnnouncementController::class, 'updateStatus']);

    // Admin: Transactions
    Route::apiResource('/admin/transactions', TransactionsController::class);
});
