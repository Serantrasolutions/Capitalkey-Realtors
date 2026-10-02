import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/capitalkey-logo.png"
            alt="Capitalkey Realtors"
            width={52}
            height={52}
            className="rounded-md object-cover"
            priority
          />

          <div className="leading-tight">
            <p className="font-serif text-xl tracking-[0.08em] text-white">
              CAPITALKEY
            </p>

            <p className="text-[10px] tracking-[0.36em] text-slate-300">
              REALTORS
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-white transition hover:text-slate-300"
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

        {/* ACTION BUTTONS */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/inquiry"
            className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Make an Inquiry
          </Link>

          <Link
            href="/properties"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#071a3b] transition hover:bg-slate-100"
          >
            View Properties
          </Link>
        </div>
      </div>
    </header>
  );
}