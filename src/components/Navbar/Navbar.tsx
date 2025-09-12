import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { CartItemsIndicator } from "./CartItemsIndicator";
import { getUser } from "@/app/auth/login/auth";
import { AdminDropdown } from "./AdminDropdown";
import { routes } from "@/lib/utils/routes";

export async function NavBar() {
  const user = await getUser();

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Logo */}
      <Link href={routes.home} className="text-xl font-bold text-gray-800">
        Quise
      </Link>

      {user.username && <AdminDropdown username={user.username} />}

      {/* Right: Cart */}
      <div className="relative">
        <Link href={routes.cart}>
          <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
        </Link>
        <CartItemsIndicator />
      </div>
    </nav>
  );
}
