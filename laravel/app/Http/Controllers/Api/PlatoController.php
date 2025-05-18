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
}
