"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { routes } from "@/lib/utils/routes";
const authCookieName = "jwt";

interface ApiLoginResponse {
  access_token: string;
  username: string;
}

interface ClientLoginResponse {
  error?: Error;
}

export async function sendLoginReq(
  username: string,
  password: string,
): Promise<ClientLoginResponse> {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_AUTH_URI!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    return res.json().then((e) => ({ error: e }));
  }

  const resp = (await res.json()) as ApiLoginResponse;

  (await cookies()).set({
    name: authCookieName,
    value: resp.access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  redirect(routes.productsNew);
}

export const getAuthToken = async () =>
  (await cookies()).get(authCookieName)?.value || "";

export const getUser = async () => {
  const jwt = await getAuthToken();

  try {
    const decoded = jwtDecode<ApiLoginResponse>(jwt);
    return {
      username: decoded.username,
    };
  } catch (_e) {
    return {
      username: "",
    };
  }
};

export async function handleLogin(
  _previousState: ClientLoginResponse,
  formData: FormData,
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  return sendLoginReq(username, password);
}

export async function logout() {
  // can also send request to server to invalidate token. but keeping it simple
  (await cookies()).delete(authCookieName);
  redirect(routes.home);
}
