import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import CareerApplyForm from "@/components/careers/CareerApplyForm";

export const metadata: Metadata = {
  title: "Postuler | Rejoindre SSL+++",
};

export default function PostulerPage() {
  return (
    <div className="site-wrap py-10 sm:py-14">
      <Link href="/rejoindre" className="mb-6 inline-block text-sm text-ink-muted hover:text-brand-forest">
        Retour à Rejoindre SSL+++
      </Link>
      <Suspense fallback={<p className="text-sm text-ink-muted">Chargement…</p>}>
        <CareerApplyForm />
      </Suspense>
    </div>
  );
}
