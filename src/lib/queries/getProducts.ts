import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      slug
      description
      price
      imageUrl
    }
  }
`