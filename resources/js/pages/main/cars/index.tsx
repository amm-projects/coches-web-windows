import React, { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import CarCard from '@/components/ui/car-card';
import SearchBar from '@/components/ui/search-bar';
import SortDropdown from '@/components/ui/sort-dropdown';
import Pagination from '@/components/ui/pagination';
import { NavFooter } from '@/components/nav-footer';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';


type Car = {
  id: number
  marca: string
  modelo: string
  anio: number
  precio: number
  imagen: string
  favorito?: boolean
  propietario?: string | number | null | undefined
}

type Props = {
  cars: Car[],
}

const PAGE_SIZE = 6;

export default function Index({ cars }: Props) {
  //const [verMisCoches, setVerMisCoches] = AppLayout.;
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Filtrado y ordenación
  const filteredCars = useMemo(() => {

    let filtered = cars.filter((car) => car.marca.toLowerCase().includes(search.toLowerCase()) ||
      car.modelo.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === 'precio') filtered = filtered.sort((a, b) => a.precio - b.precio);
    if (sort === 'anio') filtered = filtered.sort((a, b) => b.anio - a.anio);
    if (sort === 'marca') filtered = filtered.sort((a, b) => a.marca.localeCompare(b.marca));

    return filtered;

  }, [cars, search, sort]);

  console.log("🚗 Coches filtrados:", filteredCars);

  // Paginación
  const totalPages = Math.ceil(filteredCars.length / PAGE_SIZE);
  const paginatedCars = filteredCars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Favoritos
  const handleToggleFavorite = (id: number) => {
    setFavorites(favs =>
      favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]
    );
  };

  // Eliminar (solo frontend, deberías conectar con backend)
  const [carList, setCarList] = useState(cars);
  const handleDelete = (id: number) => {
    if (window.confirm('¿Seguro que quieres eliminar este coche?')) {
      setCarList(list => list.filter(car => car.id !== id));
      // Aquí deberías hacer la petición DELETE al backend
      router.delete(route('main.cars.destroy', id));
    }
  };

  return (
    <AppLayout>
      <Head title="Coches" />
      <div className="bg-gray-100 font-light">
        <div className="w-full mx-auto m-0">
          <div className="flex justify-between items-center p-6">
            <h1 className="text-3xl text-black">Lista de Coches</h1>
          </div>
          <div className="flex justify-center items-center gap-4 p-4 mb-4" style={{background: "linear-gradient(to bottom, oklch(96.7% 0.003 264.542) 0%, oklch(70.7% 0.022 261.325) 20%, oklch(70.7% 0.022 261.325) 80%, oklch(96.7% 0.003 264.542) 100%)"}}>
            <SearchBar value={search} onChange={setSearch} />
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>
        <div className="flex flex-col gap-4 mx-4">
          {!paginatedCars || paginatedCars.length === 0 ? (
            <h2 className='text-black text-center font-semibold text-xl mt-8'>--No hay resultados--</h2>
          ) : (
            paginatedCars.map(car => (
              <div key={car.id}
                className='w-full bg-linear-to-bl from-black via-white to-black border border-black rounded-lg shadow transition duration-300 ease-in-out hover:scale-102'>
                <CarCard
                  car={{ ...car, favorito: favorites.includes(car.id) }}
                  onDelete={handleDelete}
                  onToggleFavorite={handleToggleFavorite}
                />

              </div>
            ))
          )}
        </div>
        <div className="my-6 flex flex-row">
          <div className='flex flex-1 ' />
          <div className='flex border border-black'>
            <Pagination current={page} total={totalPages} onPageChange={setPage} />
          </div>
          <div className='flex flex-1 ' />
        </div>

        <section className='duration-1000 flex flex-row justify-center items-center relative bg-[url(/storage/images/about/Concesionario.jpg)] bg-cover bg-center aspect-video'>

          <div className='gap-6 flex flex-col flex-1 h-full w-full justify-center items-center absolute text-center bg-black/60'>
            <h2 className='text-3xl font-bold'>Únete a Nuestra Comunidad</h2>
            <Button size='lg' variant='secondary'>
              <Link href={route('login')}>
                <p className='font-bold text-xl'>Unirse</p>
              </Link>
            </Button>
          </div>

        </section>
        <Footer />
      </div>
    </AppLayout>
  );
}