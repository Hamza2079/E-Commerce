export interface WishlistProduct {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage?: number;
  id?: string;
}

export interface WishlistResponse {
  status: string;
  message?: string;
  data?: string[];
}

export interface GetWishlistResponse {
  status: string;
  count?: number;
  data: WishlistProduct[];
}
