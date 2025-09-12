
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { CartItemsIndicator } from "./CartItemsIndicator";

export const NavBar = () => {

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
        <CartItemsIndicator />
      </div>
    </nav>
  );
};
