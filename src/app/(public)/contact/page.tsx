import { ESTABLISHMENT } from "@/lib/constants";
import HomeContactForm from "@/components/public/HomeContactForm";

export default function ContactPage() {
  return (
    <div className="bg-surface-green">
      <div className="site-wrap py-10 sm:py-14">
        <div className="mb-8 max-w-2xl">
          <p className="section-label">Nous joindre</p>
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Contact</h1>
          <p className="mt-2 text-sm text-ink-muted">{ESTABLISHMENT.name}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
          <div className="card overflow-hidden">
            <div className="border-b border-brand-deep/20 bg-brand-forest px-6 py-5 text-white">
              <p className="text-sm leading-relaxed">{ESTABLISHMENT.tagline}</p>
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
            </div>
          </div>

          <HomeContactForm />
        </div>
      </div>
    </div>
  );
}
