import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="relative size-10 rounded-md bg-gray-200">
                <AppLogoIcon className="size-5" />
            </div>
            <div className="flex flex-1">
                <span className="mr-6 truncate leading-tight text-white lg:text-3xl md:text-2xl text-xl font-semibold">Coches Web</span>
            </div>
        </>
    );
}
