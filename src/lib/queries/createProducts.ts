import gql from "graphql-tag";

export const CREATE_PRODUCTS = gql`
  mutation CreateProducts($products: [CreateProductInput!]!) {
    createProducts(products: $products) {
      id
      name
      slug
      description
      price
      imageUrl
    }
  }
`;
