"use server";

export async function getProductsByCategory(categoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [] };
  }
}

export async function getProductsByBrand(brandId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [] };
  }
}
