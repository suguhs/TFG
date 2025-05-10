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
        Schema::create('detalle_reservas', function (Blueprint $table) {
            $table->id(); // BIGINT AUTO_INCREMENT PRIMARY KEY
        
            // Referencia explícita a reservas.reserva_id
            $table->unsignedBigInteger('reserva_id');
            $table->foreign('reserva_id')
                  ->references('reserva_id')
                  ->on('reservas')
                  ->onDelete('cascade');
        
            // Referencia explícita a platos.id_plato
            $table->unsignedBigInteger('plato_id');
            $table->foreign('plato_id')
                  ->references('id_plato')
                  ->on('platos')
                  ->onDelete('restrict');
        
            $table->integer('cantidad');
            $table->decimal('precio', 10, 2); // Precio del plato al momento de la reserva
            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_reservas');
    }
};
