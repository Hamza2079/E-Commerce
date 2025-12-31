export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
}

export interface CartData {
  _id: string;
  products: CartProduct[];
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  message?: string;
  data?: CartData;
}
