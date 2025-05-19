<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100',
            'apellidos' => 'required|string|max:150',
            'gmail' => 'required|email|unique:usuarios,gmail',
            'contraseña' => 'required|string|min:6',
            'telefono' => 'nullable|string|max:20',
            'rol' => 'in:guest,admin'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $usuario = Usuario::create([
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'gmail' => $request->gmail,
            'contraseña' => Hash::make($request->contraseña),
            'telefono' => $request->telefono,
            'rol' => $request->rol ?? 'guest'
        ]);

        // Crear token tras el registro
        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario' => $usuario
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'gmail' => 'required|email',
            'contraseña' => 'required|string'
        ]);

        $usuario = Usuario::where('gmail', $request->gmail)->first();

        if (!$usuario || !Hash::check($request->contraseña, $usuario->contraseña)) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario' => $usuario
        ]);
    }

    public function checkEmail(Request $request)
    {
        $request->validate([
            'gmail' => 'required|email'
        ]);

        $exists = Usuario::where('gmail', $request->gmail)->exists();

        return response()->json(['exists' => $exists]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
}
