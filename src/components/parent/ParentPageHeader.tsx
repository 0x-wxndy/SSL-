import type { Session } from "@/lib/auth";

export function ParentPageHeader({
  user,
  title,
  subtitle,
}: {
  user: Session | null;
  title?: string;
  subtitle?: string;
}) {
  const firstName = user?.name?.split(" ").slice(-1)[0] ?? "Parent";

  return (
    <div className="mb-6">
      <h1 className="font-display text-xl sm:text-2xl text-ink">
        {title ?? `Bonjour, ${firstName}`}
      </h1>
      <p className="text-sm text-ink-muted mt-1">
        {subtitle ?? "Espace parent sécurisé · SSL+++"}
      </p>
    </div>
  );
}

export function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-2.5 gap-4">
      <span className="text-xs text-ink-muted">{k}</span>
      <span className="text-xs font-semibold text-ink text-right">{v}</span>
    </div>
  );
}
