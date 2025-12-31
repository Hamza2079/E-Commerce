"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { ProductImageGalleryProps } from "@/src/types/componentProps.types";

export default function ProductImageGallery({
  images,
  title,
  imageCover,
}: ProductImageGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const allImages = [imageCover, ...images];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted border">
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      {/* Thumbnail Indicators */}
      {allImages.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`relative w-16 h-16 overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-110 ${
                current === index
                  ? "border-primary shadow-lg ring-2 ring-primary/20"
                  : "border-transparent hover:border-primary/50"
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {allImages.length > 1 && (
        <div className="text-center text-sm text-muted-foreground">
          {current + 1} / {allImages.length}
        </div>
      )}
    </div>
  );
}
