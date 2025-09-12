import { getAuthToken } from "@/app/auth/login/auth";
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_SERVER_URI });

const authLink = new SetContextLink(async ({ headers}) => {

  const token = await getAuthToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
})

// for debugging
// const logLink = new ApolloLink((operation, forward) => {
//   console.log('GraphQL Request:', {
//     operationName: operation.operationName,
//     variables: operation.variables,
//     query: operation.query.loc?.source.body,
//     headers: operation.getContext().headers
//   });
//   return forward(operation);
// });

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
  });
});
