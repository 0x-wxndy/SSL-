import { STOCK_IMAGES } from "@/lib/stock-images";

export type CareerTrackId = "intervenants" | "etablissement" | "coordination";

export type CareerJob = {
  id: string;
  track: CareerTrackId;
  title: string;
  location: string;
  type: string;
  summary: string;
};

export type CareerTrack = {
  id: CareerTrackId;
  href: string;
  title: string;
  eyebrow: string;
  teaser: string;
  benefits: string[];
  image: string;
  accent: "coral" | "teal" | "plum";
};

export type CareerTestimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: "intervenants",
    href: "/rejoindre/intervenants",
    title: "Intervenants terrain",
    eyebrow: "Accompagnement & aide",
    teaser:
      "Rejoignez les équipes qui accompagnent enfants, familles et aînés — sur site ou à domicile.",
    benefits: [
      "Planning adapté à vos disponibilités",
      "Missions proches de chez vous",
      "Accompagnement et formation continue",
    ],
    image: STOCK_IMAGES.homeCare,
    accent: "coral",
  },
  {
    id: "etablissement",
    href: "/rejoindre/etablissement",
    title: "Équipe établissement",
    eyebrow: "Sites SSL+",
    teaser:
      "Accueil, pédagogie, restauration, coordination locale — faites vivre le site d’accompagnement scolaire.",
    benefits: [
      "Rôles variés : accueil, pédagogie, logistique",
      "Équipe pluridisciplinaire sur site",
      "Impact direct sur le quotidien des enfants",
    ],
    image: STOCK_IMAGES.schooling,
    accent: "teal",
  },
  {
    id: "coordination",
    href: "/rejoindre/coordination",
    title: "Coordination & siège",
    eyebrow: "Pilotage plateforme",
    teaser:
      "RH, gouvernance et pilotage — construisez la plateforme SSL+++ à l’échelle nationale.",
    benefits: [
      "Projets à fort impact social",
      "Équipes pluridisciplinaires",
      "Vision stratégique et opérationnelle",
    ],
    image: STOCK_IMAGES.family,
    accent: "plum",
  },
];

