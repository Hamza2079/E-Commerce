"use server"

import { getToken } from "@/lib/auth";

export async function addToCart(productId:string){
    const token=await getToken()
const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: token as string
        },
        body: JSON.stringify({productId:productId})
    })
    const data = await response.json()
return(data);

}

export async function getCart() {
  const token = await getToken();
  
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: token as string,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { products: [], totalCartPrice: 0 };
    }

    const data = await response.json();
    return data.data || { products: [], totalCartPrice: 0 };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { products: [], totalCartPrice: 0 };
  }
}

export async function updateCartItemQuantity(productId: string, count: number) {
  const token = await getToken();
  
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ count }),
      }
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    return { status: "error", message: "Failed to update quantity" };
  }
}

export async function removeFromCart(productId: string) {
  const token = await getToken();
  
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      }
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { status: "error", message: "Failed to remove item" };
  }
}

export async function clearCart() {
  const token = await getToken();
  
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { status: "error", message: "Failed to clear cart" };
  }
}
