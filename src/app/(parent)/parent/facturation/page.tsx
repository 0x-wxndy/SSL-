"use client";

import { ParentPageHeader } from "@/components/parent/ParentPageHeader";
import { useParentSession } from "@/hooks/useParentSession";

type InvoiceLine = { label: string; amount: string; bold?: boolean };
type Invoice = { ref: string; date: string; paid: boolean; total: string; lines: InvoiceLine[] };

const invoices: Invoice[] = [
  {
    ref: "Prestation — Mai 2025",
    date: "Émise le 01 Juin 2025",
    paid: true,
    total: "27 400 DA",
    lines: [
      { label: "Adam – Package 4 (Full Services × 22 jours)", amount: "22 000 DA" },
      { label: "Lina – Package 2 (Après-midi × 20 jours)", amount: "6 000 DA" },
      { label: "Absence Lina (2 jours – crédit appliqué, préavis OK)", amount: "- 600 DA" },
      { label: "Total mensuel", amount: "27 400 DA", bold: true },
    ],
  },
  {
    ref: "Prestation — Avril 2025",
    date: "Émise le 01 Mai 2025",
    paid: true,
    total: "27 200 DA",
    lines: [
      { label: "Adam – Package 4 × 21 jours", amount: "21 000 DA" },
      { label: "Lina – Package 2 × 20 jours", amount: "6 200 DA" },
      { label: "Total mensuel", amount: "27 200 DA", bold: true },
    ],
  },
];

export default function FacturationPage() {
  const { user } = useParentSession();

  return (
    <div>
      <ParentPageHeader
        user={user}
        title="Coût des prestations"
        subtitle="Facturation selon formules packages · Famille Benali"
      />

      {invoices.map((inv) => (
        <div key={inv.ref} className="card mb-4 overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <div className="text-sm font-semibold text-ink">{inv.ref}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-ink-muted">{inv.date}</span>
                <span className={inv.paid ? "badge badge-valid" : "badge badge-wait"}>
                  {inv.paid ? "Payée" : "En attente"}
                </span>
              </div>
            </div>
            <div className="font-display text-xl font-bold text-brand-forest">{inv.total}</div>
          </div>
          <div className="divide-y divide-line/60 px-5 py-3">
            {inv.lines.map((line) => (
              <div
                key={line.label}
                className={`flex justify-between py-2 text-xs ${line.bold ? "font-bold text-ink" : "text-ink-muted"}`}
              >
                <span>{line.label}</span>
                <span>{line.amount}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-3 rounded-xl border border-brand-forest/20 bg-brand-light p-4">
        <span className="text-xl">ℹ️</span>
        <div>
          <div className="mb-1 text-sm font-semibold text-brand-deep">Liste d&apos;attente active</div>
          <div className="text-xs leading-relaxed text-brand-deep/80">
            En cas d&apos;absence prolongée ou d&apos;annulation, votre place peut être proposée à la liste
            d&apos;attente. Préavis requis : 48h minimum.
          </div>
        </div>
      </div>
    </div>
  );
}
