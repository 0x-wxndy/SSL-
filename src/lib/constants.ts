export const ESTABLISHMENT = {
  name: "Services Solutions Life+++",
  abbr: "SSL+++",
  tagline: "Plateforme d'aide sociale",
  ageRange: "6 à 18 ans",
  languages: ["Français", "Arabe", "English"] as const,
  validationDelay: "3 jours maximum",
  augustClosed: true,
};

export type PlatformService = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  available: boolean;
  href: string;
};

export const PLATFORM_SERVICES: PlatformService[] = [
  {
    id: "accompagnement-scolaire",
    title: "Accompagnement scolaire",
    subtitle: "Garde & éducation · 6–18 ans",
    description:
      "Garderie, sorties d'école, soutien scolaire et suivi parental dans un cadre sécurisé, trilingue et adapté à votre rythme familial.",
    icon: "🎓",
    available: true,
    href: "/services/accompagnement-scolaire",
  },
  {
    id: "services-domicile",
    title: "Services à domicile",
    subtitle: "Ménage & entretien du foyer",
    description:
      "Nettoyage, repassage, entretien courant et aide à l'organisation du quotidien à domicile, par des professionnels de confiance.",
    icon: "🏠",
    available: false,
    href: "/services/services-domicile",
  },
  {
    id: "accompagnement-seniors",
    title: "Accompagnement des seniors",
    subtitle: "Aide et présence au quotidien",
    description:
      "Accompagnement des personnes âgées : aide à la mobilité, courses, repas, compagnie et coordination avec les proches.",
    icon: "🤝",
    available: false,
    href: "/services/accompagnement-seniors",
  },
  {
    id: "activites-alzheimer",
    title: "Activités Alzheimer",
    subtitle: "Stimulation & bien-être",
    description:
      "Ateliers de stimulation cognitive, activités adaptées et programmes d'accompagnement pour les personnes atteintes d'Alzheimer.",
    icon: "🧩",
    available: false,
    href: "/services/activites-alzheimer",
  },
  {
    id: "aide-familiale",
    title: "Aide familiale",
    subtitle: "Soutien aux familles",
    description:
      "Conciergerie du quotidien, garde ponctuelle, coordination des besoins du foyer et services sur mesure selon votre situation.",
    icon: "💚",
    available: false,
    href: "/services/aide-familiale",
  },
];

export const PACKAGES = [
  {
    id: 1,
    icon: "🌅",
    name: "Formule Matin",
    hours: "07h00 – 13h00",
    desc: "Accompagnement vers l'école le matin, retour sur site, repas encadré et reconduite à l'établissement.",
    featured: false,
  },
  {
    id: 2,
    icon: "📚",
    name: "Formule Après-midi",
    hours: "15h00 – 17h00",
    desc: "Récupération à la sortie de l'école, collation et séance de révision encadrée.",
    featured: false,
  },
  {
    id: 3,
    icon: "🎓",
    name: "Formule Soutien",
    hours: "17h00 – 20h00",
    desc: "Cours de soutien par matière, adaptés au niveau et aux besoins de l'enfant.",
    featured: false,
  },
  {
    id: 4,
    icon: "🌟",
    name: "Formule Journée complète",
    hours: "07h00 – 20h00",
    desc: "Prise en charge intégrale : matin, repas, révisions, soutien scolaire et activités encadrées.",
    featured: true,
  },
  {
    id: 5,
    icon: "☀️",
    name: "Formule Vacances",
    hours: "07h–14h ou 07h–17h • Août fermé",
    desc: "Garderie pendant les vacances scolaires : demi-journée avec repas (07h–14h) ou journée entière (07h–17h). Fermeture en août.",
    featured: false,
  },
] as const;

export const PARENT_SECTIONS = [
  { id: "dossier", label: "Dossier enfant", icon: "📋", priority: 1, href: "/parent" },
  { id: "badge", label: "Badge ID", icon: "🪪", priority: 2, href: "/parent/badge" },
  { id: "planning", label: "Planning", icon: "📅", priority: 3, href: "/parent/planning" },
  { id: "cameras", label: "Caméras", icon: "📹", priority: 4, href: "/parent/cameras" },
  { id: "messages", label: "Messages", icon: "💬", priority: 5, href: "/parent/messages" },
  { id: "prestation", label: "Coût prestation", icon: "💰", priority: 6, href: "/parent/facturation" },
] as const;

export const REQUIRED_DOCUMENTS = [
  { label: "Photo de l'enfant", required: true, hint: "JPG ou PNG, max 5 Mo" },
  { label: "Photo de la tutrice / tuteur légal", required: true, hint: "JPG ou PNG, max 5 Mo" },
  { label: "Carnet de vaccination", required: true, hint: "PDF ou photo lisible" },
  { label: "Certificat médical", required: true, hint: "PDF signé par le médecin" },
  { label: "Contrat d'inscription", required: true, hint: "PDF signé par les parents" },
  { label: "Justificatif de résidence", required: true, hint: "Facture récente ou attestation" },
  { label: "Justificatifs médicaux (allergies alimentaires)", required: false, hint: "Si applicable — avec certificat médical" },
  { label: "Justificatifs médicaux (handicap physique)", required: false, hint: "Si applicable — avec certificat médical" },
] as const;

export const STAFF_ROLES = [
  {
    role: "Direction — Admin Principal",
    pages: "Toutes les pages + reporting complet",
    forbidden: "—",
    badge: true,
  },
  {
    role: "Direction — Admin Secondaire",
    pages: "Dossiers, partenaires, fournisseurs, stocks (saisie)",
    forbidden: "Reporting financier, suppression définitive",
    badge: true,
  },
  {
    role: "Staff permanent",
    pages: "Consultation dossiers, badgeuse, présences",
    forbidden: "Validation dossiers, facturation, reporting",
    badge: true,
  },
  {
    role: "Staff consultant",
    pages: "Consultation planning, badgeuse",
    forbidden: "Modification dossiers, accès admin",
    badge: true,
  },
  {
    role: "Éducation / Cuisine",
    pages: "Présences, planning du jour",
    forbidden: "Données financières, validation dossiers",
    badge: true,
  },
] as const;

export const JOURNEE_TYPE = [
  { time: "07h00", label: "Arrivées & badgeuse", detail: "Accueil matinal, contrôle d'accès par badge ID" },
  { time: "07h–08h", label: "Accompagnement école", detail: "Départ vers l'établissement scolaire (Pack 1 & 4)" },
  { time: "12h–13h", label: "Repas", detail: "Déjeuner encadré — allergies signalées au dossier" },
  { time: "15h–17h", label: "Révisions", detail: "Collation + séances de révision (Pack 2 & 4)" },
  { time: "17h–20h", label: "Soutien scolaire", detail: "Cours par matière au choix (Pack 3 & 4)" },
  { time: "—", label: "Pas de créneau sieste", detail: "SSL+++ ne propose pas de sieste sur site" },
] as const;
