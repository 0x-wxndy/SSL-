"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import Logo from "@/components/brand/Logo";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import ServicesDropdown, { ServicesMobileList } from "@/components/layout/ServicesDropdown";
import { useLocale } from "@/lib/i18n/locale-context";

function navLinkClass(active: boolean) {
  return clsx(
    "relative py-1 text-sm transition-colors",
    active
      ? "font-semibold text-brand-forest after:absolute after:bottom-0 after:start-0 after:end-0 after:h-0.5 after:bg-brand-forest"
      : "text-ink-muted hover:text-ink"
  );
}

export default function PublicNavbar() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const onServicePage = pathname.startsWith("/services/");
  const onMarketplace = pathname.startsWith("/marketplace");

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="site-wrap">
        <div className="flex min-h-[96px] items-center justify-between gap-4 py-3 sm:min-h-[104px] sm:py-4">
          <Logo
            priority
            imageClassName="h-[72px] w-auto max-w-[120px] object-contain sm:h-[80px] sm:max-w-[136px]"
          />

          <nav className="hidden items-center gap-6 md:flex">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className={navLinkClass(pathname === href)}>
                {label}
              </Link>
            ))}
            <ServicesDropdown
              open={servicesOpen}
              onToggle={() => setServicesOpen((v) => !v)}
              onClose={() => setServicesOpen(false)}
              active={onServicePage}
            />
            <Link href="/marketplace" className={navLinkClass(onMarketplace)}>
              {t.nav.marketplace}
            </Link>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/inscription"
              className="rounded-full px-4 py-1.5 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-light"
            >
              {t.nav.createAccount}
            </Link>
            <Link
              href="/connexion"
              className="rounded-full border border-brand-forest px-4 py-1.5 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-light"
            >
              {t.nav.login}
            </Link>
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="px-2 py-1 text-sm font-semibold text-brand-forest md:hidden"
            aria-expanded={open}
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>

        {open && (
          <nav className="border-t border-line pb-4 pt-3 md:hidden">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "block border-b border-line/60 py-2 text-sm",
                  pathname === href ? "font-semibold text-brand-forest" : "text-ink"
                )}
              >
                {label}
              </Link>
            ))}
            <ServicesMobileList onClose={() => setOpen(false)} />
            <Link
              href="/marketplace"
              onClick={() => setOpen(false)}
              className={clsx(
                "block border-b border-line/60 py-2 text-sm",
                onMarketplace ? "font-semibold text-brand-forest" : "text-ink"
              )}
            >
              {t.nav.marketplace}
            </Link>
            <Link
              href="/inscription"
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-2 text-sm text-ink"
            >
              {t.nav.createAccount}
            </Link>
            <Link
              href="/connexion"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 w-full text-center"
            >
              {t.nav.login}
            </Link>
            <LanguageSwitcher className="mt-4" compact />
          </nav>
        )}
      </div>
    </header>
  );
}
