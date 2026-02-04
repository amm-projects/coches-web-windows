// components/ui/footer.tsx
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className=" bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Web de Coches. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
