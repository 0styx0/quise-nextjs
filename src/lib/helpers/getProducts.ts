import { GetProductsQuery } from "@/generated/graphql/graphql";
import { GET_PRODUCTS } from "@/lib/queries/getProducts";
import { getClient } from "../apollo/apolloServer";

export async function getProducts() {
  return getClient().query<GetProductsQuery>({ query: GET_PRODUCTS });
}
