<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Plato extends Model
{
    use HasFactory;

    protected $table = 'platos';
    protected $primaryKey = 'id_plato';
    public $timestamps = true;

    protected $fillable = [
        'nombre_plato', 'descripcion', 'precio','imagen'
        // añade más si tienes
    ];

    public function detalles()
    {
        return $this->hasMany(DetalleReserva::class, 'plato_id', 'id_plato');
    }
}

