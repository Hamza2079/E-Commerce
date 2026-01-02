import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, RotateCcw, Shield, Sparkles } from "lucide-react";
import ProductCard from "@/src/components/product/ProductCard";
import CategoryCard from "@/src/components/CategoryCard";
import NewsletterSignup from "@/src/components/NewsletterSignup";
import LoginSuccessToast from "@/src/components/LoginSuccessToast";
import { ProductI } from "@/src/types/product.types";
import { CategoryI } from "@/src/types/category.types";

export default async function Home() {
  // Fetch featured products (first 8)
  const productsResp = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  const productsData = await productsResp.json();
  const featuredProducts: ProductI[] = productsData.data.slice(0, 8);

  // Fetch categories
  const categoriesResp = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  const categoriesData = await categoriesResp.json();
  const categories: CategoryI[] = categoriesData.data.slice(0, 6);

  return (
    <main className="min-h-screen bg-background">
      <LoginSuccessToast />
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 md:py-32 overflow-hidden"
        aria-label="Hero section"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Welcome to ShopMart</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Amazing Products at{" "}
              <span className="text-primary">Great Prices</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Shop the latest trends in fashion, electronics, and more. Quality
              products delivered right to your door.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 transition-all duration-300 hover:scale-105"
              >
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24" aria-label="Featured products">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Check out our handpicked selection of trending products
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {featuredProducts.map((product, index) => (
              <div
                key={product._id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="transition-all duration-300 hover:scale-105"
            >
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        className="py-16 md:py-24 bg-muted/30"
        aria-label="Shop by category"
      >
        <div className="container mx-auto px-4">
          <header className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our wide range of categories
            </p>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <div
                key={category._id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Features Section */}
      <section className="py-16 md:py-24" aria-label="Our features">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <article className="p-6 rounded-lg bg-linear-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Truck className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    Free delivery on orders over $50
                  </p>
                </div>
              </div>
            </article>

            <article className="p-6 rounded-lg bg-linear-to-br from-green-500/10 to-green-600/5 border border-green-500/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <RotateCcw
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
                  <p className="text-sm text-muted-foreground">
                    30-day return policy on all items
                  </p>
                </div>
              </div>
            </article>

            <article className="p-6 rounded-lg bg-linear-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Shield
                    className="h-6 w-6 text-purple-600"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    100% secure payment processing
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        className="py-16 md:py-24 bg-muted/30"
        aria-label="Newsletter signup"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
            <p className="text-muted-foreground text-lg">
              Subscribe to our newsletter and get exclusive deals and updates
            </p>
            <NewsletterSignup />
            <p className="text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
