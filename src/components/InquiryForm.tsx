"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import countries from "world-countries";

import ModernSelect from "@/components/ModernSelect";
import { rentalPropertyTypes } from "@/config/rentalPropertyTypes";
import { salePropertyTypes } from "@/config/salePropertyTypes";

type ServiceType = "rent" | "buy" | "sell";

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

const religionOptions = [
  "Muslim",
  "Buddhist",
  "Hindu",
  "Christian",
  "Other",
];

export default function InquiryForm() {
  const [service, setService] = useState<ServiceType>("rent");
  const [propertyType, setPropertyType] = useState("apartment");

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
     PROPERTY DETAILS
  -------------------------------- */

  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const [guests, setGuests] = useState("1");

  const [commercialType, setCommercialType] = useState("");

  const [landSize, setLandSize] = useState("");
  const [floorArea, setFloorArea] = useState("");

  const [parking, setParking] = useState("");

  const [roomType, setRoomType] = useState("");
  const [bathroomType, setBathroomType] = useState("");

  const [warehouseType, setWarehouseType] = useState("");

  /* --------------------------------
     RENT / BUY BUDGET
  -------------------------------- */

  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  /* --------------------------------
     SELL PRICE
  -------------------------------- */

  const [askingPrice, setAskingPrice] = useState("");

  /* --------------------------------
     CUSTOMER
  -------------------------------- */

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [customerCountry, setCustomerCountry] = useState("");
  const [customerReligion, setCustomerReligion] = useState("");

  const [message, setMessage] = useState("");

  /* --------------------------------
     FORM STATE
  -------------------------------- */

  const [submitted, setSubmitted] = useState(false);

  const numberOptions = [1, 2, 3, 4, 5];

  /* --------------------------------
     PROPERTY TYPES
  -------------------------------- */

  const availablePropertyTypes =
    service === "rent"
      ? rentalPropertyTypes
      : salePropertyTypes;

  const selectedRentalProperty =
    service === "rent"
      ? rentalPropertyTypes.find(
          (property) => property.slug === propertyType,
        )
      : undefined;

  const selectedBuyOrSellProperty =
    service === "buy" || service === "sell"
      ? salePropertyTypes.find(
          (property) => property.slug === propertyType,
        )
      : undefined;

  const selectedPropertyTitle =
    selectedRentalProperty?.title ??
    selectedBuyOrSellProperty?.title ??
    propertyType;

  /* --------------------------------
     FILTER VISIBILITY
  -------------------------------- */

  const showBedrooms =
    service === "rent"
      ? selectedRentalProperty?.filters.bedrooms ?? false
      : selectedBuyOrSellProperty?.filters.bedrooms ?? false;

  const showBathrooms =
    service === "rent"
      ? selectedRentalProperty?.filters.bathrooms ?? false
      : selectedBuyOrSellProperty?.filters.bathrooms ?? false;

  const showFloorArea =
    service === "rent"
      ? selectedRentalProperty?.filters.floorArea ?? false
      : selectedBuyOrSellProperty?.filters.floorArea ?? false;

  const showParking =
    service === "rent"
      ? selectedRentalProperty?.filters.parking ?? false
      : selectedBuyOrSellProperty?.filters.parking ?? false;

  const showCommercialType =
    service === "rent"
      ? selectedRentalProperty?.filters.commercialType ?? false
      : selectedBuyOrSellProperty?.filters.commercialType ?? false;

  const showBathroomType =
    service === "rent"
      ? selectedRentalProperty?.filters.bathroomType ?? false
      : selectedBuyOrSellProperty?.filters.bathroomType ?? false;

  const showGuests =
    service === "rent"
      ? selectedRentalProperty?.filters.guests ?? false
      : false;

  const showRoomType =
    service === "rent"
      ? selectedRentalProperty?.filters.roomType ?? false
      : false;

  const showLandSize =
    service === "buy" || service === "sell"
      ? selectedBuyOrSellProperty?.filters.landSize ?? false
      : false;

  const showWarehouseType =
    service === "buy" || service === "sell"
      ? selectedBuyOrSellProperty?.filters.warehouseType ?? false
      : false;

  /* --------------------------------
     COUNTRY OPTIONS
  -------------------------------- */

  const countryOptions = useMemo(() => {
    return [...countries]
      .sort((a, b) =>
        a.name.common.localeCompare(b.name.common),
      )
      .map((country) => ({
        value: country.name.common,
        label: country.name.common,
      }));
  }, []);

  /* --------------------------------
     LOAD LOCATIONS
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
     LOCATION FILTERING
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
     VALIDATION
  -------------------------------- */

  const budgetIsValid =
    service === "sell" ||
    !minBudget ||
    !maxBudget ||
    Number(maxBudget) >= Number(minBudget);

  /* --------------------------------
     SERVICE CHANGE
  -------------------------------- */

  function selectRent() {
    setService("rent");
    setPropertyType("apartment");
    setSubmitted(false);
  }

  function selectBuy() {
    setService("buy");
    setPropertyType("apartment");
    setSubmitted(false);
  }

  function selectSell() {
    setService("sell");
    setPropertyType("apartment");
    setSubmitted(false);
  }

  /* --------------------------------
     SUBMIT
  -------------------------------- */

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!budgetIsValid) {
      return;
    }

    const inquiryData = {
      service,

      propertyType: {
        slug: propertyType,
        title: selectedPropertyTitle,
      },

      location: {
        province: selectedProvinceName,
        district: selectedDistrictName,
        city: selectedCityName,
      },

      requirements: {
        bedrooms: showBedrooms
          ? bedrooms
          : null,

        bathrooms: showBathrooms
          ? bathrooms
          : null,

        guests: showGuests
          ? Number(guests)
          : null,

        commercialType:
          showCommercialType &&
          commercialType
            ? commercialType
            : null,

        landSize:
          showLandSize && landSize
            ? Number(landSize)
            : null,

        floorArea:
          showFloorArea && floorArea
            ? Number(floorArea)
            : null,

        parking:
          showParking && parking
            ? parking
            : null,

        roomType:
          showRoomType && roomType
            ? roomType
            : null,

        bathroomType:
          showBathroomType &&
          bathroomType
            ? bathroomType
            : null,

        warehouseType:
          showWarehouseType &&
          warehouseType
            ? warehouseType
            : null,
      },

      pricing:
        service === "sell"
          ? {
              askingPrice: askingPrice
                ? Number(askingPrice)
                : null,

              type: "asking-price",
            }
          : {
              minimum: minBudget
                ? Number(minBudget)
                : null,

              maximum: maxBudget
                ? Number(maxBudget)
                : null,

              type:
                service === "rent"
                  ? "monthly-rent"
                  : "purchase-budget",
            },

      customer: {
        fullName,
        phone,
        email,
        country: customerCountry,
        religion: customerReligion,
      },

      message,
    };

    console.log("Inquiry Data:", inquiryData);

    /*
      Later, when NestJS is ready:

      await fetch(
        "http://localhost:4000/api/v1/inquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inquiryData),
        },
      );
    */

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-visible rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
    >
      {/* HEADER */}
      <div className="rounded-t-3xl bg-[#071a3b] px-6 py-8 sm:px-10">
        <p className="text-xs font-semibold tracking-[0.25em] text-slate-400">
          PROPERTY INQUIRY
        </p>

        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
          Tell us what you need
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
          Whether you want to rent, buy or sell a property,
          provide your details below and our team can assist you.
        </p>
      </div>

      <div className="space-y-10 p-6 sm:p-10">
        {/* SUCCESS */}
        {submitted && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4">
            <p className="font-semibold text-green-800">
              Inquiry form completed successfully.
            </p>

            <p className="mt-1 text-sm text-green-700">
              Your inquiry information is ready. We will connect
              this form to the backend and CRM database later.
            </p>
          </div>
        )}

        {/* SERVICE */}
        <section>
          <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
            01 — SERVICE
          </p>

          <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
            What would you like to do?
          </h3>

          <div className="mt-5 inline-flex rounded-full bg-slate-100 p-1">
            <button
              type="button"
              onClick={selectRent}
              className={`rounded-full px-7 py-3 text-sm font-semibold transition ${
                service === "rent"
                  ? "bg-[#071a3b] text-white shadow"
                  : "text-slate-600 hover:text-[#071a3b]"
              }`}
            >
              Rent
            </button>

            <button
              type="button"
              onClick={selectBuy}
              className={`rounded-full px-7 py-3 text-sm font-semibold transition ${
                service === "buy"
                  ? "bg-[#071a3b] text-white shadow"
                  : "text-slate-600 hover:text-[#071a3b]"
              }`}
            >
              Buy
            </button>

            <button
              type="button"
              onClick={selectSell}
              className={`rounded-full px-7 py-3 text-sm font-semibold transition ${
                service === "sell"
                  ? "bg-[#071a3b] text-white shadow"
                  : "text-slate-600 hover:text-[#071a3b]"
              }`}
            >
              Sell
            </button>
          </div>
        </section>

        {/* PROPERTY TYPE */}
        <section className="border-t border-slate-200 pt-10">
          <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
            02 — PROPERTY TYPE
          </p>

          <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
            {service === "sell"
              ? "What type of property would you like to sell?"
              : "What type of property are you looking for?"}
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {availablePropertyTypes.map((type) => (
              <button
                key={type.slug}
                type="button"
                onClick={() => {
                  setPropertyType(type.slug);
                  setSubmitted(false);
                }}
                className={`min-h-[72px] rounded-xl border px-4 py-3 text-center text-sm font-semibold transition ${
                  propertyType === type.slug
                    ? "border-[#071a3b] bg-[#071a3b] text-white"
                    : "border-slate-300 bg-white text-[#071a3b] hover:border-[#071a3b]"
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
        </section>

        {/* LOCATION */}
        <section className="border-t border-slate-200 pt-10">
          <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
            03 — LOCATION
          </p>

          <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
            {service === "sell"
              ? "Where is the property located?"
              : "Where would you like the property?"}
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
                  a.name_en.localeCompare(b.name_en),
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
                  a.name_en.localeCompare(b.name_en),
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
              options={filteredCities.map((city) => ({
                value: city.id,
                label:
                  city.sub_name_en &&
                  city.sub_name_en !== "NULL"
                    ? `${city.name_en} - ${city.sub_name_en}`
                    : city.name_en,
              }))}
            />
          </div>
        </section>

        {/* BEDROOMS / BATHROOMS */}
        {(showBedrooms || showBathrooms) && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              PROPERTY DETAILS
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              {service === "sell"
                ? "Tell us about the property"
                : "Property requirements"}
            </h3>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {showBedrooms && (
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
                    {numberOptions.map((number) => (
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
                    ))}
                  </div>
                </div>
              )}

              {showBathrooms && (
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
                    {numberOptions.map((number) => (
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* GUESTS */}
        {showGuests && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              GUESTS
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              How many guests?
            </h3>

            <div className="mt-6 max-w-lg">
              <ModernSelect
                label="Guests"
                value={guests}
                placeholder="Select Guests"
                onChange={setGuests}
                options={Array.from(
                  { length: 10 },
                  (_, index) => index + 1,
                ).map((number) => ({
                  value: number.toString(),
                  label: `${number} ${
                    number === 1
                      ? "Guest"
                      : "Guests"
                  }`,
                }))}
              />
            </div>
          </section>
        )}

        {/* COMMERCIAL TYPE */}
        {showCommercialType && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              COMMERCIAL TYPE
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              Commercial property type
            </h3>

            <div className="mt-6 max-w-lg">
              <ModernSelect
                label="Commercial Type"
                value={commercialType}
                placeholder="Select Type"
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
                    value: "warehouse",
                    label: "Warehouse",
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

        {/* PROPERTY SIZE */}
        {(showLandSize || showFloorArea) && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              PROPERTY SIZE
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              {service === "sell"
                ? "Property size"
                : "Preferred property size"}
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {showLandSize && (
                <div>
                  <label
                    htmlFor="landSize"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    {service === "sell"
                      ? "Land Size"
                      : "Minimum Land Size"}
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

              {showFloorArea && (
                <div>
                  <label
                    htmlFor="floorArea"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    {service === "sell"
                      ? "Floor Area"
                      : "Minimum Floor Area"}
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
        {showParking && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              PARKING
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              Parking
            </h3>

            <div className="mt-6 max-w-lg">
              <ModernSelect
                label="Parking"
                value={parking}
                placeholder="Any / Not specified"
                onChange={setParking}
                options={[
                  {
                    value: "1",
                    label: "1 Parking Space",
                  },
                  {
                    value: "2",
                    label: "2 Parking Spaces",
                  },
                  {
                    value: "3",
                    label: "3 Parking Spaces",
                  },
                  {
                    value: "4",
                    label: "4 or More",
                  },
                ]}
              />
            </div>
          </section>
        )}

        {/* ROOM TYPE */}
        {showRoomType && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              ROOM TYPE
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              What type of room?
            </h3>

            <div className="mt-6 max-w-lg">
              <ModernSelect
                label="Room Type"
                value={roomType}
                placeholder="Any Room Type"
                onChange={setRoomType}
                options={[
                  {
                    value: "single",
                    label: "Single Room",
                  },
                  {
                    value: "shared",
                    label: "Shared Room",
                  },
                  {
                    value: "boarding",
                    label: "Boarding Place",
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

        {/* BATHROOM TYPE */}
        {showBathroomType && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              BATHROOM TYPE
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              Bathroom preference
            </h3>

            <div className="mt-6 max-w-lg">
              <ModernSelect
                label="Bathroom Type"
                value={bathroomType}
                placeholder="Select Bathroom Type"
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

        {/* WAREHOUSE TYPE */}
        {showWarehouseType && (
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
                placeholder="Select Warehouse Type"
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

        {/* RENT / BUY BUDGET */}
        {service !== "sell" && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              {service === "rent"
                ? "MONTHLY BUDGET"
                : "PURCHASE BUDGET"}
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              {service === "rent"
                ? "What is your rental budget?"
                : "What is your purchase budget?"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {service === "rent"
                ? "Enter your preferred monthly rental range."
                : "Enter your preferred purchase price range."}
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="minBudget"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Minimum Budget
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    LKR
                  </span>

                  <input
                    id="minBudget"
                    type="number"
                    min="0"
                    step="5000"
                    value={minBudget}
                    onChange={(event) =>
                      setMinBudget(
                        event.target.value,
                      )
                    }
                    placeholder={
                      service === "rent"
                        ? "50000"
                        : "10000000"
                    }
                    className="w-full rounded-xl border border-slate-300 py-3.5 pl-14 pr-4 text-[#071a3b] outline-none transition focus:border-[#071a3b] focus:ring-2 focus:ring-[#071a3b]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="maxBudget"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Maximum Budget
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    LKR
                  </span>

                  <input
                    id="maxBudget"
                    type="number"
                    min="0"
                    step="5000"
                    value={maxBudget}
                    onChange={(event) =>
                      setMaxBudget(
                        event.target.value,
                      )
                    }
                    placeholder={
                      service === "rent"
                        ? "250000"
                        : "50000000"
                    }
                    className={`w-full rounded-xl border py-3.5 pl-14 pr-4 text-[#071a3b] outline-none transition focus:ring-2 ${
                      budgetIsValid
                        ? "border-slate-300 focus:border-[#071a3b] focus:ring-[#071a3b]/10"
                        : "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    }`}
                  />
                </div>
              </div>
            </div>

            {!budgetIsValid && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-700">
                  Maximum budget must be greater than or equal to
                  the minimum budget.
                </p>
              </div>
            )}
          </section>
        )}

        {/* SELL PRICE */}
        {service === "sell" && (
          <section className="border-t border-slate-200 pt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
              ASKING PRICE
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
              What price are you expecting?
            </h3>

            <div className="mt-6 max-w-lg">
              <label
                htmlFor="askingPrice"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Expected Selling Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                  LKR
                </span>

                <input
                  id="askingPrice"
                  type="number"
                  min="0"
                  step="50000"
                  value={askingPrice}
                  onChange={(event) =>
                    setAskingPrice(
                      event.target.value,
                    )
                  }
                  placeholder="Example: 25000000"
                  className="w-full rounded-xl border border-slate-300 py-3.5 pl-14 pr-4 text-[#071a3b] outline-none transition focus:border-[#071a3b] focus:ring-2 focus:ring-[#071a3b]/10"
                />
              </div>
            </div>
          </section>
        )}

        {/* CUSTOMER */}
        <section className="border-t border-slate-200 pt-10">
          <p className="text-xs font-bold tracking-[0.2em] text-[#17376c]">
            CUSTOMER INFORMATION
          </p>

          <h3 className="mt-2 font-serif text-2xl text-[#071a3b]">
            Tell us about yourself
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            These details will be stored with your inquiry in the CRM.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(event) =>
                  setFullName(
                    event.target.value,
                  )
                }
                placeholder="Your full name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-[#071a3b] outline-none transition focus:border-[#071a3b] focus:ring-2 focus:ring-[#071a3b]/10"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value,
                  )
                }
                placeholder="+94..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-[#071a3b] outline-none transition focus:border-[#071a3b] focus:ring-2 focus:ring-[#071a3b]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-[#071a3b] outline-none transition focus:border-[#071a3b] focus:ring-2 focus:ring-[#071a3b]/10"
              />
            </div>

            <ModernSelect
              label={
                service === "rent"
                  ? "Tenant Country"
                  : "Customer Country"
              }
              value={customerCountry}
              placeholder="Select Country"
              searchable
              onChange={setCustomerCountry}
              options={countryOptions}
            />

            <ModernSelect
              label={
                service === "rent"
                  ? "Tenant Religion"
                  : "Customer Religion"
              }
              value={customerReligion}
              placeholder="Select Religion"
              onChange={setCustomerReligion}
              options={religionOptions.map(
                (religion) => ({
                  value: religion,
                  label: religion,
                }),
              )}
            />

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Additional Message
              </label>

              <textarea
                id="message"
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value,
                  )
                }
                rows={4}
                placeholder={
                  service === "sell"
                    ? "Tell us anything else about your property..."
                    : "Anything else we should know?"
                }
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3.5 text-[#071a3b] outline-none transition focus:border-[#071a3b] focus:ring-2 focus:ring-[#071a3b]/10"
              />
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-400">
            Country and religion are recorded only as
            customer-provided profile information and are not used
            to determine property eligibility.
          </p>
        </section>

        {/* SUBMIT */}
        <div className="border-t border-slate-200 pt-8">
          <button
            type="submit"
            disabled={!budgetIsValid}
            className={`w-full rounded-full px-8 py-4 text-sm font-semibold text-white transition sm:w-auto ${
              budgetIsValid
                ? "bg-[#071a3b] hover:bg-[#123466]"
                : "cursor-not-allowed bg-slate-300"
            }`}
          >
            Submit Inquiry
          </button>
        </div>
      </div>
    </form>
  );
}