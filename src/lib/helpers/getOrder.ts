import { FetchOrderQuery, FetchOrderQueryVariables } from "@/generated/graphql/graphql"
import { getClient } from "../apollo/apolloServer"
import { FETCH_ORDER } from "../queries/fetchOrder"

export async function getOrder(paymentKey: string) {

    const { data: orderMutation, error } = await getClient().query<FetchOrderQuery, FetchOrderQueryVariables>({ query: FETCH_ORDER, variables: { paymentKey } })

    return {
        order: orderMutation?.fetchOrder,
        error
    }
}