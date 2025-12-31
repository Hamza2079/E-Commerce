import React from "react";
import {
  getCategory,
  getSubcategories,
} from "@/src/app/Actions/category.actions";
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
import { Home, Layers } from "lucide-react";

import { getProductsByCategory } from "@/src/app/Actions/product.actions";
import ProductCard from "@/src/components/product/ProductCard";
import { ProductI } from "@/src/types/product.types";
import { SubcategoryI } from "@/src/types/subcategory.types";

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function CategoryDetailsPage({ params }: PageProps) {
  const { categoryId } = await params;

  // Parallel data fetching
  const [categoryData, subcategoriesData, productsData] = await Promise.all([
    getCategory(categoryId),
    getSubcategories(categoryId),
    getProductsByCategory(categoryId),
  ]);

  const category = categoryData.data;
  const subcategories = subcategoriesData.data || [];
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
                  <Link
                    href="/categories"
                    className="flex items-center gap-1.5"
                  >
                    <Layers className="h-4 w-4" />
                    Categories
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 bg-card rounded-2xl p-8 border shadow-sm">
          <div className="relative w-full md:w-1/3 aspect-4/3 rounded-xl overflow-hidden bg-muted">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              {category.name}
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Explore our wide collection of {category.name}. Find the best
              products tailored just for you.
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                {subcategories.length} Subcategories
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-muted text-muted-foreground rounded-full font-medium">
                {products.length} Products
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Subcategories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategories.map((sub: SubcategoryI) => (
                <div
                  key={sub._id}
                  className="bg-card p-6 rounded-xl border hover:shadow-md transition-all hover:border-primary/30"
                >
                  <h3 className="font-semibold text-lg mb-2">{sub.name}</h3>
                  <Link
                    href={`/products?category=${categoryId}&subcategory=${sub._id}`}
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View Products
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">
            Products in {category.name}
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: ProductI) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed">
              <p className="text-muted-foreground text-lg">
                No products found in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
