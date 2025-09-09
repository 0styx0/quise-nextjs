import gql from "graphql-tag";

export const CHECKOUT = gql`
  mutation Checkout($checkoutProducts: CheckoutInput!) {
    checkout(checkoutProducts: $checkoutProducts) {
      paymentKey
    }
  }
`;