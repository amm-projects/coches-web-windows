import React, { useMemo, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useInitials } from '@/hooks/use-initials';
import { Button } from '@/components/ui/button';
import { type User } from '@/types';
import Pagination from '@/components/ui/pagination';
import CarCard from '@/components/ui/car-card';
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

const PAGE_SIZE = 6;

type Props = {
    user: User;
    cars: Car[];
    myUser?: User;
};

export default function ShowUser({ user, cars, myUser }: Props) {

    const [amount, setAmount] = useState<string>('');

    const submit = (type: 'add' | 'subtract') => {

        router.put(route('main.users.updateFunds', user.id), {
            amount: amount,
            type : type
        });
    };

    console.log("🚗 Mostrando detalles del user:", user);
    console.log("Mi usuario: ", myUser)

    const getInitials = useInitials();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [favorites, setFavorites] = useState<number[]>([]);


    // Filtrado y ordenación
    const filteredCars = useMemo(() => {

        console.log("Hola")
        let filtered = cars.filter((car) => car.propietario == user.id.toString());

        if (sort === 'precio') filtered = filtered.sort((a, b) => a.precio - b.precio);
        if (sort === 'anio') filtered = filtered.sort((a, b) => b.anio - a.anio);
        if (sort === 'marca') filtered = filtered.sort((a, b) => a.marca.localeCompare(b.marca));

        return filtered;

    }, [cars, search, sort, /*verMisCoches*/]);

    console.log("🚗 Coches filtrados:", filteredCars);

    // Paginación
    const totalPages = Math.ceil(filteredCars.length / PAGE_SIZE);
    const paginatedCars = filteredCars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleToggleFavorite = (id: number) => {
        setFavorites(favs =>
            favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]
        );
    }

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
            {/*<Head title={`Detalles de ${user.name} ${user.email}`} />*/}


            <div className='flex flex-col flex-1 items-center justify-center text-center gap-4 p-4'>
                <Avatar className="overflow-hidden rounded-full w-64 h-64">
                    <AvatarImage src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    <AvatarFallback className="text-9xl w-full h-full flex items-center justify-center rounded-full bg-white text-black">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>

                {user?.id === myUser?.id && (
                    <>
                        <h2 className="text-2xl font-bold mb-2">{user.name} (Usted)</h2>
                        <h2 className="text-2xl font-bold mb-2">Su Email: {user.email}</h2>
                        <h2 className="text-2xl font-bold mb-2">Su Dinero: {user.saldo}€</h2>
                        <form onSubmit={(e) => e.preventDefault()} method="post" className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <input type="number" step='0.01' min="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Cantidad (€)" className="bg-white px-6 py-2 rounded-lg text-black text-base" required />
                            <Button type="button" onClick={() => submit('add')} variant='secondary'>Añadir Dinero</Button>
                            <Button type="button" onClick={() => submit('subtract')} variant="destructive">Quitar Dinero</Button>
                        </form>
                        <h2 className="text-xl font-semibold mt-4 mb-2">Sus Coches</h2>
                    </>)
                }
                {user?.id !== myUser?.id && (
                    <>
                        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                        <h2 className="text-2xl font-normal mb-2">Email: {user.email}</h2>
                        <h2 className="text-xl font-semibold mt-4 mb-2">Coches de {user.name}</h2>
                    </>
                )}


                <div className="grid gap-4 mx-4">
                    {cars.length === 0 && (
                        <p className="mt-4 text-white">--No Hay Coches--</p>
                    )}
                    {paginatedCars.map(car => (
                        <div key={car.id}>
                            <div className='w-full bg-linear-to-bl from-black via-white to-black border border-black rounded-lg shadow transition duration-300 ease-in-out hover:scale-102'>
                                <CarCard
                                    car={{ ...car, favorito: favorites.includes(car.id) }}
                                    myUser={myUser}
                                    onDelete={handleDelete}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <Pagination current={page} total={totalPages} onPageChange={setPage} />
                </div>


            </div>
            <Footer />
        </AppLayout>
    );
}