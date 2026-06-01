"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ESTABLISHMENT, PARENT_SECTIONS } from "@/lib/constants";
import type { Session } from "@/lib/auth";

function isNavActive(pathname: string, href: string) {
  if (href === "/parent") return pathname === "/parent";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function ParentShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-50 bg-brand text-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/parent" className="font-display text-base sm:text-lg font-bold">
            {ESTABLISHMENT.abbr}
            <span className="font-sans text-xs sm:text-sm font-normal text-white/70 ml-2">Espace Parent</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            {user && <span className="text-xs text-white/75 hidden md:inline">{user.name}</span>}
            <button
              onClick={logout}
              className="text-xs font-semibold px-3 py-1.5 border border-white/30 hover:bg-white/10"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <nav className="bg-brand-dark border-t border-white/10 overflow-x-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex gap-0.5 py-1.5 min-w-max sm:min-w-0">
            {PARENT_SECTIONS.map((s) => {
              const active = isNavActive(pathname, s.href);
              return (
                <Link
                  key={s.id}
                  href={s.href}
                  className={clsx(
                    "flex items-center gap-1.5 px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors",
                    active
                      ? "border-accent text-white bg-white/10"
                      : "border-transparent text-white/65 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="hidden sm:inline">{s.icon}</span>
                  {s.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">{children}</main>
    </div>
  );
}
