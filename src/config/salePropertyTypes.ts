export type SalePropertyType = {
  slug: string;
  title: string;
  description: string;

  filters: {
    location: boolean;

    bedrooms: boolean;
    bathrooms: boolean;

    landSize: boolean;
    landType: boolean;

    floorArea: boolean;
    parking: boolean;

    commercialType: boolean;
    bathroomType: boolean;

    warehouseType: boolean;
  };
};

export const salePropertyTypes: SalePropertyType[] = [
  {
    slug: "apartment",
    title: "Apartments",
    description: "Find apartments available for sale.",

    filters: {
      location: true,

      bedrooms: true,
      bathrooms: true,

      landSize: false,
      landType: false,

      floorArea: true,
      parking: true,

      commercialType: false,
      bathroomType: false,

      warehouseType: false,
    },
  },

  {
    slug: "bungalow",
    title: "Bungalows",
    description:
      "Browse comfortable bungalows available for sale.",

    filters: {
      location: true,

      bedrooms: true,
      bathrooms: true,

      landSize: true,
      landType: false,

      floorArea: true,
      parking: true,

      commercialType: false,
      bathroomType: false,

      warehouseType: false,
    },
  },

  {
    slug: "commercial",
    title: "Commercial",
    description:
      "Find commercial properties available for sale and investment.",

    filters: {
      location: true,

      bedrooms: false,
      bathrooms: false,

      landSize: true,
      landType: false,

      floorArea: true,
      parking: true,

      commercialType: true,
      bathroomType: false,

      warehouseType: false,
    },
  },

  {
    slug: "house",
    title: "Houses",
    description: "Find houses available for sale.",

    filters: {
      location: true,

      bedrooms: true,
      bathrooms: true,

      landSize: true,
      landType: false,

      floorArea: true,
      parking: true,

      commercialType: false,
      bathroomType: false,

      warehouseType: false,
    },
  },

  {
    slug: "land",
    title: "Land",
    description:
      "Find residential, commercial, agricultural, industrial and other land available for sale.",

    filters: {
      location: true,

      bedrooms: false,
      bathrooms: false,

      landSize: true,
      landType: true,

      floorArea: false,
      parking: false,

      commercialType: false,
      bathroomType: false,

      warehouseType: false,
    },
  },

  {
    slug: "studio",
    title: "Studio / Bedsit",
    description:
      "Find compact properties available for sale.",

    filters: {
      location: true,

      bedrooms: false,
      bathrooms: false,

      landSize: false,
      landType: false,

      floorArea: true,
      parking: false,

      commercialType: false,
      bathroomType: true,

      warehouseType: false,
    },
  },

  {
    slug: "villa",
    title: "Villas",
    description:
      "Discover premium villas available for sale.",

    filters: {
      location: true,

      bedrooms: true,
      bathrooms: true,

      landSize: true,
      landType: false,

      floorArea: true,
      parking: true,

      commercialType: false,
      bathroomType: false,

      warehouseType: false,
    },
  },

  {
    slug: "warehouse",
    title: "Warehouse",
    description:
      "Find warehouse properties available for sale and investment.",

    filters: {
      location: true,

      bedrooms: false,
      bathrooms: false,

      landSize: true,
      landType: false,

      floorArea: true,
      parking: true,

      commercialType: false,
      bathroomType: false,

      warehouseType: true,
    },
  },
];

export function getSalePropertyType(slug: string) {
  return salePropertyTypes.find(
    (propertyType) => propertyType.slug === slug,
  );
}