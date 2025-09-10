import gql from "graphql-tag"

export const FETCH_ORDER = gql`
  query FetchOrder($paymentKey: String!) {
    fetchOrder(paymentKey: $paymentKey) {
      id
      priceTotal
      lineItems {
        id
        name
        priceUnit
      }
    }
  }
`;