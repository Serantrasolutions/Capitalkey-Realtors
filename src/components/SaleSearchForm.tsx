"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import ModernSelect from "@/components/ModernSelect";
import type { SalePropertyType } from "@/config/salePropertyTypes";

type Province = {
  id: string;
  name_en: string;
};

type District = {
  id: string;
  province_id: string;
  name_en: string;
};

type City = {
  id: string;
  district_id: string;
  name_en: string;
  sub_name_en: string;
};

type SaleSearchFormProps = {
  propertyType: SalePropertyType;
};

export default function SaleSearchForm({
  propertyType,
}: SaleSearchFormProps) {
  /* --------------------------------
     LOCATION
  -------------------------------- */

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [loadingLocations, setLoadingLocations] = useState(true);

  /* --------------------------------
     PROPERTY REQUIREMENTS
  -------------------------------- */

  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const [landSize, setLandSize] = useState("");
  const [floorArea, setFloorArea] = useState("");

  const [parking, setParking] = useState("");

  const [commercialType, setCommercialType] = useState("");
  const [bathroomType, setBathroomType] = useState("");
  const [warehouseType, setWarehouseType] = useState("");

  const numberOptions = [1, 2, 3, 4, 5];

  /* --------------------------------
     LOAD LOCATION DATA
  -------------------------------- */

  useEffect(() => {
    async function loadLocations() {
      try {
        const [provinceResponse, districtResponse, cityResponse] =
          await Promise.all([
            fetch("/data/provinces.json"),
            fetch("/data/districts.json"),
            fetch("/data/cities.json"),
          ]);

        if (
          !provinceResponse.ok ||
          !districtResponse.ok ||
          !cityResponse.ok
        ) {
          throw new Error("Unable to load location data.");
        }

        const provinceData: Province[] =
          await provinceResponse.json();

        const districtData: District[] =
          await districtResponse.json();

        const cityData: City[] =
          await cityResponse.json();

        setProvinces(provinceData);
        setDistricts(districtData);
        setCities(cityData);
      } catch (error) {
        console.error(
          "Failed to load Sri Lanka locations:",
          error,
        );
      } finally {
        setLoadingLocations(false);
      }
    }

    loadLocations();
  }, []);

  /* --------------------------------
     FILTER DISTRICTS
  -------------------------------- */

  const filteredDistricts = useMemo(() => {
    if (!selectedProvince) {
      return districts;
    }

    return districts.filter(
      (district) =>
        district.province_id === selectedProvince,
    );
  }, [districts, selectedProvince]);

  /* --------------------------------
     FILTER CITIES
  -------------------------------- */

  const filteredCities = useMemo(() => {
    if (selectedDistrict) {
      return cities
        .filter(
          (city) =>
            city.district_id === selectedDistrict,
        )
        .sort((a, b) =>
          a.name_en.localeCompare(b.name_en),
        );
    }

    if (selectedProvince) {
      const districtIds = districts
        .filter(
          (district) =>
            district.province_id === selectedProvince,
        )
        .map((district) => district.id);

      return cities
        .filter((city) =>
          districtIds.includes(city.district_id),
        )
        .sort((a, b) =>
          a.name_en.localeCompare(b.name_en),
        );
    }

    return [...cities].sort((a, b) =>
      a.name_en.localeCompare(b.name_en),
    );
  }, [
    cities,
    districts,
    selectedProvince,
    selectedDistrict,
  ]);

  function handleProvinceChange(value: string) {
    setSelectedProvince(value);
    setSelectedDistrict("");
    setSelectedCity("");
  }

  function handleDistrictChange(value: string) {
    setSelectedDistrict(value);
    setSelectedCity("");
  }

  /* --------------------------------
     LOCATION NAMES
  -------------------------------- */

  const selectedProvinceName =
    provinces.find(
      (province) =>
        province.id === selectedProvince,
    )?.name_en ?? "";

  const selectedDistrictName =
    districts.find(
      (district) =>
        district.id === selectedDistrict,
    )?.name_en ?? "";

  const selectedCityName =
    cities.find(
      (city) => city.id === selectedCity,
    )?.name_en ?? "";

  /* --------------------------------
     SEARCH PARAMETERS
  -------------------------------- */

  const searchParams = new URLSearchParams({
    service: "sale",
    type: propertyType.slug,
  });

  if (selectedProvinceName) {
    searchParams.set(
      "province",
      selectedProvinceName,
    );
  }

  if (selectedDistrictName) {
    searchParams.set(
      "district",
      selectedDistrictName,
    );
  }

  if (selectedCityName) {
    searchParams.set(
      "city",
      selectedCityName,
    );
  }

  if (propertyType.filters.bedrooms) {
    searchParams.set(
      "beds",
      bedrooms.toString(),
    );
  }

  if (propertyType.filters.bathrooms) {
    searchParams.set(
      "baths",
      bathrooms.toString(),
    );
  }

  if (
    propertyType.filters.landSize &&
    landSize
  ) {
    searchParams.set(
      "landSize",
      landSize,
    );
  }

  if (
    propertyType.filters.floorArea &&
    floorArea
  ) {
    searchParams.set(
      "floorArea",
      floorArea,
    );
  }

  if (
    propertyType.filters.parking &&
    parking
  ) {
    searchParams.set(
      "parking",
      parking,
    );
  }

  if (
    propertyType.filters.commercialType &&
    commercialType
  ) {
    searchParams.set(
      "commercialType",
      commercialType,
    );
  }

  if (
    propertyType.filters.bathroomType &&
    bathroomType
  ) {
    searchParams.set(
      "bathroomType",
      bathroomType,
    );
  }

  if (
    propertyType.filters.warehouseType &&
    warehouseType
  ) {
    searchParams.set(
      "warehouseType",
      warehouseType,
    );
  }

  return (
    <div className="overflow-visible rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      {/* HEADER */}
      <div className="rounded-t-3xl bg-[#071a3b] px-6 py-8 sm:px-10">
        <p className="text-xs font-semibold tracking-[0.25em] text-slate-400">
          PROPERTY SALE
        </p>

        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
          Find {propertyType.title} For Sale
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
          {propertyType.description}
        </p>
      </div>

      <div className="space-y-10 p-6 sm:p-10">
        {/* LOCATION */}
        {propertyType.filters.location && (
          <section>
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              01 — LOCATION
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              Where would you like to find property?
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Select the province, district and town or city.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <ModernSelect
                label="Province"
                value={selectedProvince}
                placeholder={
                  loadingLocations
                    ? "Loading Provinces..."
                    : "All Provinces"
                }
                disabled={loadingLocations}
                searchable
                onChange={handleProvinceChange}
                options={[...provinces]
                  .sort((a, b) =>
                    a.name_en.localeCompare(
                      b.name_en,
                    ),
                  )
                  .map((province) => ({
                    value: province.id,
                    label: `${province.name_en} Province`,
                  }))}
              />

              <ModernSelect
                label="District"
                value={selectedDistrict}
                placeholder={
                  loadingLocations
                    ? "Loading Districts..."
                    : "All Districts"
                }
                disabled={loadingLocations}
                searchable
                onChange={handleDistrictChange}
                options={[...filteredDistricts]
                  .sort((a, b) =>
                    a.name_en.localeCompare(
                      b.name_en,
                    ),
                  )
                  .map((district) => ({
                    value: district.id,
                    label: district.name_en,
                  }))}
              />

              <ModernSelect
                label="Town / City"
                value={selectedCity}
                placeholder={
                  loadingLocations
                    ? "Loading Towns..."
                    : "All Towns"
                }
                disabled={loadingLocations}
                searchable
                onChange={setSelectedCity}
                options={filteredCities.map(
                  (city) => ({
                    value: city.id,
                    label:
                      city.sub_name_en &&
                      city.sub_name_en !== "NULL"
                        ? `${city.name_en} - ${city.sub_name_en}`
                        : city.name_en,
                  }),
                )}
              />
            </div>
          </section>
        )}

        {/* BEDROOMS / BATHROOMS */}
        {(propertyType.filters.bedrooms ||
          propertyType.filters.bathrooms) && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              02 — PROPERTY REQUIREMENTS
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              Property requirements
            </h3>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {propertyType.filters.bedrooms && (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Bedrooms
                    </label>

                    <span className="text-xs text-slate-400">
                      1 - 5
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {numberOptions.map(
                      (number) => (
                        <button
                          key={number}
                          type="button"
                          onClick={() =>
                            setBedrooms(number)
                          }
                          className={`rounded-xl border py-3.5 text-sm font-semibold transition ${
                            bedrooms === number
                              ? "border-[#071a3b] bg-[#071a3b] text-white"
                              : "border-slate-300 bg-white text-[#071a3b] hover:border-[#071a3b]"
                          }`}
                        >
                          {number}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {propertyType.filters.bathrooms && (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Bathrooms
                    </label>

                    <span className="text-xs text-slate-400">
                      1 - 5
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {numberOptions.map(
                      (number) => (
                        <button
                          key={number}
                          type="button"
                          onClick={() =>
                            setBathrooms(number)
                          }
                          className={`rounded-xl border py-3.5 text-sm font-semibold transition ${
                            bathrooms === number
                              ? "border-[#071a3b] bg-[#071a3b] text-white"
                              : "border-slate-300 bg-white text-[#071a3b] hover:border-[#071a3b]"
                          }`}
                        >
                          {number}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* PROPERTY SIZE */}
        {(propertyType.filters.landSize ||
          propertyType.filters.floorArea) && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              PROPERTY SIZE
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              Preferred property size
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {propertyType.filters.landSize && (
                <div>
                  <label
                    htmlFor="landSize"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Minimum Land Size
                  </label>

                  <div className="relative">
                    <input
                      id="landSize"
                      type="number"
                      min="0"
                      value={landSize}
                      onChange={(event) =>
                        setLandSize(
                          event.target.value,
                        )
                      }
                      placeholder="Example: 10"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pr-24 text-[#071a3b] outline-none transition focus:border-[#071a3b] focus:ring-2 focus:ring-[#071a3b]/10"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500">
                      Perches
                    </span>
                  </div>
                </div>
              )}

              {propertyType.filters.floorArea && (
                <div>
                  <label
                    htmlFor="floorArea"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Minimum Floor Area
                  </label>

                  <div className="relative">
                    <input
                      id="floorArea"
                      type="number"
                      min="0"
                      value={floorArea}
                      onChange={(event) =>
                        setFloorArea(
                          event.target.value,
                        )
                      }
                      placeholder="Example: 1500"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pr-20 text-[#071a3b] outline-none transition focus:border-[#071a3b] focus:ring-2 focus:ring-[#071a3b]/10"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500">
                      sq.ft
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* PARKING */}
        {propertyType.filters.parking && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              PARKING
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              Parking requirement
            </h3>

            <div className="mt-6 max-w-lg">
              <ModernSelect
                label="Parking"
                value={parking}
                placeholder="Any Parking"
                onChange={setParking}
                options={[
                  {
                    value: "1",
                    label: "At least 1 parking space",
                  },
                  {
                    value: "2",
                    label: "At least 2 parking spaces",
                  },
                  {
                    value: "3",
                    label: "At least 3 parking spaces",
                  },
                  {
                    value: "4",
                    label: "4 or more parking spaces",
                  },
                ]}
              />
            </div>
          </section>
        )}

        {/* COMMERCIAL */}
        {propertyType.filters.commercialType && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              COMMERCIAL TYPE
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              What kind of commercial property?
            </h3>

            <div className="mt-6 max-w-lg">
              <ModernSelect
                label="Commercial Type"
                value={commercialType}
                placeholder="Any Commercial Type"
                onChange={setCommercialType}
                options={[
                  {
                    value: "office",
                    label: "Office",
                  },
                  {
                    value: "retail",
                    label: "Shop / Retail",
                  },
                  {
                    value: "restaurant",
                    label: "Restaurant",
                  },
                  {
                    value: "building",
                    label: "Commercial Building",
                  },
                  {
                    value: "other",
                    label: "Other",
                  },
                ]}
              />
            </div>
          </section>
        )}

        {/* BATHROOM */}
        {propertyType.filters.bathroomType && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              BATHROOM
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              Bathroom preference
            </h3>

            <div className="mt-6 max-w-lg">
              <ModernSelect
                label="Bathroom Type"
                value={bathroomType}
                placeholder="Any Bathroom Type"
                onChange={setBathroomType}
                options={[
                  {
                    value: "attached",
                    label: "Attached Bathroom",
                  },
                  {
                    value: "shared",
                    label: "Shared Bathroom",
                  },
                ]}
              />
            </div>
          </section>
        )}

        {/* WAREHOUSE */}
        {propertyType.filters.warehouseType && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              WAREHOUSE TYPE
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              What type of warehouse?
            </h3>

            <div className="mt-6 max-w-lg">
              <ModernSelect
                label="Warehouse Type"
                value={warehouseType}
                placeholder="Any Warehouse Type"
                onChange={setWarehouseType}
                options={[
                  {
                    value: "storage",
                    label: "Storage Warehouse",
                  },
                  {
                    value: "industrial",
                    label: "Industrial Warehouse",
                  },
                  {
                    value: "distribution",
                    label: "Distribution Warehouse",
                  },
                  {
                    value: "cold-storage",
                    label: "Cold Storage",
                  },
                  {
                    value: "other",
                    label: "Other",
                  },
                ]}
              />
            </div>
          </section>
        )}

        {/* SEARCH */}
        <section className="border-t border-slate-200 pt-8">
          <div className="flex flex-col gap-5 rounded-2xl bg-[#f5f7fa] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
                YOUR SEARCH
              </p>

              <h3 className="mt-2 font-serif text-xl text-[#071a3b]">
                {propertyType.title} For Sale
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {selectedCityName ||
                  selectedDistrictName ||
                  selectedProvinceName ||
                  "Anywhere in Sri Lanka"}
              </p>
            </div>

            <Link
              href={`/properties?${searchParams.toString()}`}
              className="inline-flex items-center justify-center rounded-full bg-[#071a3b] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#123466]"
            >
              Search {propertyType.title}
              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}