<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DetalleReserva extends Model
{
    use HasFactory;

    protected $table = 'detalle_reservas';
    protected $primaryKey = 'id'; // Es el campo auto generado por $table->id()

    public $timestamps = true;

    protected $fillable = [
        'reserva_id', 'plato_id', 'cantidad', 'precio'
    ];

    public function reserva()
    {
        return $this->belongsTo(Reserva::class, 'reserva_id', 'reserva_id');
    }

    public function plato()
    {
        return $this->belongsTo(Plato::class, 'plato_id', 'id_plato');
    }
}

