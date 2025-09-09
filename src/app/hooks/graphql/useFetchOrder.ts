import { FetchOrderMutation, MutationFetchOrderArgs } from "@/generated/graphql/graphql";
import { FETCH_ORDER } from "@/lib/queries/fetchOrder";
import { useMutation } from "@apollo/client/react";

export const useFetchOrder = () =>
  useMutation<FetchOrderMutation, MutationFetchOrderArgs>(FETCH_ORDER);