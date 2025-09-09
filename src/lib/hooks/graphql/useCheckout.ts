
import type { CheckoutMutation, CheckoutMutationVariables } from "@/generated/graphql/graphql";
import { CHECKOUT } from "@/lib/queries/checkout";
import { useMutation } from "@apollo/client/react";

export const useCheckout = () =>
  useMutation<CheckoutMutation, CheckoutMutationVariables>(CHECKOUT);