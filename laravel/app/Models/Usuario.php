<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Usuario extends Model
{
    use HasFactory;

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

    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'id_usuario', 'id_usuario');
    }

    public function comentarios()
    {
        return $this->hasMany(Comentario::class, 'usuario_id', 'id_usuario');
    }
}
