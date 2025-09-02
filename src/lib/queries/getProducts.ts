import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      description
      price
      imageUrl
    }
  }
`