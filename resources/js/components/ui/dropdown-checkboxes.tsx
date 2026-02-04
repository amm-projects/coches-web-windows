import React, { useState, useEffect, useRef } from "react";

type MultiSelectCheckboxDropdownProps = {
  options?: string[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  maxLabelChars?: number;
};

export default function MultiSelectCheckboxDropdown({
  options = [],
  value = [],
  onChange = () => { },
  placeholder = "Seleccionar...",
  maxLabelChars = 24,
}: MultiSelectCheckboxDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>(Array.isArray(value) ? value : []);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelected(Array.isArray(value) ? value : []);
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

  // ✅ Lógica "Seleccionar todo"
  const allSelected = options.length > 0 && selected.length === options.length;
  const partiallySelected = selected.length > 0 && selected.length < options.length;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = partiallySelected;
    }
  }, [partiallySelected]);

  function toggleValue(val: string) {
    const next = selected.includes(val)
      ? selected.filter((x) => x !== val)
      : [...selected, val];
    setSelected(next);
    onChange(next);
  }

  function toggleAll() {
    if (allSelected) {
      setSelected([]);
      onChange([]);
    } else {
      setSelected([...options]);
      onChange([...options]);
    }
  }

  function clearAll() {
    setSelected([]);
    onChange([]);
  }

  function renderLabelPreview() {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) {
      const lab = selected[0];
      return lab.length > maxLabelChars ? lab.slice(0, maxLabelChars) + "..." : lab;
    }
    return `${selected.length} seleccionados`;
  }

  return (
    <div className="flex flex-1 relative font-light text-sm md:text-md lg:text-lg" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
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
        <div className="absolute top-10 w-full z-50 mt-2 rounded-md border bg-black shadow-lg ring-1 ring-black/5">
          <div className="p-2">
 

            <div className="max-h-48 overflow-auto py-1">
              {options.length === 0 && (
                <div className="p-2 text-gray-500">No hay opciones</div>
              )}

              {/* ✅ Checkbox "Seleccionar todo" */}
              {options.length > 0 && (
                <div>
                  <label className="bg-gray-950 flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-gray-800 border-b border-white/20">
                    <input
                      type="checkbox"
                      ref={selectAllRef}
                      checked={allSelected}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-0"
                    />
                    <span className="truncate text-lg text-white font-semibold">
                      Seleccionar todo
                    </span>
                  </label>
                  <hr className="border-0.5 border-white/30" />
                </div>
              )}

              {/* Opciones individuales */}
              {options.map((opt) => {
                const checked = selected.includes(opt);
                return (
                  <div key={opt}>
                    <label
                      className={`bg-gray-950 group flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-gray-800 ${checked ? "bg-gray-800" : ""
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        value={opt}
                        onChange={() => toggleValue(opt)}
                        className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-0"
                        aria-checked={checked}
                      />
                      <span className="flex justify-start text-left items-center flex-1">{opt}</span>
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
