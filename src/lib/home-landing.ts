import type { Locale } from "@/lib/i18n/types";
import { FEATURES } from "@/lib/constants";

export type NeedOption = {
  id: string;
  label: string;
  href: string;
  tone: "green" | "coral" | "teal" | "ink" | "sky" | "yellow";
  icon: "school" | "home" | "brain" | "store";
};

export type HomeLandingCopy = {
  jobBanner: string;
  mySpace: string;
  contactCta: string;
  workWithUs: string;
  heroLine1: string;
  heroLine2: string;
  heroSubtitle: string;
  heroLink: string;
  needsTitle: string;
  needsHint: string;
  needsNext: string;
  needsError: string;
  jobStrip: string;
  whyTitle: string;
  whyLead: string;
  whyItems: string[];
  whyCta: string;
  howTitle: string;
  howLead: string;
  howCta: string;
  prosTitle: string;
  prosLead: string;
  prosCta: string;
  testimonialsTitle: string;
  testimonials: { quote: string; author: string; meta: string }[];
  careersTitle: string;
  careersLead: string;
  careersCta: string;
  needs: NeedOption[];
};

const frNeedsAll: NeedOption[] = [
  { id: "scolaire", label: "Accompagnement scolaire", href: "/services/accompagnement-scolaire", tone: "green", icon: "school" },
  { id: "domicile", label: "Aide à domicile", href: "/services/aide-sociale-domicile", tone: "coral", icon: "home" },
  { id: "alzheimer", label: "Ateliers Alzheimer", href: "/services/activites-alzheimer", tone: "teal", icon: "brain" },
  { id: "marketplace", label: "Trouver un prestataire", href: "/marketplace", tone: "ink", icon: "store" },
];

const frNeeds = FEATURES.marketplace
  ? frNeedsAll
  : frNeedsAll.filter((n) => n.id !== "marketplace");

const fr: HomeLandingCopy = {
  jobBanner: "À la recherche d'un emploi ? Cliquez ici !",
  mySpace: "Mon espace",
  contactCta: "Nous contacter",
  workWithUs: "Nous rejoindre",
  heroLine1: "SERVICE SOLUTION",
  heroLine2: "LIFE",
  heroSubtitle:
    "pour les familles, les enfants scolarisés, les personnes âgées et les personnes en situation de handicap",
  heroLink: "Découvrir nos volets de services",
  needsTitle: "Quels sont vos besoins ?",
  needsHint: "Sélectionnez un ou plusieurs volets, puis continuez.",
  needsNext: "Étape suivante",
  needsError: "Sélectionnez au moins un besoin pour continuer.",
  jobStrip: "Vous recherchez un emploi ? Cliquez ici",
  whyTitle: "Pourquoi choisir SSL+++ ?",
  whyLead:
    "Chez SSL+++, nous avons le même niveau d'exigence pour nos familles que pour notre propre entourage.",
  whyItems: [
    "Un interlocuteur dédié et un suivi transparent à chaque étape",
    "Équipes formées, identifiées et encadrées — 7j/7",
    "Un planning qui s'adapte à l'évolution de vos besoins",
  ],
  whyCta: "En savoir plus",
  howTitle: "Comment fonctionne la plateforme ?",
  howLead:
    "SSL+++ structure l'aide sociale en Algérie : orientation claire, espaces dédiés (parent, client, back-office) et validation des dossiers. Nous vous accompagnons dans la mise en place du service adapté — scolarité, domicile ou ateliers Alzheimer — en gérant le cadre et le suivi pour que vous vous sentiez en confiance.",
  howCta: "Découvrir nos volets",
  prosTitle: "Des professionnels de confiance",
  prosLead:
    "Intervenants, équipes de site et partenaires justifient d'une expérience solide et d'un savoir-être adapté aux familles. Nous privilégions la continuité : les mêmes personnes, un cadre clair, une relation de confiance.",
  prosCta: "Nous contacter",
  testimonialsTitle: "Témoignages",
  testimonials: [
    {
      quote:
        "Nous avons mis en place l'accompagnement scolaire pour notre fils. L'équipe est à l'écoute et le suivi en ligne nous rassure au quotidien.",
      author: "Meriem B.",
      meta: "Parent — SSL+",
    },
    {
      quote:
        "Enfin une plateforme claire pour trouver une aide à domicile formée. Le parcours est simple et les échanges sont humains.",
      author: "Karim A.",
      meta: "Famille — SSL++",
    },
    {
      quote:
        "Les ateliers donnent du sens à maman. On sent le professionnalisme et la bienveillance à chaque séance.",
      author: "Nadia K.",
      meta: "Proche aidante — SSL+++",
    },
  ],
  careersTitle: "Rejoindre SSL+++",
  careersLead: "Découvrez les offres d'emploi — terrain, établissements et coordination.",
  careersCta: "Accéder aux carrières",
  needs: frNeeds,
};

