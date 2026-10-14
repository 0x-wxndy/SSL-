"use client";

import Link from "next/link";
import clsx from "clsx";
import type { Session } from "@/lib/auth";

export default function ParentSpaceCard({ user }: { user: Session }) {
  const status = user.parentStatus;

  if (status === "active") {
    return (
      <div className="mb-6 rounded-xl border border-brand-forest/25 bg-brand-light px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-forest">Espace parent actif</p>
            <p className="mt-1 text-sm text-ink">
              {user.parentChildName
                ? `Enfants rattachés : ${user.parentChildName}.`
                : "Dossier validé."}{" "}
              Accédez au planning, messages, facturation et caméras.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link href="/parent" className="btn-primary btn-sm">
              Ouvrir l&apos;espace parent
            </Link>
            <Link href="/inscription/parent" className="btn-secondary btn-sm">
              Ajouter un enfant
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 sm:px-5">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-800">Dossier en validation</p>
        <p className="mt-1 text-sm text-amber-900">
          {user.parentChildName
            ? `Dossier de ${user.parentChildName} soumis — en attente de validation Admin 1 & Admin 2.`
            : "Votre dossier est en cours de validation par l'équipe SSL+++."}
        </p>
        <p className="mt-2 text-xs text-amber-800/80">
          Vous recevrez l&apos;accès à l&apos;espace parent dès validation (démo : via le module Scolarité).
        </p>
        <Link href="/inscription/parent" className="btn-secondary btn-sm mt-3 inline-flex">
          Ajouter un enfant
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-xl border border-line bg-white px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">Accompagnement scolaire SSL+++</p>
          <p className="mt-1 text-sm text-ink-muted">
            Inscrivez un enfant depuis ce compte — pas besoin d&apos;un second identifiant.
          </p>
        </div>
        <Link
          href="/inscription/parent"
          className={clsx("btn-primary btn-sm shrink-0")}
        >
          Activer l&apos;espace parent
        </Link>
      </div>
    </div>
  );
}
