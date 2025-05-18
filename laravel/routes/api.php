<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComentarioController;
use App\Http\Controllers\Api\ReservaController;
use App\Http\Controllers\Api\PlatoController;

// 🔓 Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/comentarios', [ComentarioController::class, 'index']);
Route::get('/platos', [PlatoController::class, 'index']); // Menú

// 🔐 Rutas protegidas por autenticación con Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Comentarios
    Route::post('/comentarios', [ComentarioController::class, 'store']);
    Route::delete('/comentarios/{id}', [ComentarioController::class, 'destroy']);

    // Reservas
    Route::post('/reservas', [ReservaController::class, 'store']);
    Route::post('/reservas/{id}/platos', [ReservaController::class, 'añadirPlatos']);
    Route::get('/historial', [ReservaController::class, 'historialUsuario']);
    Route::get('/mesas-disponibles', [ReservaController::class, 'mesasDisponibles']);
    Route::get('/historial-todas', [ReservaController::class, 'historialTodas']);
    Route::post('/reservas/{id}/estado', [ReservaController::class, 'cambiarEstado']);

    // Platos
    Route::post('/platos', [PlatoController::class, 'store']);

    // 🔍 Ruta de prueba para verificar autenticación
    Route::get('/usuario-autenticado', function (Request $request) {
        return response()->json([
            'message' => 'Usuario autenticado correctamente',
            'usuario' => $request->user()
        ]);
    });
});