const en: HomeLandingCopy = {
  ...fr,
  jobBanner: "Looking for a job? Click here!",
  mySpace: "My space",
  contactCta: "Contact us",
  workWithUs: "Join us",
  heroLine1: "SERVICE SOLUTION",
  heroLine2: "LIFE",
  heroSubtitle:
    "for families, school-age children, older adults and people with disabilities",
  heroLink: "Explore our service tracks",
  needsTitle: "What do you need?",
  needsHint: "Select one or more areas, then continue.",
  needsNext: "Next step",
  needsError: "Please select at least one need to continue.",
  jobStrip: "Looking for a job? Click here",
  whyTitle: "Why choose SSL+++?",
  whyLead: "At SSL+++, we hold the same standard for families as we would for our own.",
  whyItems: [
    "A dedicated contact and transparent follow-up at every step",
    "Trained, identified and supervised teams — 7 days a week",
    "A schedule that adapts as your needs evolve",
  ],
  whyCta: "Learn more",
  howTitle: "How does the platform work?",
  howLead:
    "SSL+++ structures social support in Algeria: clear guidance, dedicated spaces (parent, client, back office) and dossier validation. We help you set up the right service — schooling, home care or Alzheimer workshops — with a trusted framework and follow-up.",
  howCta: "Explore our services",
  prosTitle: "Trusted professionals",
  prosLead:
    "Care workers, site teams and partners bring solid experience and the right soft skills for families. We favour continuity: the same people, a clear framework, a relationship of trust.",
  prosCta: "Contact us",
  testimonialsTitle: "Testimonials",
  careersTitle: "Join SSL+++",
  careersLead: "Explore job openings — field, sites and coordination.",
  careersCta: "Go to careers",
  needs: (
    [
      { id: "scolaire", label: "School support", href: "/services/accompagnement-scolaire", tone: "green", icon: "school" },
      { id: "domicile", label: "Home care", href: "/services/aide-sociale-domicile", tone: "coral", icon: "home" },
      { id: "alzheimer", label: "Alzheimer workshops", href: "/services/activites-alzheimer", tone: "teal", icon: "brain" },
      { id: "marketplace", label: "Find a provider", href: "/marketplace", tone: "ink", icon: "store" },
    ] as NeedOption[]
  ).filter((n) => FEATURES.marketplace || n.id !== "marketplace"),
};

const ar: HomeLandingCopy = {
  ...fr,
  jobBanner: "تبحث عن عمل؟ انقر هنا!",
  mySpace: "مساحتي",
  contactCta: "اتصل بنا",
  workWithUs: "انضم إلينا",
  heroLine1: "SERVICE SOLUTION",
  heroLine2: "LIFE",
  heroSubtitle: "للعائلات والأطفال المتمدرسين وكبار السن وذوي الاحتياجات الخاصة",
  heroLink: "اكتشف مجالات خدماتنا",
  needsTitle: "ما هي احتياجاتكم؟",
  needsHint: "اختر مجالاً واحداً أو أكثر ثم تابع.",
  needsNext: "الخطوة التالية",
  needsError: "يرجى اختيار حاجة واحدةحدة على الأقل للمتابعة.",
  jobStrip: "تبحث عن عمل؟ انقر هنا",
  whyTitle: "لماذا SSL+++؟",
  whyLead: "في SSL+++ لدينا نفس مستوى الالتزام مع العائلات كما مع أهلنا.",
  whyItems: [
    "مرافق مخصّص ومتابعة شفافة في كل مرحلة",
    "فرق مؤهّلة ومعرّفة ومؤطّرة — طوال الأسبوع",
    "تخطيط يتكيّف مع تطوّر احتياجاتكم",
  ],
  whyCta: "معرفة المزيد",
  howTitle: "كيف تعمل المنصة؟",
  howLead:
    "تنظّم SSL+++ المساعدة الاجتماعية في الجزائر: توجيه واضح ومساحات مخصّصة (ولي أمر، عميل، إدارة) ومتابعة للملفات. نرافقكم لوضع الخدمة المناسبة — مدرسية أو منزلية أو ورش Alzheimer — بإطار موثوق ومتابعة مستمرة.",
  howCta: "اكتشف خدماتنا",
  prosTitle: "محترفون موثوقون",
  prosLead:
    "المتدخلون وفرق المواقع والشركاء يجمعون الخبرة والسلوك المناسب للعائلات. نفضّل الاستمرارية: نفس الأشخاص وإطار واضح وثقة.",
  prosCta: "اتصل بنا",
  testimonialsTitle: "شهادات",
  careersTitle: "انضم إلى SSL+++",
  careersLead: "اكتشف عروض العمل — الميدان والمواقع والتنسيق.",
  careersCta: "الانتقال إلى الوظائف",
  needs: (
    [
      { id: "scolaire", label: "مرافقة مدرسية", href: "/services/accompagnement-scolaire", tone: "green", icon: "school" },
      { id: "domicile", label: "مساعدة منزلية", href: "/services/aide-sociale-domicile", tone: "coral", icon: "home" },
      { id: "alzheimer", label: "ورشات Alzheimer", href: "/services/activites-alzheimer", tone: "teal", icon: "brain" },
      { id: "marketplace", label: "البحث عن مقدّم خدمة", href: "/marketplace", tone: "ink", icon: "store" },
    ] as NeedOption[]
  ).filter((n) => FEATURES.marketplace || n.id !== "marketplace"),
};

export function getHomeLanding(locale: Locale): HomeLandingCopy {
  if (locale === "ar") return ar;
  if (locale === "en") return en;
  return fr;
}
