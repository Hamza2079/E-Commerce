export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface BrandsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Brand[];
}

export interface SingleBrandResponse {
  data: Brand;
}

export type BrandI = Brand;
