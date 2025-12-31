"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface QuantityControlsProps {
  cartItemId: string;
  currentQuantity: number;
  onUpdate: (cartItemId: string, newQuantity: number) => Promise<void>;
}

export default function QuantityControls({
  cartItemId,
  currentQuantity,
  onUpdate,
}: QuantityControlsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDecrease = async () => {
    if (currentQuantity > 1 && !isLoading) {
      setIsLoading(true);
      await onUpdate(cartItemId, currentQuantity - 1);
      setIsLoading(false);
    }
  };

  const handleIncrease = async () => {
    if (!isLoading) {
      setIsLoading(true);
      await onUpdate(cartItemId, currentQuantity + 1);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 border rounded-lg">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDecrease}
        disabled={currentQuantity <= 1 || isLoading}
        className="h-8 w-8"
      >
        {isLoading ? <Spinner /> : <Minus className="h-4 w-4" />}
      </Button>
      <span className="w-8 text-center font-medium">{currentQuantity}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleIncrease}
        disabled={isLoading}
        className="h-8 w-8"
      >
        {isLoading ? <Spinner /> : <Plus className="h-4 w-4" />}
      </Button>
    </div>
  );
}
