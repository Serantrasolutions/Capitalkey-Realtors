"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type RequirementOption = {
  value: string;
  label: string;
};

const requirementOptions: RequirementOption[] = [
  {
    value: "rent",
    label: "Rent a Property",
  },
  {
    value: "buy",
    label: "Buy a Property",
  },
  {
    value: "rent-out",
    label: "Rent Out a Property",
  },
  {
    value: "sell",
    label: "Sell a Property",
  },
];

export default function ContactSection() {
  const [requirement, setRequirement] = useState("");
  const [requirementOpen, setRequirementOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const selectedRequirement =
    requirementOptions.find(
      (option) => option.value === requirement,
    );

  /* =========================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent,
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node,
        )
      ) {
        setRequirementOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  function selectRequirement(
    option: RequirementOption,
  ) {
    setRequirement(option.value);
    setRequirementOpen(false);
  }

  return (
    <section
      id="contact"
      className="bg-[#04132d] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-slate-400">
              CONTACT
            </p>

            <h2 className="mt-6 max-w-lg font-serif text-4xl leading-tight text-white sm:text-5xl">
              Let&apos;s Talk About
              <span className="block text-slate-400">
                Your Property Needs.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
              Looking to rent, buy, rent out or sell a property?
              Send us your requirements and the Capitalkey Realtors
              team will get in touch with you.
            </p>

            {/* EMAIL */}
            <div className="mt-10">
              <p className="text-[10px] font-bold tracking-[0.25em] text-slate-500">
                EMAIL
              </p>

              <p className="mt-3 text-base text-white">
                info@capitalkeyrealtors.com
              </p>
            </div>

            {/* PHONE */}
            <div className="mt-7">
              <p className="text-[10px] font-bold tracking-[0.25em] text-slate-500">
                PHONE
              </p>

              <p className="mt-3 text-base text-white">
                +94 77 123 4567
              </p>
            </div>

            {/* LOCATION */}
            <div className="mt-7">
              <p className="text-[10px] font-bold tracking-[0.25em] text-slate-500">
                LOCATION
              </p>

              <p className="mt-3 text-base text-white">
                Colombo, Sri Lanka
              </p>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE - CONTACT FORM
          ================================================= */}

          <div>
            <form className="space-y-5">
              {/* NAME */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-[10px] font-semibold tracking-[0.16em] text-slate-400"
                >
                  NAME
                </label>

                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-white/30 focus:bg-white/[0.06]"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-[10px] font-semibold tracking-[0.16em] text-slate-400"
                >
                  EMAIL
                </label>

                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-white/30 focus:bg-white/[0.06]"
                />
              </div>

              {/* PHONE */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-2 block text-[10px] font-semibold tracking-[0.16em] text-slate-400"
                >
                  PHONE
                </label>

                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="+94 77 123 4567"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-white/30 focus:bg-white/[0.06]"
                />
              </div>

              {/* =================================================
                  REQUIREMENT
              ================================================= */}

              <div
                ref={dropdownRef}
                className="relative z-50"
              >
                <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-slate-400">
                  REQUIREMENT
                </p>

                {/* SELECT BUTTON */}
                <button
                  type="button"
                  onClick={() =>
                    setRequirementOpen(
                      (current) => !current,
                    )
                  }
                  className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left text-sm transition ${
                    requirementOpen
                      ? "border-white/30 bg-white/[0.07]"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={
                      selectedRequirement
                        ? "font-medium text-white"
                        : "text-slate-500"
                    }
                  >
                    {selectedRequirement?.label ??
                      "Select your requirement"}
                  </span>

                  {/* ARROW */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      requirementOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* DROPDOWN */}
                {requirementOpen && (
                  <div className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0b1e40] p-2 shadow-2xl shadow-black/30">
                    {requirementOptions.map(
                      (option) => {
                        const selected =
                          requirement ===
                          option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              selectRequirement(
                                option,
                              )
                            }
                            className={`flex w-full items-center rounded-lg px-4 py-3 text-left text-sm transition ${
                              selected
                                ? "bg-white font-semibold text-[#071a3b]"
                                : "text-slate-200 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      },
                    )}
                  </div>
                )}
              </div>

              {/* =================================================
                  PROPERTY REQUIREMENTS
              ================================================= */}

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-[10px] font-semibold tracking-[0.16em] text-slate-400"
                >
                  PROPERTY REQUIREMENTS
                </label>

                <textarea
                  id="contact-message"
                  rows={6}
                  placeholder="Tell us about the property you are looking for..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-white/30 focus:bg-white/[0.06]"
                />
              </div>

              {/* BUTTON */}
              <button
                type="button"
                className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#071a3b] transition hover:bg-slate-200"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}