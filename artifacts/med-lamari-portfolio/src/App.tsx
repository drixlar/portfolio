import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  ChevronDown,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Mail,
  Menu,
  Network,
  Phone,
  Server,
  Terminal,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import portraitPath from '@assets/1725841520900_1786673568405.jpg';
import cvPath from '@assets/CV_Med_Lamari_fr_1786673517605.pdf';
import { Route, Switch, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
type Language = 'en' | 'fr';

const navItems = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['journey', 'Journey'],
  ['contact', 'Contact'],
] as const;

const copy = {
  en: {
    nav: { about: 'About', experience: 'Experience', skills: 'Skills', projects: 'Projects', journey: 'Journey', contact: 'Contact' },
    kicker: 'FULL-STACK SOFTWARE ENGINEER · TUNISIA → EUROPE',
    heroTitle: <>Systems that <span className="accent">hold</span> together.</>,
    heroSubtitle: 'I build modular web applications and microservices across Java, PHP, Node.js and Angular — with 3 years of professional delivery experience.',
    viewExperience: 'View experience',
    viewProjects: 'Selected projects',
    contactMe: 'Contact me',
    downloadCv: 'Download CV',
    available: 'Open to engineering conversations',
    scroll: 'Scroll to explore',
    aboutEyebrow: '01 / Profile',
    aboutTitle: <>A pragmatic engineer with an eye for the <em>whole system.</em></>,
    aboutCopy: <><strong>Mohamed Lamari</strong> is a Full-Stack Software Engineer working across backend services, frontend systems and the connective tissue between them. His experience spans high-volume platforms, modular interfaces and REST APIs built with security and maintainability in mind.</>,
    aboutCopy2: 'From Monastir to remote product teams in Canada and Switzerland, he brings an Agile/SCRUM mindset, CI/CD habits and a calm focus on making complex systems legible.',
    terminalLines: [['whoami', 'Full-Stack Software Engineer'], ['scope', 'web apps · microservices · APIs'], ['signal', 'ready for the next challenge']],
    stats: [['3', 'years professional experience'], ['05', 'professional roles'], ['16+', 'technologies listed'], ['03', 'certifications']],
    experienceEyebrow: '02 / Experience',
    experienceTitle: <>A timeline of <em>shipping.</em></>,
    experienceCopy: 'Five environments, from summer PHP foundations to full-stack systems serving thousands of users. Expand a role to inspect the actual scope.',
    current: 'Current role',
    responsibilities: 'Responsibilities',
    stack: 'Technology context',
    skillsEyebrow: '03 / Stack',
    skillsTitle: <>A stack built for <em>movement.</em></>,
    skillsCopy: 'The technologies below are taken directly from the CV — organized by the layer where they become useful.',
    skillNoteTitle: 'Breadth, without theatre.',
    skillNoteCopy: 'No invented proficiency scores. Just a deliberately readable map of the languages, frameworks and tools Med has worked with.',
    skillNoteCode: [['frontend', 'Angular · React · Vue'], ['backend', 'Spring Boot · Node.js · PHP'], ['data', 'MongoDB · MySQL · PostgreSQL']],
    architectureEyebrow: '04 / Architecture',
    architectureTitle: <>From interface to <em>infrastructure.</em></>,
    architectureCopy: 'A restrained view of the full-stack path: reusable UI, secure APIs, modular services and the data layer beneath them.',
    apiOnline: 'ARCHITECTURE_SIGNAL / ONLINE',
    architectureNodes: [['01', 'Interface', 'Angular · React · Vue'], ['02', 'API layer', 'REST · JWT · Swagger'], ['03', 'Services', 'Spring Boot · Node.js'], ['04', 'Data', 'MongoDB · SQL']],
    projectsEyebrow: '05 / Selected work',
    projectsTitle: <>Two repositories. <em>More to inspect.</em></>,
    projectsCopy: 'The CV confirms these repositories by name. Their cards stay intentionally factual and easy to extend when deeper project notes are available.',
    repository: 'Repository',
    projectNote: 'Project details intentionally kept concise — only the repository name is confirmed.',
    openRepository: 'Open repository',
    journeyEyebrow: '06 / Journey',
    journeyTitle: <>The foundations behind the <em>practice.</em></>,
    education: 'Education',
    certifications: 'Certifications',
    languages: 'Languages',
    viewCertificate: 'View certificate',
    contactEyebrow: '07 / Contact',
    contactTitle: <>Let’s make the next system <em>clearer.</em></>,
    contactCopy: 'For a product team, engineering conversation or opportunity in Europe and beyond, reach out directly.',
    email: 'Email',
    phone: 'Phone',
    repositories: 'GitHub repositories',
    footer: 'Designed and engineered as a living portfolio.',
    footerRight: 'Monastir · Tunisia',
  },
  fr: {
    nav: { about: 'À propos', experience: 'Expérience', skills: 'Compétences', projects: 'Projets', journey: 'Parcours', contact: 'Contact' },
    kicker: 'INGÉNIEUR DÉVELOPPEUR FULL-STACK · TUNISIE → EUROPE',
    heroTitle: <>Des systèmes qui <span className="accent">tiennent</span> ensemble.</>,
    heroSubtitle: 'Je conçois des applications web modulaires et des microservices en Java, PHP, Node.js et Angular — avec 3 ans d’expérience professionnelle.',
    viewExperience: 'Voir l’expérience',
    viewProjects: 'Projets sélectionnés',
    contactMe: 'Me contacter',
    downloadCv: 'Télécharger le CV',
    available: 'Ouvert aux échanges techniques',
    scroll: 'Défiler pour explorer',
    aboutEyebrow: '01 / Profil',
    aboutTitle: <>Un ingénieur pragmatique, attentif à l’<em>ensemble.</em></>,
    aboutCopy: <><strong>Mohamed Lamari</strong> est ingénieur développeur Full-Stack. Il travaille sur les services backend, les interfaces frontend et les liens entre les deux. Son expérience couvre des plateformes à forte volumétrie, des interfaces modulaires et des APIs REST pensées pour rester sûres et maintenables.</>,
    aboutCopy2: 'De Monastir aux équipes produit à distance au Canada et en Suisse, il apporte une culture Agile/SCRUM, des habitudes CI/CD et une attention constante à la lisibilité des systèmes complexes.',
    terminalLines: [['whoami', 'Ingénieur développeur Full-Stack'], ['scope', 'applications web · microservices · APIs'], ['signal', 'prêt pour le prochain défi']],
    stats: [['3', 'ans d’expérience professionnelle'], ['05', 'expériences professionnelles'], ['16+', 'technologies listées'], ['03', 'certifications']],
    experienceEyebrow: '02 / Expérience',
    experienceTitle: <>Une chronologie de la <em>mise en production.</em></>,
    experienceCopy: 'Cinq environnements, des fondations PHP aux systèmes Full-Stack utilisés par plusieurs milliers d’utilisateurs. Ouvrez un poste pour voir son périmètre.',
    current: 'Poste actuel',
    responsibilities: 'Responsabilités',
    stack: 'Contexte technique',
    skillsEyebrow: '03 / Stack',
    skillsTitle: <>Une stack faite pour <em>évoluer.</em></>,
    skillsCopy: 'Les technologies ci-dessous sont reprises du CV — classées par couche, là où elles deviennent utiles.',
    skillNoteTitle: 'De l’étendue, sans théâtre.',
    skillNoteCopy: 'Pas de scores de maîtrise inventés. Une cartographie lisible des langages, frameworks et outils utilisés par Med.',
    skillNoteCode: [['frontend', 'Angular · React · Vue'], ['backend', 'Spring Boot · Node.js · PHP'], ['data', 'MongoDB · MySQL · PostgreSQL']],
    architectureEyebrow: '04 / Architecture',
    architectureTitle: <>De l’interface à l’<em>infrastructure.</em></>,
    architectureCopy: 'Une lecture sobre du chemin Full-Stack : interfaces réutilisables, APIs sécurisées, services modulaires et couche de données.',
    apiOnline: 'SIGNAL_ARCHITECTURE / EN LIGNE',
    architectureNodes: [['01', 'Interface', 'Angular · React · Vue'], ['02', 'Couche API', 'REST · JWT · Swagger'], ['03', 'Services', 'Spring Boot · Node.js'], ['04', 'Données', 'MongoDB · SQL']],
    projectsEyebrow: '05 / Travail sélectionné',
    projectsTitle: <>Deux dépôts. <em>À explorer.</em></>,
    projectsCopy: 'Le CV confirme ces dépôts par leur nom. Les cartes restent factuelles et faciles à enrichir lorsque de nouvelles informations seront disponibles.',
    repository: 'Dépôt',
    projectNote: 'Détails volontairement concis — seul le nom du dépôt est confirmé.',
    openRepository: 'Ouvrir le dépôt',
    journeyEyebrow: '06 / Parcours',
    journeyTitle: <>Les fondations derrière la <em>pratique.</em></>,
    education: 'Formation',
    certifications: 'Certifications',
    languages: 'Langues',
    viewCertificate: 'Voir le certificat',
    contactEyebrow: '07 / Contact',
    contactTitle: <>Construisons un système <em>plus clair.</em></>,
    contactCopy: 'Pour une équipe produit, une discussion technique ou une opportunité en Europe et ailleurs, contactez-moi directement.',
    email: 'E-mail',
    phone: 'Téléphone',
    repositories: 'Dépôts GitHub',
    footer: 'Conçu et développé comme un portfolio vivant.',
    footerRight: 'Monastir · Tunisie',
  },
} as const;

