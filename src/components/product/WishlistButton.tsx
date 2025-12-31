"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
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

  const handleToggleWishlist = async () => {
    // Check if user is logged in
    if (!session) {
      toast.error("You must be logged in to add to wishlist", {
        position: "top-right",
        duration: 3000,
      });
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      if (isInWishlist) {
        // Remove from wishlist
        const response = await removeFromWishlist(productId);
        if (response.status === "success") {
          setIsInWishlist(false);
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
      <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
    </button>
  );
}
