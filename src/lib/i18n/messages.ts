import type { Locale, Messages } from "./types";

const serviceItemsFr = {
  "accompagnement-scolaire": {
    title: "Accompagnement scolaire",
    subtitle: "Garde & éducation · 6–18 ans",
    description:
      "Garderie, sorties d'école, soutien scolaire et suivi parental dans un cadre sécurisé, trilingue et adapté à votre rythme familial.",
  },
  "services-domicile": {
    title: "Services à domicile",
    subtitle: "Ménage & entretien du foyer",
    description:
      "Nettoyage, repassage, entretien courant et aide à l'organisation du quotidien à domicile, par des professionnels de confiance.",
  },
  "accompagnement-seniors": {
    title: "Accompagnement des seniors",
    subtitle: "Aide et présence au quotidien",
    description:
      "Accompagnement des personnes âgées : aide à la mobilité, courses, repas, compagnie et coordination avec les proches.",
  },
  "activites-alzheimer": {
    title: "Activités Alzheimer",
    subtitle: "Stimulation & bien-être",
    description:
      "Ateliers de stimulation cognitive, activités adaptées et programmes d'accompagnement pour les personnes atteintes d'Alzheimer.",
  },
  "aide-familiale": {
    title: "Aide familiale",
    subtitle: "Soutien aux familles",
    description:
      "Conciergerie du quotidien, garde ponctuelle, coordination des besoins du foyer et services sur mesure selon votre situation.",
  },
};

const serviceItemsAr = {
  "accompagnement-scolaire": {
    title: "مرافقة مدرسية",
    subtitle: "رعاية وتعليم · 6–18 سنة",
    description:
      "حضانة، خروج من المدرسة، دعم دراسي ومتابعة أسرية في إطار آمن ومتعدد اللغات ومناسب لإيقاع عائلتكم.",
  },
  "services-domicile": {
    title: "خدمات منزلية",
    subtitle: "تنظيف وصيانة المنزل",
    description:
      "تنظيف، كيّ، صيانة يومية ومساعدة في تنظيم الحياة اليومية في المنزل، على يد محترفين موثوقين.",
  },
  "accompagnement-seniors": {
    title: "مرافقة كبار السن",
    subtitle: "مساعدة وحضور يومي",
    description:
      "مرافقة كبار السن: مساعدة في التنقل، التسوق، الوجبات، المرافقة والتنسيق مع الأقارب.",
  },
  "activites-alzheimer": {
    title: "أنشطة الزهاimer",
    subtitle: "تحفيز ورفاهية",
    description:
      "ورش تحفيز معرفي، أنشطة ملائمة وبرامج مرافقة للأشخاص المصابين بمرض Alzheimer.",
  },
  "aide-familiale": {
    title: "مساعدة عائلية",
    subtitle: "دعم للعائلات",
    description:
      "خدمات يومية، رعاية مؤقتة، تنسيق احتياجات الأسرة وخدمات مخصصة حسب وضعكم.",
  },
};

const serviceItemsEn = {
  "accompagnement-scolaire": {
    title: "School support",
    subtitle: "Care & education · ages 6–18",
    description:
      "Daycare, school pickup, tutoring and parental follow-up in a safe, trilingual setting adapted to your family rhythm.",
  },
  "services-domicile": {
    title: "Home services",
    subtitle: "Cleaning & household care",
    description:
      "Cleaning, ironing, routine maintenance and help organizing daily life at home, by trusted professionals.",
  },
  "accompagnement-seniors": {
    title: "Senior support",
    subtitle: "Daily help and companionship",
    description:
      "Support for older adults: mobility help, errands, meals, companionship and coordination with relatives.",
  },
  "activites-alzheimer": {
    title: "Alzheimer activities",
    subtitle: "Stimulation & wellbeing",
    description:
      "Cognitive stimulation workshops, adapted activities and support programs for people with Alzheimer's.",
  },
  "aide-familiale": {
    title: "Family support",
    subtitle: "Help for families",
    description:
      "Everyday concierge, occasional childcare, coordinating household needs and tailored services for your situation.",
  },
};

