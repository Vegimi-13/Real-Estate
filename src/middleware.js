import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // allow login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // only protect /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // ✅ token exists = allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
