"use client";

import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/src/store/hooks";

interface InCartBadgeProps {
  productId: string;
}

export default function InCartBadge({ productId }: InCartBadgeProps) {
  const { data: session } = useSession();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  // Security: Only show badge if user is logged in
  if (!session) return null;

  // Check if product is in cart
  const isInCart = cartItems.includes(productId);

  if (!isInCart) return null;

  return (
    <Badge className="bg-primary text-primary-foreground shadow-lg flex items-center gap-1">
      <ShoppingCart className="h-3 w-3" />
      In Cart
    </Badge>
  );
}
