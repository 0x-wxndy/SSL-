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
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="font-sora text-xl font-semibold mb-1">Coût des prestations</h1>
      <p className="text-sm text-gray-500 mb-5">Facturation selon formules packages • Famille Benali</p>

      {invoices.map((inv) => (
        <div key={inv.ref} className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <div className="text-sm font-semibold text-gray-900">{inv.ref}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">{inv.date}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${inv.paid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {inv.paid ? "Payée" : "En attente"}
                </span>
              </div>
            </div>
            <div className="font-sora text-xl font-bold" style={{ color: "var(--brand)" }}>{inv.total}</div>
          </div>
          <div className="px-5 py-3 divide-y divide-gray-50">
            {inv.lines.map((line) => (
              <div key={line.label} className={`flex justify-between py-2 text-xs ${line.bold ? "font-bold text-gray-900" : "text-gray-600"}`}>
                <span>{line.label}</span>
                <span>{line.amount}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Info block */}
      <div className="flex gap-3 p-4 rounded-xl border" style={{ backgroundColor: "var(--brand-light)", borderColor: "var(--brand-mid)" }}>
        <span className="text-xl">ℹ️</span>
        <div>
          <div className="text-sm font-semibold mb-1" style={{ color: "var(--brand)" }}>Liste d&apos;attente active</div>
          <div className="text-xs leading-relaxed" style={{ color: "var(--brand)" }}>
            En cas d&apos;absence prolongée ou d&apos;annulation, votre place peut être proposée à la liste d&apos;attente. Préavis requis : 48h minimum.
          </div>
        </div>
      </div>
    </div>
  );
}
