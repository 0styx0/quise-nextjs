import gql from "graphql-tag"

export const FETCH_ORDER = gql`
  mutation FetchOrder($paymentKey: String!) {
    fetchOrder(paymentKey: $paymentKey) {
      id
      priceTotal
      customerEmail
      lineItems {
        id
        name
        priceUnit
      }
    }
  }
`