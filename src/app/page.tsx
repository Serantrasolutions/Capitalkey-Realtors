import Image from "next/image";
import Link from "next/link";

import CapitalkeyClients from "@/components/CapitalkeyClients";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import PromotionSlider from "@/components/PromotionSlider";
import PropertySearch from "@/components/PropertySearch";
import StatsCounter from "@/components/StatsCounter";
import TieUpCompaniesSlider from "@/components/TieUpCompaniesSlider";

export default function Home() {
  return (
    <main className="bg-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#061a3a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(48,83,140,0.45),_transparent_38%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(31,60,111,0.35),_transparent_45%)]" />

        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-400/5 blur-[120px]" />

        <Navbar />

        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-36 text-center lg:px-8">
          {/* LOGO */}
          <div className="mb-6">
            <Image
              src="/capitalkey-logo.png"
              alt="Capitalkey Realtors Logo"
              width={115}
              height={115}
              priority
              className="rounded-2xl shadow-2xl shadow-black/30"
            />
          </div>

          {/* BRAND */}
          <p className="mb-5 text-xs font-semibold tracking-[0.38em] text-slate-300">
            CAPITALKEY REALTORS
          </p>

          {/* TITLE */}
          <h1 className="max-w-5xl font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Your Key To The
            <span className="block text-slate-300">
              Right Property
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Discover properties for rent and sale with a real estate
            service focused on simplicity, trust and finding the right
            property for every client.
          </p>
        </div>
      </section>

      {/* =====================================================
          TIE-UP COMPANIES
      ===================================================== */}

      <section className="bg-[#f6f8fb] py-20">
        <TieUpCompaniesSlider />
      </section>

      {/* =====================================================
          PROPERTY JOURNEY
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#061a3a] py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(48,83,140,0.25),_transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <PropertySearch />
        </div>
      </section>

      {/* =====================================================
          PROMOTIONS + CAPITALKEY CLIENTS
          SAME BACKGROUND
      ===================================================== */}

      <div className="bg-[#f6f8fb]">
        <PromotionSlider />

        <CapitalkeyClients />
      </div>

      {/* =====================================================
          ABOUT CAPITALKEY
      ===================================================== */}

      <section
        id="about"
        className="relative overflow-hidden border-t border-slate-200 bg-white py-20"
      >
        {/* BACKGROUND EFFECT */}
        <div className="pointer-events-none absolute -right-48 top-10 h-[420px] w-[420px] rounded-full bg-[#071a3b]/[0.025]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#17376c]" />

                <p className="text-[11px] font-bold tracking-[0.28em] text-[#17376c]">
                  ABOUT CAPITALKEY
                </p>
              </div>

              <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight text-[#071a3b] sm:text-5xl">
                Making Property
                <span className="block text-slate-500">
                  Decisions Simpler.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Capitalkey Realtors helps clients find the right
                property while supporting owners who want to rent out
                or sell their properties.
              </p>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Our focus is simple — clear property options, easy
                communication and reliable support throughout the
                process.
              </p>

              <div className="mt-7">
                <Link
                  href="/properties"
                  className="inline-flex rounded-full bg-[#071a3b] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#102d5f]"
                >
                  Explore Properties
                </Link>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="rounded-[28px] bg-[#071a3b] p-7 text-white shadow-xl shadow-slate-900/10 sm:p-8">
              <p className="text-[10px] font-bold tracking-[0.27em] text-slate-400">
                OUR APPROACH
              </p>

              <h3 className="mt-3 font-serif text-2xl text-white sm:text-3xl">
                Simple. Clear. Reliable.
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">
                A straightforward property experience designed around
                each client&apos;s requirements.
              </p>

              {/* BULLET 1 */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-start gap-4">
                  <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-slate-300" />

                  <div>
                    <h4 className="text-sm font-semibold leading-6 text-white">
                      Understand Your Needs
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      We begin with your property requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* BULLET 2 */}
              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="flex items-start gap-4">
                  <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-slate-300" />

                  <div>
                    <h4 className="text-sm font-semibold leading-6 text-white">
                      Find Relevant Options
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      We focus on properties that match your needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* BULLET 3 */}
              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="flex items-start gap-4">
                  <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-slate-300" />

                  <div>
                    <h4 className="text-sm font-semibold leading-6 text-white">
                      Support Your Journey
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Clear communication from inquiry to the next
                      step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <StatsCounter />

      {/* =====================================================
          WHY CAPITALKEY
      ===================================================== */}

      <section className="bg-[#f6f8fb] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* HEADER */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-[#17376c]">
              WHY CAPITALKEY
            </p>

            <h2 className="mt-5 font-serif text-4xl text-[#071a3b] sm:text-5xl">
              A Better Property Experience
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Designed to make finding, renting, purchasing and
              selling property simpler and more convenient.
            </p>
          </div>

          {/* CARDS */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* QUALITY LISTINGS */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#071a3b] text-white">
                01
              </div>

              <h3 className="mt-6 font-serif text-2xl text-[#071a3b]">
                Quality Listings
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Clear property information designed to help you make
                informed property decisions.
              </p>
            </div>

            {/* EASY SEARCH */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#071a3b] text-white">
                02
              </div>

              <h3 className="mt-6 font-serif text-2xl text-[#071a3b]">
                Easy Search
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Quickly discover properties by service, property
                category, location and your preferred requirements.
              </p>
            </div>

            {/* PROFESSIONAL SUPPORT */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#071a3b] text-white">
                03
              </div>

              <h3 className="mt-6 font-serif text-2xl text-[#071a3b]">
                Professional Support
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Connect with our team for assistance throughout your
                rental, purchasing or selling journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <ContactSection />

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/10 bg-[#04132d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-center md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <Image
              src="/capitalkey-logo.png"
              alt="Capitalkey Realtors"
              width={42}
              height={42}
              className="rounded-md"
            />

            <span className="font-serif text-lg tracking-wide text-white">
              Capitalkey Realtors
            </span>
          </div>

          <p className="text-xs text-slate-400">
            © 2026 Capitalkey Realtors. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}