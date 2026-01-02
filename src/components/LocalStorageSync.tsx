"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getWishlist } from "@/src/app/Actions/wishlist.actions";
import { getCart } from "@/src/app/Actions/cart.actions";

/**
 * This component syncs wishlist and cart data to localStorage
 * when the user logs in, and clears it when they log out
 */
export default function LocalStorageSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    async function syncToLocalStorage() {
      if (status === "loading") return; // Wait for session to load

      if (status !== "authenticated" || !session) {
        // User is not logged in - clear localStorage
        localStorage.removeItem("wishlist");
        localStorage.removeItem("cart");
        return;
      }

      // User is authenticated - fetch and sync data
      try {
        // Fetch and sync wishlist
        const wishlistData = await getWishlist();
        if (wishlistData.status === "success" && wishlistData.data) {
          const wishlistIds = wishlistData.data.map(
            (item) => item._id || item.id
          );
          localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
        } else {
          // No wishlist data, set empty array
          localStorage.setItem("wishlist", JSON.stringify([]));
        }

        // Fetch and sync cart
        const cartData = await getCart();
        if (cartData.products && Array.isArray(cartData.products)) {
          const cartIds = cartData.products.map(
            (item: any) => item.product._id || item.product.id
          );
          localStorage.setItem("cart", JSON.stringify(cartIds));
        } else {
          // No cart data, set empty array
          localStorage.setItem("cart", JSON.stringify([]));
        }
      } catch (error) {
        console.error("Error syncing to localStorage:", error);
      }
    }

    syncToLocalStorage();
  }, [session, status]); // Re-run whenever session or status changes

  return null; // This component doesn't render anything
}
