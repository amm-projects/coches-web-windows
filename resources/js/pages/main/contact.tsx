import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import Footer from '@/components/ui/footer';

const Contact: React.FC = () => {
    return (
        <AppLayout>
            <Head title="Coches App" />
            <div>
                <section className="relative place-items-center text-center grid grid-cols-1 bg-[url(/storage/images/mainPage/bugatti.webp)] aspect-video bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className='place-items-center'>
                        <h1 className="md:text-6xl text-3xl drop-shadow font-semibold">
                            Contacta con Nosotros
                        </h1>
                        <h2 className="mb-12 text-md md:text-2xl drop-shadow">
                            Estamos aquí para ayudarte en lo que necesites
                        </h2>
                    </div>

                </section>
                <section className='flex flex-col md:flex-row m-6 gap-6'>
                    <div className='flex-1 flex overflow-hidden order-2 md:order-1 rounded-lg'>
                        <img src="/storage/images/contact/chinoMirando.jpg" alt="Chino Mirando" className="h-full w-full object-cover aspect-video shadow-lg transition-transform hover:scale-110 duration-1000" />
                    </div>
                    <div className='flex-1 flex flex-col bg-zinc-800 rounded-lg items-center justify-center text-center gap-4 order-1 md:order-2'>
                        <div className='m-4 flex flex-col gap-4'>
                            <h2 className='text-2xl font-bold'>Contactanos</h2>
                            <p>
                                Si tienes alguna pregunta, sugerencia o necesitas asistencia, no dudes en ponerte en contacto con nosotros.
                                Nuestro equipo de atención al cliente está aquí para ayudarte y brindarte el mejor servicio posible.
                            </p>
                        </div>
                    </div>
                </section>
                <section className='m-6 gap-6 flex-1 flex md:flex-row flex-col'>

                    <div className='flex-1 flex flex-col justify-center text-center items-center bg-zinc-800 rounded-lg'>

                        <div className='m-4 flex flex-col gap-4'>
                            <h2 className='text-2xl font-bold'>Información de Contacto</h2>
                            <p>
                                Puedes contactarnos a través de los siguientes medios:
                            </p>
                            <table className='border-2 border-white text-white tlist-disc list-inside text-center'>
                                <tr>
                                    <td className='border-1 border-white p-4'>Correo Electrónico</td>
                                    <td className='border-1 border-white p-4'>cars@gmail.com</td></tr>
                                <tr>
                                    <td className='border-1 border-white p-4'>Teléfono</td>
                                    <td className='border-1 border-white p-4'>+34 123 456 789</td>
                                </tr>
                                <tr>
                                    <td className='border-1 border-white p-4'>Dirección</td>
                                    <td className='border-1 border-white p-4'>Calle San Jorge, 1, 30120 Murcia</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className='flex flex-1 rounded-lg overflow-hidden justify-center items-center'>
                        <iframe className='aspect-video object-cover h-full w-full' src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d393.41366749690246!2d-1.1634755404811024!3d37.923203174904735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e0!4m0!4m3!3m2!1d37.923207!2d-1.1632723!5e0!3m2!1ses!2ses!4v1759933323387!5m2!1ses!2ses" width="600" height="450" loading="lazy"></iframe>
                    </div>
                </section>
                <section className='m-6 gap-6 flex flex-col md:flex-row '>

                    <form className='flex flex-1 flex-col gap-3 rounded-lg shadow-md bg-gray-400 order-2 md:order-1'>
                        <div className='flex flex-1 flex-col p-3 gap-3'>
                            <label className='text-gray-700 font-bold'>Nombre:</label>
                            <input type='text' className='bg-white px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black' required />
                            <label className=' text-gray-700 font-bold'>Correo Electrónico:</label>
                            <input type='email' className='bg-white px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black' required />
                            <label className=' text-gray-700 font-bold'>Mensaje:</label>
                            <textarea rows={4} className='bg-white px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black' required></textarea>
                            <Button type='submit' variant='default'>Enviar Mensaje</Button>
                        </div>
                    </form>

                    <div className='flex-1 flex flex-col bg-zinc-800 rounded-lg justify-center items-center text-center order-1 md:order-2'>
                        <div className='m-4 flex flex-col gap-4'>
                            <h2 className='text-2xl font-bold'>Formulario de Contacto</h2>
                            <p>
                                También puedes enviarnos un mensaje directamente a través de nuestro formulario de contacto en línea.
                                Responderemos a tu consulta lo antes posible.
                            </p>
                        </div>
                    </div>
                </section>
                <section className='duration-1000 flex flex-row justify-center items-center relative bg-[url(/storage/images/about/Concesionario.jpg)] bg-cover bg-center aspect-video'>

                    <div className='gap-6 flex flex-col flex-1 h-full w-full justify-center items-center absolute text-center bg-black/50'>
                        <h2 className='text-3xl font-bold'>Únete a Nuestra Comunidad</h2>
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

export default Contact;