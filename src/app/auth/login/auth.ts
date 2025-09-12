'use server'
import { cookies } from "next/headers";


const authCookieName = "jwt";

interface LoginResponse {
  access_token: string;
  error?: Error;
}
export async function sendLoginReq(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_AUTH_URI!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    return res.json().then((e) => ({ error: e, access_token: ''}));
  }

  return res.json() as Promise<LoginResponse>;
}

export async function saveAuthToken(token: string) {
  (await cookies()).set({
    name: authCookieName,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

export const getAuthToken = async () =>
  (await cookies()).get(authCookieName)?.value;


export async function handleLogin(
  _previousState: LoginResponse,
  formData: FormData,
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  return sendLoginReq(username, password)
}
