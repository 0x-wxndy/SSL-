import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  canAccessAdmin,
  canAccessAlzheimer,
  canAccessMarketplace,
  canAccessParent,
  parseSession,
} from "@/lib/auth";
import { FEATURES } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = parseSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === "/espace-parent") {
    return NextResponse.redirect(
      new URL(session && canAccessParent(session) ? "/parent" : "/connexion?role=parent", request.url)
    );
  }
  if (pathname === "/messages") {
    return NextResponse.redirect(new URL("/parent/messages", request.url));
  }
  if (pathname === "/facturation") {
    return NextResponse.redirect(new URL("/parent/facturation", request.url));
  }

  if (
    (pathname === "/connexion" || pathname === "/connexion/") &&
    request.nextUrl.searchParams.get("role") === "alzheimer" &&
    canAccessAlzheimer(session)
  ) {
    return NextResponse.redirect(new URL("/alzheimer", request.url));
  }

  if (pathname.startsWith("/alzheimer")) {
    if (!canAccessAlzheimer(session)) {
      const login = new URL("/connexion", request.url);
      login.searchParams.set("role", "alzheimer");
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  if (pathname === "/connexion" || pathname === "/connexion/") {
    if (canAccessParent(session)) return NextResponse.redirect(new URL("/parent", request.url));
    if (canAccessAdmin(session)) return NextResponse.redirect(new URL("/admin", request.url));
    if (canAccessMarketplace(session)) {
      return NextResponse.redirect(new URL("/marketplace/compte", request.url));
    }
  }

  if (pathname.startsWith("/connexion/parent") && canAccessParent(session)) {
    return NextResponse.redirect(new URL("/parent", request.url));
  }
  if (pathname.startsWith("/connexion/admin")) {
    return NextResponse.redirect(new URL("/admin/connexion", request.url));
  }
  if (pathname.startsWith("/connexion/marketplace") && canAccessMarketplace(session)) {
    return NextResponse.redirect(new URL("/marketplace/compte", request.url));
  }

  if (pathname.startsWith("/parent")) {
    if (!canAccessParent(session)) {
      if (session?.role === "user") {
        return NextResponse.redirect(new URL("/marketplace/compte", request.url));
      }
      const login = new URL("/connexion", request.url);
      login.searchParams.set("role", "parent");
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  if (pathname.startsWith("/admin/connexion")) {
    if (canAccessAdmin(session)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!canAccessAdmin(session)) {
      const login = new URL("/admin/connexion", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  // Marketplace browse / publish — hidden when feature flag is off
  const isMarketplaceBrowse =
    pathname === "/marketplace" ||
    pathname === "/marketplace/" ||
    (pathname.startsWith("/marketplace/") &&
      !pathname.startsWith("/marketplace/compte"));
  if (!FEATURES.marketplace && isMarketplaceBrowse) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Déclarer un enfant : compte utilisateur ou parent
  if (pathname.startsWith("/marketplace/compte/activer-parent")) {
    if (!canAccessMarketplace(session) && !canAccessParent(session)) {
      const login = new URL("/connexion", request.url);
      login.searchParams.set("role", "user");
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/marketplace/compte") || pathname.startsWith("/marketplace/publier")) {
    if (!canAccessMarketplace(session)) {
      const login = new URL("/connexion", request.url);
      login.searchParams.set("role", "user");
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
    if (!FEATURES.marketplace && pathname.startsWith("/marketplace/publier")) {
      return NextResponse.redirect(new URL("/marketplace/compte", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/parent/:path*",
    "/admin/:path*",
    "/connexion",
    "/connexion/:path*",
    "/marketplace",
    "/marketplace/:path*",
    "/espace-parent",
    "/messages",
    "/facturation",
    "/alzheimer",
    "/alzheimer/:path*",
  ],
};
