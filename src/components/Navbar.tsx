"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between border-b border-white/10">
          {/* =================================================
              LOGO + COMPANY NAME
          ================================================= */}

          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3"
          >
            <Image
              src="/capitalkey-logo.png"
              alt="Capitalkey Realtors"
              width={54}
              height={54}
              priority
              className="h-11 w-11 shrink-0 rounded-md sm:h-[54px] sm:w-[54px]"
            />

            <div className="min-w-0">
              {/* CAPITALKEY */}
              <p className="whitespace-nowrap font-serif text-[15px] font-semibold uppercase leading-none tracking-[0.04em] text-white sm:text-[19px]">
                CAPITALKEY
              </p>

              {/* REALTORS */}
              <p className="mt-1.5 whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.38em] text-slate-300 sm:text-[9px] sm:tracking-[0.42em]">
                REALTORS
              </p>

              {/* ESTABLISHED */}
              <p className="mt-1.5 whitespace-nowrap text-[6px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:text-[7px] sm:tracking-[0.2em]">
                ESTABLISHED 2026
              </p>
            </div>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav className="hidden items-center gap-9 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/properties?service=rent"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Rent
            </Link>

            <Link
              href="/properties?service=sale"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Sale
            </Link>

            <Link
              href="/#about"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/#contact"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Contact
            </Link>
          </nav>

          {/* =================================================
              DESKTOP BUTTONS
          ================================================= */}

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/inquiry"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Make an Inquiry
            </Link>

            <Link
              href="/properties"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#071a3b] transition hover:bg-slate-200"
            >
              View Properties
            </Link>
          </div>

          {/* =================================================
              MOBILE HAMBURGER
          ================================================= */}

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen(
                (current) => !current,
              )
            }
            className="relative ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white transition hover:bg-white/10 lg:hidden"
          >
            <div className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-[3px] h-[1.5px] w-5 bg-white transition-all duration-300 ${
                  mobileMenuOpen
                    ? "translate-y-[6px] rotate-45"
                    : ""
                }`}
              />

              <span
                className={`absolute left-0 top-[9px] h-[1.5px] w-5 bg-white transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              />

              <span
                className={`absolute left-0 top-[15px] h-[1.5px] w-5 bg-white transition-all duration-300 ${
                  mobileMenuOpen
                    ? "-translate-y-[6px] -rotate-45"
                    : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            mobileMenuOpen
              ? "max-h-[600px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="mt-3 rounded-[24px] border border-white/10 bg-[#091d42]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <nav className="flex flex-col">
              <Link
                href="/"
                onClick={closeMenu}
                className="border-b border-white/10 px-4 py-4 text-sm font-medium text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/properties?service=rent"
                onClick={closeMenu}
                className="border-b border-white/10 px-4 py-4 text-sm font-medium text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
              >
                Rent
              </Link>

              <Link
                href="/properties?service=sale"
                onClick={closeMenu}
                className="border-b border-white/10 px-4 py-4 text-sm font-medium text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
              >
                Sale
              </Link>

              <Link
                href="/#about"
                onClick={closeMenu}
                className="border-b border-white/10 px-4 py-4 text-sm font-medium text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
              >
                About
              </Link>

              <Link
                href="/#contact"
                onClick={closeMenu}
                className="px-4 py-4 text-sm font-medium text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
              >
                Contact
              </Link>
            </nav>

            <div className="mt-4 grid gap-3">
              <Link
                href="/inquiry"
                onClick={closeMenu}
                className="flex items-center justify-center rounded-full border border-white/25 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Make an Inquiry
              </Link>

              <Link
                href="/properties"
                onClick={closeMenu}
                className="flex items-center justify-center rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-[#071a3b] transition hover:bg-slate-200"
              >
                View Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}