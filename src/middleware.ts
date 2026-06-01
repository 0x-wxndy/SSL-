import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  canAccessAdmin,
  canAccessParent,
  parseSession,
} from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = parseSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === "/espace-parent") {
    return NextResponse.redirect(new URL(session && canAccessParent(session) ? "/parent" : "/connexion/parent", request.url));
  }
  if (pathname === "/messages") {
    return NextResponse.redirect(new URL("/parent/messages", request.url));
  }
  if (pathname === "/facturation") {
    return NextResponse.redirect(new URL("/parent/facturation", request.url));
  }

  if (pathname.startsWith("/connexion/parent") && canAccessParent(session)) {
    return NextResponse.redirect(new URL("/parent", request.url));
  }
  if (pathname.startsWith("/connexion/admin") && canAccessAdmin(session)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (pathname.startsWith("/parent")) {
    if (!canAccessParent(session)) {
      const login = new URL("/connexion/parent", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!canAccessAdmin(session)) {
      const login = new URL("/connexion/admin", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/parent/:path*",
    "/admin/:path*",
    "/connexion/:path*",
    "/espace-parent",
    "/messages",
    "/facturation",
  ],
};
