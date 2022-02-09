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
Route::post('/contentDeleteAPI',[App\Http\Controllers\api\contentDeleteAPI::class, 'delete']);
Route::post('/contentEditAPI',[App\Http\Controllers\api\contentEditAPI::class, 'edit']);
Route::post('/contentInfoAPI',[App\Http\Controllers\api\contentInfoAPI::class, 'search']);
Route::post('/editContentInfoAPI',[App\Http\Controllers\api\editContentInfoAPI::class, 'edit']);
Route::post('/addPhotoDataAPI',[App\Http\Controllers\api\addPhotoDataAPI::class,'add']);
Route::get('/getTagAPI',[App\Http\Controllers\api\getTagAPI::class,'get']);
Route::post('/getSearchContentAPI',[App\Http\Controllers\api\getSearchContentAPI::class,'get']);

Route::post('/getSaveNameRelationTagNameAPI',[App\Http\Controllers\api\getSaveNameRelationTagNameAPI::class,'get']);
Route::post('/editContentAndTagAPI',[App\Http\Controllers\api\editContentAndTagAPI::class,'edit']);
Route::post('/addContentInfoAPI',[App\Http\Controllers\api\addContentInfoAPI::class,'add']);
Route::post('/getContentByContentAPI',[App\Http\Controllers\api\getContentByContentAPI::class,'get']);
Route::post('/getContentByUserAPI',[App\Http\Controllers\api\getContentByUserAPI::class,'get']);
Route::post('/getUserContentByTagAPI',[App\Http\Controllers\api\getUserContentByTagAPI::class,'get']);
Route::post('/getUserContentByContentAPI',[App\Http\Controllers\api\getUserContentByContentAPI::class,'get']);
Route::post('/editTagAPI',[App\Http\Controllers\api\editTagAPI::class,'edit']);
