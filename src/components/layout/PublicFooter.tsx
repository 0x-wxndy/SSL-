import Link from "next/link";
import { ESTABLISHMENT } from "@/lib/constants";

export default function PublicFooter() {
  return (
    <footer className="border-t border-line bg-surface-2 mt-auto">
      <div className="site-wrap py-10">
        <div className="grid sm:grid-cols-[1.2fr_1fr] gap-8">
          <div>
            <p className="font-display text-lg font-bold text-brand">{ESTABLISHMENT.abbr}</p>
            <p className="text-sm text-muted mt-1 max-w-xs leading-relaxed">
              {ESTABLISHMENT.name} — accompagnement scolaire et garde d&apos;enfants.
            </p>
            <p className="text-xs text-muted mt-4">
              Ouvert lun–ven, 7h–20h · Fermé en août
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm self-start">
            <Link href="/inscription" className="text-muted hover:text-brand">Inscription</Link>
            <Link href="/contact" className="text-muted hover:text-brand">Contact</Link>
            <Link href="/reglement-interieur" className="text-muted hover:text-brand">Règlement intérieur</Link>
            <Link href="/connexion/parent" className="text-muted hover:text-brand">Espace parent</Link>
            <Link href="/connexion/admin" className="text-muted hover:text-brand col-span-2">Accès équipe</Link>
          </div>
        </div>
        <p className="text-[11px] text-muted/80 mt-8 pt-6 border-t border-line">
          © {new Date().getFullYear()} {ESTABLISHMENT.abbr} — {ESTABLISHMENT.languages.join(" · ")}
        </p>
      </div>
    </footer>
  );
}
