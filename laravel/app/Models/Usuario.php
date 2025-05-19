<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';
    public $timestamps = true;

    protected $fillable = [
        'nombre',
        'apellidos',
        'gmail',
        'contraseña',
        'telefono',
        'rol'
    ];

    protected $hidden = [
        'contraseña',
        'remember_token'
    ];

    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'id_usuario', 'id_usuario');
    }

    public function comentarios()
    {
        return $this->hasMany(Comentario::class, 'usuario_id', 'id_usuario');
    }
}
