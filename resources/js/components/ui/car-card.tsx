import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { User } from '@/types';
import { Button } from './button';

type Car = {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  imagen: string;
  favorito?: boolean;
};

type Props = {
  car: Car;
  myUser?: User;
  onDelete?: (id: number) => void;
  onToggleFavorite?: (id: number) => void;
};

export default function CarCard({ car, myUser, onDelete, onToggleFavorite }: Props) {

  const url = usePage().url;
  console.log("URL actual:", url)
  const userId = url.split('/').pop();
  console.log("UserID de la URL:", userId)

  console.log("MyUserID:", myUser?.id)

  return (
    <div className="border-black rounded p-4 flex flex-col md:flex-row gap-4 items-center">
      <Link href={route('main.cars.show', car.id)} className='flex flex-1 flex-col md:flex-row gap-4 items-center'>
        <img src={`/storage/${car.imagen}`} alt={car.modelo} className="w-92 h-60 object-cover rounded-xl border border-white" />
        <div className="flex-1 text-center bg-black text-white hover:bg-gray-500 rounded-lg p-4 border border-white">
          <h3 className='text-5xl'>{car.marca} {car.modelo} {car.anio}</h3>
          <h3 className='text-4xl font-extralight'>{car.precio}€</h3>
        </div>
      </Link>

      {userId == myUser?.id && (
        <>
          <Button variant='default'>
            <Link href={route('main.cars.edit', car.id)}>Editar</Link>
          </Button>
          <Button variant='destructive' onClick={() => onDelete?.(car.id)} >Eliminar</Button>
        </>
      )}


    </div>
  );
}