"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type Option = {
  value: string;
  label: string;
};

type ModernSelectProps = {
  label?: string;
  value: string;
  options: Option[];
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  searchable?: boolean;
};

export default function ModernSelect({
  label,
  value,
  options,
  placeholder,
  onChange,
  disabled = false,
  searchable = false,
}: ModernSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef =
    useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  const filteredOptions = options.filter(
    (option) =>
      option.label
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent,
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
        setSearch("");
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  function handleSelect(option: Option) {
    onChange(option.value);
    setOpen(false);
    setSearch("");
  }

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      {/* SELECT BUTTON */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setOpen((current) => !current);
          }
        }}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-left text-sm transition ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
            : open
              ? "border-[#071a3b] ring-4 ring-[#071a3b]/10"
              : "border-slate-300 text-[#071a3b] hover:border-[#17376c]"
        }`}
      >
        <span
          className={
            selectedOption
              ? "font-medium text-[#071a3b]"
              : "text-slate-500"
          }
        >
          {selectedOption?.label ??
            placeholder}
        </span>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="m6 9 6 6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* DROPDOWN */}
      {open && !disabled && (
        <div className="absolute left-0 top-full z-[100] mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
          {/* SEARCH */}
          {searchable && (
            <div className="border-b border-slate-100 p-3">
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />
                  <path
                    d="m20 20-3.5-3.5"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder="Search..."
                  autoFocus
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-[#071a3b] outline-none transition focus:border-[#071a3b] focus:bg-white focus:ring-2 focus:ring-[#071a3b]/10"
                />
              </div>
            </div>
          )}

          {/* OPTIONS */}
          <div className="max-h-64 overflow-y-auto p-2">
            <button
              type="button"
              onClick={() =>
                handleSelect({
                  value: "",
                  label: placeholder,
                })
              }
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${
                value === ""
                  ? "bg-[#071a3b] font-semibold text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-[#071a3b]"
              }`}
            >
              {placeholder}

              {value === "" && (
                <span>✓</span>
              )}
            </button>

            {filteredOptions.map(
              (option) => {
                const selected =
                  option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      handleSelect(option)
                    }
                    className={`mt-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${
                      selected
                        ? "bg-[#071a3b] font-semibold text-white"
                        : "text-slate-700 hover:bg-[#071a3b]/5 hover:text-[#071a3b]"
                    }`}
                  >
                    <span>
                      {option.label}
                    </span>

                    {selected && (
                      <span>✓</span>
                    )}
                  </button>
                );
              },
            )}

            {filteredOptions.length ===
              0 && (
              <div className="px-3 py-6 text-center text-sm text-slate-400">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}