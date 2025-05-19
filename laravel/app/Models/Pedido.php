<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DetallePedido;
use App\Models\Usuario;

class Pedido extends Model
{
    protected $primaryKey = 'id_pedido';

    protected $fillable = ['id_usuario', 'direccion', 'subtotal', 'estado'];

    public function detalles()
    {
        return $this->hasMany(DetallePedido::class, 'pedido_id', 'id_pedido');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }
}
