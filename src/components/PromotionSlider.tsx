"use client";

import { useEffect, useState } from "react";

type PromotionItem = {
  id: number;
  label: string;
  description: string;
};

const promotions: PromotionItem[] = [
  {
    id: 1,
    label: "Promotion Poster 01",
    description:
      "Promotional poster uploaded by the Capitalkey Realtors admin or owner will appear here.",
  },
  {
    id: 2,
    label: "Promotion Poster 02",
    description:
      "Additional property promotions and campaign posters can be displayed here.",
  },
  {
    id: 3,
    label: "Promotion Poster 03",
    description:
      "When multiple promotional posters are uploaded, they will automatically slide one by one.",
  },
];

export default function PromotionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  /* =========================================================
     AUTO SLIDE
  ========================================================= */

  useEffect(() => {
    if (promotions.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((previous) =>
        previous >= promotions.length - 1
          ? 0
          : previous + 1,
      );
    }, 4000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =========================================================
     CONTROLS
  ========================================================= */

  function previousSlide() {
    setCurrentIndex((previous) =>
      previous <= 0
        ? promotions.length - 1
        : previous - 1,
    );
  }

  function nextSlide() {
    setCurrentIndex((previous) =>
      previous >= promotions.length - 1
        ? 0
        : previous + 1,
    );
  }

  return (
    <section className="bg-transparent pb-12 pt-20 sm:pb-14 sm:pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-[#17376c]">
              PROMOTIONAL POSTER
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#071a3b] sm:text-4xl">
              Featured Promotions
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Promotional posters uploaded by the Capitalkey Realtors
              admin or owner will be displayed here.
            </p>
          </div>

          {/* DESKTOP ARROWS */}
          {promotions.length > 1 && (
            <div className="hidden gap-3 sm:flex">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous promotion"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-[#071a3b] transition hover:border-[#071a3b] hover:bg-[#071a3b] hover:text-white"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next promotion"
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

        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.05]">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {promotions.map((promotion) => (
              <div
                key={promotion.id}
                className="w-full shrink-0"
              >
                <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden sm:min-h-[360px] lg:min-h-[400px]">
                  {/* BACKGROUND EFFECTS */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(7,26,59,0.08),_transparent_35%)]" />

                  <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#071a3b]/[0.03]" />

                  {/* PLACEHOLDER CONTENT */}
                  <div className="relative z-10 max-w-2xl px-14 text-center sm:px-20">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#071a3b] shadow-lg shadow-slate-900/10">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-8 w-8 text-white"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="16"
                          rx="2"
                        />

                        <circle
                          cx="9"
                          cy="9"
                          r="1.5"
                        />

                        <path
                          d="m5.5 17 4.5-4.5 3 3 2.5-2.5 3 3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <p className="mt-6 text-[10px] font-bold tracking-[0.25em] text-[#17376c]">
                      CAPITALKEY REALTORS
                    </p>

                    <h3 className="mt-3 font-serif text-2xl text-[#071a3b] sm:text-3xl">
                      {promotion.label}
                    </h3>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
                      {promotion.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LEFT ARROW */}
          {promotions.length > 1 && (
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous promotion"
              className="absolute hidden"
            >
              Previous
            </button>
          )}
        </div>

        {/* MOBILE ARROWS */}
        {promotions.length > 1 && (
          <div className="mt-5 flex justify-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous promotion"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-[#071a3b]"
            >
              ←
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next promotion"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#071a3b] text-white"
            >
              →
            </button>
          </div>
        )}

        {/* DOTS */}
        {promotions.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {promotions.map((promotion, index) => (
              <button
                key={promotion.id}
                type="button"
                aria-label={`Promotion ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
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