"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";

interface InCartBadgeProps {
  productId: string;
}

export default function InCartBadge({ productId }: InCartBadgeProps) {
  const [isInCart, setIsInCart] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Only check localStorage if user is logged in
    if (!session) {
      setIsInCart(false);
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsInCart(cartItems.includes(productId));
  }, [productId, session]);

  if (!isInCart) return null;

  return (
    <Badge className="bg-primary text-primary-foreground shadow-lg flex items-center gap-1">
      <ShoppingCart className="h-3 w-3" />
      In Cart
    </Badge>
  );
}
