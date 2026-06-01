"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ESTABLISHMENT } from "@/lib/constants";
import type { Session } from "@/lib/auth";
import { roleLabel } from "@/lib/auth";

export default function AdminShell({ children }: { children: React.ReactNode }) {
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f9fafb" }}>
      <header className="h-12 flex items-center justify-between px-4 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="font-sora font-bold text-sm" style={{ color: "var(--brand)" }}>
            {ESTABLISHMENT.abbr}
          </Link>
          <span className="text-xs text-gray-400">|</span>
          <span className="text-xs font-semibold text-gray-600">Back-office — accès restreint</span>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-xs text-gray-600 hidden sm:inline">
              {user.name} • {roleLabel(user.role)}
            </span>
          )}
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 hidden sm:inline">
            Site public
          </Link>
          <button onClick={logout} className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
            Déconnexion
          </button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
