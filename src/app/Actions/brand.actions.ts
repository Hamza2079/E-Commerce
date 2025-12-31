"use server";

import { Brand, BrandsResponse, SingleBrandResponse } from "@/src/types/brand.types";

export async function getAllBrands(): Promise<BrandsResponse> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}

export async function getBrand(id: string): Promise<SingleBrandResponse> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch brand with id ${id}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching brand ${id}:`, error);
    throw error;
  }
}
