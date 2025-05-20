<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('pedidos', function (Blueprint $table) {
        $table->id('id_pedido');
        $table->unsignedBigInteger('id_usuario');
        $table->text('direccion');
        $table->decimal('subtotal', 8, 2);
        $table->string('estado')->default('pendiente');
        $table->timestamps();

        $table->foreign('id_usuario')->references('id_usuario')->on('usuarios')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
