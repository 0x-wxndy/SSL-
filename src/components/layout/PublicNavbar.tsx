"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { ESTABLISHMENT } from "@/lib/constants";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/inscription", label: "Inscription" },
  { href: "/contact", label: "Contact" },
  { href: "/reglement-interieur", label: "Règlement" },
];

export default function PublicNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-line">
      <div className="site-wrap">
        <div className="flex items-center justify-between h-[58px]">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-display text-xl font-bold text-brand">{ESTABLISHMENT.abbr}</span>
            <span className="hidden sm:inline text-[11px] text-muted font-normal border-l border-line pl-2">
              {ESTABLISHMENT.ageRange}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "text-sm transition-colors relative py-1",
                  pathname === href
                    ? "text-brand font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand"
                    : "text-muted hover:text-ink"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/connexion/parent" className="text-sm text-muted hover:text-brand px-2 py-1">
              Parents
            </Link>
            <Link href="/connexion/admin" className="btn-primary text-xs px-3 py-2">
              Équipe
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden text-sm font-semibold text-brand px-2 py-1"
            aria-expanded={open}
          >
            {open ? "Fermer" : "Menu"}
          </button>
        </div>

        {open && (
          <nav className="md:hidden pb-4 border-t border-line pt-3 space-y-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "block py-2 text-sm border-b border-line/60 last:border-0",
                  pathname === href ? "text-brand font-semibold" : "text-ink"
                )}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 flex gap-2">
              <Link href="/connexion/parent" onClick={() => setOpen(false)} className="btn-secondary flex-1 text-center text-xs">
                Espace Parent
              </Link>
              <Link href="/connexion/admin" onClick={() => setOpen(false)} className="btn-primary flex-1 text-center text-xs">
                Équipe
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
