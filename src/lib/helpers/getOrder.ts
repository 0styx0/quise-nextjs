import { FetchOrderQuery, FetchOrderQueryVariables } from "@/generated/graphql/graphql"
import { getClient } from "../apollo/apolloServer"
import { FETCH_ORDER } from "../queries/fetchOrder"

export async function getOrder(paymentKey: string) {

    const { data: orderQuery, error } = await getClient().query<FetchOrderQuery, FetchOrderQueryVariables>({ query: FETCH_ORDER, variables: { paymentKey } })

    return {
        order: orderQuery?.fetchOrder,
        error
    }
}