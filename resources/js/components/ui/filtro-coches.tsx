import React, { useState } from "react";
import { Button } from "./button";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Checkbox } from "./checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select";
import MultiSelectCheckboxDropdown from "./dropdown-checkboxes";

const FiltroCoches: React.FC = () => {

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

    const [range, setRange] = useState([0, 1000000]);
    const [selectedMarcas, setSelectedMarcas] = useState<string[]>([]);
    const [selectedCombustibles, setSelectedCombustibles] = useState<string[]>([]);
    const [selectedEstados, setSelectedEstados] = useState<string[]>([]);
    const [selectedTipos, setSelectedTipos] = useState<string[]>([]);

    return (

        <form action={route('main.cars.index')} method='GET' className='p-6 flex flex-col flex-1 mx-6 bg-gray-950 rounded-2xl border-2 border-white'>

            <h2 className="pb-2 font-bold text-3xl">Buscador</h2>
            <hr className="border-0.5 border-white mb-4" />

            <div className='flex flex-1 flex-col md:flex-row gap-2'>
                <div className="flex flex-1 flex-col">
                    <h3 className="font-bold">Marca/s</h3>
                    <MultiSelectCheckboxDropdown
                        options={marcas}
                        value={selectedMarcas}
                        onChange={(next) => {
                            console.log(next)
                            setSelectedMarcas(next);

                        }
                        } />
                </div>
                <div className="flex flex-1 flex-col">
                    <h3 className="font-bold">Tipo/s</h3>
                    <MultiSelectCheckboxDropdown
                        options={tipos}
                        value={selectedTipos}
                        onChange={(next) => {
                            console.log(next)
                            setSelectedTipos(next);

                        }
                        } />
                </div>
                <div className="flex flex-1 flex-col">
                    <h3 className="font-bold">Combustible/s</h3>
                    <MultiSelectCheckboxDropdown
                        options={combustibles}
                        value={selectedCombustibles}
                        onChange={(next) => {
                            console.log(next);
                            setSelectedCombustibles(next);
                        }
                        } />
                </div>
                <div className="flex flex-1 flex-col">
                    <h3 className="font-bold">Estado/s</h3>
                    <div className="flex flex-1">
                        <MultiSelectCheckboxDropdown
                            options={estados}
                            value={selectedEstados}
                            onChange={(next) => {
                                console.log(next);
                                setSelectedEstados(next);
                            }} />
                    </div>
                </div>
            </div>
            <hr className="border-0.5 border-white w-full mt-4" />

            <h2 className='mt-4 font-bold'>Precio</h2>
            <div className='my-4 '>
                <RangeSlider
                    min={0}
                    max={1000000}
                    step={1000}
                    defaultValue={[range[0], range[1]]}
                    onInput={setRange} />
            </div>

            <p className='text-center mb-4'>
                {range[0].toLocaleString()} € - {range[1] === 1000000 ? 'Más de ' + range[1].toLocaleString() + ' €' : range[1].toLocaleString() + ' €'}
            </p>

            <hr className="border-0.5 border-white w-full mb-4" />

            {marcas.map((marca) => {
                return (
                    <div key={marca}>
                        <input hidden readOnly type="text" name={marca} id={marca} value={selectedMarcas.includes(marca) ? marca : ""} />
                    </div>
                );
            })}
            {combustibles.map((comb) => {
                return (
                    <div key={comb}>
                        <input hidden readOnly type="text" name={comb} id={comb} value={selectedCombustibles.includes(comb) ? comb : ""} />
                    </div>
                );
            })}
            {estados.map((estado) => {
                return (
                    <div key={estado}>
                        <input hidden readOnly type="text" name={estado} id={estado} value={selectedEstados.includes(estado) ? estado : ""} />
                    </div>
                );
            })}
            {tipos.map((tipo) => {
                return (
                    <div key={tipo}>
                        <input hidden readOnly type="text" name={tipo} id={tipo} value={selectedTipos.includes(tipo) ? tipo : ""} />
                    </div>
                );
            })}
            <input hidden readOnly type="text" name="precio_min" value={range[0]} />
            <input hidden readOnly type="text" name="precio_max" value={range[1]} />

            <div className="my-2 flex justify-center items-center">
                <Button type='submit' size='lg' variant='secondary' className="font-semibold text-xl">Buscar</Button>
            </div>
        </form>

    )
};

export default FiltroCoches;