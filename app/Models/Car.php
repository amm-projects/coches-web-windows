<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'marca',
        'modelo',
        'anio',
        'kilometraje',
        'potencia',
        'cilindrada',
        'combustible',
        'transmision',
        'color',
        'tipo',
        'estado',
        'ubicacion',
        'descripcion',
        'num_puertas',
        'num_asientos',
        'precio',
        'imagen',
        'propietario',
    ];
}
