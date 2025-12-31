"use server";

import { getToken } from "@/lib/auth";
import { CartProduct } from "@/src/types/cart.types";

export async function getCartCount(): Promise<number> {
  const token = await getToken();
  
  if (!token) {
    return 0;
  }
  
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: token as string,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    const cartData = data.data;
    
    if (!cartData || !cartData.products) {
      return 0;
    }
    
    // Return total number of items (sum of all quantities)
    return cartData.products.reduce((total: number, item: CartProduct) => total + item.count, 0);
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }
}
