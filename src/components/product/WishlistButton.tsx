"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { WishlistButtonProps } from "@/src/types/componentProps.types";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/src/app/Actions/wishlist.actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function WishlistButton({
  productId,
  productTitle,
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Check localStorage on mount for wishlist status - only if logged in
  useEffect(() => {
    if (!session) {
      setIsInWishlist(false);
      return;
    }

    const wishlistItems = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsInWishlist(wishlistItems.includes(productId));
  }, [productId, session]);

  const handleToggleWishlist = async () => {
    // Check if user is logged in
    if (!session) {
      toast.error("Please sign in to add items to your wishlist", {
        position: "top-right",
        duration: 3000,
      });
      // Redirect to login with callback URL to return to this page
      const callbackUrl = encodeURIComponent(window.location.pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }

    setIsLoading(true);
    try {
      if (isInWishlist) {
        // Remove from wishlist
        const response = await removeFromWishlist(productId);
        if (response.status === "success") {
          setIsInWishlist(false);
          // Sync localStorage
          const wishlistItems = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
          );
          const updatedWishlist = wishlistItems.filter(
            (id: string) => id !== productId
          );
          localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

          toast.success("Removed from wishlist", {
            position: "top-right",
            duration: 2000,
          });
        } else {
          toast.error(response.message || "Failed to remove from wishlist", {
            position: "top-right",
            duration: 3000,
          });
        }
      } else {
        // Add to wishlist
        const response = await addToWishlist(productId);
        if (response.status === "success") {
          setIsInWishlist(true);
          // Update localStorage
          const wishlistItems = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
          );
          wishlistItems.push(productId);
          localStorage.setItem("wishlist", JSON.stringify(wishlistItems));

          toast.success("Added to wishlist", {
            position: "top-right",
            duration: 2000,
          });
        } else {
          toast.error(response.message || "Failed to add to wishlist", {
            position: "top-right",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      toast.error("An error occurred", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg z-10 ${
        isInWishlist ? "text-red-500" : "hover:text-red-500"
      }`}
      aria-label={`${isInWishlist ? "Remove from" : "Add to"} wishlist`}
    >
      {isLoading ? (
        <Spinner className="h-5 w-5" />
      ) : (
        <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
      )}
    </button>
  );
}
