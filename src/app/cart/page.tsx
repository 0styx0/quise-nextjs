"use client";

import { useEffect, useRef } from "react";
import { CartState, useCart } from "@/context/cartContext";
import Image from "next/image";
import { useCheckout } from "../hooks/graphql/useCheckout";
import { useRouter } from 'next/navigation';
import { ErrorMessage } from "@/components/ErrorMessage";

export default function CartPage() {
  const { state, removeItem, clearCart } = useCart();
  const [checkout, { loading, error }] = useCheckout();
  const router = useRouter();

  const checkoutSuccessful = useRef(false);

  const handleCheckout = useCheckoutHandler(checkout, state, () => {
    checkoutSuccessful.current = true;
    router.push("/receipt");
  });

  useEffect(() => {
    return () => {
      if (checkoutSuccessful.current) {
        clearCart();
      }
    };
  }, [clearCart]);

  if (state.products.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ul className="divide-y divide-gray-200">
        {state.products.map((product) => (
          <li key={product.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded border">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </div>
            <button
              onClick={() => removeItem(product.id)}
              className="text-red-500 hover:text-red-700 text-sm font-semibold"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`${loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white font-bold py-2 px-6 rounded`}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>

      {error && <ErrorMessage title="Error checking out!" message={error.message} />}
    </div>
  );
}

/**
 * Returns a handler to checkout cart
 *
 * @param checkout Apollo mutation function
 * @param cartState current cart state
 * @param onSuccess callback to run after successful checkout
 */
function useCheckoutHandler(
  checkout: ReturnType<typeof useCheckout>[0],
  cartState: CartState,
  onSuccess: () => void
) {
  return function handleCheckout() {
    if (cartState.products.length === 0) return;

    const productsToCheckout = cartState.products.map((p) => ({ id: p.id }));

    checkout({
      variables: { checkoutProducts: { products: productsToCheckout } },
      onCompleted: onSuccess,
    });
  };
}