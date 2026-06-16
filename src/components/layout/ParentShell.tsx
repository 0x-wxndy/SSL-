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

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-surface-base">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between bg-brand-forest px-4 text-white sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/parent" className="rounded-lg bg-white/95 px-2 py-1">
            <Logo href={undefined} imageClassName="w-[72px] sm:w-[80px]" />
          </Link>
          <span className="hidden text-xs text-white/80 sm:inline">Espace Parent</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {user && (
            <div className="hidden items-center gap-2 md:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                {initials}
              </span>
              <span className="max-w-[140px] truncate text-xs text-white/85">{user.name}</span>
            </div>
          )}
          <button
            onClick={logout}
            className="text-xs font-semibold text-white/90 underline-offset-2 hover:underline"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <nav className="overflow-x-auto border-b border-brand-deep/30 bg-brand-deep">
        <div className="mx-auto flex min-w-max gap-0.5 px-3 py-1 sm:min-w-0 sm:max-w-4xl">
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
