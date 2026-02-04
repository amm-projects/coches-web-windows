import React from 'react';

type Props = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ current, total, onPageChange }: Props) {
  return (
    <div className="flex">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={current === i + 1 ? 'bg-black text-white font-bold px-2' : 'bg-white text-black font-bold px-2'}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}