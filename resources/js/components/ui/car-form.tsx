import React, { useState } from 'react';
import MultiSelectCheckboxDropdown from './dropdown-checkboxes';
import SingleSelectDropdown from './single-select-dropdown';
import { stringify } from 'querystring';
import { Button } from './button';
import { Link } from '@inertiajs/react';

type CarFormProps = {
  initialData?: {
    marca?: string;
    modelo?: string;
    anio?: number | string;
    precio?: number | string;
    imagen?: string;
    kilometraje?: number | string;
    potencia?: number | string;
    cilindrada?: number | string;
    combustible?: string;
    transmision?: string;
    color?: string;
    tipo?: string;
    estado?: string;
    ubicacion?: string;
    descripcion?: string;
    num_puertas?: number | string;
    num_asientos?: number | string;
  };
  onSubmit: (data: FormData) => void;
};

export default function CarForm({ initialData = {}, onSubmit }: CarFormProps) {

  const marcas = [
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

  const tipos = [
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

  const combustibles = [
    "Gasolina",
    "Diésel",
    "Híbrido",
    "Híbrido enchufable (PHEV)",
    "Eléctrico (EV)",
    "GLP",
    "GNC",
    "Hidrógeno (FCEV)"
  ];

  const transmisiones = [
    "Manual",
    "Automática (convertidor de par)",
    "CVT",
    "Doble embrague (DCT/DSG)",
    "Manual automatizada (AMT)",
    "Secuencial",
    "Sistemas de tracción (AWD/4x4)"
  ];

  const estados = [
    "Nuevo",
    "KM 0",
    "Seminuevo",
    "Segunda mano",
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

  const [selectedMarca, setSelectedMarca] = useState<string | null>(initialData.marca || '');
  const [modelo, setModelo] = useState(initialData.modelo || '');
  const [anio, setAnio] = useState(initialData.anio || '');
  const [precio, setPrecio] = useState(initialData.precio || '');
  const [kilometraje, setKilometraje] = useState(initialData.kilometraje || '');
  const [potencia, setPotencia] = useState(initialData.potencia || '');
  const [cilindrada, setCilindrada] = useState(initialData.cilindrada || '');
  const [selectedCombustible, setSelectedCombustible] = useState<string | null>(initialData.combustible || '');
  const [selectedTransmision, setSelectedTransmision] = useState<string | null>(initialData.transmision || '');
  const [color, setColor] = useState(initialData.color || '');
  const [selectedTipo, setSelectedTipo] = useState<string | null>(initialData.tipo || '');
  const [selectedEstado, setSelectedEstado] = useState<string | null>(initialData.estado || '');
  const [numPuertas, setNumPuertas] = useState(initialData.num_puertas || '');
  const [numAsientos, setNumAsientos] = useState(initialData.num_asientos || '');
  const [ubicacion, setUbicacion] = useState(initialData.ubicacion || '');
  const [descripcion, setDescripcion] = useState(initialData.descripcion || '');
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagen(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('marca', selectedMarca ? selectedMarca : '');
    formData.append('modelo', modelo);
    formData.append('anio', anio.toString());
    formData.append('precio', precio.toString());
    formData.append('kilometraje', kilometraje.toString());
    formData.append('potencia', potencia.toString());
    formData.append('cilindrada', cilindrada.toString());
    formData.append('combustible', selectedCombustible ? selectedCombustible : '');
    formData.append('transmision', selectedTransmision ? selectedTransmision : '');
    formData.append('color', color);
    formData.append('tipo', selectedTipo ? selectedTipo : '');
    formData.append('estado', selectedEstado ? selectedEstado : '');
    formData.append('ubicacion', ubicacion);
    formData.append('descripcion', descripcion);
    formData.append('num_puertas', numPuertas.toString());
    formData.append('num_asientos', numAsientos.toString());
    if (imagen) formData.append('imagen', imagen);
    onSubmit(formData);
  };

  return (

    <form onSubmit={handleSubmit} className='flex flex-col flex-1'>

      <div className='grid grid-cols-2 gap-4 mb-8'>
        <div className='col-span-2'>
          <label>
            Marca:
            <SingleSelectDropdown
              options={marcas}
              value={initialData.marca || selectedMarca}
              onChange={(next) => {
                console.log(next)
                setSelectedMarca(next);
              }
              } />
            {/*
            <input
              value={selectedMarca ? selectedMarca : ''}
              onChange={e => setMarca(e.target.value)}
              name="marca"
              placeholder="Marca"
              className="border px-2 py-1 rounded w-full bg-white text-black"
            />*/}
          </label>
        </div>

        <div className='col-span-2'>
          <label>
            Modelo:
            <input
              value={modelo}
              onChange={e => setModelo(e.target.value)}
              name="modelo"
              placeholder="Modelo"
              required
              className="border px-2 py-1 rounded w-full bg-white text-black"
            />
          </label>
        </div>

        <label>
          Año:
          <input
            type="number"
            value={anio}
            onChange={e => setAnio(e.target.value)}
            name="anio"
            placeholder="Año"
            required
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />
        </label>


        <label>
          Precio:
          <input
            type="number"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            name="precio"
            placeholder="Precio"
            required
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />
        </label>


        <label>
          Kilometraje:
          <input type="number"
            value={kilometraje}
            onChange={e => setKilometraje(e.target.value)}
            name="kilometraje"
            placeholder="Kilometraje"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />
        </label>

        <label>
          Potencia:
          <input type="number"
            value={potencia}
            onChange={e => setPotencia(e.target.value)}
            name="potencia"
            placeholder="Potencia (CV)"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />
        </label>


        <label>
          Cilindrada:
          <input type="number"
            value={cilindrada}
            onChange={e => setCilindrada(e.target.value)}
            name="cilindrada"
            placeholder="Cilindrada (cc)"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />
        </label>


        <label>
          Combustible:
          <SingleSelectDropdown
            options={combustibles}
            value={initialData.combustible || selectedCombustible}
            onChange={(next) => {
              console.log(next)
              setSelectedCombustible(next);
            }
            } />
          {/*
          <input
            hidden
            value={selectedCombustible ? selectedCombustible : ''}
            onChange={e => setC(e.target.value)}
            name="combustible"
            placeholder="Combustible"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />*/}
        </label>

        <label>
          Transmision:
          <SingleSelectDropdown
            options={transmisiones}
            value={initialData.transmision || selectedTransmision}
            onChange={(next) => {
              console.log(next)
              setSelectedTransmision(next);
            }
            } />
          { /*
          <input
            value={transmision}
            onChange={e => setTransmision(e.target.value)}
            name="transmision"
            placeholder="Transmisión"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />*/}
        </label>

        <label>
          Color:
          <input
            value={color}
            onChange={e => setColor(e.target.value)}
            name="color"
            placeholder="Color"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />
        </label>


        <label>
          Tipo:

          <SingleSelectDropdown
            options={tipos}
            value={initialData.tipo || selectedTipo}
            onChange={(next) => {
              console.log(next)
              setSelectedTipo(next);
            }
            } />
          {/*
          <input
            hidden
            defaultValue={selectedTipo ? selectedTipo : ''}
            name="tipo"
            placeholder="Tipo"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />*/}
        </label>


        <label>
          Estado:
          <SingleSelectDropdown
            options={estados}
            value={initialData.estado || selectedEstado}
            onChange={(next) => {
              console.log(next)
              setSelectedEstado(next);
            }
            } />
          {/*
          <input
            hidden
            defaultValue={selectedEstado ? selectedEstado : ''}
            name="estado"
            placeholder="Estado"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />*/}
        </label>

        <label>
          Nº Puertas:
          <input type="number"
            value={numPuertas}
            onChange={e => setNumPuertas(e.target.value)}
            name="num_puertas"
            placeholder="Número de Puertas"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />
        </label>

        <label>
          Nº Asientos:
          <input type="number"
            value={numAsientos}
            onChange={e => setNumAsientos(e.target.value)}
            name="num_asientos"
            placeholder="Número de Asientos"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />
        </label>

        <div className='col-span-2'>
          <label>
            Ubicación:

            <input
              value={ubicacion}
              onChange={e => setUbicacion(e.target.value)}
              name="ubicacion"
              placeholder="Ubicación"
              className="border px-2 py-1 rounded w-full bg-white text-black"
            />
          </label>
        </div>

      </div>
      <div className='mb-8'>
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            name="descripcion"
            placeholder="Descripción"
            className="border px-2 py-1 rounded w-full bg-white text-black"
          />
        </label>
      </div>
      <label>
        Imagen:

        <input
          type="file"
          accept='image/*'
          onChange={handleFileChange}
          name="imagen"
          value={initialData.imagen ? undefined : ''}
          className="border px-2 py-1 mb-4 rounded w-full bg-white text-black "
        />
      </label>


      {/* Mostrar imagen actual si existe y no hay preview nueva */}
      {!preview && initialData.imagen && (

        <label>
          Vista Previa:
          <img
            src={`/storage/${initialData.imagen}`}
            alt="Imagen actual"
            className='w-full object-cover p-4'
          />
        </label>

      )}

      {/* Mostrar preview de la nueva imagen si se selecciona */}
      {preview && (

        <label>
          Vista Previa:
          <img
            src={preview}
            alt="Preview"
            className='w-full object-cover p-4'
          />
        </label>

      )}
      <div className='flex justify-center items-center gap-4'>
        <Button variant='secondary' type="submit">Guardar</Button>
        <Button type='button' variant='secondary' onClick={() => window.history.back()}>
            Cancelar
        </Button>
      </div>
    </form>
  );
}
