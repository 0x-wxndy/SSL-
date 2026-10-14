import { Suspense } from "react";
import { ESTABLISHMENT } from "@/lib/constants";
import { MARKETPLACE_LISTINGS } from "@/lib/marketplace-data";
import MarketplaceBrowse from "@/components/marketplace/MarketplaceBrowse";

export default function MarketplacePage() {
  return (
    <div>
      <section
        className="border-b border-line"
        style={{
          background: "linear-gradient(160deg, var(--brand-light) 0%, var(--surface-base) 70%)",
        }}
      >
        <div className="site-wrap py-10 sm:py-12">
          <div>
            <p className="section-label">Marketplace aide sociale</p>
            <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Trouvez ou proposez un service près de chez vous
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
              Comme une place de marché dédiée à l&apos;aide sociale : garde, ménage, seniors,
              soutien scolaire… Des particuliers et professionnels publient leurs offres sur{" "}
              {ESTABLISHMENT.abbr}.
            </p>
          </div>
          <dl className="mt-8 flex flex-wrap gap-6 text-sm">
            <div>
              <dt className="text-xs text-ink-muted">Annonces actives</dt>
              <dd className="text-xl font-bold text-brand-forest">{MARKETPLACE_LISTINGS.length}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-muted">Volets SSL</dt>
              <dd className="text-xl font-bold text-brand-forest">3</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-muted">Wilayas</dt>
              <dd className="text-xl font-bold text-brand-forest">69</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="site-wrap py-10 sm:py-12">
        <Suspense fallback={<p className="text-sm text-ink-muted">Chargement…</p>}>
          <MarketplaceBrowse />
        </Suspense>
      </section>
    </div>
  );
}