export const messages: Record<Locale, Messages> = {
  fr: {
    nav: {
      home: "Accueil",
      contact: "Contact",
      services: "Services",
      marketplace: "Marketplace",
      createAccount: "Créer un compte",
      login: "Connexion",
      menu: "Menu",
      close: "Fermer",
    },
    common: {
      available: "Disponible",
      comingSoon: "Bientôt",
      seeService: "Voir le service →",
      learnMore: "En savoir plus →",
    },
    home: {
      badge: "🇩🇿 · Algérie · Aide sociale de proximité",
      titleBefore: "Une plateforme d'",
      titleHighlight: "aide sociale",
      titleAfter: " au quotidien",
      description:
        "{name} coordonne des prestations d'accompagnement social : scolarité, entretien du domicile, aide aux personnes âgées et activités de bien-être. Un accès centralisé à des services humains, encadrés et accessibles.",
      discoverServices: "Découvrir nos services",
      contactUs: "Nous contacter",
      servicesLabel: "Nos services",
      servicesTitle: "Des réponses sociales adaptées à chaque besoin",
      servicesDescription:
        "Parcourez nos domaines d'intervention. Cliquez sur un service pour en savoir plus — les prestations disponibles ouvrent leur espace dédié, les autres affichent une page « bientôt disponible ».",
      commitmentLabel: "Notre engagement",
      commitmentTitle: "Un accompagnement humain, encadré et transparent",
      commitmentLead:
        "Au-delà de la mise en relation, nous construisons un cadre de confiance : orientation claire, prestataires identifiés et suivi accessible à chaque étape.",
      commitmentItems: [
        [
          "Orientation personnalisée",
          "Nous vous aidons à identifier la prestation adaptée et à coordonner les démarches, sans multiplier les interlocuteurs.",
        ],
        [
          "Prestataires de confiance",
          "Des équipes identifiées, formées et encadrées pour garantir sécurité et qualité de service.",
        ],
        [
          "Suivi transparent",
          "Planning, messages et dossiers accessibles en ligne pour rester informé à chaque étape.",
        ],
        [
          "Ouvert à toutes les langues",
          "Interface et accompagnement en français, arabe et anglais pour rester proche de chaque famille.",
        ],
      ],
      aboutLabel: "À propos",
      aboutTitle: "Structurer, faciliter et sécuriser l'aide sociale",
      aboutLead:
        "{name} est une plateforme algérienne dédiée à l'aide sociale de proximité. Elle donne un cadre clair aux prestations du quotidien — garde, accompagnement, services à domicile — pour sortir de l'informel et rapprocher, en toute confiance, celles et ceux qui proposent un service de celles et ceux qui en cherchent un.",
      aboutPillars: [
        [
          "Faciliter l'accès",
          "Centraliser la demande, orienter vers le bon service et simplifier les démarches pour les familles et les bénéficiaires.",
        ],
        [
          "Encadrer et sécuriser",
          "Des prestataires identifiés, des parcours suivis et un cadre de confiance qui légitime et structure l'aide sociale.",
        ],
        [
          "Unifier l'offre et la demande",
          "Nos espaces dédiés et la marketplace rapprochent offreurs et demandeurs sur un même référentiel, partout en Algérie.",
        ],
      ],
      contactLabel: "Contact",
      contactTitle: "Une question sur nos services ?",
      contactDescription:
        "Notre équipe vous oriente vers la prestation adaptée à votre situation ou vous informe des prochaines mises en service.",
      contactForm: {
        name: "Nom complet",
        namePlaceholder: "Votre nom et prénom",
        email: "Email",
        emailPlaceholder: "email@exemple.com",
        phone: "Téléphone",
        phonePlaceholder: "+213 XX XX XX XX",
        subject: "Objet",
        subjectOptions: {
          general: "Question générale",
          schooling: "Accompagnement scolaire",
          home: "Services à domicile",
          seniors: "Accompagnement seniors",
          marketplace: "Marketplace",
          other: "Autre demande",
        },
        message: "Message",
        messagePlaceholder: "Décrivez votre besoin ou votre question…",
        submit: "Envoyer le message",
        mockNote: "Démonstration — aucun envoi réel pour le moment.",
        successTitle: "Message enregistré",
        successMessage:
          "Merci pour votre message. Notre équipe vous recontactera sous 48 h ouvrées (simulation).",
        infoPhone: "Téléphone",
        infoEmail: "Email",
        infoHours: "Horaires",
        infoHoursValue: "Lundi – Vendredi, 07h00 – 20h00",
      },
    },
    footer: {
      description:
        "Une plateforme d'aide sociale pour coordonner scolarité, services à domicile et accompagnement des seniors en Algérie.",
      navigation: "Navigation",
      account: "Accès",
      home: "Accueil",
      ourServices: "Nos services",
      marketplace: "Marketplace",
      contact: "Contact",
      createAccount: "Créer un compte",
      login: "Connexion",
    },
    serviceItems: serviceItemsFr,
  },
  ar: {
    nav: {
      home: "الرئيسية",
      contact: "اتصل بنا",
      services: "الخدمات",
      marketplace: "السوق",
      createAccount: "إنشاء حساب",
      login: "تسجيل الدخول",
      menu: "القائمة",
      close: "إغلاق",
    },
    common: {
      available: "متاح",
      comingSoon: "قريباً",
      seeService: "عرض الخدمة ←",
      learnMore: "معرفة المزيد ←",
    },
    home: {
      badge: "🇩🇿 · الجزائر · مساعدة اجتماعية محلية",
      titleBefore: "منصة ",
      titleHighlight: "مساعدة اجتماعية",
      titleAfter: " في الحياة اليومية",
      description:
        "تنسّق {name} خدمات الدعم الاجتماعي: التعليم، العناية بالمنزل، مساعدة كبار السن وأنشطة الرفاهية. نقطة وصول مركزية لخدمات إنسانية منظمة ومتاحة.",
      discoverServices: "اكتشف خدماتنا",
      contactUs: "اتصل بنا",
      servicesLabel: "خدماتنا",
      servicesTitle: "استجابات اجتماعية تناسب كل احتياج",
      servicesDescription:
        "تصفّح مجالات تدخّلنا. انقر على خدمة لمعرفة المزيد — الخدمات المتاحة تفتح مساحتها الخاصة، والأخرى تعرض صفحة «قريباً».",
      commitmentLabel: "التزامنا",
      commitmentTitle: "مرافقة إنسانية، منظّمة وشفافة",
      commitmentLead:
        "أبعد من مجرد الربط بين الأطراف، نبني إطار ثقة: توجيه واضح، مقدّمون معرّفون ومتابعة متاحة في كل مرحلة.",
      commitmentItems: [
        [
          "توجيه شخصي",
          "نساعدكم على تحديد الخدمة المناسبة وتنسيق الإجراءات دون تعدد جهات الاتصال.",
        ],
        [
          "مقدّمون موثوقون",
          "فرق معرّفة ومؤهّلة وتحت الإشراف لضمان الأمان وجودة الخدمة.",
        ],
        [
          "متابعة شفافة",
          "جدولة ورسائل وملفات متاحة عبر الإنترنت للبقاء على اطلاع في كل خطوة.",
        ],
        [
          "متاح بكل اللغات",
          "واجهة ومرافقة بالفرنسية والعربية والإنجليزية للبقاء قريبين من كل عائلة.",
        ],
      ],
      aboutLabel: "من نحن",
      aboutTitle: "تنظيم وتسهيل وتأمين المساعدة الاجتماعية",
      aboutLead:
        "{name} منصة جزائرية مخصّصة للمساعدة الاجتماعية المحلية. توفّر إطاراً واضحاً للخدمات اليومية — الرعاية، المرافقة، الخدمات المنزلية — للخروج من العمل غير المنظم و تقريب مقدّمي الخدمة من الباحثين عنها بثقة.",
      aboutPillars: [
        [
          "تسهيل الوصول",
          "تجميع الطلبات، التوجيه نحو الخدمة المناسبة وتبسيط الإجراءات للعائلات والمستفيدين.",
        ],
        [
          "الإشراف والأمان",
          "مقدّمون معرّفون، مسارات متابَعة وإطار ثقة يضفي الشرعية وينظّم المساعدة الاجتماعية.",
        ],
        [
          "توحيد العرض والطلب",
          "مساحاتنا المخصّصة والسوق تقرّب مقدّمي الخدمة من الباحثين عنها في مرجع واحد، في جميع أنحاء الجزائر.",
        ],
      ],
      contactLabel: "اتصل بنا",
      contactTitle: "سؤال حول خدماتنا؟",
      contactDescription:
        "يوجّهك فريقنا إلى الخدمة المناسبة لوضعك أو يخبرك بالإطلاقات القادمة.",
      contactForm: {
        name: "الاسم الكامل",
        namePlaceholder: "الاسم واللقب",
        email: "البريد الإلكتروني",
        emailPlaceholder: "email@exemple.com",
        phone: "الهاتف",
        phonePlaceholder: "+213 XX XX XX XX",
        subject: "الموضوع",
        subjectOptions: {
          general: "سؤال عام",
          schooling: "مرافقة مدرسية",
          home: "خدمات منزلية",
          seniors: "مرافقة كبار السن",
          marketplace: "السوق",
          other: "طلب آخر",
        },
        message: "الرسالة",
        messagePlaceholder: "صفّ حاجتك أو سؤالك…",
        submit: "إرسال الرسالة",
        mockNote: "عرض توضيحي — لا يتم إرسال حقيقي حالياً.",
        successTitle: "تم تسجيل الرسالة",
        successMessage:
          "شكراً لرسالتك. سيتواصل معك فريقنا خلال 48 ساعة عمل (محاكاة).",
        infoPhone: "الهاتف",
        infoEmail: "البريد الإلكتروني",
        infoHours: "المواعيد",
        infoHoursValue: "الاثنين – الجمعة، 07:00 – 20:00",
      },
    },
    footer: {
      description:
        "منصة مساعدة اجتماعية لتنسيق التعليم والخدمات المنزلية ومرافقة كبار السن في الجزائر.",
      navigation: "التنقل",
      account: "الوصول",
      home: "الرئيسية",
      ourServices: "خدماتنا",
      marketplace: "السوق",
      contact: "اتصل بنا",
      createAccount: "إنشاء حساب",
      login: "تسجيل الدخول",
    },
    serviceItems: serviceItemsAr,
  },
  en: {
    nav: {
      home: "Home",
      contact: "Contact",
      services: "Services",
      marketplace: "Marketplace",
      createAccount: "Create account",
      login: "Sign in",
      menu: "Menu",
      close: "Close",
    },
    common: {
      available: "Available",
      comingSoon: "Coming soon",
      seeService: "View service →",
      learnMore: "Learn more →",
    },
    home: {
      badge: "🇩🇿 · Algeria · Local social support",
      titleBefore: "A daily ",
      titleHighlight: "social support",
      titleAfter: " platform",
      description:
        "{name} coordinates social support services: schooling, home care, senior assistance and wellbeing activities. One central access point for supervised, accessible human services.",
      discoverServices: "Explore our services",
      contactUs: "Contact us",
      servicesLabel: "Our services",
      servicesTitle: "Social solutions tailored to every need",
      servicesDescription:
        "Browse our areas of support. Click a service to learn more — available services open their dedicated space, others show a “coming soon” page.",
      commitmentLabel: "Our commitment",
      commitmentTitle: "Human support that is supervised and transparent",
      commitmentLead:
        "Beyond connecting people, we build a framework of trust: clear guidance, identified providers and accessible follow-up at every step.",
      commitmentItems: [
        [
          "Personal guidance",
          "We help you find the right service and coordinate steps without juggling multiple contacts.",
        ],
        [
          "Trusted providers",
          "Identified, trained and supervised teams to ensure safety and quality of care.",
        ],
        [
          "Transparent follow-up",
          "Schedules, messages and records available online so you stay informed at every stage.",
        ],
        [
          "Open to all languages",
          "Interface and support in French, Arabic and English to stay close to every family.",
        ],
      ],
      aboutLabel: "About us",
      aboutTitle: "Structure, facilitate and secure social support",
      aboutLead:
        "{name} is an Algerian platform dedicated to local social support. It provides a clear framework for everyday services — childcare, accompaniment, home care — moving beyond informal arrangements and bringing providers and seekers together with confidence.",
      aboutPillars: [
        [
          "Easier access",
          "Centralise requests, guide people to the right service and simplify steps for families and beneficiaries.",
        ],
        [
          "Supervision and trust",
          "Identified providers, tracked journeys and a trusted framework that legitimises and structures social support.",
        ],
        [
          "One place for offer and demand",
          "Our dedicated spaces and marketplace connect providers and seekers on a single reference, across Algeria.",
        ],
      ],
      contactLabel: "Contact",
      contactTitle: "Questions about our services?",
      contactDescription:
        "Our team will guide you to the right service or inform you about upcoming launches.",
      contactForm: {
        name: "Full name",
        namePlaceholder: "Your first and last name",
        email: "Email",
        emailPlaceholder: "email@example.com",
        phone: "Phone",
        phonePlaceholder: "+213 XX XX XX XX",
        subject: "Subject",
        subjectOptions: {
          general: "General question",
          schooling: "School support",
          home: "Home services",
          seniors: "Senior support",
          marketplace: "Marketplace",
          other: "Other request",
        },
        message: "Message",
        messagePlaceholder: "Describe your need or question…",
        submit: "Send message",
        mockNote: "Demo only — no real submission yet.",
        successTitle: "Message recorded",
        successMessage:
          "Thank you for your message. Our team will get back to you within 48 business hours (simulation).",
        infoPhone: "Phone",
        infoEmail: "Email",
        infoHours: "Hours",
        infoHoursValue: "Monday – Friday, 07:00 – 20:00",
      },
    },
    footer: {
      description:
        "A social support platform to coordinate schooling, home services and senior care in Algeria.",
      navigation: "Navigation",
      account: "Access",
      home: "Home",
      ourServices: "Our services",
      marketplace: "Marketplace",
      contact: "Contact",
      createAccount: "Create account",
      login: "Sign in",
    },
    serviceItems: serviceItemsEn,
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages.fr;
}
