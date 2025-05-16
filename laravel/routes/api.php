<?php
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ComentarioController;
use App\Http\Controllers\Api\ReservaController;
use App\Http\Controllers\Api\PlatoController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/comentarios', [ComentarioController::class, 'store']);
Route::get('/comentarios', [ComentarioController::class, 'index']);
Route::delete('/comentarios/{id}', [ComentarioController::class, 'destroy']);
Route::post('/reservas', [ReservaController::class, 'store']);
Route::post('/platos', [PlatoController::class, 'store']);
Route::get('/platos', [PlatoController::class, 'index']); 
Route::post('/reservas', [ReservaController::class, 'store']);
Route::post('/reservas/{id}/platos', [ReservaController::class, 'añadirPlatos']);
Route::get('/platos', [PlatoController::class, 'index']);
Route::get('/historial', [ReservaController::class, 'historialUsuario']);
Route::get('/mesas-disponibles', [ReservaController::class, 'mesasDisponibles']);







