import type { Locale, Messages } from "./types";

const serviceItemsFr = {
  "accompagnement-scolaire": {
    title: "Accompagnement scolaire",
    subtitle: "SSL+ · Secteur public",
    description:
      "Site d'accueil à proximité des écoles publiques : gardiennage, restauration, ateliers de révision et bien-être de vos enfants.",
  },
  "aide-sociale-domicile": {
    title: "Aide sociale",
    subtitle: "SSL++ · À domicile",
    description:
      "Aide formée pour vos proches en situation de handicap, invalidité ou dépendance — 7j/7 et 24h/24.",
  },
  "activites-alzheimer": {
    title: "Ateliers Alzheimer",
    subtitle: "SSL+++ · Premiers stades",
    description:
      "Stimulation cognitive et maintien de la vie sociale selon des protocoles médicaux encadrés.",
  },
};

const serviceItemsAr = {
  "accompagnement-scolaire": {
    title: "مرافقة مدرسية",
    subtitle: "SSL+ · القطاع العام",
    description:
      "موقع استقبال قريب من المدارس العمومية: رعاية، تغذية، ورشات مراجعة ورفاهية أطفالكم.",
  },
  "aide-sociale-domicile": {
    title: "مساعدة اجتماعية",
    subtitle: "SSL++ · في المنزل",
    description:
      "مساعدة مؤهّلة لأقاربكم في وضعية إعاقة أو عجز أو اعتماد — 7/7 و24/24.",
  },
  "activites-alzheimer": {
    title: "ورشات Alzheimer",
    subtitle: "SSL+++ · المراحل الأولى",
    description:
      "تحفيز معرفي والحفاظ على الحياة الاجتماعية وفق بروتوكولات طبية معتمدة.",
  },
};

const serviceItemsEn = {
  "accompagnement-scolaire": {
    title: "School support",
    subtitle: "SSL+ · Public sector",
    description:
      "Welcome site near public schools: childcare, meals, revision workshops and children's wellbeing.",
  },
  "aide-sociale-domicile": {
    title: "Home social support",
    subtitle: "SSL++ · At home",
    description:
      "Trained help for relatives with disability, incapacity or dependency — 7 days a week, 24/7.",
  },
  "activites-alzheimer": {
    title: "Alzheimer workshops",
    subtitle: "SSL+++ · Early stages",
    description:
      "Cognitive stimulation and social life maintained through supervised medical protocols.",
  },
};

export const messages: Record<Locale, Messages> = {
  fr: {
    nav: {
      home: "Accueil",
      contact: "Nous contacter",
      services: "Nos services",
      marketplace: "Marketplace",
      howItWorks: "Notre fonctionnement",
      careers: "Nous rejoindre",
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
        "Cliquez sur un volet pour accéder à sa page dédiée. L'accompagnement scolaire est disponible ; les deux autres volets ouvrent bientôt.",
      voletsLabel: "Prestations SSL",
      voletsTitle: "Trois volets pour structurer l'aide sociale",
      volets: {
        scolaire: {
          brand: "SSL+",
          title: "Enfants scolarisés — secteur public",
          excerpt:
            "Parents actifs : un site d'accueil à proximité des écoles publiques pour le gardiennage, la restauration équilibrée, les ateliers de révision et le bien-être de vos enfants.",
          cta: "Découvrir le volet",
        },
        domicile: {
          brand: "SSL++",
          title: "Aide sociale",
          excerpt:
            "Une aide formée et sélectionnée pour vos proches en situation de handicap, d'invalidité ou de dépendance — disponible 7j/7 et 24h/24.",
          cta: "Découvrir le volet",
        },
        alzheimer: {
          brand: "SSL+++",
          title: "Ateliers Alzheimer",
          excerpt:
            "Stimulation cognitive et maintien de la vie sociale aux premiers stades, selon des protocoles établis par des professionnels de santé.",
          cta: "Découvrir le volet",
        },
      },
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
          "Nos espaces dédiés rapprochent les familles et les équipes SSL+++ sur un même cadre, partout en Algérie.",
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
      howItWorks: "Notre fonctionnement",
      careers: "Nous rejoindre",
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
      services: "خدماتنا",
      marketplace: "السوق",
      howItWorks: "كيف نعمل",
      careers: "انضم إلينا",
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
        "انقر على قطب للوصول إلى صفحته المخصّصة. المرافقة المدرسية متاحة؛ القطبان الآخران قريباً.",
      voletsLabel: "خدمات SSL",
      voletsTitle: "ثلاثة أقطاب لتنظيم المساعدة الاجتماعية",
      volets: {
        scolaire: {
          brand: "SSL+",
          title: "التلاميذ — القطاع العام",
          excerpt:
            "آباء عاملون: موقع استقبال قريب من المدارس العمومية للرعاية، التغذية المتوازنة، ورشات المراجعة ورفاهية أطفالكم.",
          cta: "اكتشف القطب",
        },
        domicile: {
          brand: "SSL++",
          title: "مساعدة اجتماعية",
          excerpt:
            "مساعدة مؤهّلة ومختارة لأقاربكم في وضعية إعاقة أو عجز أو اعتماد — متاحة 7/7 و24/24.",
          cta: "اكتشف القطب",
        },
        alzheimer: {
          brand: "SSL+++",
          title: "ورشات Alzheimer",
          excerpt:
            "تحفيز معرفي والحفاظ على الحياة الاجتماعية في المراحل الأولى، وفق بروتوكولات طبية معتمدة.",
          cta: "اكتشف القطب",
        },
      },
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
          "مساحاتنا المخصّصة تقرّب العائلات من فرق SSL+++ ضمن إطار واحد، في جميع أنحاء الجزائر.",
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
      howItWorks: "كيف نعمل",
      careers: "انضم إلينا",
      contact: "اتصل بنا",
      createAccount: "إنشاء حساب",
      login: "تسجيل الدخول",
    },
    serviceItems: serviceItemsAr,
  },
  en: {
    nav: {
      home: "Home",
      contact: "Contact us",
      services: "Our services",
      marketplace: "Marketplace",
      howItWorks: "How it works",
      careers: "Join us",
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
        "Click a pillar to open its dedicated page. School support is live; the other two pillars are opening soon.",
      voletsLabel: "SSL services",
      voletsTitle: "Three pillars to structure social support",
      volets: {
        scolaire: {
          brand: "SSL+",
          title: "Public-school children",
          excerpt:
            "Working parents: a welcome site near public schools for childcare, balanced meals, revision workshops and your children's wellbeing.",
          cta: "Explore this pillar",
        },
        domicile: {
          brand: "SSL++",
          title: "Home social support",
          excerpt:
            "Trained, selected help for relatives with disability, temporary incapacity or dependency — available 7 days a week, 24/7.",
          cta: "Explore this pillar",
        },
        alzheimer: {
          brand: "SSL+++",
          title: "Alzheimer workshops",
          excerpt:
            "Cognitive stimulation and social life at early stages, following protocols established by healthcare professionals.",
          cta: "Explore this pillar",
        },
      },
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
          "Our dedicated spaces bring families and SSL+++ teams together in one framework, across Algeria.",
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
      howItWorks: "How it works",
      careers: "Join us",
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
