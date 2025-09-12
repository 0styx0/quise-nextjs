"use client";

import Form from "next/form";
import { useActionState } from "react";
import { handleCreateProducts } from "./createProducts";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import Button from "@/components/shared/Button";
import { SuccessMessage } from "@/components/shared/SuccessMessage";


export default function NewProductPage() {
  const [state, formAction, pending] = useActionState(handleCreateProducts, {
    data: undefined,
  });

  const wasSuccessfulAdd = (state.data?.createProducts ?? []).length > 0;

  return (
    <Form action={formAction} className="space-y-4 max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      {state.error && (
        <ErrorMessage
          aria-live="assertive"
          title="Error creating product"
          message={state.error.message}
        />
      )}

      {wasSuccessfulAdd && (
        <SuccessMessage
          message={`${state.data?.createProducts[0].name} created successfully`}
          aria-live="assertive"
        />
      )}

      <NameField />
      <SlugField />
      <DescriptionField />
      <PriceField />
      <ImageUrlField />

      <Button type="submit" disabled={pending}>
        {pending ? "Processing..." : "Create"}
      </Button>
    </Form>
  );
}

// --- Field Components ---

function NameField() {
  return (
    <div>
      <label htmlFor="name" className="block font-medium">
        Name <span className="text-red-500">*</span>
      </label>
      <input
        id="name"
        name="name"
        required
        className="peer w-full border p-2 rounded border-gray-300
                   user-invalid:border-red-500 user-valid:border-green-500"
      />
      <p className="mt-1 text-sm text-red-600 hidden peer-user-invalid:block">
        Name is required.
      </p>
    </div>
  );
}

function SlugField() {
  return (
    <div>
      <label htmlFor="slug" className="block font-medium">
        Slug <span className="text-red-500">*</span>
      </label>
      <input
        id="slug"
        name="slug"
        required
        pattern="^[a-z0-9]+(-[a-z0-9]+){0,2}$"
        title="Slug must contain at most three words, separated by dashes."
        className="peer w-full border p-2 rounded border-gray-300
                   user-invalid:border-red-500 user-valid:border-green-500"
      />
      <p className="mt-1 text-sm text-red-600 hidden peer-user-invalid:block">
        Slug must contain 1–3 lowercase words, separated by dashes.
      </p>
    </div>
  );
}

function DescriptionField() {
  return (
    <div>
      <label htmlFor="description" className="block font-medium">
        Description <span className="text-red-500">*</span>
      </label>
      <textarea
        id="description"
        name="description"
        required
        className="peer w-full border p-2 rounded border-gray-300
                   user-invalid:border-red-500 user-valid:border-green-500"
      />
      <p className="mt-1 text-sm text-red-600 hidden peer-user-invalid:block">
        Description is required.
      </p>
    </div>
  );
}

function PriceField() {
  return (
    <div>
      <label htmlFor="price" className="block font-medium">
        Price <span className="text-red-500">*</span>
      </label>
      <input
        id="price"
        type="number"
        name="price"
        required
        min="0.01"
        step="0.01"
        className="peer w-full border p-2 rounded border-gray-300
                   user-invalid:border-red-500 user-valid:border-green-500"
      />
      <p className="mt-1 text-sm text-red-600 hidden peer-user-invalid:block">
        Price must be greater than 0.
      </p>
    </div>
  );
}

function ImageUrlField() {
  return (
    <div>
      <label htmlFor="imageUrl" className="block font-medium">
        Image URL <span className="text-red-500">*</span>
      </label>
      <input
        id="imageUrl"
        name="imageUrl"
        type="url"
        required
        pattern="^https:\/\/live\.staticflickr\.com\/.+/.+$"
        title="Must be a valid Flickr image URL."
        className="peer w-full border p-2 rounded border-gray-300
                   user-invalid:border-red-500 user-valid:border-green-500"
      />
      <p className="mt-1 text-sm text-red-600 hidden peer-user-invalid:block">
        Must be a valid Flickr image URL (https://live.staticflickr.com/aaaa/bbbb).
      </p>
    </div>
  );
}

