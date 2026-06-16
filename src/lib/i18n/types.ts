export type Locale = "fr" | "ar" | "en";

export type ServiceItemMessages = {
  title: string;
  subtitle: string;
  description: string;
};

export type Messages = {
  nav: {
    home: string;
    contact: string;
    services: string;
    marketplace: string;
    createAccount: string;
    login: string;
    menu: string;
    close: string;
  };
  common: {
    available: string;
    comingSoon: string;
    seeService: string;
    learnMore: string;
  };
  home: {
    badge: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    description: string;
    discoverServices: string;
    contactUs: string;
    servicesLabel: string;
    servicesTitle: string;
    servicesDescription: string;
    commitmentLabel: string;
    commitmentTitle: string;
    commitmentItems: [string, string][];
    aboutLabel: string;
    aboutTitle: string;
    aboutLead: string;
    aboutPillars: [string, string][];
    contactLabel: string;
    contactTitle: string;
    contactDescription: string;
    contactForm: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      subject: string;
      subjectOptions: {
        general: string;
        schooling: string;
        home: string;
        seniors: string;
        marketplace: string;
        other: string;
      };
      message: string;
      messagePlaceholder: string;
      submit: string;
      mockNote: string;
      successTitle: string;
      successMessage: string;
      infoPhone: string;
      infoEmail: string;
      infoHours: string;
      infoHoursValue: string;
    };
  };
  footer: {
    description: string;
    navigation: string;
    account: string;
    home: string;
    ourServices: string;
    marketplace: string;
    contact: string;
    createAccount: string;
    login: string;
  };
  serviceItems: Record<string, ServiceItemMessages>;
};

export const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "ar", label: "AR", name: "العربية" },
  { code: "en", label: "EN", name: "English" },
];
