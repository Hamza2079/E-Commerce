import { redirect } from "next/navigation";

export default function AllOrdersCart() {
  // Redirect to cart page when payment is cancelled
  redirect("/cart");
}
