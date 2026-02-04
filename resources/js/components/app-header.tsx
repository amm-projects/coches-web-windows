import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Search, Phone, CarFront, PersonStanding, HandHelping } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Ver Coches',
        href: '/cars',
        icon: CarFront,
    },
    {
        title: 'Vender Coche',
        href: '/cars/create',
        icon: HandHelping,
    },
    {
        title: 'Sobre Nosotros',
        href: '/about',
        icon: PersonStanding,
    },
    {
        title: 'Contacto',
        href: '/contact',
        icon: Phone,
    },

];

const rightNavItems: NavItem[] = [

];

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    return (
        <>
            <div className="sticky w-full font-science-gothic flex flex-row top-0 z-1 bg-black border-b border-sidebar-border/80">
                <div className="flex flex-1 items-center px-4">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="default" size="icon" className="mr-2 h-[34px] w-[34px]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <img src="/storage/images/web_icon.svg" alt="App Logo" className="" />
                                </SheetHeader>
                                
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-8">
                                            {mainNavItems.map((item) => (
                                                <div className='flex flex-col gap-4'>
                                                <Link key={item.title} href={item.href} className="flex items-center space-x-2 font-medium font-science-gothic">
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                    <span>{item.title}</span>
                                                </Link>
                                                <hr className='border-1 border-black'/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/" prefetch className="flex items-center justify-center space-x-2 py-4">
                        <AppLogo />
                    </Link>


                    {/* Desktop Navigation */}
                    <div className="flex flex-1 flex-row items-center">
                        <div className="hidden lg:flex lg:flex-row flex-1">
                            <NavigationMenu className="flex flex-1">
                                <ul className="flex flex-1 bg-white" role="list">
                                    {mainNavItems.map((item, index) => (
                                        <NavigationMenuItem key={index} className="ml-0.5 flex flex-1">
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    page.url === item.href && activeItemStyles,
                                                    'flex flex-1 py-9 cursor-pointer rounded-none bg-black text-white text-md hover:bg-gray-300 hover:text-black',
                                                )}
                                            >
                                                {item.icon && <Icon iconNode={item.icon} className="mr-2 h-6 w-6" />}
                                                {item.title}
                                            </Link>

                                        </NavigationMenuItem>
                                    ))}
                                    <hr className='border-1 border-white'/>
                                </ul>
                            </NavigationMenu>
                        </div>
                        {auth.user ? (
                            <div className="pl-4 flex lg:flex-0 flex-1 justify-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="size-10 rounded-full p-1">
                                            <Avatar className="size-8 overflow-hidden rounded-full">
                                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                                <AvatarFallback className="rounded-lg bg-white text-black ">
                                                    {getInitials(auth.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end">
                                        <UserMenuContent user={auth.user} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                        ) : (
                            <div className='pl-4 flex lg:flex-0 flex-1 justify-end'>
                                
                                <Button variant='secondary' className='p-2 text-lg'>
                                    <Link href={route('login')}>
                                        Entrar
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
