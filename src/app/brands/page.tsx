import React from "react";
import { getAllBrands } from "../Actions/brand.actions";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, Tag } from "lucide-react";

export default async function BrandsPage() {
  const brandsData = await getAllBrands();
  const brands = brandsData.data || [];

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1.5">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4" />
                  Brands
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">All Brands</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group block bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              <div className="relative aspect-square overflow-hidden bg-white p-4 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />
                </div>
              </div>
              <div className="p-4 text-center border-t">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
