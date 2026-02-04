import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import CarForm from "@/components/ui/car-form";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";

type Car = {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  imagen: string;
  kilometraje?: number;
  potencia?: number;
  cilindrada?: number;
  combustible?: string;
  transmision?: string;
  color?: string;
  tipo?: string;
  estado?: string;
  ubicacion?: string;
  descripcion?: string;
  num_puertas?: number;
  num_asientos?: number;
  favorito?: boolean;
};

type Props = {
  car: Car;
};

export default function Edit({ car }: Props) {
  const { processing, post } = useForm();

  const handleSubmit = (formData: FormData) => {
    formData.append("_method", "PUT"); // o "PATCH" si prefieres
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
    router.post(route("main.cars.update", car.id), formData, {
      forceFormData: true, // muy importante para archivos
      preserveScroll: true,
    });
  };

  return (
    <AppLayout>
      <Head title={`Editar ${car.marca} ${car.modelo}`} />
      <div className="flex flex-col flex-1">
        <h1 className="flex lg:text-2xl md:text-xl sm:text-lg font-semibold mt-6 justify-center">Añadir Coche</h1>
        <div className='flex flex-1 p-6'>
          <CarForm
            key={car.id}
            initialData={{
              /*id: undefined,*/
              marca: car.marca,
              modelo: car.modelo,
              anio: car.anio,
              precio: car.precio,
              imagen: car.imagen, // 👈 asegúrate de que Laravel te pase Storage::url($car->imagen)
              kilometraje: car.kilometraje,
              potencia: car.potencia,
              cilindrada: car.cilindrada,
              combustible: car.combustible,
              transmision: car.transmision,
              color: car.color,
              tipo: car.tipo,
              estado: car.estado,
              ubicacion: car.ubicacion,
              descripcion: car.descripcion,
              num_puertas: car.num_puertas,
              num_asientos: car.num_asientos,

            }}
            onSubmit={handleSubmit}
          />
        </div>
        <Footer />
      </div>
    </AppLayout>
  );
}
