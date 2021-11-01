<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [App\Http\Controllers\TopController::class, 'show']);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/sign',[App\Http\Controllers\LoginController::class, 'show']);
Route::post('/signUp',[App\Http\Controllers\LoginProcessController::class, 'show']);
Route::get('/main', [App\Http\Controllers\MainController::class, 'show']);
Route::post('/upload', [App\Http\Controllers\UploadController::class, 'upload']);
Route::get('/AR',[App\Http\Controllers\ARController::class, 'show']);
Route::get('/addFile', [App\Http\Controllers\addFileController::class, 'show']);
Route::get('/users', function (Request $request) {
    $users = User::paginate(10);
    return $users;
});
