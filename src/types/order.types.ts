export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface OrderItem {
  _id: string;
  count: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
    brand: {
      _id: string;
      name: string;
    };
    category: {
      _id: string;
      name: string;
    };
  };
  price: number;
}

export interface Order {
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  cartItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
  id: string;
  paidAt?: string;
}

export interface OrderResponse {
  status?: string;
  message?: string;
  data?: Order[];
  session?: {
    url: string;
  };
}

export type GetOrdersResponse = Order[] | OrderResponse;
