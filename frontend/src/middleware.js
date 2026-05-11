import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export function middleware(req) {
  const token = req.cookies.get("admin_token")?.value;

  // PROTECTED ROUTES
  const protectedRoutes = [
    "/dashboard",
    "/users",
    "/settings",
    "/api/keys",
    "/usage",
    "/logs"
  ];

  const { pathname } = req.nextUrl;

  // If route matches protected routes & token missing → redirect
  if (protectedRoutes.some(route => pathname.startsWith(route))) {

    if (!token) {
      const loginUrl = new URL("/admin/signin", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*"
  ],
};
