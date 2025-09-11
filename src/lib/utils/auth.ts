import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const authCookieName = "jwt";

interface LoginResponse {
  access_token: string;
}
export async function sendLoginReq(username: string, password: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_AUTH_URI!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Login failed");
  }

  return res.json() as Promise<LoginResponse>;
}

export function saveAuthToken(token: string) {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
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
