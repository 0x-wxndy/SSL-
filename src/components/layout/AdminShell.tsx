"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Package,
  School,
  Shield,
  Truck,
  UserCog,
  Users,
} from "lucide-react";
import Logo from "@/components/brand/Logo";
import type { Session } from "@/lib/auth";
import { roleLabel } from "@/lib/auth";

const sidebarItems = [
  { icon: Users, label: "Enfants" },
  { icon: UserCog, label: "Personnel" },
  { icon: School, label: "Partenaires" },
  { icon: Truck, label: "Fournisseurs" },
  { icon: Package, label: "Stocks" },
  { icon: Shield, label: "Rôles & accès" },
  { icon: BarChart3, label: "Reporting" },
];

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
    <div className="flex min-h-screen bg-surface-2">
      <aside className="hidden w-48 flex-shrink-0 flex-col bg-brand-deep md:flex">
        <div className="border-b border-white/10 px-3 py-3">
          <Link href="/admin" className="inline-block rounded-lg bg-white px-2 py-1.5">
            <Logo href={undefined} imageClassName="w-[88px]" />
          </Link>
          <span className="mt-2 block text-[10px] text-white/50">Back-office</span>
        </div>
        <nav className="flex-1 py-2">
          {sidebarItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 border-s-[3px] border-transparent px-4 py-2 text-xs text-white/60"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 flex-shrink-0 items-center justify-between border-b border-line bg-white px-4">
          <span className="text-xs font-semibold text-ink-muted">Back-office — accès restreint</span>
          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden text-xs text-ink-muted sm:inline">
                {user.name} · {roleLabel(user.role)}
              </span>
            )}
            <Link href="/" className="hidden text-xs text-ink-subtle hover:text-brand-forest sm:inline">
              Site public
            </Link>
            <button
              onClick={logout}
              className="btn-primary btn-sm rounded-lg"
            >
              Déconnexion
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
