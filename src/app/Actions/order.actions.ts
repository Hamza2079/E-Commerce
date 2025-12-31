"use server";

import { getToken } from "@/lib/auth";
import { cookies } from "next/headers";

import { ShippingAddress, OrderResponse, GetOrdersResponse } from "@/src/types/order.types";

// Create cash order
export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress
): Promise<OrderResponse> {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating cash order:", error);
    return {
      status: "error",
      message: "Failed to create order",
    };
  }
}

// Create card payment session
export async function createCardPaymentSession(
  cartId: string,
  shippingAddress: ShippingAddress,
  successUrl: string = "http://localhost:3000/allorders"
): Promise<OrderResponse> {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(successUrl)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating payment session:", error);
    return {
      status: "error",
      message: "Failed to create payment session",
    };
  }
}

// Get user's orders
export async function getUserOrders(): Promise<GetOrdersResponse> {
  // Use the custom getToken helper which works with server actions
  const authToken = await getToken();
  
  console.log("Auth token:", authToken);

  if (!authToken) {
    console.error("No auth token found");
    return {
      status: "error",
      message: "User not authenticated",
    };
  }

  // Decode the token to get user ID
  const { jwtDecode } = await import("jwt-decode");
  let userId: string | undefined;
  
  try {
    const decoded = jwtDecode<{ id: string }>(authToken as string);
    userId = decoded.id;
    console.log("Decoded token:", decoded);
    console.log("Extracted user ID:", userId);
  } catch (error) {
    console.error("Error decoding token:", error);
    return {
      status: "error",
      message: "Invalid token",
    };
  }

  if (!userId) {
    console.error("No user ID in decoded token");
    return {
      status: "error",
      message: "User not authenticated",
    };
  }

  const apiUrl = `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`;
  console.log("Fetching orders from:", apiUrl);

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Orders API response:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      status: "error",
      message: "Failed to fetch orders",
    };
  }
}
