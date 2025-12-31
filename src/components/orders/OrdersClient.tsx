"use client";

import React from "react";
import {
  Package,
  ShoppingBag,
  Calendar,
  MapPin,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { Order, OrderItem, GetOrdersResponse } from "@/src/types/order.types";

interface OrdersClientProps {
  initialOrdersData: GetOrdersResponse;
}

export default function OrdersClient({ initialOrdersData }: OrdersClientProps) {
  console.log("OrdersClient received data:", initialOrdersData);

  // Handle both array response and object response
  // Handle both array response and object response
  const orders = Array.isArray(initialOrdersData)
    ? initialOrdersData
    : initialOrdersData?.data || [];

  console.log("Orders array:", orders);

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-muted-foreground mb-6">
          Start shopping to see your orders here
        </p>
        <Button asChild size="lg">
          <Link href="/products">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Browse Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow"
          >
            {/* Order Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-4 border-b">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono text-sm">{order._id}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.isDelivered
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Processing"}
                </span>
              </div>
            </div>

            {/* Order Products */}
            <div className="space-y-3 mb-6">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
                >
                  <div className="relative w-16 h-16 rounded overflow-hidden bg-muted shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {item.product.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.count} × ${item.product.price}
                    </p>
                  </div>
                  <div className="font-semibold">
                    ${(item.count * item.product.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {order.shippingAddress?.city || "N/A"},{" "}
                    {order.shippingAddress?.details || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{order.paymentMethodType}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Total</p>
                <p className="text-2xl font-bold text-primary">
                  ${order.totalOrderPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