const experiences = [
  {
    role: { en: 'Full-Stack Java, PHP, Node.js, Angular Engineer', fr: 'Ingénieur développeur Full-Stack Java, PHP, Node.js, Angular' },
    company: 'Fanvoice (Explora Analytics)',
    location: { en: 'Monastir, Tunisia', fr: 'Monastir, Tunisie' },
    dates: '01/05/2024 – 04/08/2026',
    current: true,
    points: {
      en: ['Backend microservices with Spring Boot and Node.js.', 'Reusable Angular, JavaScript and jQuery components.', 'Secure REST APIs with JWT, permissions and sessions.', 'MongoDB optimization through indexing and aggregations.', 'CI/CD and automated tests with JUnit, Mocha and Jest.', 'Platforms used by several thousand users; collaboration with SNCF, Bouygues Telecom and Crédit Mutuel.'],
      fr: ['Développement de microservices backend avec Spring Boot et Node.js.', 'Composants réutilisables avec Angular, JavaScript et jQuery.', 'APIs REST sécurisées avec JWT, permissions et sessions.', 'Optimisation MongoDB par indexation et agrégations.', 'CI/CD et tests automatisés avec JUnit, Mocha et Jest.', 'Participation à des plateformes utilisées par plusieurs milliers d’utilisateurs ; collaboration avec SNCF, Bouygues Telecom et Crédit Mutuel.'],
    },
    tags: ['Spring Boot', 'Node.js', 'Angular', 'PHP', 'MongoDB', 'JWT', 'Jenkins', 'JUnit', 'Mocha', 'Jest'],
  },
  {
    role: { en: 'Vue.js 3 Frontend Developer · Freelance', fr: 'Développeur Frontend Vue.js 3 · Freelance' },
    company: 'Université de Sherbrooke',
    location: { en: 'Remote, Canada', fr: 'À distance, Canada' },
    dates: '08/2023 – 02/2024',
    current: false,
    points: {
      en: ['Modular interfaces with Nuxt.js and Vue.js.', 'Reusable component structure and Tailwind CSS UI integration.', 'Application state with Vuex and TypeScript.', 'REST API integration, Jest tests and frontend performance optimization with lazy loading.', 'Remote collaboration in an Agile/SCRUM environment.'],
      fr: ['Interfaces modulaires avec Nuxt.js et Vue.js.', 'Structuration de composants réutilisables et intégration UI avec Tailwind CSS.', 'Gestion d’état applicatif avec Vuex et TypeScript.', 'Intégration d’APIs REST, tests Jest et optimisation frontend avec lazy loading.', 'Collaboration à distance dans un environnement Agile/SCRUM.'],
    },
    tags: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Vuex', 'Tailwind CSS', 'Jest', 'REST'],
  },
  {
    role: { en: 'PFE Intern · MERN Stack Engineer', fr: 'Stage PFE · Ingénieur développeur MERN Stack' },
    company: 'Hardsoft Consulting',
    location: { en: 'Remote, Switzerland', fr: 'À distance, Suisse' },
    dates: '03/2023 – 08/2023',
    current: false,
    points: {
      en: ['UI development with React and client-side state with Redux.', 'RESTful APIs with Node.js, JWT, Axios and Mongoose.', 'MongoDB data management.', 'Source control with Bitbucket and API documentation with Postman.'],
      fr: ['Développement UI avec React et gestion d’état côté client avec Redux.', 'APIs RESTful avec Node.js, JWT, Axios et Mongoose.', 'Gestion des données avec MongoDB.', 'Gestion du code source avec Bitbucket et documentation des APIs avec Postman.'],
    },
    tags: ['React', 'Redux', 'Node.js', 'MongoDB', 'JWT', 'Axios', 'Mongoose', 'Bitbucket', 'Postman'],
  },
  {
    role: { en: 'Engineering Intern · Spring Boot / Angular Engineer', fr: 'Stage d’ingénieur · Développeur Spring Boot / Angular' },
    company: 'FranchiseLab',
    location: { en: 'Tunis, Tunisia', fr: 'Tunis, Tunisie' },
    dates: '07/2022 – 10/2022',
    current: false,
    points: {
      en: ['REST microservices with Spring Boot and persistence with Hibernate.', 'API security with Spring Security, JWT, CSRF and XSS.', 'Microservices architecture with Spring Cloud.', 'Angular and Angular Material frontend development.', 'PostgreSQL configuration and optimization; Agile/SCRUM ceremonies.'],
      fr: ['Microservices REST avec Spring Boot et persistance avec Hibernate.', 'Sécurisation des APIs avec Spring Security, JWT, CSRF et XSS.', 'Architecture microservices avec Spring Cloud.', 'Développement frontend avec Angular et Angular Material.', 'Configuration et optimisation PostgreSQL ; cérémonies Agile/SCRUM.'],
    },
    tags: ['Spring Boot', 'Spring Security', 'Spring Cloud', 'Angular', 'Hibernate', 'PostgreSQL', 'JWT'],
  },
  {
    role: { en: 'Summer Intern · PHP Developer', fr: 'Stage d’été · Développeur PHP' },
    company: 'WAND',
    location: { en: 'Monastir, Tunisia', fr: 'Monastir, Tunisie' },
    dates: '06/2021 – 08/2021',
    current: false,
    points: {
      en: ['PHP backend with REST APIs and MySQL data management.', 'Unit tests with PHPUnit.', 'Responsive HTML/CSS interfaces and dynamic JavaScript frontend.'],
      fr: ['Backend PHP avec APIs REST et gestion des données avec MySQL.', 'Tests unitaires avec PHPUnit.', 'Interfaces responsives HTML/CSS et frontend dynamique en JavaScript.'],
    },
    tags: ['PHP', 'MySQL', 'REST', 'PHPUnit', 'HTML', 'CSS', 'JavaScript'],
  },
] as const;

