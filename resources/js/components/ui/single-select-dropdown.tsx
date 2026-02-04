import React, { useState, useEffect, useRef } from "react";

type SingleSelectDropdownProps = {
  options?: string[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  maxLabelChars?: number;
};

export default function SingleSelectDropdown({
  options = [],
  value = null,
  onChange = () => {},
  placeholder = "Seleccionar...",
  maxLabelChars = 24,
}: SingleSelectDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, []);

  function handleSelect(val: string) {
    setSelected(val);
    onChange(val);
    setOpen(false);
  }

  function renderLabelPreview() {
    if (!selected) return placeholder;
    return selected.length > maxLabelChars
      ? selected.slice(0, maxLabelChars) + "..."
      : selected;
  }

  return (
    <div className="flex flex-1 relative font-light text-sm md:text-md lg:text-lg" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="bg-white text-black flex flex-1 items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-200"
      >
        <span className="truncate flex flex-1 justify-between">{renderLabelPreview()}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 1.414l-4 4A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-10 w-full z-50 mt-2 rounded-md border bg-black shadow-lg ring-1 ring-black/5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-2">
            <div className="max-h-48 overflow-auto py-1">
              {options.length === 0 && (
                <div className="p-2 text-gray-500">No hay opciones</div>
              )}

              {options.map((opt) => {
                const isSelected = selected === opt;

                return (
                  <div key={opt}>
                    <label
                      className={`bg-gray-950 group flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-gray-800 ${
                        isSelected ? "bg-gray-800" : ""
                      }`}
                      onClick={() => handleSelect(opt)}
                    >
                      <input
                        type="radio"
                        checked={isSelected}
                        readOnly
                        className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-0"
                        aria-checked={isSelected}
                      />
                      <span className="flex justify-start text-left items-center flex-1 text-white">
                        {opt}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
