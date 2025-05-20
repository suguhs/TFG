<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pedido;

class PedidoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'id_usuario' => 'required|exists:usuarios,id_usuario',
            'direccion' => 'required|string|max:255',
            'platos' => 'required|array|min:1',
            'platos.*.plato_id' => 'required|exists:platos,id_plato',
            'platos.*.cantidad' => 'required|integer|min:1',
            'platos.*.precio' => 'required|numeric|min:0'
        ]);

        $subtotal = collect($request->platos)
            ->sum(fn($p) => $p['cantidad'] * $p['precio']);

        $pedido = Pedido::create([
            'id_usuario' => $request->id_usuario,
            'direccion' => $request->direccion,
            'subtotal' => $subtotal,
            'estado' => 'pendiente'
        ]);

        foreach ($request->platos as $plato) {
            $pedido->detalles()->create([
                'plato_id' => $plato['plato_id'],
                'cantidad' => $plato['cantidad'],
                'precio' => $plato['precio']
            ]);
        }

        return response()->json(['message' => '✅ Pedido guardado correctamente'], 201);
    }

    public function index()
    {
        $pedidos = Pedido::with(['detalles.plato', 'usuario'])->latest()->get();
        return response()->json($pedidos);
    }

    public function show($id)
    {
        $pedido = Pedido::with(['detalles.plato', 'usuario'])->findOrFail($id);
        return response()->json($pedido);
    }

    public function updateEstado(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:pendiente,preparando,enviado,entregado,cancelado'
        ]);

        $pedido = Pedido::findOrFail($id);
        $pedido->estado = $request->estado;
        $pedido->save();

        return response()->json(['message' => 'Estado del pedido actualizado']);
    }
}
