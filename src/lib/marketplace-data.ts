import { STOCK_IMAGES } from "@/lib/stock-images";

export type MarketplaceCategory =
  | "garde-enfants"
  | "menage-domicile"
  | "aide-seniors"
  | "soutien-scolaire"
  | "alzheimer"
  | "aide-familiale"
  | "cuisine-repas"
  | "transport";

export type MarketplaceListing = {
  id: string;
  title: string;
  description: string;
  category: MarketplaceCategory;
  price: string;
  priceUnit: string;
  location: string;
  wilaya: string;
  image: string;
  providerId: string;
  providerName: string;
  providerPhone: string;
  verified: boolean;
  postedAt: string;
  tags: string[];
};

export const MARKETPLACE_CATEGORIES: {
  id: MarketplaceCategory;
  label: string;
  icon: string;
}[] = [
  { id: "garde-enfants", label: "Garde d'enfants", icon: "👶" },
  { id: "menage-domicile", label: "Ménage & domicile", icon: "🏠" },
  { id: "aide-seniors", label: "Aide aux seniors", icon: "🤝" },
  { id: "soutien-scolaire", label: "Soutien scolaire", icon: "📚" },
  { id: "alzheimer", label: "Alzheimer & stimulation", icon: "🧩" },
  { id: "aide-familiale", label: "Aide familiale", icon: "💚" },
  { id: "cuisine-repas", label: "Cuisine & repas", icon: "🍲" },
  { id: "transport", label: "Transport accompagné", icon: "🚗" },
];