export const CAREER_JOBS: CareerJob[] = [
  {
    id: "aide-domicile",
    track: "intervenants",
    title: "Aide à domicile",
    location: "Alger & environs",
    type: "Temps partiel / flexible",
    summary: "Accompagnement quotidien à domicile pour personnes âgées ou en situation de handicap.",
  },
  {
    id: "infirmier",
    track: "intervenants",
    title: "Infirmier",
    location: "À domicile",
    type: "Temps partiel / flexible",
    summary: "Soins infirmiers à domicile, dans le cadre de l’aide à domicile SSL++.",
  },
  {
    id: "kinesitherapeute",
    track: "intervenants",
    title: "Kinésithérapeute",
    location: "À domicile",
    type: "Vacation / temps partiel",
    summary: "Rééducation et suivi kinésithérapeutique à domicile.",
  },
  {
    id: "aide-soignant",
    track: "intervenants",
    title: "Aide-soignant",
    location: "À domicile",
    type: "Temps partiel / flexible",
    summary: "Aide aux gestes du quotidien et aux soins de confort à domicile.",
  },
  {
    id: "accompagnateur-scolaire",
    track: "intervenants",
    title: "Accompagnateur scolaire",
    location: "Sites SSL+",
    type: "Temps partiel",
    summary: "Garde, révisions et bien-être des enfants sur le site d’accueil.",
  },
  {
    id: "accompagnateur-pedagogique",
    track: "etablissement",
    title: "Accompagnateur pédagogique",
    location: "Site SSL+",
    type: "Temps partiel / CDI",
    summary: "Suivi pédagogique des enfants accueillis et lien avec les familles.",
  },
  {
    id: "animateur-alzheimer",
    track: "intervenants",
    title: "Animateur ateliers Alzheimer",
    location: "Wilayas pilotes",
    type: "Vacation / CDI",
    summary: "Stimulation cognitive et ateliers encadrés pour les premiers stades.",
  },
  {
    id: "psycho-alzheimer",
    track: "intervenants",
    title: "Psycho ateliers Alzheimer",
    location: "Wilayas pilotes",
    type: "Vacation / temps partiel",
    summary: "Accompagnement psychologique des ateliers Alzheimer et des proches aidants.",
  },
  {
    id: "menage",
    track: "intervenants",
    title: "Homme / femme de ménage",
    location: "À domicile",
    type: "Temps partiel / flexible",
    summary: "Entretien du domicile dans le cadre des prestations d’aide à domicile.",
  },
  {
    id: "secouriste",
    track: "intervenants",
    title: "Secouriste",
    location: "Sites SSL+ & domicile",
    type: "Vacation / temps partiel",
    summary: "Présence secouriste sur site et lors des interventions à domicile.",
  },
  {
    id: "responsable-accueil",
    track: "etablissement",
    title: "Responsable d’accueil",
    location: "Site SSL+",
    type: "CDI",
    summary: "Pointage, relation familles, coordination du flux quotidien sur site.",
  },
  {
    id: "enseignant-soutien",
    track: "etablissement",
    title: "Enseignant temps partiel / cours de soutien",
    location: "Site SSL+",
    type: "Vacation",
    summary: "Cours du soir par matière — maths, français, physique, langues.",
  },
  {
    id: "cuisine",
    track: "etablissement",
    title: "Agent de restauration",
    location: "Site SSL+",
    type: "CDI / CDD",
    summary: "Préparation des repas et hygiène de la cantine scolaire.",
  },
  {
    id: "autres",
    track: "coordination",
    title: "Autres",
    location: "Siège / sites",
    type: "À préciser",
    summary: "Candidature spontanée pour un poste qui n’est pas listé.",
  },
];

export const CAREER_TESTIMONIALS: CareerTestimonial[] = [
  {
    id: "t1",
    name: "Soraya A.",
    role: "Responsable pédagogique — SSL+",
    quote:
      "Ici, l’humain prime vraiment. On construit un cadre de confiance pour les familles et on avance en équipe, avec le même cap : la qualité du service.",
  },
  {
    id: "t2",
    name: "Karim B.",
    role: "Aide à domicile — SSL++",
    quote:
      "Je retrouve les mêmes familles, un planning clair et une équipe qui m’écoute. C’est la première fois que je me sens autant soutenu au quotidien.",
  },
  {
    id: "t3",
    name: "Nadia K.",
    role: "Coordination — siège",
    quote:
      "Travailler pour SSL+++, c’est créer du lien : on rencontre les équipes, on les accompagne et on les place au plus près des besoins des familles.",
  },
  {
    id: "t4",
    name: "Leila M.",
    role: "Animatrice ateliers Alzheimer",
    quote:
      "Chaque atelier a du sens. Voir une personne retrouver le sourire après une séance, ça donne une énergie que peu de métiers offrent.",
  },
];

export const CAREER_VALUES = [
  {
    title: "Du sens, chaque jour",
    text: "Accompagner enfants, aînés et familles dans un cadre professionnel et humain.",
  },
  {
    title: "Équipe & proximité",
    text: "Des sites locaux, des référents joignables et une vraie culture d’entraide.",
  },
  {
    title: "Montée en compétences",
    text: "Formations, protocoles encadrés et parcours d’évolution selon vos talents.",
  },
];

export function getJobsByTrack(track: CareerTrackId): CareerJob[] {
  return CAREER_JOBS.filter((j) => j.track === track);
}

export function getJobById(id: string): CareerJob | undefined {
  return CAREER_JOBS.find((j) => j.id === id);
}

export function getTrackById(id: CareerTrackId): CareerTrack | undefined {
  return CAREER_TRACKS.find((t) => t.id === id);
}
