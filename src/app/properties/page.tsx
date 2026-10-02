import Image from "next/image";
import Link from "next/link";

type PropertiesPageProps = {
  searchParams: Promise<{
    service?: string;
    type?: string;

    province?: string;
    district?: string;
    city?: string;

    beds?: string;
    baths?: string;
    guests?: string;

    commercialType?: string;
    floorArea?: string;
    landSize?: string;
    parking?: string;

    roomType?: string;
    bathroomType?: string;
    warehouseType?: string;
  }>;
};

function formatPropertyType(type?: string) {
  if (!type) {
    return "All Properties";
  }

  const names: Record<string, string> = {
    annex: "Annexes",
    apartment: "Apartments",
    bungalow: "Bungalows",
    commercial: "Commercial",
    house: "Houses",
    room: "Rooms / Boarding Places",
    "short-stay": "Short Stays",
    studio: "Studio / Bedsit",
    villa: "Villas",
    warehouse: "Warehouse",
  };

  return names[type] ?? type;
}

function formatCommercialType(value?: string) {
  const names: Record<string, string> = {
    office: "Office",
    shop: "Shop / Retail",
    retail: "Shop / Retail",
    restaurant: "Restaurant",
    warehouse: "Warehouse",
    building: "Commercial Building",
    other: "Other",
  };

  return value ? names[value] ?? value : "";
}

function formatRoomType(value?: string) {
  const names: Record<string, string> = {
    single: "Single Room",
    shared: "Shared Room",
    boarding: "Boarding Place",
    other: "Other",
  };

  return value ? names[value] ?? value : "";
}

function formatBathroomType(value?: string) {
  const names: Record<string, string> = {
    attached: "Attached Bathroom",
    shared: "Shared Bathroom",
  };

  return value ? names[value] ?? value : "";
}

function formatWarehouseType(value?: string) {
  const names: Record<string, string> = {
    storage: "Storage Warehouse",
    industrial: "Industrial Warehouse",
    distribution: "Distribution Warehouse",
    "cold-storage": "Cold Storage",
    other: "Other",
  };

  return value ? names[value] ?? value : "";
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;

  /* --------------------------------
     SERVICE
  -------------------------------- */

  const service =
    params.service === "sale"
      ? "sale"
      : "rent";

  const propertyType = formatPropertyType(
    params.type,
  );

  /* --------------------------------
     LOCATION
  -------------------------------- */

  const location =
    params.city ||
    params.district ||
    params.province ||
    "All Sri Lanka";

  /* --------------------------------
     ACTIVE FILTERS
  -------------------------------- */

  const filters: {
    label: string;
    value: string;
  }[] = [];

  if (params.province) {
    filters.push({
      label: "Province",
      value: params.province,
    });
  }

  if (params.district) {
    filters.push({
      label: "District",
      value: params.district,
    });
  }

  if (params.city) {
    filters.push({
      label: "Town / City",
      value: params.city,
    });
  }

  if (params.beds) {
    filters.push({
      label: "Bedrooms",
      value: params.beds,
    });
  }

  if (params.baths) {
    filters.push({
      label: "Bathrooms",
      value: params.baths,
    });
  }

  if (params.guests) {
    filters.push({
      label: "Guests",
      value: params.guests,
    });
  }

  if (params.commercialType) {
    filters.push({
      label: "Commercial Type",
      value: formatCommercialType(
        params.commercialType,
      ),
    });
  }

  if (params.landSize) {
    filters.push({
      label: "Minimum Land Size",
      value: `${params.landSize} Perches`,
    });
  }

  if (params.floorArea) {
    filters.push({
      label: "Minimum Floor Area",
      value: `${params.floorArea} sq.ft`,
    });
  }

  if (params.parking) {
    const parkingLabels: Record<
      string,
      string
    > = {
      required: "Parking Required",
      "not-required": "Parking Not Required",
      "1": "At least 1 space",
      "2": "At least 2 spaces",
      "3": "At least 3 spaces",
      "4": "4 or more spaces",
    };

    filters.push({
      label: "Parking",
      value:
        parkingLabels[params.parking] ??
        params.parking,
    });
  }

  if (params.roomType) {
    filters.push({
      label: "Room Type",
      value: formatRoomType(
        params.roomType,
      ),
    });
  }

  if (params.bathroomType) {
    filters.push({
      label: "Bathroom Type",
      value: formatBathroomType(
        params.bathroomType,
      ),
    });
  }

  if (params.warehouseType) {
    filters.push({
      label: "Warehouse Type",
      value: formatWarehouseType(
        params.warehouseType,
      ),
    });
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
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
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {service === "rent"
              ? "Properties For Rent"
              : "Properties For Sale"}
          </p>

          <h1 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
            {propertyType}
          </h1>

          <p className="mt-4 text-base text-slate-300">
            Showing{" "}
            {service === "rent"
              ? "rental properties"
              : "properties for sale"}{" "}
            around{" "}
            <span className="font-semibold text-white">
              {location}
            </span>
            .
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* SEARCH SUMMARY */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
                YOUR SEARCH
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#071a3b]">
                {propertyType}{" "}
                {service === "rent"
                  ? "For Rent"
                  : "For Sale"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {location}
              </p>
            </div>

            <Link
              href={
                service === "sale"
                  ? "/?service=sale"
                  : "/?service=rent"
              }
              className="inline-flex items-center justify-center rounded-full border border-[#071a3b] px-6 py-3 text-sm font-semibold text-[#071a3b] transition hover:bg-[#071a3b] hover:text-white"
            >
              Change Search
            </Link>
          </div>

          {/* ACTIVE FILTERS */}
          {filters.length > 0 && (
            <div className="mt-7 border-t border-slate-200 pt-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Selected Requirements
              </p>

              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <div
                    key={`${filter.label}-${filter.value}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2"
                  >
                    <span className="text-xs text-slate-500">
                      {filter.label}:{" "}
                    </span>

                    <span className="text-xs font-semibold text-[#071a3b]">
                      {filter.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PROPERTY RESULTS */}
        <div className="mt-10">
          <div className="mb-6">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              PROPERTY RESULTS
            </p>

            <h2 className="mt-2 font-serif text-3xl text-[#071a3b]">
              Available Properties
            </h2>
          </div>

          {/* TEMPORARY EMPTY STATE */}
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#071a3b] font-serif text-2xl text-white">
              K
            </div>

            <h3 className="mt-6 font-serif text-2xl text-[#071a3b]">
              Property listings will appear here
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Your search filters are working correctly. Once we
              connect the NestJS backend and MySQL property database,
              matching Capitalkey properties will automatically appear
              here.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/inquiry"
                className="rounded-full bg-[#071a3b] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#123466]"
              >
                Make an Inquiry
              </Link>

              <Link
                href={
                  service === "sale"
                    ? "/?service=sale"
                    : "/?service=rent"
                }
                className="rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-[#071a3b] transition hover:border-[#071a3b]"
              >
                Search Again
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-12 bg-[#04132d]">
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