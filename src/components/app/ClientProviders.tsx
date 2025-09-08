
"use client";

import { CartProvider } from "@/context/cartContext";
import { graphqlClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { ReactNode } from "react";

export const ClientProviders = ({ children }: { children: ReactNode }) => {
    return (
        <ApolloProvider client={graphqlClient}>
          <CartProvider>
          {children}
          </CartProvider>
        </ApolloProvider>
    )
};