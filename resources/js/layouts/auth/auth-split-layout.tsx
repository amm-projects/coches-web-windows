import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="flex lg:flex-row flex-col items-center justify-center h-screen font-science-gothic">
            <div className="hidden lg:flex lg:flex-1 h-screen text-center dark:border-r bg-zinc-900 text-white">
                <Link href={route('main.index')} className="p-32 flex flex-1 flex-col justify-center items-center text-5xl font-light">
                    <img src="storage/images/web_icon.svg" alt="Coches Web" className='invert my-4' />
                    <h3 className='md:text-7xl text-4xl mb-4'>Coches Web</h3>
                </Link>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
                <div className=' bg-zinc-900 flex flex-col lg:hidden w-screen justify-center items-center'>
                    <Link href={route('main.index')} className="w-1/3">
                        <img src="storage/images/web_icon.svg" alt="Coches Web" className='invert my-4'/>
                    </Link>
                    <h3 className='text-white md:text-7xl text-4xl mb-4'>Coches Web</h3>
                </div>
                <div className="flex flex-1 flex-col gap-2 justify-center w-2/3">
                    <h1 className="text-xl font-medium flex justify-center">{title}</h1>
                    <p className="text-sm text-balance text-muted-foreground flex justify-center">{description}</p>

                    {children}
                    <Button className="mt-6 mx-auto" onClick={() => router.visit('/')}>
                        Volver
                    </Button>             
                </div>
            </div>

        </div>
    );
}
