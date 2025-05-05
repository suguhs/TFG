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
        Schema::create('reservas', function (Blueprint $table) {
            $table->id('reserva_id'); // clave primaria personalizada
            $table->unsignedBigInteger('id_usuario'); // FK hacia usuarios.id_usuario
            $table->foreign('id_usuario')
                  ->references('id_usuario')
                  ->on('usuarios')
                  ->onDelete('cascade');
        
            $table->date('fecha_reserva');
            $table->time('hora_reserva');
            $table->integer('numero_personas');
            $table->decimal('subtotal', 10, 2);
            $table->enum('estado', ['pendiente', 'finalizada', 'cancelada'])->default('pendiente');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
