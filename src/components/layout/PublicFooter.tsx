"use client";

import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { ESTABLISHMENT } from "@/lib/constants";
import { useLocale } from "@/lib/i18n/locale-context";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-ink-muted transition-colors hover:text-brand-forest"
    >
      {children}
    </Link>
  );
}

export default function PublicFooter() {
  const { t } = useLocale();

  const navLinks = [
    { href: "/", label: t.footer.home },
    { href: "/#services", label: t.footer.ourServices },
    { href: "/marketplace", label: t.footer.marketplace },
    { href: "/contact", label: t.footer.contact },
  ];

  const accountLinks = [
    { href: "/inscription", label: t.footer.createAccount },
    { href: "/connexion", label: t.footer.login },
  ];

  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="site-wrap py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
          <div className="max-w-sm">
            <Logo href="/" imageClassName="h-[64px] w-auto max-w-[120px] object-contain" />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t.footer.description}</p>
            <p className="mt-3 text-xs font-medium text-ink-subtle">{ESTABLISHMENT.name}</p>
          </div>

          <div>
            <p className="section-label mb-4">{t.footer.navigation}</p>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label mb-4">{t.footer.account}</p>
            <ul className="space-y-2.5">
              {accountLinks.map(({ href, label }) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-ink-subtle">
            © {new Date().getFullYear()} {ESTABLISHMENT.abbr}
          </p>
          <p className="text-[11px] text-ink-subtle">
            {ESTABLISHMENT.languages.join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
