"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Logo from "@/components/brand/Logo";
import UserAccountMenu from "@/components/auth/UserAccountMenu";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import ServicesDropdown, { ServicesMobileList } from "@/components/layout/ServicesDropdown";
import type { Session } from "@/lib/auth";
import { canAccessAlzheimer, canAccessMarketplace, canAccessParent } from "@/lib/auth";
import { FEATURES } from "@/lib/constants";
import { useLocale } from "@/lib/i18n/locale-context";
import { getHomeLanding } from "@/lib/home-landing";

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
  const { locale, t } = useLocale();
  const L = getHomeLanding(locale);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [user, setUser] = useState<Session | null>(null);
  const onSchoolService = pathname.startsWith("/services/accompagnement-scolaire");
  const onAlzheimerService = pathname.startsWith("/services/activites-alzheimer");
  const onHomeCareService = pathname.startsWith("/services/aide-sociale-domicile");
  const onMarketplace = pathname.startsWith("/marketplace");
  const marketplaceMember = user && canAccessMarketplace(user);
  const parentMember = user && canAccessParent(user);
  const alzheimerMember = user && canAccessAlzheimer(user);
  const showMySpace = onSchoolService || onAlzheimerService || onHomeCareService;
  const spaceHref = onSchoolService
    ? parentMember
      ? "/parent"
      : "/connexion?role=parent"
    : onAlzheimerService
      ? alzheimerMember
        ? "/alzheimer"
        : "/connexion?role=alzheimer"
      : marketplaceMember
        ? "/marketplace/compte"
        : "/connexion?role=user";

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-line bg-white/95 backdrop-blur-sm">
        <div className="site-wrap">
          <div className="flex min-h-[88px] items-center justify-between gap-3 py-2.5 sm:min-h-[104px] sm:py-3">
            <Logo
              priority
              imageClassName="h-[72px] w-auto max-w-[72px] object-contain sm:h-[88px] sm:max-w-[88px]"
            />

            <nav className="hidden items-center gap-5 lg:flex">
              <Link href="/" className={navLinkClass(pathname === "/")}>
                {t.nav.home}
              </Link>
              <ServicesDropdown
                open={servicesOpen}
                onToggle={() => setServicesOpen((v) => !v)}
                onClose={() => setServicesOpen(false)}
                active={onSchoolService || onAlzheimerService || onHomeCareService}
              />
              {FEATURES.marketplace && (
                <Link href="/marketplace" className={navLinkClass(onMarketplace)}>
                  {t.nav.marketplace}
                </Link>
              )}
              <Link
                href="/notre-fonctionnement"
                className={navLinkClass(pathname.startsWith("/notre-fonctionnement"))}
              >
                {t.nav.howItWorks}
              </Link>
              <Link href="/contact" className={navLinkClass(pathname === "/contact")}>
                {t.nav.contact}
              </Link>
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              {showMySpace && (
                <Link
                  href={spaceHref}
                  className="rounded-full bg-brand-forest px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
                >
                  {L.mySpace}
                </Link>
              )}
              {(marketplaceMember || parentMember) && user ? (
                <UserAccountMenu user={user} onUserChange={setUser} theme="light" />
              ) : pathname.startsWith("/notre-fonctionnement") ? null : (
                <Link
                  href="/rejoindre"
                  className="rounded-full border border-brand-forest px-3 py-1.5 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-light"
                >
                  {L.workWithUs}
                </Link>
              )}
              <LanguageSwitcher />
            </div>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="px-2 py-1 text-sm font-semibold text-brand-forest lg:hidden"
              aria-expanded={open}
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>

          {open && (
            <nav className="border-t border-line pb-4 pt-3 lg:hidden">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={clsx(
                  "block border-b border-line/60 py-2 text-sm",
                  pathname === "/" ? "font-semibold text-brand-forest" : "text-ink"
                )}
              >
                {t.nav.home}
              </Link>
              <ServicesMobileList onClose={() => setOpen(false)} />
              {FEATURES.marketplace && (
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
              )}
              <Link
                href="/notre-fonctionnement"
                onClick={() => setOpen(false)}
                className={clsx(
                  "block border-b border-line/60 py-2 text-sm",
                  pathname.startsWith("/notre-fonctionnement")
                    ? "font-semibold text-brand-forest"
                    : "text-ink"
                )}
              >
                {t.nav.howItWorks}
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block border-b border-line/60 py-2 text-sm text-ink"
              >
                {t.nav.contact}
              </Link>
              {showMySpace && (
                <Link
                  href={spaceHref}
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-3 w-full text-center"
                >
                  {L.mySpace}
                </Link>
              )}
              {(marketplaceMember || parentMember) && user ? (
                <div className="border-b border-line/60 py-3">
                  <UserAccountMenu user={user} onUserChange={setUser} theme="light" />
                </div>
              ) : pathname.startsWith("/notre-fonctionnement") ? null : (
                <Link
                  href="/rejoindre"
                  onClick={() => setOpen(false)}
                  className="mt-3 block text-sm font-semibold text-brand-forest"
                >
                  {L.workWithUs}
                </Link>
              )}
              <LanguageSwitcher className="mt-4" compact />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
