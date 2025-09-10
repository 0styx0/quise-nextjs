
import { ProductCard } from "@/components/product/ProductCard/ProductCard";
import { getProducts } from "../../lib/helpers/getProducts";

export default async function Home() {
  
  const { data } = await getProducts()

  return (
    <div className="min-h-screen x-themed-gradient p-6">
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
