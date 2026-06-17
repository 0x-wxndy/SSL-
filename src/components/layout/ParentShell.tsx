"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Calendar,
  CreditCard,
  FileText,
  BadgeCheck,
  MessageCircle,
  Video,
} from "lucide-react";
import { PARENT_SECTIONS } from "@/lib/constants";
import Logo from "@/components/brand/Logo";
import UserAccountMenu from "@/components/auth/UserAccountMenu";
import type { Session } from "@/lib/auth";

const navIcons: Record<string, React.ReactNode> = {
  dossier: <FileText className="h-3.5 w-3.5" />,
  badge: <BadgeCheck className="h-3.5 w-3.5" />,
  planning: <Calendar className="h-3.5 w-3.5" />,
  cameras: <Video className="h-3.5 w-3.5" />,
  messages: <MessageCircle className="h-3.5 w-3.5" />,
  prestation: <CreditCard className="h-3.5 w-3.5" />,
};

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
    <div className="min-h-screen bg-surface-base">
      <header className="sticky top-0 z-50 border-b border-brand-deep/25 bg-brand-forest shadow-sm">
        <div className="flex min-h-[4.75rem] items-center justify-between gap-4 px-4 py-3 text-white sm:min-h-20 sm:px-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="shrink-0 rounded-xl bg-white px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">
              <Logo
                href="/parent"
                imageClassName="h-11 w-auto max-w-[108px] sm:h-[3.25rem] sm:max-w-[128px]"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/55">
                SSL+++
              </p>
              <p className="truncate font-display text-sm font-bold sm:text-base">Espace Parent</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {user && <UserAccountMenu user={user} onUserChange={setUser} theme="dark" />}
            <button
              onClick={logout}
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10 sm:px-3"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <nav className="overflow-x-auto border-b border-brand-deep/30 bg-brand-deep">
        <div className="mx-auto flex min-w-max gap-0.5 px-3 py-1.5 sm:min-w-0 sm:max-w-4xl">
          {PARENT_SECTIONS.map((s) => {
            const active = isNavActive(pathname, s.href);
            return (
              <Link
                key={s.id}
                href={s.href}
                className={clsx(
                  "flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3.5 py-2.5 text-xs font-semibold transition-colors",
                  active
                    ? "border-brand-mint text-white"
                    : "border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                {navIcons[s.id]}
                {s.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
