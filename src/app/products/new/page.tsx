"use client";

import Form from "next/form";
import React, { useActionState } from "react";
import { handleCreateProducts } from "./createProducts";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import Button from "@/components/shared/Button";

export default function NewProductPage() {
  const [state, formAction, pending] = useActionState(handleCreateProducts, {
    data: undefined,
  });

  return (
    <Form action={formAction} className="space-y-4 max-w-md mx-auto p-4">
      {state.error && (
        <ErrorMessage
          title="Error creating product"
          message={state.error.message}
        />
      )}
      <div>
        <label>Name</label>
        <input name="name" required className="w-full border p-2" />
      </div>
      <div>
        <label>Slug</label>
        <input name="slug" required className="w-full border p-2" />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" required className="w-full border p-2" />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          required
          className="w-full border p-2"
        />
      </div>
      <div>
        <label>Image URL</label>
        <input name="imageUrl" required className="w-full border p-2" />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Processing..." : "Create"}
      </Button>
    </Form>
  );
}
