<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Car;
use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Type\Integer;

class CarController extends Controller
{
    public function index(Request $request)
    {
        $marcas = [
            // Estados Unidos
            "Ford",
            "Chevrolet",
            "Tesla",
            "GMC",
            "Cadillac",
            "Dodge",
            "Jeep",
            "Ram",
            "Lincoln",
            "Buick",
            "Chrysler",

            // Alemania
            "Volkswagen",
            "Audi",
            "BMW",
            "Mercedes-Benz",
            "Porsche",
            "Opel",
            "Smart",
            "Maybach",

            // Japón
            "Toyota",
            "Honda",
            "Nissan",
            "Mazda",
            "Subaru",
            "Mitsubishi",
            "Suzuki",
            "Lexus",
            "Infiniti",
            "Acura",
            "Daihatsu",

            // Corea del Sur
            "Hyundai",
            "Kia",
            "Genesis",

            // Italia
            "Fiat",
            "Alfa Romeo",
            "Lancia",
            "Ferrari",
            "Lamborghini",
            "Maserati",
            "Abarth",
            "Pagani",

            // Francia
            "Renault",
            "Peugeot",
            "Citroën",
            "DS Automobiles",
            "Bugatti",

            // Reino Unido
            "Jaguar",
            "Land Rover",
            "Aston Martin",
            "Bentley",
            "Rolls-Royce",
            "McLaren",
            "Mini",
            "Lotus",
            "MG",

            // Suecia
            "Volvo",
            "Saab",
            "Koenigsegg",
            "Polestar",

            // China
            "BYD",
            "Geely",
            "Nio",
            "Xpeng",
            "Great Wall",
            "Haval",
            "Changan",
            "Hongqi",
            "Zeekr",
            "Lynk & Co",

            // India
            "Tata",
            "Mahindra",
            "Maruti Suzuki",

            // España
            "SEAT",
            "CUPRA",
            "Hispano Suiza",

            // Otros países
            "Skoda",
            "Dacia",
            "Rimac",
            "Togg",
            "Proton",
            "Perodua",
            "VinFast"
        ];
        $combustibles = [
            "Gasolina",
            "Diésel",
            "Híbrido",
            "Híbrido enchufable (PHEV)",
            "Eléctrico (EV)",
            "GLP",
            "GNC",
            "Hidrógeno (FCEV)"
        ];

        $estados = [
            "Nuevo",
            "KM 0",
            "Seminuevo",
            "De segunda mano / Usado",
            "Certificado (CPO - Certified Pre-Owned)",
            "De demostración (Demo)",
            "Reacondicionado / Restaurado",
            "Clásico",
            "De colección",
            "Accidentado",
            "Averiado / No operativo",
            "Para despiece",
            "Salvamento / Siniestrado (Salvage)",
            "Importado",
            "Vehículo de renting",
            "Vehículo de leasing",
            "Vehículo de empresa / flota",
            "Vehículo ex-rental (de alquiler)",
            "Vehículo embargado / subasta"
        ];

        $tipos = [
            // Por tipo de carrocería
            "Sedán",
            "Hatchback",
            "SUV",
            "Crossover",
            "Coupé",
            "Convertible / Cabrio",
            "Roadster",
            "Familiar / Station Wagon",
            "Monovolumen / MPV",
            "Pick-up",
            "Van",
            "Microcoche",

            // Por tamaño o segmento
            "Segmento A (urbanos)",
            "Segmento B (utilitarios)",
            "Segmento C (compactos)",
            "Segmento D (berlinas medianas)",
            "Segmento E (berlinas grandes)",
            "Segmento F (lujo)",
            "Segmento J (SUV)",

            // Por uso
            "Deportivo",
            "Superdeportivo",
            "Todoterreno 4x4",
            "Comercial ligero",
            "Camper",
            "Coche de lujo",
            "Coche económico"
        ];

        $reglas = [];

        foreach ($marcas as $marca) {
            $marca = str_replace(" ", "_", $marca);
            $reglas[$marca] = 'nullable|string';
        }

        foreach ($combustibles as $combustible) {
            $combustible = str_replace(" ", "_", $combustible);
            $reglas[$combustible] = 'nullable|string';
        }
        foreach ($estados as $estado) {
            $estado = str_replace(" ", "_", $estado);
            $reglas[$estado] = 'nullable|string';
        }

        foreach ($tipos as $tipo) {
            $tipo = str_replace(" ", "_", $tipo);
            $reglas[$tipo] = 'nullable|string';
        }

        $reglas['precio_min'] = 'nullable|integer';
        $reglas['precio_max'] = 'nullable|integer';


        $validated = $request->validate($reglas);
        //$validated = $request->all();

        $opciones_marcas = '" "';

        foreach ($marcas as $marca) {
            $marca = str_replace(" ", "_", $marca);
            if (isset($validated[$marca])) {
                $marca = str_replace("_", " ", $marca);
                $opciones_marcas = $opciones_marcas . ' OR marca = "' . $marca . '"';
            }
        }

        if ($opciones_marcas === '" "') {
            $opciones_marcas = 'marca';
        }

        $opciones_combustibles = '" "';

        foreach ($combustibles as $combustible) {
            $combustible = str_replace(" ", "_", $combustible);
            if (isset($validated[$combustible])) {
                $combustible = str_replace("_", " ", $combustible);
                $opciones_combustibles = $opciones_combustibles . ' OR combustible = "' . $combustible . '"';
            }
        }

        if ($opciones_combustibles === '" "') {
            $opciones_combustibles = 'combustible';
        }


        $opciones_estados = '" "';

        foreach ($estados as $estado) {
            $estado = str_replace(" ", "_", $estado);
            if (isset($validated[$estado])) {
                $estado = str_replace("_", " ", $estado);
                $opciones_estados = $opciones_estados . ' OR estado = "' . $estado . '"';
            }
        }

        if ($opciones_estados === '" "') {
            $opciones_estados = 'estado';
        }

        $opciones_tipos = '" "';

        foreach ($tipos as $tipo) {
            $tipo = str_replace(" ", "_", $tipo);
            if (isset($validated[$tipo])) {
                $tipo = str_replace("_", " ", $tipo);
                $opciones_tipos = $opciones_tipos . ' OR tipo = "' . $tipo . '"';
            }
        }

        if ($opciones_tipos === '" "') {
            $opciones_tipos = 'tipo';
        }

        $opcion_precio_min = '" "';

        if (isset($validated['precio_min'])) {
            $opcion_precio_min = $validated['precio_min'];
        }

        $opcion_precio_max = '" "';

        if (isset($validated['precio_max'])) {
            $opcion_precio_max = $validated['precio_max'];
        }

        if (count($validated) === 0) {
            $sentencia = "SELECT * FROM cars";
        } else {

            $sentencia = 'SELECT * FROM cars 
        WHERE (marca = ' . $opciones_marcas
                . ') AND (combustible = ' . $opciones_combustibles
                . ') AND (estado = ' . $opciones_estados
                . ') AND (tipo = ' . $opciones_tipos
                . ') AND (precio > ' . $opcion_precio_min
                . ') AND (precio < ' . $opcion_precio_max . ');';
        }

        $cars = DB::select($sentencia);

        return Inertia::render('main/cars/index', [
            'cars' => $cars,
            'filters' => $validated
        ]);
    }

    public function create()
    {
        return Inertia::render('main/cars/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'marca' => 'required|string',
            'modelo' => 'required|string',
            'anio' => 'required|integer',
            'precio' => 'required|numeric',
            'kilometraje' => 'required|integer',
            'potencia' => 'required|integer',
            'cilindrada' => 'required|integer',
            'combustible' => 'required|string',
            'transmision' => 'required|string',
            'color' => 'required|string',
            'tipo' => 'required|string',
            'estado' => 'required|string',
            'ubicacion' => 'required|string',
            'descripcion' => 'nullable|string',
            'num_puertas' => 'required|integer',
            'num_asientos' => 'required|integer',
            'imagen' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'propietario' => 'required|integer',
        ]);

        if ($request->hasFile('imagen')) {
            $validated['imagen'] = $request->file('imagen')->store('images/cars', 'public');
            //$filename = uniqid() . '.' . $file->getClientOriginalExtension(); // nombre original
            //$path = $file->storeAs('images/cars', $filename, 'public');
            //$path = $file->store('images/cars', 'public');
            //= $path;
        }

        Car::create($validated);
        return redirect()->route('main.cars.index')->with('success', 'Coche creado correctamente');
    }

