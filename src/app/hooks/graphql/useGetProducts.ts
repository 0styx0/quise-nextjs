import { GetProductsQuery } from "@/generated/graphql/graphql"
import { GET_PRODUCTS } from "@/lib/queries/getProducts"
import { useQuery } from "@apollo/client/react"

export const useGetProducts = () => 
    useQuery<GetProductsQuery>(GET_PRODUCTS)
