"use client"

import { ProductCard } from "@/components/product/ProductCard/ProductCard";
import { useGetProducts } from "../hooks/graphql/useGetProducts";

export default function Home() {
  
  const { data, loading, error } = useGetProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Get your heart&apos;s desire</h1>
        <div className="mt-2 w-48 h-1 bg-red-300 mx-auto rounded-full"></div>
      </div>

      {/* Product grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.getProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