    public function show(Car $car)
    {
        $owner = DB::select('SELECT users.id, name, email FROM users JOIN cars ON cars.propietario = users.id WHERE cars.propietario =' . $car->propietario . ';');
        $myUser = request()->user();

        return Inertia::render('main/cars/show', [
            'car' => $car,
            'owner' => $owner[0],
            'myUser' => $myUser
        ]);
    }

    public function edit(Car $car)
    {
        return Inertia::render('main/cars/edit', ['car' => $car]);
    }

    public function update(Request $request, Car $car)
    {
        $myUser = request()->user();
        $owner = DB::select('SELECT users.id, name, email FROM users JOIN cars ON cars.propietario = users.id WHERE cars.propietario =' . $car->propietario . ';');

        $data = $request->validate([
            'marca' => 'required|string',
            'modelo' => 'required|string',
            'anio' => 'required|integer',
            'precio' => 'required|numeric',
            'kilometraje' => 'required|integer',
            'potencia' => 'required|integer',
            'cilindrada' => 'required|integer',
            'combustible' => 'required|string',
            'transmision' => 'required|string',
            'color' => 'required|string',
            'tipo' => 'required|string',
            'estado' => 'required|string',
            'ubicacion' => 'required|string',
            'descripcion' => 'nullable|string',
            'num_puertas' => 'required|integer',
            'num_asientos' => 'required|integer',
            'imagen' => 'nullable|image|max:2048',
        ]);


        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $filename = $file->getClientOriginalName(); // nombre original
            $path = $file->storeAs('images/cars', $filename, 'public');
            $data['imagen'] = $path;
        }

