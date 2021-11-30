<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/user',[App\Http\Controllers\api\TaskController::class, 'show']);
Route::get('/userContentAPI',[App\Http\Controllers\api\userContentAPI::class, 'show']);
Route::get('/publicContentAPI',[App\Http\Controllers\api\publicContentAPI::class, 'show']);
Route::get('/rotationVectorDataAPI',[App\Http\Controllers\api\rotationVectorDataAPI::class, 'show']);
Route::post('/UploadController',[App\Http\Controllers\UploadController::class, 'upload']);
