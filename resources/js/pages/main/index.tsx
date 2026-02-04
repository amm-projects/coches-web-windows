import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import Slider from '@/components/ui/slider';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Footer from '@/components/ui/footer';
import FiltroCoches from '@/components/ui/filtro-coches';
import { useInView } from "react-intersection-observer";



interface IndexProps {
    carBrandIcons: string[]; // Asegúrate de que este prop esté tipado correctamente
}

const Index: React.FC<IndexProps> = ({ carBrandIcons }) => {

    console.log(carBrandIcons);


    const [ref1, inView1] = useInView();
    const [ref2, inView2] = useInView();
    const [ref3, inView3] = useInView();
    const [ref4, inView4] = useInView();

    const [imgLoaded, setImgLoaded] = useState(false);
    const [marca, setMarca] = useState<string>('Todas');

    const handleSelect = (index: number, image: string) => {

        let nuevaMarca = null;

        if (index === -1) {
            nuevaMarca = 'Todas';
            setMarca(nuevaMarca);

        }
        else {
            ;
            nuevaMarca = image.split('/').pop()?.split('.').slice(0, -1).toString() || 'Todas';
            setMarca(nuevaMarca);
            console.log('Seleccionaste la marca: ' + marca);
        }
    };

    const [range, setRange] = useState([0, 1000000]);

    return (
        <AppLayout>

            <div className={`flex flex-col fade-start ${imgLoaded ? "fade-in" : ""}`}>

                <Head title="Coches App" />

                <section
                    /*ref={ref1}*/
                    className={`flex flex-col text-center overflow-hidden`}>
                    <div className='relative'>
                        <img
                            src="/storage/images/mainPage/bugatti.webp"
                            alt="Coches"
                            className="object-contain w-full h-auto animate-zoom-in-out"
                            onLoad={() => setImgLoaded(true)}>
                        </img>
                        <div className='bg-black/50 absolute inset-0 animate-zoom-in-out'></div>
                        <div className='absolute inset-0 flex flex-col justify-center items-center gap-4'>
                            <h1 className="lg:text-6xl text-3xl font-semibold">
                                Bienvenido a la Web de Coches
                            </h1>
                            <h2 className="lg:text-md md:text-2xl">
                                Explora, ordena y gestiona los coches disponibles
                            </h2>
                        </div>
                    </div>
                    <div className='pt-10 flex justify-center items-center'>
                        <FiltroCoches />
                    </div>
                </section>

                <section className='text-center flex flex-col gap-6 p-6'>
                    <article
                        /*ref={ref2}*/
                        className={`flex flex-col md:flex-row gap-6`}>
                        <div className='rounded-lg overflow-hidden flex flex-1 justify-center items-center '>
                            <img className='w-full h-full object-cover aspect-video transition-transform hover:scale-105 duration-1000' src="/storage/images/mainPage/bugatti.webp" alt="Coches" />
                        </div>
                        <div className=' bg-gray-800 rounded-lg flex-1 flex flex-col justify-center items-center'>
                            <h2 className='text-3xl font-semibold mt-6'>Ultima Tecnologia</h2>
                            <p className='m-6'>Los ultimos coches con la ultima tecnologia</p>
                        </div>
                    </article>
                    <article
                        /*ref={ref3}*/
                        className={`flex flex-col md:flex-row gap-6`}>
                        <div className='bg-gray-800 rounded-lg flex-1 flex flex-col order-2 md:order-1 justify-center items-center gap-4'>
                            <h2 className='text-3xl font-semibold mt-6'>Coches Electricos</h2>
                            <p className='m-6'>La tecnologia esta avanzando a pasos agigantados y los coches ahora son electricos.</p>
                        </div>
                        <div className='overflow-hidden rounded-lg flex-1 order-1 md:order-2'>
                            <img className='w-full h-full object-cover aspect-video transition-transform hover:scale-110 duration-1000' src="/storage/images/mainPage/electric.webp" alt="Electricos" />
                        </div>
                    </article>
                    <article
                        /*ref={ref4}*/
                        className={`flex flex-col md:flex-row gap-6`}>
                        <div className='overflow-hidden rounded-lg flex-1'>
                            <img className='w-full h-full object-cover aspect-video  transition-transform hover:scale-110 duration-1000' src="/storage/images/mainPage/second-hand.webp" alt="Segunda Mano" />
                        </div>
                        <div className='bg-gray-800 rounded-lg flex-1 flex flex-col justify-center items-center gap-4'>
                            <h2 className='text-3xl font-semibold mt-6'>Coches de Segunda Mano</h2>
                            <p className='m-6'> Coches de Segunda Mano y KM 0 estan disponibles al mejor precio</p>
                        </div>
                    </article>
                </section>
                <section className='duration-1000 flex flex-1 flex-row justify-center items-center relative bg-[url(/storage/images/about/Concesionario.jpg)] bg-cover bg-center aspect-video'>

                    <div className='gap-6 flex flex-col flex-1 h-full w-full justify-center items-center absolute text-center bg-black/60'>
                        <h2 className='text-3xl font-semibold'>Únete a Nuestra Comunidad</h2>
                        <Button variant='secondary' size='lg'>
                            <Link href={route('login')}>
                                <p className='font-bold text-xl'>Unirse</p>
                            </Link>
                        </Button>
                    </div>

                </section>
                <Footer />
            </div>

        </AppLayout >
    );
};

export default Index;