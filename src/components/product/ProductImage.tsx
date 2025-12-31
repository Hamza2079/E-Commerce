import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductImageProps } from "@/src/types/componentProps.types";

export default function ProductImage({
  imageCover,
  title,
  productId,
  inStock,
  sold,
}: ProductImageProps) {
  return (
    <Link
      href={`/products/${productId}`}
      className="relative aspect-square overflow-hidden bg-muted block group"
    >
      <Image
        src={imageCover}
        alt={title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        unoptimized
        priority={false}
      />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
        {!inStock && (
          <Badge variant="destructive" className="shadow-lg">
            Out of Stock
          </Badge>
        )}
        {sold > 100 && (
          <Badge variant="success" className="shadow-lg">
            Popular
          </Badge>
        )}
      </div>
    </Link>
  );
}
