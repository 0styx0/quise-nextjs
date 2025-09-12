'use client'
import { useCart } from "@/context/cartContext";

export function CartItemsIndicator() {

    const { state } = useCart();
    const itemCount = state.products.length;

    if (itemCount < 1) {
        return <></>
    }

    return (
        <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {itemCount}
        </span>
    )
}