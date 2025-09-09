import { GetProductsQuery } from "@/generated/graphql/graphql"
import { GET_PRODUCTS } from "@/lib/queries/getProducts"

export async function getProducts() {
  return  graphqlClient.query<GetProductsQuery>({ query: GET_PRODUCTS })
}
