<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComentarioController;
use App\Http\Controllers\Api\ReservaController;
use App\Http\Controllers\Api\PlatoController;

// 🔓 Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/comentarios', [ComentarioController::class, 'index']);
Route::get('/platos', [PlatoController::class, 'index']); // <-- esta es la que usa el menú

// 🔐 Rutas protegidas por login (opcional)
Route::post('/comentarios', [ComentarioController::class, 'store']);
Route::delete('/comentarios/{id}', [ComentarioController::class, 'destroy']);
Route::post('/reservas', [ReservaController::class, 'store']);
Route::post('/reservas/{id}/platos', [ReservaController::class, 'añadirPlatos']);
Route::post('/platos', [PlatoController::class, 'store']);
Route::get('/historial', [ReservaController::class, 'historialUsuario']);
Route::get('/mesas-disponibles', [ReservaController::class, 'mesasDisponibles']);









