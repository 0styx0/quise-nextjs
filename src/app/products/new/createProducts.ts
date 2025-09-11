"use server";

import { CreateProductsMutation } from "@/generated/graphql/graphql";
import { CREATE_PRODUCTS } from "../../../lib/queries/createProducts";
import { getClient } from "../../../lib/apollo/apolloServer";
import { ApolloClient } from "@apollo/client";
import { ErrorLike } from "@apollo/client";

export async function handleCreateProducts(
  _previousState: ApolloClient.MutateResult<CreateProductsMutation>,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const imageUrl = formData.get("imageUrl") as string;

  try {
    return await getClient().mutate<CreateProductsMutation>({
      mutation: CREATE_PRODUCTS,
      variables: { products: [{ name, slug, description, price, imageUrl }] },
    });
  } catch (e) {
    return {
      data: { createProducts: [] },
      error: e as ErrorLike,
    };
  }
}
