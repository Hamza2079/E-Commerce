import React from "react";
import Image from "next/image";
import QuantityControls from "./QuantityControls";
import RemoveButton from "./RemoveButton";

interface CartItemProps {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (id: string, newQuantity: number) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

export default function CartItem({
  id,
  productId,
  title,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <article className="flex gap-4 p-4 bg-card border rounded-lg hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="96px"
          unoptimized
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base line-clamp-2 mb-2">{title}</h3>
        <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-2">
        <QuantityControls
          cartItemId={id}
          currentQuantity={quantity}
          onUpdate={onUpdateQuantity}
        />

        {/* Remove Button */}
        <RemoveButton cartItemId={id} onRemove={onRemove} />
      </div>
    </article>
  );
}
