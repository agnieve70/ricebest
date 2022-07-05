<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\FarmerController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\OrderingController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post("register", [ RegisterController::class, "index"]);
Route::post("login", [LoginController::class, "index"]);
Route::post("product/webhook", [ProductController::class, "webhook"]);

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::get("email-confirmation/{code}", [RegisterController::class, "emailConfirmation"]);

    Route::get("totals", [ProductController::class, "totals"]);
    Route::get("transactions", [ProductController::class, "transactions"]);
    Route::get("client-transactions", [ProductController::class, "clientTransactions"]);
    Route::get("client-orders", [ProductController::class, "clientOrders"]);
    Route::get("products", [ProductController::class, "index"]);
    Route::get("product/{id}", [ProductController::class, "getProduct"]);
    Route::post("product/create", [ProductController::class, "create"]);
    Route::post("product/update", [ProductController::class, "update"]);
    Route::delete("product/delete/{id}", [ProductController::class, "delete"]);

    Route::post("product/order", [ProductController::class, "order"]);

    Route::get("farmers", [FarmerController::class, "index"]);
    Route::get("farmer/{id}", [FarmerController::class, "getFarmer"]);
    Route::post("farmer/create", [FarmerController::class, "create"]);
    Route::post("farmer/update", [FarmerController::class, "update"]);
    Route::post("farmer/delete", [FarmerController::class, "delete"]);

    Route::get("clients", [ClientController::class, "index"]);
    Route::get("client/{id}", [ClientController::class, "getClient"]);
    Route::post("client/create", [ClientController::class, "create"]);
    Route::post("client/update", [ClientController::class, "update"]);
    Route::post("client/delete", [ClientController::class, "delete"]);

    Route::get("comments/{id}", [CommentController::class, "index"]);
    Route::post("comment/create", [CommentController::class, "create"]);
    Route::post("comment/update", [CommentController::class, "update"]);
    Route::delete("comment/delete/{id}", [CommentController::class, "delete"]);

    Route::get("contacts", [MessageController::class, "contacts"]);
    Route::get("messages", [MessageController::class, "index"]);
    Route::post("message/create", [MessageController::class, "create"]);

    Route::get("payts", [OrderingController::class, "index"]);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
