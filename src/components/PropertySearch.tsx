"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type ServiceType = "rent" | "sale" | null;

type PropertyType = {
  title: string;
  description: string;
  href: string;
};

/* =========================================================
   RENT PROPERTY TYPES
========================================================= */

const rentPropertyTypes: PropertyType[] = [
  {
    title: "All Properties",
    description: "Browse all rental properties.",
    href: "/properties?service=rent",
  },
  {
    title: "Annexes",
    description: "Private annexes available for rent.",
    href: "/rent/annex",
  },
  {
    title: "Apartments",
    description: "Apartments to suit your lifestyle.",
    href: "/rent/apartment",
  },
  {
    title: "Bungalows",
    description: "Comfortable bungalows for rent.",
    href: "/rent/bungalow",
  },
  {
    title: "Commercial",
    description: "Offices, shops and business spaces.",
    href: "/rent/commercial",
  },
  {
    title: "Houses",
    description: "Houses for individuals and families.",
    href: "/rent/house",
  },
  {
    title: "Land",
    description: "Land available for different purposes.",
    href: "/rent/land",
  },
  {
    title: "Rooms / Boarding Places",
    description: "Rooms and boarding accommodation.",
    href: "/rent/room",
  },
  {
    title: "Short Stays",
    description: "Short-term rental accommodation.",
    href: "/rent/short-stay",
  },
  {
    title: "Studio / Bedsit",
    description: "Compact spaces for individuals.",
    href: "/rent/studio",
  },
  {
    title: "Villas",
    description: "Premium villas available for rent.",
    href: "/rent/villa",
  },
];

/* =========================================================
   SALE PROPERTY TYPES
========================================================= */

const salePropertyTypes: PropertyType[] = [
  {
    title: "Houses",
    description: "Houses available for sale.",
    href: "/sale/house",
  },
  {
    title: "Apartments",
    description: "Apartments available for sale.",
    href: "/sale/apartment",
  },
  {
    title: "Commercial",
    description: "Commercial properties for sale.",
    href: "/sale/commercial",
  },
  {
    title: "Bungalows",
    description: "Bungalows available for sale.",
    href: "/sale/bungalow",
  },
  {
    title: "Land",
    description: "Land available for different purposes.",
    href: "/sale/land",
  },
  {
    title: "Villas",
    description: "Premium villas available for sale.",
    href: "/sale/villa",
  },
  {
    title: "Studio / Bedsit",
    description: "Studio properties available for sale.",
    href: "/sale/studio",
  },
  {
    title: "Warehouse",
    description: "Warehouse properties available for sale.",
    href: "/sale/warehouse",
  },
];

