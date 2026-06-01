import Link from "next/link";
import { ESTABLISHMENT } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="site-wrap py-10 sm:py-14 max-w-2xl">
      <p className="section-label mb-2">Nous joindre</p>
      <h1 className="font-display text-3xl text-ink mb-2">Contact</h1>
      <p className="text-muted text-sm mb-8">{ESTABLISHMENT.name}</p>

      <div className="border border-line bg-white">
        <div className="px-6 py-5 bg-brand text-white border-b border-brand-dark">
          <p className="text-sm leading-relaxed">Enfants accueillis de {ESTABLISHMENT.ageRange}.</p>
          <p className="text-xs text-white/65 mt-2">{ESTABLISHMENT.languages.join(" · ")}</p>
        </div>
        <div className="p-6 space-y-5 text-sm">
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
            <p className="text-accent text-xs mt-1 font-medium">Fermé en août</p>
          </div>
          <hr className="border-line" />
          <p className="text-muted text-xs leading-relaxed">
            Inscription en ligne — délai {ESTABLISHMENT.validationDelay}.{" "}
            <Link href="/inscription" className="text-brand font-semibold underline underline-offset-2">
              Accéder au formulaire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
