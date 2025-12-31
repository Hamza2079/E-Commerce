import React from "react";
import CartClient from "@/src/components/cart/CartClient";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home, ShoppingCart } from "lucide-react";
import { getCart } from "../Actions/cart.actions";

export default async function Cart() {
  const cartData = await getCart();

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
                  <ShoppingCart className="h-4 w-4" />
                  Shopping Cart
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartData.products.length > 0
              ? `You have ${cartData.products.length} ${
                  cartData.products.length === 1 ? "item" : "items"
                } in your cart`
              : "Your cart is empty"}
          </p>
        </header>

        {/* Cart Content */}
        <CartClient initialCartData={cartData} />
      </div>
    </main>
  );
}
