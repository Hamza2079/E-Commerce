import React from "react";
import { getBrand } from "@/src/app/Actions/brand.actions";
import { getProductsByBrand } from "@/src/app/Actions/product.actions";
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
import ProductCard from "@/src/components/product/ProductCard";
import { ProductI } from "@/src/types/product.types";

interface PageProps {
  params: Promise<{
    brandId: string;
  }>;
}

export default async function BrandDetailsPage({ params }: PageProps) {
  const { brandId } = await params;

  // Parallel data fetching
  const [brandData, productsData] = await Promise.all([
    getBrand(brandId),
    getProductsByBrand(brandId),
  ]);

  const brand = brandData.data;
  const products = productsData.data || [];

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
                <BreadcrumbLink asChild>
                  <Link href="/brands" className="flex items-center gap-1.5">
                    <Tag className="h-4 w-4" />
                    Brands
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{brand.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 bg-card rounded-2xl p-8 border shadow-sm">
          <div className="relative w-full md:w-1/3 aspect-[2/1] bg-white rounded-xl overflow-hidden p-6 flex items-center justify-center border shadow-inner">
            <div className="relative w-full h-full">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              {brand.name}
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Discover premium products from {brand.name}. Quality and style you
              can trust.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
              {products.length} Products Available
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Products by {brand.name}</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: ProductI) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed">
              <p className="text-muted-foreground text-lg">
                No products found for this brand yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
