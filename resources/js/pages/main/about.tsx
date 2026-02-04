import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import Footer from '@/components/ui/footer';

const About: React.FC = () => {
    return (
        <AppLayout>
            <Head title="Coches App" />
            <section className="relative text-center flex flex-col bg-[url(/storage/images/mainPage/bugatti.webp)] aspect-video bg-cover bg-center">
                <div className="absolute inset-0 bg-black/50"></div>

                <div className='absolute inset-0 flex flex-col justify-center items-center'>
                    <h1 className="flex md:text-6xl text-3xl drop-shadow font-semibold">
                        Quienes Somos
                    </h1>
                    <h2 className="flex mb-12 text-md md:text-2xl drop-shadow font-light">
                        Tu pagina de confianza para todo lo relacionado con coches
                    </h2>
                </div>

            </section>
            <section className='text-center p-6 gap-6 flex flex-col'>
                <article
                    /*ref={ref2}*/
                    className={`flex flex-col md:flex-row gap-6`}>
                    <div className=' bg-gray-800 rounded-lg flex-1 flex flex-col justify-center items-center md:order-1 order-2'>
                        <h2 className='text-3xl font-bold mt-6'>Nuestra Misión</h2>
                        <p className='m-6'>Somos la mejor pagina de compraventa de coches de España</p>
                    </div>
                    <div className='rounded-lg overflow-hidden flex flex-1 justify-center items-center md_order-2 order-1'>
                        <img className='w-full h-full object-cover aspect-video transition-transform hover:scale-105 duration-1000' src="/storage/images/about/Conductor2.webp" alt="Conductor2" />
                    </div>
                </article>
                <article
                    /*ref={ref3}*/
                    className={`flex flex-col md:flex-row gap-6`}>
                    <div className='overflow-hidden rounded-lg flex-1'>
                        <img className='w-full h-full object-cover aspect-video transition-transform hover:scale-110 duration-1000' src="/storage/images/about/Conductor.webp" alt="Conductor" />
                    </div>
                    <div className='bg-gray-800 rounded-lg flex-1 flex flex-col justify-center items-center gap-4'>
                        <h2 className='text-3xl font-bold mt-6'>Nuestro Compromiso</h2>
                        <p className='m-6'>Estamos comprometidos a que las compraventas sean seguras, de calidad y eficientes</p>
                    </div>
                </article>
                <article
                    /*ref={ref4}*/
                    className={`flex flex-col md:flex-row gap-6`}>
                    <div className='bg-gray-800 rounded-lg flex-1 flex flex-col justify-center items-center gap-4 md:order-1 order-2'>
                        <h2 className='text-3xl font-bold mt-6'>Nuestra Comunidad</h2>
                        <p className='m-6'>Mas de 1 millon de usuarios de todo el mundo comprando y vendiendo coches en esta pagina web</p>
                    </div>
                    <div className='overflow-hidden rounded-lg flex-1 md:order-2 order-1'>
                        <img className='w-full h-full object-cover aspect-video  transition-transform hover:scale-110 duration-1000' src="/storage/images/about/MorrosCoches.jpg" alt="MorrosCoches" />
                    </div>
                </article>
            </section>
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
        </AppLayout >
    );
};

export default About;