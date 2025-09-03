"use client"

import { useCart } from "@/context/cartContext";
import { Product } from "@/generated/graphql/graphql";
import { priceFormatter } from "@/lib/utils/formatters";
import Image from 'next/image'

interface ProductCardProps {
    product: Product
}
export const ProductCard = ({ product }: ProductCardProps) => {

    const { addItem } = useCart()

    function addToCart() {
        addItem(product)
    }

    return (
        <div className="rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            {/* Top: name + description + image */}
            <div className="flex items-start justify-between px-6 py-4 gap-4 flex-1">

                <div className="flex-1">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base line-clamp-3">
                        {product.description}
                    </p>
                </div>

                <div className="w-24 h-24 flex-shrink-0 border-2 border-amber-50 rounded">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded"
                    />
                </div>
            </div>

            {/* Bottom: price + button */}
            <div className="mt-auto px-6 py-4 flex justify-between items-center">
                <span className="font-semibold text-lg text-gray-900">
                    {priceFormatter.format(product.price)}
                </span>
                <button
                    onClick={addToCart}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-24 text-center">
                    Buy
                </button>
            </div>
        </div>
    )
}