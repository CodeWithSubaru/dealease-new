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
use App\Http\Controllers\Api\Admin\AdminPaymentController;
use App\Http\Controllers\Api\ProductFilterController;

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
Route::get('/public/product/{id}', [ProductContoller::class, 'getProductsForPublic']);
Route::get('/announcement', [AnnouncementController::class, 'publicAnnouncement']);
Route::post('/admin/announcement/{id}', [AnnouncementController::class, 'update']);

// Product Filter
Route::get('/product/this-week', [ProductFilterController::class, 'thisWeek']);
Route::get('/product/this-day', [ProductFilterController::class, 'thisDay']);
Route::get('/product/available', [ProductFilterController::class, 'availableProducts']);
Route::get('/product/search/{product}', [ProductFilterController::class, 'searchProduct']);

// Payment
Route::post('/recharge', [PaymentController::class, 'recharge']);
Route::post('/payment', [PaymentController::class, 'payment']);
Route::post('/request-withdrawal', [PaymentController::class, 'widthdraw'])
    ->middleware('throttle:5,1');

// Login
Route::get('email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');

Route::middleware(['auth:sanctum'])->group(function () {

    // User
    Route::post('/update-access', [AuthController::class, 'updateAccess']);
    Route::get('email/resend', [VerificationController::class, 'resend']);
    Route::get('/user', [AuthController::class, 'index']);
    Route::post('/change-password', [AuthController::class, 'changePass']);
    Route::post('/logout', [AuthController::class, 'destroy'])
        ->middleware('auth');

    Route::apiResource('/transactions', PaymentController::class);
    Route::put('/orders/user/cancel-order/{order_number}', [OrderController::class, 'cancelOrder']);
    Route::get('/orders/buyer/{order_number}', [OrderController::class, 'viewOrderByOrdNumber']);
    Route::get('/orders/order-status/buyer/{order_status}', [OrderController::class, 'numberOfOrdersByStatusBuyer']);
    Route::get('/orders/order-status/seller/{order_status}', [OrderController::class, 'numberOfOrdersByStatusSeller']);
    Route::get('/orders/orders-user/buyer/{order_status}', [OrderController::class, 'fetchOrdersBuyer']);
    Route::get('/orders/orders-user/seller/{order_status}', [OrderController::class, 'fetchOrdersSeller']);
    Route::get('/orders/items-in-cart-count', [OrderController::class, 'fetchCountOfOrders']);
    Route::get('/orders/increment/{id}', [OrderController::class, 'increment']);
    Route::get('/orders/decrement/{id}', [OrderController::class, 'decrement']);
    Route::get('/orders/seller-id', [OrderController::class, 'fetchCartGroupById']);


    Route::post('/orders/place-order', [OrderController::class, 'placeOrder']);
    Route::apiResource('/orders', OrderController::class);
    Route::post('/payment', [PaymentController::class, 'payment']);
    Route::post('/request-withdrawal', [PaymentController::class, 'withdraw'])
        ->middleware('throttle:5,1');

    Route::post('/seller/product/{id}', [ProductContoller::class, 'update']);
    Route::apiResource('/seller/product', ProductContoller::class);
    Route::post('product/{id}', [ProductContoller::class, 'destroy']);


    Route::get('/users', [UsersController::class, 'index']);
    Route::apiResource('/messages', MessageController::class);
    // To be implemented
    // Route::apiResource('/report-user', ReportUserController::class);

    // Admin route
    Route::get('/admin/users/number-users', [UsersController::class, 'numberOfUsers']);
    Route::get('/admin/users/number-unverified-user', [UsersController::class, 'numberOfUnverifiedUser']);
    Route::get('/admin/users/unverified', [UsersController::class, 'unverifiedUsers']);
    Route::post('/admin/users/{id}', [UsersController::class, 'update']);
    Route::post('/admin/verify-user/{id}', [UsersController::class, 'verifyUser']);
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
    Route::get('/admin/transactions/show/transactions/{payment_status}', [AdminPaymentController::class, 'index']);
    Route::get('/admin/transactions/under-review', [AdminPaymentController::class, 'numberOfUnderReviewTransaction']);
    Route::get('/admin/transactions/approved', [AdminPaymentController::class, 'numberOfApprovedTransaction']);
    Route::apiResource('/admin/transactions', AdminPaymentController::class);
    Route::put('/admin/confirm/{id}', [AdminPaymentController::class, 'confirm']);
});
