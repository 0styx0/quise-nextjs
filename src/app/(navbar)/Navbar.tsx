
"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cartContext";

export const NavBar = () => {
  const { state } = useCart();
  const itemCount = state.products.length;

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Logo */}
      <Link href="/" className="text-xl font-bold text-gray-800">
        Quise
      </Link>

      {/* Right: Cart */}
      <div className="relative">
        <Link href="/cart">
          <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
        </Link>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {itemCount}
          </span>
        )}
      </div>
    </nav>
  );
};