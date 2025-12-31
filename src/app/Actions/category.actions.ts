"use server";

import { Category, CategoriesResponse, SingleCategoryResponse } from "@/src/types/category.types";

export async function getAllCategories(): Promise<CategoriesResponse> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getCategory(id: string): Promise<SingleCategoryResponse> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch category with id ${id}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
}

import { SubcategoriesResponse } from "@/src/types/subcategory.types";

// Also get subcategories for a category
export async function getSubcategories(categoryId: string): Promise<SubcategoriesResponse> {
    try {
      // Note: The API for subcategories on specific category might be different
      // Usually it's /api/v1/categories/:id/subcategories
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
        {
          next: { revalidate: 3600 },
        }
      );
  
      if (!response.ok) {
        // If specific endpoint fails, return empty or handle gracefully
        return { data: [] }; 
      }
  
      return response.json();
    } catch (error) {
        console.error(`Error fetching subcategories for ${categoryId}:`, error);
        return { data: [] };
    }
  }
