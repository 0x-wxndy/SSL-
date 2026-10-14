import type { MarketplaceCategory } from "@/lib/marketplace-data";

export type VoletId = "scolaire" | "domicile" | "alzheimer";

export type VoletMeta = {
  id: VoletId;
  brand: string;
  label: string;
  shortLabel: string;
};

export const SSL_VOLETS: VoletMeta[] = [
  { id: "scolaire", brand: "SSL+", label: "Enfants scolarisés", shortLabel: "Scolaire" },
  { id: "domicile", brand: "SSL++", label: "Aide sociale", shortLabel: "Domicile" },
  { id: "alzheimer", brand: "SSL+++", label: "Ateliers Alzheimer", shortLabel: "Alzheimer" },
];

/** Marketplace categories grouped under each volet */
export const VOLET_CATEGORIES: Record<VoletId, MarketplaceCategory[]> = {
  scolaire: ["garde-enfants", "soutien-scolaire"],
  domicile: ["menage-domicile", "aide-seniors", "aide-familiale", "cuisine-repas", "transport"],
  alzheimer: ["alzheimer"],
};

const categoryToVolet = new Map<MarketplaceCategory, VoletId>(
  Object.entries(VOLET_CATEGORIES).flatMap(([volet, cats]) =>
    cats.map((cat) => [cat, volet as VoletId])
  )
);

export function getVoletForCategory(category: MarketplaceCategory): VoletId {
  return categoryToVolet.get(category) ?? "domicile";
}

export function categoryBelongsToVolet(
  category: MarketplaceCategory,
  volet: VoletId
): boolean {
  return VOLET_CATEGORIES[volet].includes(category);
}
