import { SidebarInset } from '@/components/ui/sidebar';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({ variant = 'header', children, ...props }: AppContentProps) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true); // Activa animación al montar
    }, []);

    return (
        <main className={`flex flex-col min-h-screen w-full bg-black text-white lg:text-lg md:text-md sm:text-sm font-science-gothic font-light`}
        {...props}>
            {children}
        </main>
    );
}