export default function PropertySearch() {
  const [service, setService] =
    useState<ServiceType>(null);

  const propertyOptionsRef =
    useRef<HTMLDivElement>(null);

  const selectedProperties =
    service === "rent"
      ? rentPropertyTypes
      : service === "sale"
        ? salePropertyTypes
        : [];

  /* =========================================================
     RENT / SALE SELECT + SMOOTH SCROLL
  ========================================================= */

  function selectService(
    selectedService: "rent" | "sale",
  ) {
    setService(selectedService);

    /*
      Wait until React displays the property options,
      then scroll DOWN to that section.

      We check the current scroll position so it does
      not suddenly jump upward.
    */
    window.setTimeout(() => {
      const section =
        propertyOptionsRef.current;

      if (!section) {
        return;
      }

      const sectionPosition =
        section.getBoundingClientRect().top +
        window.scrollY;

      const offset =
        window.innerWidth < 640 ? 20 : 35;

      const targetPosition =
        sectionPosition - offset;

      /*
        Only scroll if the target is below
        the current position.
      */
      if (
        targetPosition >
        window.scrollY + 10
      ) {
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }, 80);
  }

  const mainCard =
    "relative flex min-h-[70px] flex-col justify-center overflow-hidden rounded-xl border px-3 py-2.5 text-center transition-all duration-300 sm:min-h-[120px] sm:items-start sm:justify-start sm:rounded-2xl sm:px-4 sm:py-4 sm:text-left xl:min-h-[135px]";

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[22px] border border-white/15 bg-white/[0.06] px-4 py-5 shadow-xl shadow-black/10 backdrop-blur-md sm:rounded-[28px] sm:px-6 sm:py-7 lg:px-7">
        {/* BACKGROUND LIGHT */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-blue-300/[0.05] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-white/[0.04] blur-3xl" />

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="relative text-center">
          <p className="text-[7px] font-bold tracking-[0.3em] text-slate-400 sm:text-[10px]">
            PROPERTY JOURNEY
          </p>

          <h2 className="mt-1.5 font-serif text-lg text-white sm:mt-2 sm:text-3xl">
            What are you looking to do?
          </h2>

          <p className="mx-auto mt-1 max-w-xl text-[9px] leading-4 text-slate-400 sm:mt-2 sm:text-sm">
            Choose the option that matches your property requirement.
          </p>
        </div>

        {/* =================================================
            MAIN OPTIONS
        ================================================= */}

        <div className="relative mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3 md:grid-cols-3 xl:grid-cols-5">
          {/* RENT */}

          <button
            type="button"
            aria-pressed={service === "rent"}
            onClick={() =>
              selectService("rent")
            }
            className={`${mainCard} ${
              service === "rent"
                ? "border-white bg-white text-[#071a3b] shadow-lg shadow-black/10"
                : "border-white/10 bg-white/[0.055] text-white hover:border-white/25 hover:bg-white/[0.1]"
            }`}
          >
            <p
              className={`mb-1 text-[6px] font-bold uppercase tracking-[0.18em] sm:text-[8px] ${
                service === "rent"
                  ? "text-slate-500"
                  : "text-slate-500 sm:text-slate-400"
              }`}
            >
              Find Property
            </p>

            <h3 className="text-sm font-bold leading-5 sm:mt-1 sm:text-lg">
              Rent
            </h3>

            <p
              className={`mt-2 hidden text-[11px] leading-5 sm:block ${
                service === "rent"
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            >
              Browse properties available for rent.
            </p>

            {service === "rent" && (
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#071a3b] sm:right-3 sm:top-3" />
            )}
          </button>

          {/* SALE */}

          <button
            type="button"
            aria-pressed={service === "sale"}
            onClick={() =>
              selectService("sale")
            }
            className={`${mainCard} ${
              service === "sale"
                ? "border-white bg-white text-[#071a3b] shadow-lg shadow-black/10"
                : "border-white/10 bg-white/[0.055] text-white hover:border-white/25 hover:bg-white/[0.1]"
            }`}
          >
            <p
              className={`mb-1 text-[6px] font-bold uppercase tracking-[0.18em] sm:text-[8px] ${
                service === "sale"
                  ? "text-slate-500"
                  : "text-slate-500 sm:text-slate-400"
              }`}
            >
              Find Property
            </p>

            <h3 className="text-sm font-bold leading-5 sm:mt-1 sm:text-lg">
              Sale
            </h3>

            <p
              className={`mt-2 hidden text-[11px] leading-5 sm:block ${
                service === "sale"
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            >
              Browse properties currently available for sale.
            </p>

            {service === "sale" && (
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#071a3b] sm:right-3 sm:top-3" />
            )}
          </button>

          {/* RENT OUT */}

          <Link
            href="/inquiry?service=rent"
            className={`${mainCard} border-white/10 bg-white/[0.055] text-white hover:border-white/25 hover:bg-white/[0.1]`}
          >
            <p className="mb-1 text-[6px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-[8px] sm:text-slate-400">
              Property Owner
            </p>

            <h3 className="text-sm font-bold leading-5 sm:mt-1 sm:text-lg">
              Rent Out
            </h3>

            <p className="mt-2 hidden text-[11px] leading-5 text-slate-400 sm:block">
              Submit your property to find a tenant.
            </p>
          </Link>

          {/* SELL */}

          <Link
            href="/inquiry?service=sell"
            className={`${mainCard} border-white/10 bg-white/[0.055] text-white hover:border-white/25 hover:bg-white/[0.1]`}
          >
            <p className="mb-1 text-[6px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-[8px] sm:text-slate-400">
              Property Owner
            </p>

            <h3 className="text-sm font-bold leading-5 sm:mt-1 sm:text-lg">
              Sell
            </h3>

            <p className="mt-2 hidden text-[11px] leading-5 text-slate-400 sm:block">
              Submit your property for sale through Capitalkey.
            </p>
          </Link>

          {/* NEW DEVELOPMENT */}

          <Link
            href="/new-developments"
            className={`${mainCard} col-span-2 border-white/10 bg-white/[0.055] text-white hover:border-white/25 hover:bg-white/[0.1] sm:col-span-1`}
          >
            <p className="mb-1 text-[6px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-[8px] sm:text-slate-400">
              Discover
            </p>

            <h3 className="text-sm font-bold leading-5 sm:mt-1 sm:text-lg">
              New Development
            </h3>

            <p className="mt-2 hidden text-[11px] leading-5 text-slate-400 sm:block">
              Explore newly developed property projects.
            </p>
          </Link>
        </div>

        {/* =================================================
            RENT / SALE PROPERTY TYPES
        ================================================= */}

        {service !== null && (
          <div
            ref={propertyOptionsRef}
            className="relative mt-4 border-t border-white/10 pt-4 sm:mt-8 sm:pt-7"
          >
            {/* HEADING */}

            <div className="text-center">
              <p className="text-[8px] font-bold tracking-[0.22em] text-white sm:text-xs sm:tracking-[0.27em]">
                {service === "rent"
                  ? "FIND PROPERTY FOR RENT"
                  : "FIND PROPERTY FOR SALE"}
              </p>

              <p className="mt-1 text-[9px] leading-4 text-slate-400 sm:mt-2 sm:text-sm">
                {service === "rent"
                  ? "Choose the type of rental property you are looking for."
                  : "Choose the type of property you are interested in buying."}
              </p>
            </div>

            {/* PROPERTY GRID */}

            <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {selectedProperties.map(
                (property) => (
                  <Link
                    key={property.href}
                    href={property.href}
                    className="relative flex min-h-[58px] flex-col justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.07] px-3 py-2 text-left transition-all duration-300 hover:border-white/25 hover:bg-white/[0.12] sm:min-h-[78px] sm:rounded-xl sm:px-4 sm:py-3"
                  >
                    <h3 className="font-serif text-[12px] font-semibold leading-4 text-white sm:text-base sm:leading-5">
                      {property.title}
                    </h3>

                    <p className="mt-1 hidden text-[11px] leading-4 text-slate-400 sm:block">
                      {property.description}
                    </p>
                  </Link>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}