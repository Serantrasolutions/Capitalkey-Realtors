import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import RentalSearchForm from "@/components/RentalSearchForm";
import {
  getRentalPropertyType,
  rentalPropertyTypes,
} from "@/config/rentalPropertyTypes";

type RentalPageProps = {
  params: Promise<{
    type: string;
  }>;
};

export function generateStaticParams() {
  return rentalPropertyTypes.map((propertyType) => ({
    type: propertyType.slug,
  }));
}

export default async function RentalPropertyPage({
  params,
}: RentalPageProps) {
  const { type } = await params;

  const propertyType = getRentalPropertyType(type);

  if (!propertyType) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb]">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* BRAND */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/capitalkey-logo.png"
              alt="Capitalkey Realtors"
              width={48}
              height={48}
              className="rounded-md"
              priority
            />

            <div className="leading-tight">
              <p className="font-serif text-lg tracking-[0.08em] text-[#071a3b]">
                CAPITALKEY
              </p>

              <p className="text-[9px] tracking-[0.35em] text-slate-500">
                REALTORS
              </p>
            </div>
          </Link>

          {/* BACK */}
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-[#071a3b] transition hover:border-[#071a3b]"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#071a3b]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Rent / {propertyType.title}
          </p>

          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Find {propertyType.title} For Rent
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            {propertyType.description}
          </p>
        </div>
      </section>

      {/* RENTAL SEARCH FORM */}
      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <RentalSearchForm propertyType={propertyType} />
      </section>

      {/* FOOTER */}
      <footer className="bg-[#04132d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <p className="font-serif text-lg text-white">
            Capitalkey Realtors
          </p>

          <p className="text-xs text-slate-400">
            © 2026 Capitalkey Realtors. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}