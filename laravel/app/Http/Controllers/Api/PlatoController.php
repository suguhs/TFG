<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Plato;

class PlatoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nombre_plato' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0'
        ]);

        $plato = Plato::create($request->all());

        return response()->json($plato, 201);
    }
    public function index()
{
    return response()->json(Plato::all(), 200);
}

}
