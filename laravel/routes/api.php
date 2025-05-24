<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComentarioController;
use App\Http\Controllers\Api\ReservaController;
use App\Http\Controllers\Api\PlatoController;
use App\Http\Controllers\Api\PedidoController;

// 🔓 Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/comentarios', [ComentarioController::class, 'index']);
Route::get('/platos', [PlatoController::class, 'index']); // Menú público

// 🔐 Rutas protegidas por Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Comentarios
    Route::post('/comentarios', [ComentarioController::class, 'store']);
    Route::delete('/comentarios/{id}', [ComentarioController::class, 'destroy']);

    // Reservas
    Route::post('/reservas', [ReservaController::class, 'store']);
    Route::post('/reservas/{id}/platos', [ReservaController::class, 'añadirPlatos']);
    Route::get('/historial', [ReservaController::class, 'historialUsuario']);
    Route::get('/historial-todas', [ReservaController::class, 'historialTodas']);
    Route::post('/reservas/{id}/estado', [ReservaController::class, 'cambiarEstado']);
    Route::get('/mesas-disponibles', [ReservaController::class, 'mesasDisponibles']);

    // Platos (CRUD)
    Route::post('/platos', [PlatoController::class, 'store']);
    Route::put('/platos/{id}', [PlatoController::class, 'update']);
    Route::delete('/platos/{id}', [PlatoController::class, 'destroy']);

    // Pedidos
    Route::post('/pedidos', [PedidoController::class, 'store']);
    Route::get('/pedidos', [PedidoController::class, 'index']);
    Route::get('/pedidos/{id}', [PedidoController::class, 'show']);
    Route::post('/pedidos/{id}/estado', [PedidoController::class, 'updateEstado']);

    // Ruta de prueba
    Route::get('/usuario-autenticado', function (Request $request) {
        return response()->json([
            'message' => 'Usuario autenticado correctamente',
            'usuario' => $request->user()
        ]);
    });
});
