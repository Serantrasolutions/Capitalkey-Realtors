export type RentalPropertyType = {
  slug: string;
  title: string;
  description: string;

  filters: {
    location: boolean;

    bedrooms: boolean;
    bathrooms: boolean;
    guests: boolean;

    commercialType: boolean;

    landSize: boolean;
    landType: boolean;

    floorArea: boolean;
    parking: boolean;

    roomType: boolean;
    bathroomType: boolean;
  };
};

export const rentalPropertyTypes: RentalPropertyType[] = [
  {
    slug: "annex",
    title: "Annexes",
    description: "Find private annexes available for rent.",

    filters: {
      location: true,

      bedrooms: true,
      bathrooms: true,
      guests: false,

      commercialType: false,

      landSize: false,
      landType: false,

      floorArea: false,
      parking: false,

      roomType: false,
      bathroomType: false,
    },
  },

  {
    slug: "apartment",
    title: "Apartments",
    description:
      "Find apartments that match your preferred lifestyle.",

    filters: {
      location: true,

      bedrooms: true,
      bathrooms: true,
      guests: false,

      commercialType: false,

      landSize: false,
      landType: false,

      floorArea: false,
      parking: false,

      roomType: false,
      bathroomType: false,
    },
  },

  {
    slug: "bungalow",
    title: "Bungalows",
    description:
      "Browse comfortable bungalows available for rent.",

    filters: {
      location: true,

      bedrooms: true,
      bathrooms: true,
      guests: false,

      commercialType: false,

      landSize: false,
      landType: false,

      floorArea: false,
      parking: false,

      roomType: false,
      bathroomType: false,
    },
  },

  {
    slug: "commercial",
    title: "Commercial",
    description:
      "Find commercial spaces for offices, shops and businesses.",

    filters: {
      location: true,

      bedrooms: false,
      bathrooms: false,
      guests: false,

      commercialType: true,

      landSize: false,
      landType: false,

      floorArea: true,
      parking: true,

      roomType: false,
      bathroomType: false,
    },
  },

  {
    slug: "house",
    title: "Houses",
    description:
      "Find houses suitable for individuals and families.",

    filters: {
      location: true,

      bedrooms: true,
      bathrooms: true,
      guests: false,

      commercialType: false,

      landSize: false,
      landType: false,

      floorArea: false,
      parking: false,

      roomType: false,
      bathroomType: false,
    },
  },

  {
    slug: "land",
    title: "Land",
    description:
      "Find land available for residential, commercial, agricultural and other rental purposes.",

    filters: {
      location: true,

      bedrooms: false,
      bathrooms: false,
      guests: false,

      commercialType: false,

      landSize: true,
      landType: true,

      floorArea: false,
      parking: false,

      roomType: false,
      bathroomType: false,
    },
  },

  {
    slug: "room",
    title: "Rooms / Boarding Places",
    description:
      "Find rooms and boarding accommodation.",

    filters: {
      location: true,

      bedrooms: false,
      bathrooms: false,
      guests: false,

      commercialType: false,

      landSize: false,
      landType: false,

      floorArea: false,
      parking: false,

      roomType: true,
      bathroomType: true,
    },
  },

  {
    slug: "short-stay",
    title: "Short Stays",
    description:
      "Find short-term rental accommodation.",

    filters: {
      location: true,

      bedrooms: true,
      bathrooms: true,
      guests: true,

      commercialType: false,

      landSize: false,
      landType: false,

      floorArea: false,
      parking: false,

      roomType: false,
      bathroomType: false,
    },
  },

  {
    slug: "studio",
    title: "Studio / Bedsit",
    description:
      "Find compact rental spaces suitable for individuals.",

    filters: {
      location: true,

      bedrooms: false,
      bathrooms: false,
      guests: false,

      commercialType: false,

      landSize: false,
      landType: false,

      floorArea: false,
      parking: false,

      roomType: false,
      bathroomType: true,
    },
  },

  {
    slug: "villa",
    title: "Villas",
    description:
      "Discover premium villas available for rent.",

    filters: {
      location: true,

      bedrooms: true,
      bathrooms: true,
      guests: false,

      commercialType: false,

      landSize: false,
      landType: false,

      floorArea: false,
      parking: false,

      roomType: false,
      bathroomType: false,
    },
  },
];

export function getRentalPropertyType(slug: string) {
  return rentalPropertyTypes.find(
    (propertyType) => propertyType.slug === slug,
  );
}