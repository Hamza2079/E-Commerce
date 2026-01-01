"use client";

import React, { useState } from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import Image from "next/image";
import { removeFromWishlist } from "@/src/app/Actions/wishlist.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  WishlistProduct,
  GetWishlistResponse,
} from "@/src/types/wishlist.types";

interface WishlistClientProps {
  initialWishlistData: GetWishlistResponse;
}

export default function WishlistClient({
  initialWishlistData,
}: WishlistClientProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>(
    initialWishlistData.data || []
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const handleRemove = async (productId: string) => {
    setDeletingId(productId);
    try {
      const response = await removeFromWishlist(productId);
      if (response.status === "success") {
        setWishlistItems(
          wishlistItems.filter((item) => item._id !== productId)
        );
        // Sync localStorage
        const wishlistLocalItems = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        const updatedWishlist = wishlistLocalItems.filter(
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
    } catch (error) {
      toast.error("An error occurred", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add products you love to your wishlist
        </p>
        <Button asChild size="lg">
          <Link href="/products">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Browse Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product._id}
            className="group relative bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Product Image */}
            <Link href={`/products/${product._id}`}>
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(product._id)}
              disabled={deletingId === product._id}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 hover:text-red-500 shadow-lg z-10"
              aria-label="Remove from wishlist"
            >
              {deletingId === product._id ? (
                <Spinner className="h-5 w-5" />
              ) : (
                <Trash2 className="h-5 w-5" />
              )}
            </button>

            {/* Product Info */}
            <div className="p-4">
              <Link href={`/products/${product._id}`}>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {product.title}
                </h3>
              </Link>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ${product.price}
                </span>
                {product.ratingsAverage && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span>{product.ratingsAverage.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
