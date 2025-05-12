<?php
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ComentarioController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/comentarios', [ComentarioController::class, 'store']);
Route::get('/comentarios', [ComentarioController::class, 'index']);
Route::delete('/comentarios/{id}', [ComentarioController::class, 'destroy']);


