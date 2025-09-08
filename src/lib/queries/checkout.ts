import gql from "graphql-tag";

export const CHECKOUT = gql`
  mutation Checkout($checkoutProducts: CheckoutInput!) {
    checkout(checkoutProducts: $checkoutProduct) {
      product {
        id
        name
        slug
        description
        price
        imageUrl
      }
      result {
        status
        additionalInfo
      }
    }
  }
`;