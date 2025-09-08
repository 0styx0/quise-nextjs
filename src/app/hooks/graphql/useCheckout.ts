
import type { Product } from "@/generated/graphql/graphql";
import { CHECKOUT } from "@/lib/queries/checkout";
import { useMutation } from "@apollo/client/react";

export type CheckoutProductInput = { id: string };
export type CheckoutInput = { products: CheckoutProductInput[] };
export type CheckoutResultStatus = "SUCCESS" | "FAILED";
export type CheckoutProductResult = {
  product: Product;
  result: { status: CheckoutResultStatus; additionalInfo: string };
};

export type CheckoutMutationData = { checkout: CheckoutProductResult[] };
export type CheckoutMutationVars = { checkoutProducts: CheckoutInput };

export const useCheckout = () =>
  useMutation<CheckoutMutationData, CheckoutMutationVars>(CHECKOUT);