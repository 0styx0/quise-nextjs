
import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphqlClient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    // todo: replace with env var
    uri: 'http://localhost:3000/graphql'
  }),
  cache: new InMemoryCache(),
});