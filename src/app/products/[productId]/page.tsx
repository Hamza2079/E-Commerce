import { ProductI } from "@/src/types/product.types";
import { Params } from "next/dist/server/request/params";
import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, Star, Package, Truck, Shield, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductImageGallery from "@/src/components/product/ProductImageGallery";
import ProductActions from "@/src/components/product/ProductActions";
import ProductCard from "@/src/components/product/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Metadata } from "next";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { productId } = await params;
  const resp = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  );
  const data = await resp.json();
  const { data: product } = data as { data: ProductI };

  return {
    title: `${product.title} | ShopMart`,
    description: product.description,
    keywords: [
      product.title,
      product.category.name,
      product.brand.name,
      "online shopping",
      "e-commerce",
    ],
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.imageCover, ...product.images],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.imageCover],
    },
  };
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<Params>;
}) {
  const { productId } = await params;
  const resp = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  );
  const data = await resp.json();
  const { data: product } = data as { data: ProductI };

  // Fetch related products from the same category
  const relatedResp = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${product.category._id}`
  );
  const relatedData = await relatedResp.json();
  const relatedProducts = (relatedData.data as ProductI[]).filter(
    (p) => p._id !== product._id
  ); // Exclude current product, show all

  // Calculate rating stars
  const fullStars = Math.floor(product.ratingsAverage);
  const hasHalfStar = product.ratingsAverage % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const inStock = product.quantity > 0;

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <nav className="border-b bg-muted/30" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 py-4">
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
                  <Link href="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  {product.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>

      {/* Product Details Article */}
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image Gallery */}
            <section
              className="animate-in fade-in slide-in-from-left-4 duration-700"
              aria-label="Product images"
            >
              <ProductImageGallery
                images={product.images}
                title={product.title}
                imageCover={product.imageCover}
              />
            </section>

            {/* Right Column - Product Info */}
            <section
              className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-700"
              aria-label="Product information"
            >
              {/* Header with Category & Brand */}
              <header className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline">{product.category.name}</Badge>
                  <Badge variant="secondary">{product.brand.name}</Badge>
                  {!inStock && (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                  {product.sold > 100 && (
                    <Badge variant="success">Popular</Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`Rating: ${product.ratingsAverage} out of 5 stars`}
                  >
                    {[...Array(fullStars)].map((_, i) => (
                      <Star
                        key={`full-${i}`}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                    {hasHalfStar && (
                      <div className="relative">
                        <Star
                          className="h-4 w-4 text-gray-300"
                          aria-hidden="true"
                        />
                        <Star
                          className="h-4 w-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0"
                          style={{ clipPath: "inset(0 50% 0 0)" }}
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    {[...Array(emptyStars)].map((_, i) => (
                      <Star
                        key={`empty-${i}`}
                        className="h-4 w-4 text-gray-300"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.ratingsAverage.toFixed(1)} (
                    {product.ratingsQuantity} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <p
                    className="text-3xl font-bold text-primary"
                    aria-label={`Price: $${product.price}`}
                  >
                    ${product.price}
                  </p>
                  {product.sold > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {product.sold} sold
                    </span>
                  )}
                </div>
              </header>

              {/* Description */}
              <section className="space-y-2">
                <h2 className="text-base font-semibold">Description</h2>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {product.description}
                </p>
                {product.subcategory && product.subcategory.length > 0 && (
                  <section className="border-t pt-4 space-y-2">
                    <h2 className="text-base font-semibold">Categories</h2>
                    <div className="flex flex-wrap gap-2">
                      {product.subcategory.map((sub) => (
                        <Badge
                          key={sub._id}
                          variant="outline"
                          className="text-xs"
                        >
                          {sub.name}
                        </Badge>
                      ))}
                    </div>
                  </section>
                )}
              </section>

              {/* Stock Status */}
              <div className="flex items-center border-t gap-2 p-3 bg-muted/50 rounded-lg">
                <Package
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <span
                  className={
                    inStock
                      ? "text-green-600 font-medium text-sm"
                      : "text-destructive font-medium text-sm"
                  }
                >
                  {inStock ? `${product.quantity} in stock` : "Out of stock"}
                </span>
              </div>

              {/* Product Actions */}
              <ProductActions
                productId={product._id}
                productTitle={product.title}
                price={product.price}
                inStock={inStock}
                quantity={product.quantity}
              />

              {/* Features */}
              <section className="border-t pt-4 space-y-3">
                <h2 className="text-base font-semibold">Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <Truck
                      className="h-4 w-4 text-primary shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-xs">Free Shipping</p>
                      <p className="text-xs text-muted-foreground">
                        Orders $50+
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <Shield
                      className="h-4 w-4 text-primary shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-xs">Secure Payment</p>
                      <p className="text-xs text-muted-foreground">
                        100% secure
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <RotateCcw
                      className="h-4 w-4 text-primary shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-xs">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">
                        30 day return
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <Package
                      className="h-4 w-4 text-primary shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-xs">Quality Guarantee</p>
                      <p className="text-xs text-muted-foreground">Certified</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Subcategories */}
            </section>
          </div>
        </div>
      </article>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: [product.imageCover, ...product.images],
            description: product.description,
            brand: {
              "@type": "Brand",
              name: product.brand.name,
            },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "USD",
              availability: inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.ratingsAverage,
              reviewCount: product.ratingsQuantity,
            },
          }),
        }}
      />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12 border-t">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Related Products
            </h2>
            <p className="text-muted-foreground">
              More products from {product.category.name}
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {relatedProducts.map((relatedProduct) => (
                <CarouselItem
                  key={relatedProduct._id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard product={relatedProduct} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </section>
      )}
    </main>
  );
}
