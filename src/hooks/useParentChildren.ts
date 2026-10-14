"use client";

import { useEffect, useState } from "react";
import type { ParentChildView } from "@/lib/school-dossiers";

/** Enfants réellement rattachés au compte connecté (dossiers validés) */
export function useParentChildren() {
  const [children, setChildren] = useState<ParentChildView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/parent/children")
      .then((r) => (r.ok ? r.json() : { children: [] }))
      .then((data) => setChildren(data.children ?? []))
      .catch(() => setChildren([]))
      .finally(() => setLoading(false));
  }, []);

  return { children, loading };
}