const skillGroups = [
  { title: { en: 'Frontend', fr: 'Frontend' }, icon: Code2, values: ['Angular', 'ReactJS', 'VueJs', 'JavaScript / TypeScript', 'HTML5 / CSS3', 'TailwindCSS / Bootstrap'] },
  { title: { en: 'Backend', fr: 'Backend' }, icon: Server, values: ['Node.js / Express.js', 'Spring / Spring Boot', 'Symfony', 'Laravel'] },
  { title: { en: 'Databases', fr: 'Bases de données' }, icon: Database, values: ['MySQL', 'MongoDB', 'PostgreSQL'] },
  { title: { en: 'Programming languages', fr: 'Langages de programmation' }, icon: Terminal, values: ['PHP', 'Java', 'Python'] },
  { title: { en: 'DevOps & tools', fr: 'DevOps & outils' }, icon: Network, values: ['Docker', 'Jenkins', 'SonarQube', 'Git', 'Postman', 'Swagger', 'Mantis'] },
] as const;

const projects = [
  { name: 'grocery_list_system_dotnet_react', url: 'https://github.com/drixlar/grocery_list_system_dotnet_react.git', tone: 'default' },
  { name: 'Pricing_Engine_java_angular', url: 'https://github.com/drixlar/Pricing_Engine_java_angular.git', tone: 'engine' },
] as const;

