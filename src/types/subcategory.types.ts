export interface SubcategoryI {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface SubcategoriesResponse {
  results?: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: SubcategoryI[];
}
