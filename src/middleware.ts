import { routes } from "@/lib/utils/routes";
import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "./app/auth/login/auth";

const protectedRoutes: string[] = [routes.productsNew]


export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)

    // note: this is an mvp. in real app check expiration
    const isLoggedIn = await getAuthToken()

    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL(routes.login, req.nextUrl))
    }

    return NextResponse.next()
}