const education = [
  { dates: '09/2020 – 11/2023', degree: { en: 'Computer Engineering', fr: 'Ingénierie en informatique' }, school: 'ESPRIT · École supérieure privée d’ingénierie et de technologie', location: 'Tunisia / Tunisie' },
  { dates: '09/2017 – 06/2020', degree: { en: 'Applied Bachelor’s in Networks and Telecommunications', fr: 'Licence appliquée en réseaux et télécommunications' }, school: 'ISTIC · Institut supérieur des technologies de l’information et de la communication', location: 'Tunisia / Tunisie' },
] as const;

const certifications = [
  { org: 'Google Cloud', name: { en: 'Generative AI Leader', fr: 'Generative AI Leader' }, date: '2026', url: '' },
  { org: 'Udemy', name: { en: 'Cybersecurity: Web application security & SQL injection', fr: 'Cybersécurité : sécurité des applications web & injection SQL' }, date: '2026', url: 'https://www.udemy.com/certificate/UC-c59541f9-e03b-48e6-ad32-78545102dc9f/' },
  { org: 'Udemy', name: { en: 'AWS Certified Solutions Architect - Associate (in French)', fr: 'AWS Certified Solutions Architect - Associate (en français)' }, date: '29/05/2026', url: 'https://www.udemy.com/certificate/UC-7ee87002-77fc-489e-96cf-b7a86c06a977/' },
] as const;

