<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Pedido;
use App\Models\Plato;

class DetallePedido extends Model
{
    protected $table = 'detalle_pedidos'; // nombre de la tabla
    protected $fillable = ['pedido_id', 'plato_id', 'cantidad', 'precio'];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'pedido_id', 'id_pedido');
    }

    public function plato()
    {
        return $this->belongsTo(Plato::class, 'plato_id', 'id_plato');
    }
}
