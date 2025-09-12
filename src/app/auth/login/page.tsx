"use client";

import { handleLogin } from "@/app/auth/login/auth";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { PageHeading } from "@/components/shared/PageHeading";
import Form from "next/form";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(handleLogin, {});

  return (
    <Form action={formAction} className="space-y-4 max-w-md mx-auto p-4">
      <PageHeading heading="Login" />

      {state.error && (
        <ErrorMessage title="Error logging in" message={state.error.message} />
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          name="username"
          type="text"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          name="password"
          type="password"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`w-full py-2 px-4 rounded font-bold text-white ${
          pending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {pending ? "Logging in..." : "Login"}
      </button>
    </Form>
  );
}
