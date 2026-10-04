import Link from "next/link";

type Development = {
  id: number;
  title: string;
  location: string;
  type: string;
  status: string;
};

/*
  FUTURE CRM INTEGRATION

  Later these developments will come from the backend.

  Admin / Owner will be able to:
  - Add a new development
  - Upload development photos
  - Add location
  - Add property type
  - Add price information
  - Add completion date
  - Add description
  - Enable / disable development
  - Delete development

  For now these are only example placeholders.
*/

const developments: Development[] = [
  {
    id: 1,
    title: "New Development 01",
    location: "Location will be added",
    type: "Residential Development",
    status: "Available",
  },
  {
    id: 2,
    title: "New Development 02",
    location: "Location will be added",
    type: "Apartment Development",
    status: "Available",
  },
  {
    id: 3,
    title: "New Development 03",
    location: "Location will be added",
    type: "Upcoming Development",
    status: "Coming Soon",
  },
];

export default function NewDevelopmentsPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-[#061a3a] px-6 pb-20 pt-16 text-white">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Back to Home
          </Link>

          <div className="mt-12 max-w-3xl">
            <p className="text-xs font-bold tracking-[0.3em] text-slate-400">
              CAPITALKEY REALTORS
            </p>

            <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              New Developments
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Discover new residential, apartment and property
              developments available through Capitalkey Realtors.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          DEVELOPMENTS
      ===================================================== */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div>
            <p className="text-xs font-bold tracking-[0.28em] text-[#17376c]">
              AVAILABLE PROJECTS
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#071a3b] sm:text-4xl">
              Explore New Developments
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              New development projects added by Capitalkey Realtors
              will be displayed here.
            </p>
          </div>

          {/* DEVELOPMENT GRID */}

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {developments.map((development) => (
              <div
                key={development.id}
                className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE PLACEHOLDER */}

                <div className="relative flex aspect-[16/10] items-center justify-center bg-slate-100">
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#071a3b]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-7 w-7 text-white"
                      >
                        <path
                          d="M4 20V8l8-4 8 4v12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M8 20v-5h8v5"
                          strokeLinecap="round"
                        />

                        <path
                          d="M8 10h2M14 10h2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-slate-400">
                      DEVELOPMENT IMAGE
                    </p>
                  </div>
                </div>

                {/* DETAILS */}

                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17376c]">
                      {development.type}
                    </p>

                    <span className="rounded-full bg-[#071a3b]/5 px-3 py-1 text-[10px] font-semibold text-[#071a3b]">
                      {development.status}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl text-[#071a3b]">
                    {development.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {development.location}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    Full development information, property
                    availability and project details will appear here.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}