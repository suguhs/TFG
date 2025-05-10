<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reserva extends Model
{
    use HasFactory;

    protected $table = 'reservas';
    protected $primaryKey = 'reserva_id';
    public $timestamps = true;

    protected $fillable = [
        'id_usuario',
        'fecha_reserva',
        'hora_reserva',
        'numero_personas',
        'subtotal',
        'estado'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }

    public function detalles()
    {
        return $this->hasMany(DetalleReserva::class, 'reserva_id', 'reserva_id');
    }
}
