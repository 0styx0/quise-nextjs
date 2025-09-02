
import { GetProductsQuery } from "@/generated/graphql/graphql";
import { graphqlClient } from "@/lib/apolloClient";
import { GET_PRODUCTS } from "@/lib/queries/getProducts";

export default async function Home() {
  const { data } = await graphqlClient.query<GetProductsQuery>({ query: GET_PRODUCTS })

  return (
    data?.getProducts[0].name
  );
}
