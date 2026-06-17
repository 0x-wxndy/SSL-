"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  BarChart3,
  School,
  Shield,
  ShoppingBag,
  Truck,
  UserCog,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Logo from "@/components/brand/Logo";
import UserAccountMenu from "@/components/auth/UserAccountMenu";
import type { Session } from "@/lib/auth";
import { roleLabel } from "@/lib/auth";
import {
  type AdminModuleGroup,
  type AdminModuleId,
  getModulesForRole,
} from "@/lib/admin-rbac";

const MODULE_ICONS: Record<AdminModuleId, LucideIcon> = {
  school: Users,
  staff: UserCog,
  partners: School,
  marketplace: ShoppingBag,
  supply: Truck,
  governance: Shield,
  reporting: BarChart3,
};

const GROUP_ORDER: AdminModuleGroup[] = [
  "Pédagogie",
  "Plateforme",
  "Logistique",
  "Gouvernance",
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeModule = (searchParams.get("m") ?? "") as AdminModuleId;
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);

  const allowedModules = user ? getModulesForRole(user.role) : [];
  const grouped = GROUP_ORDER.map((group) => ({
    group,
    items: allowedModules.filter((m) => m.group === group),
  })).filter((g) => g.items.length > 0);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  function moduleHref(id: AdminModuleId) {
    return `${pathname}?m=${id}`;
  }

  return (
    <div className="flex min-h-screen bg-surface-2">
      <aside className="hidden w-56 flex-shrink-0 flex-col border-e border-white/10 bg-brand-deep md:flex">
        <div className="border-b border-white/10 px-4 py-4">
          <div className="inline-block rounded-lg bg-white px-2.5 py-2">
            <Logo href="/admin" imageClassName="h-10 w-auto max-w-[100px] sm:h-11 sm:max-w-[112px]" />
          </div>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-white/45">
            ERP · Back-office
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {grouped.map(({ group, items }) => (
            <div key={group} className="mb-4">
              <p className="mb-1.5 px-4 text-[10px] font-semibold uppercase tracking-widest text-white/35">
                {group}
              </p>
              {items.map((module) => {
                const Icon = MODULE_ICONS[module.id];
                const isActive = activeModule === module.id;
                return (
                  <Link
                    key={module.id}
                    href={moduleHref(module.id)}
                    className={clsx(
                      "mx-2 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors",
                      isActive
                        ? "border-s-[3px] border-brand-forest bg-white/15 ps-[9px] text-white"
                        : "border-s-[3px] border-transparent text-white/60 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {module.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {user && (
          <div className="border-t border-white/10 px-4 py-3">
            <p className="truncate text-xs font-medium text-white/80">{user.name}</p>
            <p className="text-[10px] text-white/45">{roleLabel(user.role)}</p>
          </div>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {allowedModules.length > 0 && (
          <nav className="flex gap-1 overflow-x-auto border-b border-line bg-brand-deep px-3 py-2 md:hidden">
            {allowedModules.map((module) => {
              const Icon = MODULE_ICONS[module.id];
              const isActive = activeModule === module.id;
              return (
                <Link
                  key={module.id}
                  href={moduleHref(module.id)}
                  className={clsx(
                    "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium",
                    isActive ? "bg-white/15 text-white" : "text-white/60"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {module.label}
                </Link>
              );
            })}
          </nav>
        )}

        <header className="flex h-12 flex-shrink-0 items-center justify-between border-b border-line bg-white px-4 sm:px-6">
          <span className="text-xs font-semibold text-ink-muted">
            Back-office — accès restreint
          </span>
          <div className="flex items-center gap-3">
            {user && <UserAccountMenu user={user} onUserChange={setUser} theme="light" />}
            <Link
              href="/"
              className="hidden text-xs text-ink-subtle hover:text-brand-forest sm:inline"
            >
              Site public
            </Link>
            <button onClick={logout} className="btn-primary btn-sm rounded-lg">
              Déconnexion
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
