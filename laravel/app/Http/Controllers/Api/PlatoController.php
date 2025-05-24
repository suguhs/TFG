<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Plato;

class PlatoController extends Controller
{
    public function index()
    {
        return response()->json(Plato::all(), 200);
    }

    public function store(Request $request)
    {
        // Opción: validación por rol si usas autenticación con roles
        if ($request->user() && $request->user()->rol !== 'admin') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $request->validate([
            'nombre_plato' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0'
        ]);

        $plato = Plato::create($request->only(['nombre_plato', 'descripcion', 'precio']));
        return response()->json($plato, 201);
    }

public function update(Request $request, $id)
{
    try {
        if ($request->user() && $request->user()->rol !== 'admin') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $request->validate([
            'nombre_plato' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'imagen' => 'nullable|string' // AÑADIDO para evitar error si llega este campo
        ]);

        $plato = Plato::findOrFail($id);
        $plato->update($request->only(['nombre_plato', 'descripcion', 'precio', 'imagen']));

        return response()->json($plato, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


public function destroy($id)
{
    $plato = Plato::findOrFail($id);
    $plato->delete();

    return response()->json(['mensaje' => 'Plato eliminado correctamente'], 200);
}

}
