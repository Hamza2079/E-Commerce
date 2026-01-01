"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getWishlist } from "@/src/app/Actions/wishlist.actions";
import { getCart } from "@/src/app/Actions/cart.actions";

/**
 * This component syncs wishlist and cart data to localStorage
 * when the user logs in, so badges can show without API calls
 */
export default function LocalStorageSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    async function syncToLocalStorage() {
      if (status !== "authenticated" || !session) return;

      try {
        // Fetch and sync wishlist
        const wishlistData = await getWishlist();
        if (wishlistData.status === "success" && wishlistData.data) {
          const wishlistIds = wishlistData.data.map(
            (item) => item._id || item.id
          );
          localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
        }

        // Fetch and sync cart
        const cartData = await getCart();
        if (cartData.products && Array.isArray(cartData.products)) {
          const cartIds = cartData.products.map(
            (item: any) => item.product._id || item.product.id
          );
          localStorage.setItem("cart", JSON.stringify(cartIds));
        }
      } catch (error) {
        console.error("Error syncing to localStorage:", error);
      }
    }

    syncToLocalStorage();
  }, [session, status]);

  return null; // This component doesn't render anything
}