export const MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  {
    id: "ann-001",
    title: "Femme de ménage expérimentée — Hydra & centre-ville",
    description:
      "Plus de 8 ans d'expérience en entretien de domicile. Nettoyage complet, repassage, organisation. Produits écologiques sur demande. Disponible lun–sam, créneaux matin ou après-midi.",
    category: "menage-domicile",
    price: "2 500",
    priceUnit: "DA / séance",
    location: "Hydra, Alger",
    wilaya: "Alger",
    image: STOCK_IMAGES.homeCare,
    providerId: "prov-001",
    providerName: "Fatima Zohra K.",
    providerPhone: "+213 555 12 34 56",
    verified: true,
    postedAt: "Il y a 2 jours",
    tags: ["Ménage", "Repassage", "Hydra"],
  },
  {
    id: "ann-002",
    title: "Soutien scolaire Maths & Physique — Collège & Lycée",
    description:
      "Enseignant certifié, cours à domicile ou en ligne. Préparation exams, méthodologie, suivi parents. Disponible soir et week-end. Premier cours d'évaluation gratuit.",
    category: "soutien-scolaire",
    price: "1 800",
    priceUnit: "DA / heure",
    location: "Birkhadem, Alger",
    wilaya: "Alger",
    image: STOCK_IMAGES.schooling,
    providerId: "prov-002",
    providerName: "M. Karim Boudiaf",
    providerPhone: "+213 555 98 76 54",
    verified: true,
    postedAt: "Il y a 5 jours",
    tags: ["Maths", "Physique", "Domicile"],
  },
  {
    id: "ann-003",
    title: "Garde d'enfants à domicile — 3 à 10 ans",
    description:
      "Auxiliaire de puériculture diplômée. Garde ponctuelle ou régulière, aide devoirs primaire, activités ludiques. Références vérifiables. Disponible vacances scolaires.",
    category: "garde-enfants",
    price: "1 200",
    priceUnit: "DA / heure",
    location: "El Biar, Alger",
    wilaya: "Alger",
    image: STOCK_IMAGES.childcare,
    providerId: "prov-003",
    providerName: "Mme Leila Mansouri",
    providerPhone: "+213 555 44 22 11",
    verified: true,
    postedAt: "Il y a 1 semaine",
    tags: ["Puériculture", "Devoirs", "Ponctuel"],
  },
  {
    id: "ann-004",
    title: "Accompagnement personnes âgées — courses & compagnie",
    description:
      "Accompagnement bienveillant pour seniors autonomes ou semi-autonomes. Courses, promenades, lecture, rappels médicaments. Coordination avec la famille. Disponible 7j/7.",
    category: "aide-seniors",
    price: "1 500",
    priceUnit: "DA / heure",
    location: "Kouba, Alger",
    wilaya: "Alger",
    image: STOCK_IMAGES.elderlyCare,
    providerId: "prov-004",
    providerName: "Amina Cherif",
    providerPhone: "+213 555 33 77 88",
    verified: false,
    postedAt: "Il y a 3 jours",
    tags: ["Courses", "Compagnie", "Seniors"],
  },
  {
    id: "ann-005",
    title: "Ateliers mémoire & stimulation — Alzheimer stade léger",
    description:
      "Animatrice spécialisée Alzheimer. Séances individuelles ou petits groupes : jeux cognitifs, musique, art-thérapie légère. Programme adapté avec les aidants familiaux.",
    category: "alzheimer",
    price: "3 000",
    priceUnit: "DA / séance",
    location: "Dely Ibrahim, Alger",
    wilaya: "Alger",
    image: STOCK_IMAGES.cognitiveCare,
    providerId: "prov-005",
    providerName: "Dr. Nadia Hamidi",
    providerPhone: "+213 555 66 55 44",
    verified: true,
    postedAt: "Il y a 6 jours",
    tags: ["Stimulation", "Mémoire", "Alzheimer"],
  },
  {
    id: "ann-006",
    title: "Repas à domicile pour seniors — cuisine traditionnelle",
    description:
      "Préparation de repas équilibrés livrés ou sur place. Menus adaptés diabète / hypertension. Portion individuelle ou familiale. Commande minimum 3 repas/semaine.",
    category: "cuisine-repas",
    price: "800",
    priceUnit: "DA / repas",
    location: "Bab Ezzouar, Alger",
    wilaya: "Alger",
    image: STOCK_IMAGES.meals,
    providerId: "prov-006",
    providerName: "Halima Bouzid",
    providerPhone: "+213 555 11 99 00",
    verified: true,
    postedAt: "Il y a 4 jours",
    tags: ["Repas", "Seniors", "Livraison"],
  },
  {
    id: "ann-007",
    title: "Conciergerie familiale — organisation du quotidien",
    description:
      "Aide à l'organisation du foyer : planning familial, courses en ligne, coordination rendez-vous médicaux, garde ponctuelle enfants. Forfait mensuel ou à la demande.",
    category: "aide-familiale",
    price: "15 000",
    priceUnit: "DA / mois",
    location: "Alger Centre",
    wilaya: "Alger",
    image: STOCK_IMAGES.concierge,
    providerId: "prov-001",
    providerName: "Fatima Zohra K.",
    providerPhone: "+213 555 12 34 56",
    verified: true,
    postedAt: "Il y a 2 semaines",
    tags: ["Conciergerie", "Organisation", "Famille"],
  },
  {
    id: "ann-008",
    title: "Transport accompagné — RDV médicaux & courses",
    description:
      "Chauffeur patient et ponctuel pour personnes âgées ou en convalescence. Véhicule climatisé, aide à la marche. Disponible sur réservation 24h à l'avance.",
    category: "transport",
    price: "1 000",
    priceUnit: "DA / trajet",
    location: "Mohammadia, Alger",
    wilaya: "Alger",
    image: STOCK_IMAGES.transport,
    providerId: "prov-007",
    providerName: "M. Salim Hadjadj",
    providerPhone: "+213 555 77 33 22",
    verified: false,
    postedAt: "Aujourd'hui",
    tags: ["Transport", "Médical", "Accompagné"],
  },
  {
    id: "ann-009",
    title: "Repassage & lingerie à domicile — Oran",
    description:
      "Service de repassage professionnel à domicile. Récupération et livraison possible. Tarif dégressif pour grandes quantités. Disponible mer–sam.",
    category: "menage-domicile",
    price: "400",
    priceUnit: "DA / kg",
    location: "Oran Centre",
    wilaya: "Oran",
    image: STOCK_IMAGES.laundry,
    providerId: "prov-008",
    providerName: "Yasmine Taleb",
    providerPhone: "+213 555 22 88 44",
    verified: true,
    postedAt: "Il y a 1 jour",
    tags: ["Repassage", "Oran", "Domicile"],
  },
  {
    id: "ann-010",
    title: "Baby-sitting soir & week-end — Constantine",
    description:
      "Étudiante en sciences de l'éducation, 3 ans d'expérience. Garde soirée, sorties parents, week-end. Références familles disponibles. Zone Constantine et environs.",
    category: "garde-enfants",
    price: "1 000",
    priceUnit: "DA / heure",
    location: "El Khroub, Constantine",
    wilaya: "Constantine",
    image: STOCK_IMAGES.babysitting,
    providerId: "prov-009",
    providerName: "Ines Meziane",
    providerPhone: "+213 555 55 66 77",
    verified: false,
    postedAt: "Il y a 8 jours",
    tags: ["Baby-sitting", "Soir", "Constantine"],
  },
];

export function getCategoryLabel(id: MarketplaceCategory): string {
  return MARKETPLACE_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function getListingById(id: string): MarketplaceListing | undefined {
  return MARKETPLACE_LISTINGS.find((l) => l.id === id);
}

export function getListingsByProvider(providerId: string): MarketplaceListing[] {
  return MARKETPLACE_LISTINGS.filter((l) => l.providerId === providerId);
}

export const MARKETPLACE_DEMO_PROVIDER = {
  id: "prov-001",
  email: "prestataire@ssl.dz",
  password: "market123",
  name: "Fatima Zohra K.",
  phone: "+213 555 12 34 56",
};
