"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface RemoveButtonProps {
  cartItemId: string;
  onRemove: (cartItemId: string) => Promise<void>;
}

export default function RemoveButton({
  cartItemId,
  onRemove,
}: RemoveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    await onRemove(cartItemId);
    setIsLoading(false);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleRemove}
      disabled={isLoading}
      className="text-destructive hover:text-destructive hover:bg-destructive/10"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </>
      )}
    </Button>
  );
}
