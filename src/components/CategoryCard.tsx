import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryI } from "@/src/types/category.types";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: CategoryI;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category._id}`}
      className="block group relative aspect-square overflow-hidden rounded-lg bg-muted border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        unoptimized
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
        <h3 className="text-lg font-bold mb-1">{category.name}</h3>
        <div className="flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Shop Now</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