const languages = [
  { name: { en: 'Arabic', fr: 'Arabe' }, level: { en: 'Native language', fr: 'Langue maternelle' } },
  { name: { en: 'French', fr: 'Français' }, level: { en: 'Technical / Professional', fr: 'Technique / Professionnel' } },
  { name: { en: 'English', fr: 'Anglais' }, level: { en: 'Technical / Professional', fr: 'Technique / Professionnel' } },
] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
};

function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = revealRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(node);
      }
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={revealRef}
      className={`scroll-reveal reveal-${direction} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [hasScrolled, setHasScrolled] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([0]));
  const t = copy[language];
  const year = new Date().getFullYear();

  const sections = useMemo(() => navItems.map(([id]) => id), []);

  useEffect(() => {
    document.title = language === 'en'
      ? 'Mohamed Lamari | Full-Stack Software Engineer'
      : 'Mohamed Lamari | Ingénieur développeur Full-Stack';
    const description = language === 'en'
      ? 'Portfolio of Mohamed Lamari, Full-Stack Software Engineer working with Java, PHP, Node.js, Angular and microservices.'
      : 'Portfolio de Mohamed Lamari, ingénieur développeur Full-Stack spécialisé en Java, PHP, Node.js, Angular et microservices.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
  }, [language]);

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: '-24% 0px -62% 0px', threshold: [0, .2, .5, 1] });
    sections.forEach((id) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [sections]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };
  const toggleExperience = (index: number) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index); else next.add(index);
      return next;
    });
  };

  return (
    <div className="portfolio-shell">
      <header className={`site-header ${hasScrolled ? 'scrolled' : ''}`}>
        <div className="container-wide nav-row">
          <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" data-testid="button-brand">
            <span className="brand-mark">ML</span><span className="brand-name">Mohamed <span>/ Lamari</span></span>
          </button>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
            {navItems.map(([id, fallback]) => (
              <button key={id} className={`nav-link ${activeSection === id ? 'active' : ''}`} onClick={() => goTo(id)} data-testid={`button-nav-${id}`}>
                {t.nav[id as keyof typeof t.nav] || fallback}
              </button>
            ))}
          </nav>
          <div className="nav-actions">
            <div className="language-toggle" role="group" aria-label="Language switcher">
              <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'} data-testid="button-language-en">EN</button>
              <button className={language === 'fr' ? 'active' : ''} onClick={() => setLanguage('fr')} aria-pressed={language === 'fr'} data-testid="button-language-fr">FR</button>
            </div>
            <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="container-wide hero-grid">
            <div>
              <div className="hero-kicker reveal">{t.kicker}</div>
              <h1 id="hero-title" className="hero-title reveal delay-1">Mohamed<br /><span>Lamari</span><br />{t.heroTitle}</h1>
              <p className="hero-subtitle reveal delay-2">{t.heroSubtitle}</p>
              <div className="hero-actions reveal delay-3">
                <button className="button-primary" onClick={() => goTo('experience')} data-testid="button-view-experience">{t.viewExperience}<ArrowDownRight size={14} /></button>
                <button className="button-secondary" onClick={() => goTo('projects')} data-testid="button-view-projects">{t.viewProjects}<ArrowRight size={14} /></button>
                <a className="button-secondary" href={`mailto:mohamedlaamari1998@gmail.com`} data-testid="link-contact-hero">{t.contactMe}<AtSign size={14} /></a>
                <a className="button-secondary" href={cvPath} download="Mohamed-Lamari-CV.pdf" data-testid="link-download-cv">{t.downloadCv}<Download size={14} /></a>
              </div>
              <div className="availability reveal delay-3"><span className="pulse-dot" />{t.available}</div>
              <div className="hero-scroll"><span className="scroll-line" />{t.scroll}</div>
            </div>
            <div className="portrait-stage" aria-label="Portrait of Mohamed Lamari">
              <div className="portrait-orbit" /><div className="portrait-orbit-two" />
              <div className="portrait-frame"><img src={portraitPath} alt="Mohamed Lamari" data-testid="img-profile-portrait" /></div>
              <div className="portrait-tag"><strong>STATUS: ONLINE</strong>Monastir · TN</div>
            </div>
          </div>
        </section>

        <section id="about" className="section-block" aria-labelledby="about-title">
          <ScrollReveal className="container-wide about-layout">
            <div>
              <div className="eyebrow">{t.aboutEyebrow}</div>
              <h2 id="about-title" className="section-heading">{t.aboutTitle}</h2>
              <p className="about-copy">{t.aboutCopy}</p>
              <p className="about-copy">{t.aboutCopy2}</p>
              <div className="stat-grid stagger-grid">
                {t.stats.map(([number, label], index) => <div className="stat-card stagger-item" key={label} style={{ '--stagger-delay': `${index * 90}ms` } as CSSProperties} data-testid={`stat-card-${index}`}><div className="stat-number">{number}</div><div className="stat-label">{label}</div></div>)}
              </div>
            </div>
            <div className="about-panel" aria-label="Profile details">
              {t.terminalLines.map(([key, value]) => <div className="terminal-line" key={key}><span className="prompt">$</span><span>{key}</span><span className="value">{value}</span></div>)}
              <div className="signature">// thoughtful systems, shipped with care</div>
            </div>
          </ScrollReveal>
        </section>

        <section id="experience" className="section-block" aria-labelledby="experience-title">
          <ScrollReveal className="container-wide">
            <div className="experience-intro"><div><div className="eyebrow">{t.experienceEyebrow}</div><h2 id="experience-title" className="section-heading">{t.experienceTitle}</h2></div><p className="section-copy">{t.experienceCopy}</p></div>
            <div className="timeline">
              {experiences.map((item, index) => {
                const isOpen = expanded.has(index);
                return <ScrollReveal className="timeline-item" direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 70} key={item.company}>
                  <article data-testid={`experience-card-${index}`}>
                    <span className="timeline-node" aria-hidden="true" />
                    <div className={`timeline-card ${isOpen ? 'open' : ''}`}>
                      <button className="timeline-summary" onClick={() => toggleExperience(index)} aria-expanded={isOpen} data-testid={`button-expand-experience-${index}`}>
                        <div><div className="experience-period">{item.dates} {item.current ? `· ${t.current}` : ''}</div><h3 className="experience-role">{item.role[language]}</h3><div className="experience-company"><strong>{item.company}</strong> · {item.location[language]}</div></div>
                        <ChevronDown className="expand-icon" size={18} />
                      </button>
                      {isOpen && <div className="timeline-details detail-reveal"><div><div className="eyebrow">{t.responsibilities}</div><ul>{item.points[language].map((point) => <li key={point}>{point}</li>)}</ul></div><div><div className="eyebrow">{t.stack}</div><div className="stack-list">{item.tags.map((tag) => <span className="stack-tag" key={tag}>{tag}</span>)}</div></div></div>}
                    </div>
                  </article>
                </ScrollReveal>;
              })}
            </div>
          </ScrollReveal>
        </section>

        <section id="skills" className="section-block" aria-labelledby="skills-title">
          <ScrollReveal className="container-wide">
            <div className="skills-intro"><div><div className="eyebrow">{t.skillsEyebrow}</div><h2 id="skills-title" className="section-heading">{t.skillsTitle}</h2></div><p className="section-copy">{t.skillsCopy}</p></div>
            <div className="skills-layout">
              <ScrollReveal className="skill-groups" direction="left"><div>{skillGroups.map((group, index) => { const Icon = group.icon; return <div className="skill-category stagger-item" key={group.title.en} style={{ '--stagger-delay': `${index * 90}ms` } as CSSProperties}><h3 className="category-title"><Icon size={15} />{group.title[language]}<span>0{index + 1}</span></h3><div className="skill-tags">{group.values.map((value) => <span className="skill-tag" key={value} data-testid={`skill-${value.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}>{value}</span>)}</div></div>; })}</div></ScrollReveal>
              <ScrollReveal className="skills-note" direction="right"><h3>{t.skillNoteTitle}</h3><p>{t.skillNoteCopy}</p><code>{t.skillNoteCode.map(([key, value]) => <span key={key}><b>{key}</b> :: {value}<br /></span>)}</code></ScrollReveal>
            </div>
          </ScrollReveal>
        </section>

        <section className="section-block" aria-labelledby="architecture-title">
          <div className="container-wide">
            <ScrollReveal className="architecture" direction="scale">
              <div className="architecture-header"><div><div className="eyebrow">{t.architectureEyebrow}</div><h2 id="architecture-title" className="section-heading">{t.architectureTitle}</h2><p className="section-copy">{t.architectureCopy}</p></div><div className="architecture-status"><span className="pulse-dot" />{t.apiOnline}</div></div>
              <div className="architecture-canvas"><div className="arch-lines" /><div className="arch-flow" />{t.architectureNodes.map(([number, title, detail]) => <div className="arch-node" key={number}><span className="arch-index">{number}</span><div><h4>{title}</h4><p>{detail}</p></div></div>)}</div>
            </ScrollReveal>
          </div>
        </section>

        <section id="projects" className="section-block" aria-labelledby="projects-title">
          <ScrollReveal className="container-wide">
            <div className="eyebrow">{t.projectsEyebrow}</div><h2 id="projects-title" className="section-heading">{t.projectsTitle}</h2><p className="section-copy">{t.projectsCopy}</p>
            <div className="projects-grid stagger-grid">
              {projects.map((project, index) => <article className="project-card stagger-item" style={{ '--stagger-delay': `${index * 130}ms` } as CSSProperties} key={project.name} data-testid={`project-card-${index}`}>
                <div className={`project-visual ${project.tone === 'engine' ? 'engine' : ''}`}><div className="repo-diagram"><span className="repo-box">{index === 0 ? 'LIST' : 'ENGINE'}</span><span className="repo-arrow">→</span><span className="repo-box">{index === 0 ? 'REPOSITORY' : 'SOURCE'}</span></div></div>
                <div className="project-label">{t.repository} 0{index + 1}</div><h3 className="project-title">{project.name}</h3><p className="project-copy">{t.projectNote}</p>
                <div className="project-footer"><span className="skill-tag">{index === 0 ? 'React · repository' : 'Java · Angular · repository'}</span><a className="project-link" href={project.url} target="_blank" rel="noreferrer" data-testid={`link-project-${index}`}>{t.openRepository} <ArrowUpRight size={13} /></a></div>
              </article>)}
            </div>
          </ScrollReveal>
        </section>

        <section id="journey" className="section-block" aria-labelledby="journey-title">
          <ScrollReveal className="container-wide">
            <div className="eyebrow">{t.journeyEyebrow}</div><h2 id="journey-title" className="section-heading">{t.journeyTitle}</h2>
            <div className="journey-grid">
              <ScrollReveal direction="left"><div><h3 className="eyebrow" style={{ marginTop: '42px' }}>{t.education}</h3><div className="education-list">{education.map((item, index) => <div className="education-item stagger-item" style={{ '--stagger-delay': `${index * 100}ms` } as CSSProperties} key={item.school}><div className="education-date">{item.dates}</div><div className="education-degree">{item.degree[language]}</div><div className="education-school">{item.school} · {item.location}</div></div>)}</div></div></ScrollReveal>
              <ScrollReveal direction="right"><div><h3 className="eyebrow" style={{ marginTop: '42px' }}>{t.certifications}</h3><div className="cert-list">{certifications.map((cert, index) => <div className="cert-card stagger-item" style={{ '--stagger-delay': `${index * 100}ms` } as CSSProperties} key={cert.name.en}><div className="cert-org">{cert.org}</div><div className="cert-name">{cert.name[language]}</div><div className="cert-date">{cert.date}</div>{cert.url && <a className="cert-link" href={cert.url} target="_blank" rel="noreferrer" data-testid={`link-certificate-${cert.org}-${cert.date}`}>{t.viewCertificate}<ExternalLink size={12} /></a>}</div>)}</div></div></ScrollReveal>
            </div>
            <h3 className="eyebrow" style={{ marginTop: '74px' }}>{t.languages}</h3><ScrollReveal className="language-strip">{languages.map((item, index) => <div className="language-item stagger-item" style={{ '--stagger-delay': `${index * 100}ms` } as CSSProperties} key={item.name.en}><strong>{item.name[language]}</strong><span>{item.level[language]}</span></div>)}</ScrollReveal>
          </ScrollReveal>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <ScrollReveal className="container-wide" direction="scale"><div className="contact-panel"><div><div className="eyebrow">{t.contactEyebrow}</div><h2 id="contact-title" className="contact-title">{t.contactTitle}</h2><p className="contact-copy">{t.contactCopy}</p></div><div className="contact-links"><a className="contact-link" href="mailto:mohamedlaamari1998@gmail.com" data-testid="link-contact-email"><Mail size={16} /><span>{t.email}</span><span className="arrow">mohamedlaamari1998@gmail.com</span></a><a className="contact-link" href="tel:+21652677222" data-testid="link-contact-phone"><Phone size={16} /><span>{t.phone}</span><span className="arrow">+216 52 677 222</span></a><a className="contact-link" href={projects[0].url} target="_blank" rel="noreferrer" data-testid="link-contact-github"><Github size={16} /><span>{t.repositories}</span><span className="arrow"><ArrowUpRight size={14} /></span></a></div></div></ScrollReveal>
        </section>
      </main>
      <footer className="site-footer"><div className="container-wide footer-row"><span><span className="footer-mark">ML</span> · {t.footer}</span><span>© {year} · {t.footerRight}</span></div></footer>
    </div>
  );
}

function Router() {
  return <ErrorBoundary><Switch><Route path="/" component={Home} /><Route component={() => <Home />} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;