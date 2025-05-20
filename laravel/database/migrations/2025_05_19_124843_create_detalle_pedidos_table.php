<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detalle_pedidos', function (Blueprint $table) {
         $table->id();
         $table->unsignedBigInteger('pedido_id');
         $table->unsignedBigInteger('plato_id');
         $table->integer('cantidad');
         $table->decimal('precio', 8, 2);
         $table->timestamps();

    $table->foreign('pedido_id')->references('id_pedido')->on('pedidos')->onDelete('cascade');
    $table->foreign('plato_id')->references('id_plato')->on('platos')->onDelete('cascade');
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_pedidos');
    }
};
