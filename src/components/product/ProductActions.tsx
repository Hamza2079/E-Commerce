"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/src/app/Actions/wishlist.actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductActionsProps } from "@/src/types/componentProps.types";

export default function ProductActions({
  productId,
  productTitle,
  price,
  inStock,
  quantity,
}: ProductActionsProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      productId,
      productTitle,
      price,
      quantity: selectedQuantity,
    });
    // TODO: Implement cart functionality
  };

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
      if (isWishlisted) {
        // Remove from wishlist
        const response = await removeFromWishlist(productId);
        if (response.status === "success") {
          setIsWishlisted(false);
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
          setIsWishlisted(true);
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

  const incrementQuantity = () => {
    if (selectedQuantity < quantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      {inStock && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              disabled={selectedQuantity <= 1}
              className="h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-semibold">
              {selectedQuantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={incrementQuantity}
              disabled={selectedQuantity >= quantity}
              className="h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          size="lg"
          disabled={!inStock}
          onClick={handleAddToCart}
          className="flex-1 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleToggleWishlist}
          disabled={isLoading}
          className={`transition-all duration-300 hover:scale-105 ${
            isWishlisted ? "text-red-500 border-red-500" : ""
          }`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
        </Button>
      </div>
    </div>
  );
}
