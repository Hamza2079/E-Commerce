"use server";

import { getToken } from "@/lib/auth";
import { WishlistResponse, GetWishlistResponse } from "@/src/types/wishlist.types";

// Add product to wishlist
export async function addToWishlist(
  productId: string
): Promise<WishlistResponse> {
  const token = await getToken();

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ productId }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return {
      status: "error",
      message: "Failed to add to wishlist",
    };
  }
}

// Remove product from wishlist
export async function removeFromWishlist(
  productId: string
): Promise<WishlistResponse> {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return {
      status: "error",
      message: "Failed to remove from wishlist",
    };
  }
}

// Get user's wishlist
export async function getWishlist(): Promise<GetWishlistResponse> {
  const token = await getToken();

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return {
      status: "error",
      data: [], // Return empty array on error matching GetWishlistResponse
    };
  }
}
