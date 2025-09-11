import { CheckoutButton } from "@/components/cart/CheckoutButton";
import { CartItems } from "@/components/cart/CartItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <CartItems />

      <CheckoutButton />
    </div>
  );
}
