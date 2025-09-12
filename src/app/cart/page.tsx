import { CheckoutButton } from "@/components/cart/CheckoutButton";
import { CartItems } from "@/components/cart/CartItems";
import { Metadata } from "next";
import { PageHeading } from "@/components/shared/PageHeading";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <PageHeading heading="Your Cart" />
      <CartItems />

      <CheckoutButton />
    </div>
  );
}