        $car->update($data);
        /*return Inertia::render('main/users/show', [
            'car' => $car,
            'owner' => $owner[0],
            'myUser' => $myUser
        ]);*/
        return redirect()->route('main.users.show', $myUser->id)->with('success', 'Se edito el coche correctamente.');
    }

    public function destroy(Car $car)
    {
        // Eliminar la imagen si existe
        if ($car->imagen && Storage::disk('public')->exists($car->imagen)) {
            Storage::disk('public')->delete($car->imagen);
        }
        //$car = Car::findOrFail($id);
        $car->delete();

        return redirect()->back()->with('success', 'Coche eliminado correctamente.');
    }

    public function buy(Car $car, User $user)
    {
        if ($user->saldo < $car->precio) {
            return back()->withErrors([
                'saldo' => 'No tienes saldo suficiente para comprar este coche.',
            ]);
        }
        DB::select("UPDATE users SET users.saldo = users.saldo + " . $car->precio . " WHERE users.id = " . $car->propietario . ";");
        DB::select("UPDATE cars SET cars.propietario = " . $user->id . " WHERE cars.id = " . $car->id . ";");
        DB::select("UPDATE users SET users.saldo = users.saldo - " . $car->precio . " WHERE users.id = " . $user->id . ";");

        // Evitar que un usuario compre su propio coche

        if ($car->propietario == $user->id) {
            return redirect()->back()->with('error', 'No puedes comprar tu propio coche.');
        }

        return redirect()->route('main.users.show', $user->id)->with('success', 'Coche comprado correctamente.');
    }
}
