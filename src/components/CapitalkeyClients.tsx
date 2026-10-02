"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type ClientItem = {
  id: number;
  label: string;
};

const clients: ClientItem[] = [
  {
    id: 1,
    label: "Client Photo 01",
  },
  {
    id: 2,
    label: "Client Photo 02",
  },
  {
    id: 3,
    label: "Client Photo 03",
  },
  {
    id: 4,
    label: "Client Photo 04",
  },
  {
    id: 5,
    label: "Client Photo 05",
  },
  {
    id: 6,
    label: "Client Photo 06",
  },
];

export default function CapitalkeyClients() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [visibleCount, setVisibleCount] =
    useState(3);

  const [cardWidth, setCardWidth] =
    useState(0);

  const gap = 24;

  /* =========================================================
     RESPONSIVE SIZE
  ========================================================= */

  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) {
        return;
      }

      let count = 3;

      if (window.innerWidth < 640) {
        count = 1;
      } else if (window.innerWidth < 1024) {
        count = 2;
      }

      setVisibleCount(count);

      const containerWidth =
        containerRef.current.clientWidth;

      const totalGap =
        gap * (count - 1);

      const width =
        (containerWidth - totalGap) /
        count;

      setCardWidth(width);

      setCurrentIndex((previous) => {
        const maxIndex = Math.max(
          0,
          clients.length - count,
        );

        return Math.min(
          previous,
          maxIndex,
        );
      });
    }

    updateSize();

    window.addEventListener(
      "resize",
      updateSize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateSize,
      );
    };
  }, []);

  /* =========================================================
     AUTO SLIDE
  ========================================================= */

  useEffect(() => {
    const maxIndex = Math.max(
      0,
      clients.length - visibleCount,
    );

    if (maxIndex === 0) {
      return;
    }

    const interval = window.setInterval(
      () => {
        setCurrentIndex((previous) =>
          previous >= maxIndex
            ? 0
            : previous + 1,
        );
      },
      4000,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [visibleCount]);

  const maxIndex = Math.max(
    0,
    clients.length - visibleCount,
  );

  function previousSlide() {
    setCurrentIndex((previous) =>
      previous <= 0
        ? maxIndex
        : previous - 1,
    );
  }

  function nextSlide() {
    setCurrentIndex((previous) =>
      previous >= maxIndex
        ? 0
        : previous + 1,
    );
  }

  return (
    <section className="bg-transparent py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-[#17376c]">
              CAPITALKEY CLIENTS
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#071a3b] sm:text-4xl">
              Our Valued Clients
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Client photos and customer appreciation posters
              uploaded by Capitalkey Realtors will be displayed here.
            </p>
          </div>

          {/* ARROWS */}
          {clients.length > visibleCount && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous clients"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-[#071a3b] transition hover:border-[#071a3b] hover:bg-[#071a3b] hover:text-white"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next clients"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071a3b] text-white transition hover:bg-[#123466]"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* =====================================================
            SLIDER
        ===================================================== */}

        <div
          ref={containerRef}
          className="overflow-hidden"
        >
          <div
            className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex *
                (cardWidth + gap)
              }px)`,
            }}
          >
            {clients.map((client) => (
              <div
                key={client.id}
                style={{
                  width:
                    cardWidth > 0
                      ? `${cardWidth}px`
                      : undefined,
                }}
                className="flex-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(7,26,59,0.07),_transparent_40%)]" />

                  <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#071a3b] shadow-lg">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-7 w-7 text-white"
                      >
                        <circle
                          cx="12"
                          cy="8"
                          r="4"
                        />

                        <path
                          d="M5 21c.8-4.2 3.2-6.5 7-6.5s6.2 2.3 7 6.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <p className="mt-5 text-[10px] font-bold tracking-[0.22em] text-[#17376c]">
                      CAPITALKEY CLIENT
                    </p>

                    <h3 className="mt-2 font-serif text-xl text-[#071a3b]">
                      {client.label}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Client poster will appear here after being
                      uploaded by the admin or owner.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            DOTS
        ===================================================== */}

        {maxIndex > 0 && (
          <div className="mt-7 flex justify-center gap-2">
            {Array.from({
              length: maxIndex + 1,
            }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Client slide ${index + 1}`}
                onClick={() =>
                  setCurrentIndex(index)
                }
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-8 bg-[#071a3b]"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}