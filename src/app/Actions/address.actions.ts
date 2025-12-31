"use server";

import { getToken } from "@/lib/auth";
import { AddressSchemaType } from "@/src/schema/address.schema";
import { AddressResponse, SingleAddressResponse } from "@/src/types/address.types";

// Get user's addresses
export async function getUserAddresses(): Promise<AddressResponse> {
  const token = await getToken();

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return {
      status: "error",
      message: "Failed to fetch addresses",
    };
  }
}

// Add new address
export async function addAddress(
  addressData: AddressSchemaType
): Promise<SingleAddressResponse> {
  const token = await getToken();

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(addressData),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding address:", error);
    return {
      status: "error",
      message: "Failed to add address",
    };
  }
}

// Remove address
export async function removeAddress(
  addressId: string
): Promise<{ status: string; message?: string }> {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing address:", error);
    return {
      status: "error",
      message: "Failed to remove address",
    };
  }
}

// Get specific address
export async function getAddress(
  addressId: string
): Promise<SingleAddressResponse> {
  const token = await getToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching address:", error);
    return {
      status: "error",
      message: "Failed to fetch address",
    };
  }
}
