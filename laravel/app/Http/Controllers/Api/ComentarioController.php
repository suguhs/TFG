<?php


    namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comentario;

class ComentarioController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id_usuario',
            'contenido' => 'required|string|max:1000'
        ]);

        $comentario = Comentario::create([
            'usuario_id' => $request->usuario_id,
            'contenido' => $request->contenido
        ]);

        return response()->json([
            'message' => 'Comentario creado',
            'comentario' => $comentario->load('usuario')
        ], 201);
    }

    public function index()
    {
        return Comentario::with('usuario')->latest()->get();
    }

    public function destroy($id)
{
    $comentario = Comentario::findOrFail($id);
    $comentario->delete();

    return response()->json(['message' => 'Comentario eliminado']);
}

}


