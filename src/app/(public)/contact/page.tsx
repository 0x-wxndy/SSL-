import Link from "next/link";
import { ESTABLISHMENT } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="site-wrap max-w-2xl py-10 sm:py-14">
      <p className="section-label">Nous joindre</p>
      <h1 className="mb-2 font-display text-3xl font-bold text-ink">Contact</h1>
      <p className="mb-8 text-sm text-ink-muted">{ESTABLISHMENT.name}</p>

      <div className="card overflow-hidden">
        <div className="border-b border-brand-deep/20 bg-brand-forest px-6 py-5 text-white">
          <p className="text-sm leading-relaxed">Plateforme d&apos;aide sociale — {ESTABLISHMENT.languages.join(" · ")}</p>
          <p className="mt-2 text-xs text-white/70">Service scolaire : enfants {ESTABLISHMENT.ageRange}</p>
        </div>
        <div className="space-y-5 p-6 text-sm">
          <div>
            <p className="section-label mb-1">Téléphone</p>
            <p className="text-ink">+213 XX XX XX XX</p>
          </div>
          <div>
            <p className="section-label mb-1">Email</p>
            <p className="text-ink">contact@ssl-plus.dz</p>
          </div>
          <div>
            <p className="section-label mb-1">Horaires</p>
            <p className="text-ink">Lundi – Vendredi, 07h00 – 20h00</p>
            <p className="mt-1 text-xs font-medium text-brand-forest">Fermé en août (service scolaire)</p>
          </div>
          <hr className="border-line" />
          <p className="text-xs leading-relaxed text-ink-muted">
            Inscription scolaire — délai {ESTABLISHMENT.validationDelay}.{" "}
            <Link href="/inscription" className="font-semibold text-brand-forest underline underline-offset-2">
              Accéder au formulaire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
