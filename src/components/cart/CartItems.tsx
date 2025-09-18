"use client";

import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { priceFormatter } from "@/lib/utils/formatters";

export function CartItems() {
  const { state, removeItem } = useCart();

  if (state.products.length === 0) {
    return <EmptyCart />;
  }

  return (
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
              <p className="text-gray-600 text-sm">
                {priceFormatter.format(product.price / 100)}
              </p>
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
  );
}

function EmptyCart() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <p className="text-gray-600">Your cart is empty.</p>
    </div>
  );
}
