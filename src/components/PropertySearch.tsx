"use client";

import Link from "next/link";
import { useState } from "react";

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

  const selectedProperties =
    service === "rent"
      ? rentPropertyTypes
      : service === "sale"
        ? salePropertyTypes
        : [];

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* =====================================================
          MAIN PROPERTY JOURNEY
      ===================================================== */}

      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.06] px-5 py-7 shadow-xl shadow-black/10 backdrop-blur-md sm:px-7">
        {/* BACKGROUND EFFECTS */}

        <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-blue-300/[0.05] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="relative text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400">
            PROPERTY JOURNEY
          </p>

          <h2 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
            What are you looking to do?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-slate-400 sm:text-sm">
            Choose the option that matches your property requirement.
          </p>
        </div>

        {/* =================================================
            4 MAIN OPTIONS
        ================================================= */}

        <div className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* RENT */}

          <button
            type="button"
            aria-pressed={service === "rent"}
            onClick={() => setService("rent")}
            className={`cursor-pointer rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
              service === "rent"
                ? "border-white bg-white text-[#071a3b] shadow-lg shadow-black/10"
                : "border-white/10 bg-white/[0.055] text-white hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"
            }`}
          >
            <p
              className={`text-[9px] font-bold uppercase tracking-[0.2em] ${
                service === "rent"
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            >
              Find Property
            </p>

            <h3 className="mt-2 text-lg font-bold">
              Rent
            </h3>

            <p
              className={`mt-2 text-[11px] leading-5 ${
                service === "rent"
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            >
              Browse properties available for rent.
            </p>
          </button>

          {/* SALE */}

          <button
            type="button"
            aria-pressed={service === "sale"}
            onClick={() => setService("sale")}
            className={`cursor-pointer rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
              service === "sale"
                ? "border-white bg-white text-[#071a3b] shadow-lg shadow-black/10"
                : "border-white/10 bg-white/[0.055] text-white hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"
            }`}
          >
            <p
              className={`text-[9px] font-bold uppercase tracking-[0.2em] ${
                service === "sale"
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            >
              Find Property
            </p>

            <h3 className="mt-2 text-lg font-bold">
              Sale
            </h3>

            <p
              className={`mt-2 text-[11px] leading-5 ${
                service === "sale"
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            >
              Browse properties currently available for sale.
            </p>
          </button>

          {/* RENT OUT */}

          <Link
            href="/inquiry?service=rent"
            className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-4 text-left text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Property Owner
            </p>

            <h3 className="mt-2 text-lg font-bold">
              Rent Out
            </h3>

            <p className="mt-2 text-[11px] leading-5 text-slate-400">
              Submit your property to find a tenant.
            </p>
          </Link>

          {/* SELL */}

          <Link
            href="/inquiry?service=sell"
            className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-4 text-left text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Property Owner
            </p>

            <h3 className="mt-2 text-lg font-bold">
              Sell
            </h3>

            <p className="mt-2 text-[11px] leading-5 text-slate-400">
              Submit your property for sale through Capitalkey.
            </p>
          </Link>
        </div>

        {/* =================================================
            PROPERTY TYPES
        ================================================= */}

        {service !== null && (
          <div className="relative mt-8 border-t border-white/10 pt-7">
            {/* TITLE */}

            <div className="text-center">
              <p className="text-xs font-bold tracking-[0.27em] text-white">
                {service === "rent"
                  ? "FIND PROPERTY FOR RENT"
                  : "FIND PROPERTY FOR SALE"}
              </p>

              <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                {service === "rent"
                  ? "Choose the type of rental property you are looking for."
                  : "Choose the type of property you are interested in buying."}
              </p>
            </div>

            {/* PROPERTY CARDS */}

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {selectedProperties.map(
                (property) => (
                  <Link
                    key={property.href}
                    href={property.href}
                    className="flex min-h-[78px] items-center rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.12]"
                  >
                    <div>
                      <h3 className="font-serif text-base font-semibold text-white">
                        {property.title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-4 text-slate-400">
                        {property.description}
                      </p>
                    </div>
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