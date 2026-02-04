import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface SliderProps {
  images: string[];
  interval?: number;
  hoverMove?: boolean;
  loop?: boolean;
  onSelect?: (index: number, image: string) => void; // 👈 nueva prop
}

const Slider: React.FC<SliderProps> = ({
  images,
  interval,
  hoverMove,
  loop,
  onSelect,
}) => {
  const [current, setCurrent] = useState<number>(0);
  const [dir, setDir] = useState<number>(0); // 1: derecha, -1: izquierda
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // 👈 nuevo estado
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const lastMoveRef = useRef<number>(0);

  const nextSlide = () => {
    setCurrent((prev) => {
      if (prev < images.length - 1) {
        setDir(1);
        return prev + 1;
      }
      return loop ? 0 : prev;
    });
  };

  const prevSlide = () => {
    setCurrent((prev) => {
      if (prev > 0) {
        setDir(-1);
        return prev - 1;
      }
      return loop ? images.length - 1 : prev;
    });
  };

  // Autoplay
  if (interval !== undefined) {
    useEffect(() => {
      let auto: NodeJS.Timeout | null = null;
      if (!isPaused && (loop || current < images.length - 1)) {
        auto = setInterval(nextSlide, interval);
      }
      return () => {
        if (auto) clearInterval(auto);
      };
    }, [isPaused, interval, current, loop]);
  }

  // Movimiento con el ratón
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverMove) return;
    const now = Date.now();
    if (now - lastMoveRef.current < 400) return;
    lastMoveRef.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const middle = rect.width / 2;

    if (x < middle - rect.width * 0.15) prevSlide();
    else if (x > middle + rect.width * 0.15) nextSlide();
  };

  // Selección de imagen
  const handleSelect = (index: number) => {
    if (selectedIndex === index) return;
    setSelectedIndex(index);
    onSelect?.(index, images[index]);
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="h-full w-full flex flex-row bg-gray-700 rounded-2xl"

      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Flechas Izq*/}
      <div className='basis-1/12 flex items-center justify-center rounded-l-2xl bg-gray-800'>
        <button
          onClick={prevSlide}
          disabled={!loop && current === 0}
          className={`p-2 rounded-full shadow-md ${!loop && current === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-300"
            }`}
        >
          <Icon iconNode={ArrowLeft} className="h-full w-full dark:invert" />
        </button>
      </div>
      <div className="basis-10/12 flex flex-col bg-gray-700 overflow-hidden">
        {/* Slides */}
        <div
          className="basis-3/4"
        >
          <div className="flex flex-row w-[1000px] gap-4 h-full items-center justify-center transition-transform duration-3000 ease-in-out"
            style={{ transform: `translateX(${(-1) * dir * 20}%)` }}>
            <div
            key={-1}
                onClick={() => handleSelect(-1)}
              className={`w-full h-3/4 items-center justify-center text-center cursor-pointer transition-transform duration-300 bg-gray-700 ${selectedIndex === -1 ? "scale-105 ring-4 ring-black" : ""
                }`}
            >
              <h2 className="flex w-full h-full flex-col flex-1 items-center justify-center text-center text-2xl">Todas<br/>Las<br/>Marcas</h2>
              <p className='font-bold mt-2 text-white'>Todas</p>
            </div>
            {images.map((src, i) => (
              <div
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full h-3/4 items-center justify-center text-center cursor-pointer transition-transform duration-300 bg-gray-700 ${selectedIndex === i ? "scale-105 ring-4 ring-black" : ""
                  }`}
              >
                <img src={src} alt={`Imagen del carrusel número ${i + 1}`} className="h-full w-full invert" />
                <p className='font-bold mt-2 text-white'>{src.split('/').pop()?.split('.').slice(0, -1)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className="basis-1/4 mt-6 bg-gray-700 flex flex-row justify-center">
          {images.map((_, i) => (
            <div key={i}>
              <button
                onClick={() => setCurrent(i)}
                className={`rounded-full h-1/2 mx-2 aspect-square transition-all ${i === current ? "bg-white" : "bg-black"
                  }`}
              />
            </div>
          ))}
        </div>
      </div>
      {/*Flecha Der*/}
      <div className='basis-1/12 flex items-center justify-center rounded-r-2xl bg-gray-800'>
        <button
          onClick={nextSlide}
          disabled={!loop && current === images.length - 1}
          className={`p-2 rounded-full shadow-md  ${!loop && current === images.length - 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-300"
            }`}
        >
          <Icon iconNode={ArrowRight} className='h-full w-full dark:invert' />
        </button>
      </div>
    </div>
  );
};

export default Slider;
