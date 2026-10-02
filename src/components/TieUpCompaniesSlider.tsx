"use client";

import { useEffect, useState } from "react";

type PartnerPoster = {
  id: number;
  title: string;
};

const partnerPosters: PartnerPoster[] = [
  {
    id: 1,
    title: "Tie-Up Company Poster 01",
  },
  {
    id: 2,
    title: "Tie-Up Company Poster 02",
  },
  {
    id: 3,
    title: "Tie-Up Company Poster 03",
  },
];

export default function TieUpCompaniesSlider() {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  /* =========================================================
     AUTO SLIDE
  ========================================================= */

  useEffect(() => {
    if (partnerPosters.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((previous) =>
        previous >= partnerPosters.length - 1
          ? 0
          : previous + 1,
      );
    }, 4000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =========================================================
     PREVIOUS
  ========================================================= */

  function previousSlide() {
    setCurrentIndex((previous) =>
      previous <= 0
        ? partnerPosters.length - 1
        : previous - 1,
    );
  }

  /* =========================================================
     NEXT
  ========================================================= */

  function nextSlide() {
    setCurrentIndex((previous) =>
      previous >= partnerPosters.length - 1
        ? 0
        : previous + 1,
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-xs font-bold tracking-[0.3em] text-[#17376c]">
          TIE-UP COMPANIES
        </p>

        <h2 className="mt-4 font-serif text-3xl text-[#071a3b] sm:text-4xl">
          Our Partner Companies
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
          Posters from companies partnered with Capitalkey Realtors
          will be displayed here.
        </p>
      </div>

      {/* =====================================================
          SLIDER
      ===================================================== */}

      <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.06]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {partnerPosters.map((poster) => (
            <div
              key={poster.id}
              className="w-full shrink-0"
            >
              {/* POSTER PLACEHOLDER */}
              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden sm:min-h-[340px] lg:min-h-[390px]">
                {/* BACKGROUND EFFECTS */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(7,26,59,0.08),_transparent_35%)]" />

                <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#071a3b]/[0.03]" />

                <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-[#071a3b]/5" />

                {/* CONTENT */}
                <div className="relative z-10 max-w-2xl px-16 text-center sm:px-20">
                  {/* PLACEHOLDER ICON */}
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
                    CAPITALKEY PARTNER
                  </p>

                  <h3 className="mt-3 font-serif text-2xl text-[#071a3b] sm:text-3xl">
                    {poster.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
                    Partner company poster will appear here after
                    being uploaded by the Capitalkey Realtors admin
                    or owner.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =================================================
            LEFT ARROW
        ================================================= */}

        {partnerPosters.length > 1 && (
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous partner poster"
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#071a3b] text-white shadow-lg transition hover:bg-[#123466] sm:left-6"
          >
            ←
          </button>
        )}

        {/* =================================================
            RIGHT ARROW
        ================================================= */}

        {partnerPosters.length > 1 && (
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next partner poster"
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#071a3b] text-white shadow-lg transition hover:bg-[#123466] sm:right-6"
          >
            →
          </button>
        )}
      </div>

      {/* =====================================================
          DOTS
      ===================================================== */}

      {partnerPosters.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {partnerPosters.map(
            (poster, index) => (
              <button
                key={poster.id}
                type="button"
                aria-label={`Partner poster ${index + 1}`}
                onClick={() =>
                  setCurrentIndex(index)
                }
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 bg-[#071a3b]"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}