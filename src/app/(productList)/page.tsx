
import { ProductCard } from "@/components/product/ProductCard/ProductCard";
import { GetProductsQuery } from "@/generated/graphql/graphql";
import { graphqlClient } from "@/lib/apolloClient";
import { GET_PRODUCTS } from "@/lib/queries/getProducts";

export default async function Home() {
  const { data } = await graphqlClient.query<GetProductsQuery>({ query: GET_PRODUCTS })

  return (
    <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.getProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
