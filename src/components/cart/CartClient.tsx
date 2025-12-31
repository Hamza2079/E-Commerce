"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import CartItem from "@/src/components/cart/CartItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CartData } from "@/src/types/cart.types";
import {
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from "@/src/app/Actions/cart.actions";
import ClearCartButton from "./ClearCartButton";
import CheckoutDialog from "../checkout/CheckoutDialog";

interface CartClientProps {
  initialCartData: CartData;
}

export default function CartClient({ initialCartData }: CartClientProps) {
  const router = useRouter();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    try {
      const response = await updateCartItemQuantity(id, newQuantity);

      if (response.status === "success") {
        toast.success("Quantity updated", {
          position: "top-right",
          duration: 2000,
        });
        router.refresh();
        // Dispatch custom event to update cart count
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.error(response.message || "Failed to update quantity", {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to update quantity", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const response = await removeFromCart(id);

      if (response.status === "success") {
        toast.success("Item removed from cart", {
          position: "top-right",
          duration: 2000,
        });
        router.refresh();
        // Dispatch custom event to update cart count
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.error(response.message || "Failed to remove item", {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to remove item", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await clearCart();
      console.log(response);
      if (response.message == "success") {
        toast.success("Cart cleared", {
          position: "top-right",
          duration: 2000,
        });
        router.refresh();
        // Dispatch custom event to update cart count
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.error(response.message || "Failed to clear cart", {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to clear cart", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  if (initialCartData.products.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add some products to get started
        </p>
        <Button asChild size="lg">
          <Link href="/products">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <section className="lg:col-span-2 space-y-4" aria-label="Cart items">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Cart Items</h2>
          <ClearCartButton onClear={handleClearCart} />
        </div>
        {initialCartData.products.map((item) => (
          <CartItem
            key={item._id}
            id={item.product._id}
            productId={item.product._id}
            title={item.product.title}
            price={item.price}
            quantity={item.count}
            image={item.product.imageCover}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
          />
        ))}
      </section>

      {/* Order Summary */}
      <aside className="lg:col-span-1" aria-label="Order summary">
        <div className="bg-card border rounded-lg p-6 sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">
                ${initialCartData.totalCartPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ${initialCartData.totalCartPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <Button
            className="w-full h-12 text-base font-semibold"
            size="lg"
            onClick={() => setIsCheckoutOpen(true)}
          >
            Proceed to Checkout
          </Button>

          <Button variant="outline" className="w-full mt-3" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </aside>

      {/* Checkout Dialog */}
      <CheckoutDialog
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        cartId={initialCartData._id}
      />
    </div>
  );
}
