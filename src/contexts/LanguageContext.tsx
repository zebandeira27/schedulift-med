import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

type TranslationKey = 
  | 'nav.features'
  | 'nav.patientHistory'
  | 'nav.pricing'
  | 'nav.testimonials'
  | 'nav.contact'
  | 'nav.signIn'
  | 'nav.startTrial'
  | 'hero.badge'
  | 'hero.headline1'
  | 'hero.headline2'
  | 'hero.tagline'
  | 'hero.description'
  | 'hero.cta1'
  | 'hero.cta2'
  | 'hero.trust1'
  | 'hero.trust2'
  | 'hero.trust3'
  | 'hero.stat1Label'
  | 'hero.stat2Label'
  | 'hero.stat3Label'
  | 'hero.stat4Label'
  | 'hero.cardLabel1'
  | 'hero.cardLabel2';

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    'nav.features': 'Features',
    'nav.patientHistory': 'Patient History',
    'nav.pricing': 'Pricing',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.signIn': 'Sign In',
    'nav.startTrial': 'Start Free Trial',
    'hero.badge': 'The future of clinic operations',
    'hero.headline1': 'Simplicity is the',
    'hero.headline2': 'ultimate sophistication',
    'hero.tagline': 'Less friction. More flow.',
    'hero.description': 'We built what we wished existed—an operations platform so intuitive, it disappears into your workflow. Trusted by teams who refuse to compromise.',
    'hero.cta1': 'Experience it free',
    'hero.cta2': 'See it in action',
    'hero.trust1': 'Enterprise-grade security',
    'hero.trust2': 'No setup fees',
    'hero.trust3': 'Cancel anytime',
    'hero.stat1Label': 'Teams trust us',
    'hero.stat2Label': 'Tasks automated',
    'hero.stat3Label': 'Time reclaimed',
    'hero.stat4Label': 'Out of 5 stars',
    'hero.cardLabel1': 'saved daily, per team',
    'hero.cardLabel2': 'uptime guaranteed',
  },
  es: {
    'nav.features': 'Funciones',
    'nav.patientHistory': 'Historial del Paciente',
    'nav.pricing': 'Precios',
    'nav.testimonials': 'Testimonios',
    'nav.contact': 'Contacto',
    'nav.signIn': 'Iniciar Sesión',
    'nav.startTrial': 'Prueba Gratuita',
    'hero.badge': 'El futuro de las operaciones clínicas',
    'hero.headline1': 'La simplicidad es la',
    'hero.headline2': 'máxima sofisticación',
    'hero.tagline': 'Menos fricción. Más fluidez.',
    'hero.description': 'Construimos lo que deseábamos que existiera—una plataforma de operaciones tan intuitiva que desaparece en tu flujo de trabajo. Confiado por equipos que no aceptan compromisos.',
    'hero.cta1': 'Experiméntalo gratis',
    'hero.cta2': 'Verlo en acción',
    'hero.trust1': 'Seguridad empresarial',
    'hero.trust2': 'Sin cuotas de instalación',
    'hero.trust3': 'Cancela cuando quieras',
    'hero.stat1Label': 'Equipos confían en nosotros',
    'hero.stat2Label': 'Tareas automatizadas',
    'hero.stat3Label': 'Tiempo recuperado',
    'hero.stat4Label': 'De 5 estrellas',
    'hero.cardLabel1': 'ahorrado diariamente, por equipo',
    'hero.cardLabel2': 'disponibilidad garantizada',
  },
  fr: {
    'nav.features': 'Fonctionnalités',
    'nav.patientHistory': 'Historique Patient',
    'nav.pricing': 'Tarifs',
    'nav.testimonials': 'Témoignages',
    'nav.contact': 'Contact',
    'nav.signIn': 'Connexion',
    'nav.startTrial': 'Essai Gratuit',
    'hero.badge': "L'avenir des opérations cliniques",
    'hero.headline1': 'La simplicité est la',
    'hero.headline2': 'sophistication ultime',
    'hero.tagline': 'Moins de friction. Plus de fluidité.',
    'hero.description': "Nous avons construit ce que nous souhaitions voir exister—une plateforme d'opérations si intuitive qu'elle disparaît dans votre flux de travail. Approuvée par les équipes qui refusent les compromis.",
    'hero.cta1': 'Essayez gratuitement',
    'hero.cta2': 'Voir en action',
    'hero.trust1': 'Sécurité entreprise',
    'hero.trust2': "Pas de frais d'installation",
    'hero.trust3': 'Annulez à tout moment',
    'hero.stat1Label': 'Équipes nous font confiance',
    'hero.stat2Label': 'Tâches automatisées',
    'hero.stat3Label': 'Temps récupéré',
    'hero.stat4Label': 'Sur 5 étoiles',
    'hero.cardLabel1': 'économisé quotidiennement, par équipe',
    'hero.cardLabel2': 'disponibilité garantie',
  },
  de: {
    'nav.features': 'Funktionen',
    'nav.patientHistory': 'Patientenhistorie',
    'nav.pricing': 'Preise',
    'nav.testimonials': 'Referenzen',
    'nav.contact': 'Kontakt',
    'nav.signIn': 'Anmelden',
    'nav.startTrial': 'Kostenlos Testen',
    'hero.badge': 'Die Zukunft des Klinikbetriebs',
    'hero.headline1': 'Einfachheit ist die',
    'hero.headline2': 'höchste Raffinesse',
    'hero.tagline': 'Weniger Reibung. Mehr Flow.',
    'hero.description': 'Wir haben gebaut, was wir uns gewünscht haben—eine Betriebsplattform, die so intuitiv ist, dass sie in Ihrem Workflow verschwindet. Vertraut von Teams, die keine Kompromisse eingehen.',
    'hero.cta1': 'Kostenlos erleben',
    'hero.cta2': 'In Aktion sehen',
    'hero.trust1': 'Enterprise-Sicherheit',
    'hero.trust2': 'Keine Einrichtungsgebühren',
    'hero.trust3': 'Jederzeit kündbar',
    'hero.stat1Label': 'Teams vertrauen uns',
    'hero.stat2Label': 'Aufgaben automatisiert',
    'hero.stat3Label': 'Zeit zurückgewonnen',
    'hero.stat4Label': 'Von 5 Sternen',
    'hero.cardLabel1': 'täglich gespart, pro Team',
    'hero.cardLabel2': 'Verfügbarkeit garantiert',
  },
  pt: {
    'nav.features': 'Funcionalidades',
    'nav.patientHistory': 'Histórico do Paciente',
    'nav.pricing': 'Preços',
    'nav.testimonials': 'Depoimentos',
    'nav.contact': 'Contato',
    'nav.signIn': 'Entrar',
    'nav.startTrial': 'Teste Gratuito',
    'hero.badge': 'O futuro das operações clínicas',
    'hero.headline1': 'A simplicidade é a',
    'hero.headline2': 'máxima sofisticação',
    'hero.tagline': 'Menos fricção. Mais fluidez.',
    'hero.description': 'Construímos o que desejávamos que existisse—uma plataforma de operações tão intuitiva que desaparece no seu fluxo de trabalho. Confiado por equipas que não aceitam compromissos.',
    'hero.cta1': 'Experimente grátis',
    'hero.cta2': 'Veja em ação',
    'hero.trust1': 'Segurança empresarial',
    'hero.trust2': 'Sem taxas de instalação',
    'hero.trust3': 'Cancele quando quiser',
    'hero.stat1Label': 'Equipas confiam em nós',
    'hero.stat2Label': 'Tarefas automatizadas',
    'hero.stat3Label': 'Tempo recuperado',
    'hero.stat4Label': 'De 5 estrelas',
    'hero.cardLabel1': 'poupado diariamente, por equipa',
    'hero.cardLabel2': 'disponibilidade garantida',
  },
  it: {
    'nav.features': 'Funzionalità',
    'nav.patientHistory': 'Storia del Paziente',
    'nav.pricing': 'Prezzi',
    'nav.testimonials': 'Testimonianze',
    'nav.contact': 'Contatti',
    'nav.signIn': 'Accedi',
    'nav.startTrial': 'Prova Gratuita',
    'hero.badge': 'Il futuro delle operazioni cliniche',
    'hero.headline1': 'La semplicità è la',
    'hero.headline2': 'massima sofisticatezza',
    'hero.tagline': 'Meno attrito. Più flusso.',
    'hero.description': 'Abbiamo costruito ciò che desideravamo esistesse—una piattaforma operativa così intuitiva da scomparire nel tuo flusso di lavoro. Affidabile per team che rifiutano i compromessi.',
    'hero.cta1': 'Provalo gratis',
    'hero.cta2': 'Guardalo in azione',
    'hero.trust1': 'Sicurezza aziendale',
    'hero.trust2': 'Nessun costo di attivazione',
    'hero.trust3': 'Cancella quando vuoi',
    'hero.stat1Label': 'Team si fidano di noi',
    'hero.stat2Label': 'Attività automatizzate',
    'hero.stat3Label': 'Tempo recuperato',
    'hero.stat4Label': 'Su 5 stelle',
    'hero.cardLabel1': 'risparmiato giornalmente, per team',
    'hero.cardLabel2': 'disponibilità garantita',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
