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
  const price = parseFloat(formData.get("price") as string);
  const imageUrl = formData.get("imageUrl") as string;

  const imageValidation = await validateImageUrl(imageUrl);
  if (imageValidation.error) {
    return {
      data: { createProducts: [] },
      error: imageValidation.error,
    };
  }

  return getClient()
    .mutate<CreateProductsMutation>({
      mutation: CREATE_PRODUCTS,
      variables: { products: [{ name, slug, description, price, imageUrl }] },
    })
    .catch((e) => {
      return {
        data: { createProducts: [] },
        error: e as ErrorLike,
      };
    });
}

async function validateImageUrl(imageUrl: string) {
  // HEAD is cheaper than full GET
  const response = await fetch(imageUrl, { method: "HEAD" });

  if (!response.ok) {
    return {
      data: { createProducts: [] },
      error: {
        name: "InvalidImageError",
        message: `Image URL did not return 200 OK (status: ${response.status})`,
      } as ErrorLike,
    };
  }

  return {};
}
