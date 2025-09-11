"use client";

import { CartProvider } from "@/context/cartContext";
import { makeClient } from "@/lib/apollo/apolloClient";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { ReactNode } from "react";

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <CartProvider>{children}</CartProvider>
    </ApolloNextAppProvider>
  );
};
