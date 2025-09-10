import gql from "graphql-tag"

// mutation since can update db with the order info
export const FETCH_ORDER = gql`
  mutation FetchOrder($paymentKey: String!) {
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
`