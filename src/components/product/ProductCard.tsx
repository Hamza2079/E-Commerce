import React from "react";
import Link from "next/link";
import { Star, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductCardProps } from "@/src/types/componentProps.types";
import ProductImage from "./ProductImage";
import WishlistButton from "./WishlistButton";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: ProductCardProps) {
  // Calculate rating stars
  const fullStars = Math.floor(product.ratingsAverage);
  const hasHalfStar = product.ratingsAverage % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Check if in stock
  const inStock = product.quantity > 0;

  return (
    <div className="group bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
      {/* Image Container with Server Component */}
      <div className="relative">
        <ProductImage
          imageCover={product.imageCover}
          title={product.title}
          productId={product._id}
          inStock={inStock}
          sold={product.sold}
        />

        {/* Wishlist Button - Client Component */}
        <WishlistButton
          productId={product._id}
          productTitle={product.title}
          price={product.price}
          inStock={inStock}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category & Brand */}
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category.name}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {product.brand.name}
          </Badge>
        </div>

        {/* Title - Clickable Link */}
        <Link
          href={`/products/${product._id}`}
          className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors"
        >
          {product.title}
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {/* Full Stars */}
            {[...Array(fullStars)].map((_, i) => (
              <Star
                key={`full-${i}`}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            {/* Half Star */}
            {hasHalfStar && (
              <div className="relative">
                <Star className="h-4 w-4 text-gray-300" />
                <Star
                  className="h-4 w-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
              </div>
            )}
            {/* Empty Stars */}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.ratingsQuantity})
          </span>
        </div>

        {/* Stock Info */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className={inStock ? "text-green-600" : "text-destructive"}>
            {inStock ? `${product.quantity} in stock` : "Out of stock"}
          </span>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            {product.sold > 0 && (
              <span className="text-xs text-muted-foreground">
                {product.sold} sold
              </span>
            )}
          </div>

          {/* Add to Cart Button - Client Component */}
          <AddToCartButton
            productId={product._id}
            productTitle={product.title}
            price={product.price}
            inStock={inStock}
          />
        </div>
      </div>
    </div>
  );
}
