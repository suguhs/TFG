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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('id_usuario'); // clave primaria personalizada
            $table->string('nombre', 100);
            $table->string('apellidos', 150);
            $table->string('gmail', 150)->unique();
            $table->string('contraseña', 255);
            $table->string('telefono', 20)->nullable();
            $table->enum('rol', ['guest', 'admin'])->default('guest'); // <-- Campo de rol
            $table->timestamps();
        });
        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
