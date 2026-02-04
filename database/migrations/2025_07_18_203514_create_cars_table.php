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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('marca');
            $table->string('modelo');
            $table->integer('anio');
            $table->integer('kilometraje')->nullable();
            $table->integer('potencia')->nullable();
            $table->integer('cilindrada')->nullable();
            $table->string('combustible')->nullable();
            $table->string('transmision')->nullable();
            $table->string('color')->nullable();
            $table->string('tipo')->nullable();
            $table->string('estado')->nullable();
            $table->string('ubicacion')->nullable();
            $table->text('descripcion')->nullable();
            $table->integer('num_puertas')->nullable();
            $table->integer('num_asientos')->nullable();
            $table->decimal('precio', 10, 2);
            $table->string('imagen')->nullable();
            $table->timestamps();
            $table->bigInteger('propietario')->unsigned()->nullable();
            $table->foreign('propietario')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
