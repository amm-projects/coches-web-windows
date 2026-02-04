import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Buscar por marca o modelo..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border px-2 py-1 rounded w-full bg-white text-black"
    />
  );
}