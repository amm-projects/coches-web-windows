import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import Footer from '@/components/ui/footer';

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
  propietario?: string;
}

type Owner = {
  id: number;
  name: string;
  email: string;
}



type Props = {
  car: Car;
  owner: Owner;
  myUser?: User | undefined;
};

const comprar = (car: Car, myUser: User | undefined) => {

  console.log("Usuario intentando comprar:", myUser);

  if (!myUser) {
    alert("Debe iniciar sesión para comprar un coche.");
    router.get(route('login'));
    return;
  }
  else {
    console.log("Saldo del usuario:", myUser.saldo, "Precio del coche:", car.precio);
    if (window.confirm("¿Está seguro de que desea comprar este coche?")) {
      if (Number(myUser.saldo) >= Number(car.precio)) {
        alert("¡Gracias por su compra! Vera su coche en su perfil.");
        console.log("Enviando solicitud de compra para el coche ID:", car.id, "por el usuario ID:", myUser.id);
        router.put(route('main.cars.buy', { car: car.id, user: myUser.id }));
      }
      else {
        alert("No tienes suficiente dinero para comprar este coche (Tu dinero: " + myUser.saldo + "€).");
      }
    }
  }
}


export default function Show({ car, owner, myUser }: Props) {
  console.log("🚗 Mostrando detalles del coche:", car);
  console.log("👤 Propietario del coche:", owner);
  console.log("Mi usuario: ", myUser);
  return (
    <AppLayout>
      <Head title={`Detalles de ${car.marca} ${car.modelo}`} />
      <div className="p-6 flex flex-col w-full gap-4">
        <img src={`/storage/${car.imagen}`} alt={car.modelo} className="object-cover rounded-2xl mb-4" />
        <div className='flex flex-col justify-center items-center text-center gap-12 py-12 px-6 bg-zinc-800 rounded-2xl'>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold">{car.marca} {car.modelo} {car.anio}</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl">{car.precio}€</h3>
          {car.descripcion && (<p className="text-xl md:text-2xl lg:text-3xl">{car.descripcion}</p>)}
          <h3 className='text-3xl md:text-4xl lg:text-5xl'><span className='font-semibold'>Dueño: </span><Link href={route('main.users.show', car.propietario)} className='underline'>{owner ? owner.name : null}</Link></h3>
        </div>

        <div className="my-4 border-2 border-indigo-600 rounded-2xl overflow-hidden shadow">
          <table className="w-full border-collapse">
            <thead className="border-b border-indigo-600">
              <tr className="bg-black dark:bg-white">
                <th className="text-left pl-4 pr-4 py-2 font-semibold border-b text-white dark:text-black border-indigo-600">Característica</th>
                <th className="text-left pl-4 py-2 font-semibold border-b text-white dark:text-black border-indigo-600">Valor</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Kilometraje", value: car.kilometraje, suffix: " km" },
                { label: "Potencia", value: car.potencia, suffix: " CV" },
                { label: "Cilindrada", value: car.cilindrada, suffix: " cc" },
                { label: "Combustible", value: car.combustible },
                { label: "Transmisión", value: car.transmision },
                { label: "Color", value: car.color },
                { label: "Tipo", value: car.tipo },
                { label: "Estado", value: car.estado },
                { label: "Ubicación", value: car.ubicacion },
                { label: "Nº Puertas", value: car.num_puertas },
                { label: "Nº Asientos", value: car.num_asientos },
              ]
                .filter(item => item.value !== undefined && item.value !== null && item.value !== "")
                .map((item, index) => (
                  <tr
                    key={item.label}
                    className={`text-black ${index % 2 === 0 ? "bg-white dark:bg-black" : "bg-gray-200 dark:bg-gray-500"
                      } border-b border-indigo-300`}
                  >
                    <td className="pl-4 pr-4 py-2 border-b border-indigo-300">{item.label}</td>
                    <td className="pl-4 py-2 border-b border-indigo-300">
                      {item.value}
                      {item.suffix || ""}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className='flex gap-4 justify-center items-center'>
          {myUser?.id !== car.propietario && (
            <>
              <Button variant='secondary' className='cursor-pointer' onClick={() => comprar(car, myUser)}>Comprar</Button>
            </>
          )}
          <Button variant='secondary' className='cursor-pointer' onClick={() => window.history.back()}>Volver</Button>
        </div>
      </div>
      <Footer />
    </AppLayout>
  );
}