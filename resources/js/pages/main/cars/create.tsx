import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import CarForm from '@/components/ui/car-form';
import Footer from '@/components/ui/footer';
import { SharedData } from '@/types';

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

export default function Create({ car }: Props) {
  const page = usePage<SharedData>();
  const { auth } = page.props;
  const { post } = useForm({
    marca: '',
    modelo: '',
    anio: '',
    precio: '',
    imagen: '',
  });

  // Maneja el envío del formulario

  const handleSubmit = (formData: FormData) => {
    formData.append("propietario", String(auth.user?.id ?? ''));
    formData.append("_method", "POST");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
    router.post(route('main.cars.store'), formData, {
      forceFormData: true, // muy importante para archivos
      preserveScroll: true,
      onSuccess: () => console.log('Coche creado correctamente'),
      onError: (errors) => console.error('Error al crear el coche:', errors),
    });
  };

  if (auth.user) {
    console.log("Usuario autenticado:", auth.user);
    return (
      <AppLayout>
        <Head title="Añadir Coche" />
        <div className="flex flex-col flex-1">
          <h1 className="flex lg:text-2xl md:text-xl sm:text-lg font-semibold mt-6 justify-center">Añadir Coche</h1>
            <div className='flex flex-1 p-6'>
            <CarForm
              /*key={car.id}*/
              initialData={{
                /*id: undefined,*/
                marca: '',
                modelo: '',
                anio: undefined,
                precio: undefined,
                kilometraje: undefined,
                potencia: undefined,
                cilindrada: undefined,
                combustible: '',
                transmision: '',
                color: '',
                tipo: '',
                estado: '',
                ubicacion: '',
                descripcion: '',
                num_puertas: undefined,
                num_asientos: undefined,
                imagen: '' // 👈 asegúrate de que Laravel te pase Storage::url($car->imagen)

              }}
              onSubmit={handleSubmit}
            />
            </div>
          <Footer />
        </div>
      </AppLayout>
    );
  } else {
    router.visit(route('login'));
    return null;
  }
}
