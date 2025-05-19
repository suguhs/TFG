<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Reserva;

class ReservaController extends Controller
{
    const MESAS_TOTALES = 10;
    const PERSONAS_POR_MESA = 4;

    public function store(Request $request)
    {
        $request->validate([
            'id_usuario' => 'required|exists:usuarios,id_usuario',
            'fecha_reserva' => 'required|date|after_or_equal:today',
            'hora_reserva' => 'required|date_format:H:i',
            'numero_personas' => 'required|integer|min:1|max:20'
        ]);

        $mesasNecesarias = ceil($request->numero_personas / self::PERSONAS_POR_MESA);

        $mesasOcupadas = Reserva::where('fecha_reserva', $request->fecha_reserva)
            ->get()
            ->sum(fn($reserva) => ceil($reserva->numero_personas / self::PERSONAS_POR_MESA));

        if ($mesasOcupadas + $mesasNecesarias > self::MESAS_TOTALES) {
            return response()->json(['message' => 'No hay suficientes mesas disponibles.'], 400);
        }

        $reserva = Reserva::create([
            'id_usuario' => $request->id_usuario,
            'fecha_reserva' => $request->fecha_reserva,
            'hora_reserva' => $request->hora_reserva,
            'numero_personas' => $request->numero_personas,
            'subtotal' => 0,
            'estado' => 'pendiente'
        ]);

        return response()->json([
            'message' => 'Reserva creada correctamente',
            'reserva' => $reserva
        ], 201);
    }

    public function añadirPlatos(Request $request, $id)
    {
        $reserva = Reserva::findOrFail($id);
        $usuario = Auth::user();

        // Protección: solo el dueño de la reserva o el admin pueden modificarla
        if ($usuario->id_usuario !== $reserva->id_usuario && $usuario->rol !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $request->validate([
            'platos' => 'required|array|min:1',
            'platos.*.plato_id' => 'required|exists:platos,id_plato',
            'platos.*.cantidad' => 'required|integer|min:1',
            'platos.*.precio' => 'required|numeric|min:0'
        ]);

        foreach ($request->platos as $plato) {
            $reserva->detalles()->create([
                'plato_id' => $plato['plato_id'],
                'cantidad' => $plato['cantidad'],
                'precio' => $plato['precio']
            ]);
        }

        $subtotal = collect($request->platos)
            ->sum(fn($p) => $p['cantidad'] * $p['precio']);

        $reserva->update(['subtotal' => $subtotal]);

        return response()->json(['message' => 'Platos añadidos y subtotal actualizado'], 200);
    }

    public function historialUsuario()
    {
        $usuario = Auth::user();

        $reservas = Reserva::with(['detalles.plato'])
            ->where('id_usuario', $usuario->id_usuario)
            ->orderByDesc('fecha_reserva')
            ->get();

        return response()->json($reservas);
    }

    public function historialTodas()
    {
        $reservas = Reserva::with(['detalles.plato', 'usuario'])
            ->orderByDesc('fecha_reserva')
            ->get();

        return response()->json($reservas);
    }

    public function cambiarEstado(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:pendiente,aceptada,rechazada,finalizada,cancelada'
        ]);

        $reserva = Reserva::findOrFail($id);
        $reserva->estado = $request->estado;
        $reserva->save();

        return response()->json(['message' => 'Estado actualizado'], 200);
    }

    public function mesasDisponibles(Request $request)
    {
        $fecha = $request->query('fecha');
        if (!$fecha) {
            return response()->json(['message' => 'Fecha requerida'], 400);
        }

        $mesasOcupadas = Reserva::where('fecha_reserva', $fecha)
            ->get()
            ->sum(fn($r) => ceil($r->numero_personas / self::PERSONAS_POR_MESA));

        $disponibles = self::MESAS_TOTALES - $mesasOcupadas;

        return response()->json(['mesas_disponibles' => max(0, $disponibles)]);
    }
}
