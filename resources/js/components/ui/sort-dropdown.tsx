import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="border px-2 py-1 rounded bg-white text-black">
      <option value="">Ordenar por...</option>
      <option value="precio">Precio</option>
      <option value="anio">Año</option>
      <option value="marca">Marca</option>
    </select>
  );
}