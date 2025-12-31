"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddToCartButtonProps } from "@/src/types/componentProps.types";
import { addToCart } from "@/src/app/Actions/cart.actions";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/store/hooks";
import { incrementCart } from "@/src/store/slices/cartSlice";

export default function AddToCartButton({
  productId,
  productTitle,
  price,
  inStock,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAddToCart = async (productId: string) => {
    // Check if user is logged in
    if (!session) {
      toast.error("You must be logged in to add products to cart", {
        position: "top-right",
        duration: 3000,
      });
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const response = await addToCart(productId);
      console.log("Add to cart:", { response });
      if (response.status === "success") {
        toast.success(response.message, {
          position: "top-right",
          duration: 2000,
        });
        // Dispatch Redux action to update cart count
        dispatch(incrementCart());
      } else {
        toast.error(response.message, {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to add to cart", {
        position: "top-right",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      disabled={!inStock || isLoading}
      onClick={() => handleAddToCart(productId)}
      className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add
        </>
      )}
    </Button>
  );
}
