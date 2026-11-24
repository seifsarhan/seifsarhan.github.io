/* ------------------------------------------------------------------
   Edit your details and projects here — the page renders from this.
------------------------------------------------------------------- */
const CONFIG = {
  name: 'Seif Sarhan',
  fullName: 'Seifeldeen Mohamed Ibrahim Sarhan',
  role: 'Full-stack web developer',
  location: 'Cairo, Egypt',
  remote: true,
  email: 'seifsarhan1229@gmail.com',
  phone: '+20 128 611 9756',
  whatsapp: '201286119756', // digits only, used for wa.me
  github: 'seifsarhan',
  linkedin: '', // e.g. 'https://www.linkedin.com/in/your-name'
  cv: 'assets/Seifeldeen-Mohamed-Ibrahim-CV.pdf',
  agency: { name: 'The Social Club', url: 'https://thesocialclubgrowth.com' },
};

const PROJECTS = [
  {
    id: 'socialclub', title: 'The Social Club', repo: '', cat: 'react', bilingual: true,
    live: 'https://thesocialclubgrowth.com', liveLabel: 'Visit site',
    kind: 'My digital growth agency', stack: ['React', 'Vite', 'Tailwind CSS'],
    blurb: 'The website for my own agency — digital marketing, web development and lead generation — with services, a growth calculator, case studies, a blog and an Arabic / English switch.',
    features: ['Arabic / English switch, currency selector and dark mode', 'Growth calculator for estimating campaign results', 'Services, process, partnership and portfolio pages', 'Blog for content marketing', 'Strategy-call booking and WhatsApp contact', 'On-page SEO, Open Graph previews and analytics'],
  },
  {
    id: 'lail', title: 'Lail Specialty Coffee', repo: 'lail-coffee', cat: 'react', bilingual: true,
    live: 'https://lail-coffee-roastery.surge.sh',
    kind: 'E-commerce storefront', stack: ['React 19', 'Vite', 'Context API', 'localStorage'],
    blurb: 'A bilingual Arabic/English coffee roastery store with live search, quick-view product options, promo codes and a full three-step checkout.',
    features: ['Instant Arabic (RTL) ↔ English (LTR) switch', 'Ctrl+K live search, category pills, roast filter and sorting', 'Quick view with weight pricing, grind selector and customer reviews', 'Cart with free-shipping bar and working promo codes', '3-step checkout with live card preview and printable invoice', 'Order tracking, wishlist and a coffee taste quiz'],
  },
  {
    id: 'aurelia', title: 'Aurelia Luxury Estates', repo: 'aurelia-realty', cat: 'react', bilingual: true,
    live: 'https://aurelia-realty.surge.sh',
    kind: 'Real-estate platform', stack: ['React 19', 'Vite', 'i18n'],
    blurb: 'An Arabic-first luxury property platform for Riyadh, Dubai, New Cairo and the North Coast, with smart filters, side-by-side compare and a mortgage calculator.',
    features: ['Buy / rent search with city and property-type filters', 'Compare properties side by side', 'Mortgage and installment payment calculator', 'Book an in-person viewing or a 3D video tour', 'Advisors directory and ROI advisory section', 'Full Arabic and English interface'],
  },
  {
    id: 'stockmate', title: 'StockMate', repo: 'stockmate', cat: 'python', bilingual: true,
    live: 'https://stockmate-smart.surge.sh', liveLabel: 'Live preview',
    kind: 'Inventory & stocktaking system', stack: ['Python', 'Flask', 'SQLAlchemy', 'Bootstrap 5', 'Chart.js', 'pytest'],
    blurb: 'A bilingual inventory system for shop owners: a transactional stock ledger, a 7-step stocktaking reconciliation engine, and Excel/PDF reports.',
    features: ['Live KPI dashboard with 14-day stock charts', 'Stock in / out with row locking and an immutable movement ledger', '7-step physical stocktaking with shortage / excess variance', '6 reports exported to Excel (.xlsx) and Arabic/English PDF', 'Owner setup wizard, settings and JSON backup / restore', 'Automated pytest suite covering 16 scenarios'],
  },
  {
    id: 'eduguide', title: 'EduGuide', repo: 'eduguide', cat: 'python', bilingual: true,
    live: '',
    kind: 'Graduation project · AI university platform', stack: ['Python', 'Flask', 'MySQL', 'REST APIs', 'Groq Llama 3.3', 'Gemini', 'Paymob'],
    blurb: 'My graduation project at the Egyptian E-Learning University: an AI-powered academic-support and career-guidance platform with student records, schedules, registration, CV analysis, mock interviews and the Basel AI chatbot.',
    features: ['Basel AI chatbot with personalised context injection (Groq Llama 3.3 + Gemini)', 'CV analysis, CV optimizer and AI mock interviews', 'Student records, schedules and course registration', 'QR lecture check-in, GPA calculation and verified transcripts', 'Paymob card and Fawry payments with receipts', 'Secure authentication and role-based access for students, instructors and admins'],
  },
  {
    id: 'synthera', title: 'SYNTH ERA', repo: 'synth-era-store', cat: 'react', bilingual: false,
    live: 'https://synth-era-armor.surge.sh',
    kind: 'Techwear store with AI try-on', stack: ['React 18', 'TypeScript', 'Vite', 'Gradio', 'Decart AI'],
    blurb: 'A techwear brand store where shoppers try garments on with AI — upload a photo or go live — backed by three fallback try-on models.',
    features: ['AI virtual try-on from a photo (Leffa, with IDM-VTON and Nymbo fallbacks)', 'Real-time video try-on through the Decart SDK', '“Smart X-Ray” view that reveals garment tech details', 'Hoodies, jackets, pants and tees with a lookbook', 'Pre-order flow and cart', 'Typed React components with TypeScript'],
  },
  {
    id: 'arkadia', title: 'Arkadia Travel', repo: 'arkadia-travel', cat: 'vanilla', bilingual: false,
    live: 'https://arkadia-travel-2026.surge.sh',
    kind: 'Travel agency website', stack: ['HTML', 'CSS', 'JavaScript'],
    blurb: 'A boutique luxury travel site with a destination explorer, package filters and a multi-step booking flow that prices the trip as you go.',
    features: ['Destination explorer with detail modals and wishlist', 'Package listing with filters', 'Booking flow with live totals and promo codes', '“My Trips” drawer and booking receipts', 'FAQ, contact form and legal modals', 'Five pages built without a framework'],
  },
  {
    id: 'aura', title: 'AURA Chronos', repo: 'aura-chronos', cat: 'vanilla', bilingual: false,
    live: 'https://watchesaura.surge.sh',
    kind: 'Luxury watch boutique', stack: ['HTML', 'CSS', 'JavaScript'],
    blurb: 'A haute-horlogerie store with collections, product pages, cart and wishlist, currency switching and a full checkout — plus boutiques and a magazine.',
    features: ['Collections and product detail pages', 'Cart, wishlist and currency switcher (EGP)', 'Checkout flow', 'Private viewing booking and services', 'Global boutiques and magazine pages', 'Eight pages, no framework'],
  },
  {
    id: 'pawplace', title: 'The Paw Place', repo: 'paw-place', cat: 'vanilla', bilingual: true,
    live: 'https://pawplace.surge.sh',
    kind: 'Pet adoption & care center', stack: ['HTML', 'CSS', 'JavaScript'],
    blurb: 'A pet rescue center in Alexandria: browse and adopt vaccinated cats and dogs, shop vet-approved supplies, book grooming or clinic care, and donate.',
    features: ['Adoptable pets with detail pages and an adoption form', 'Supplies shop with cart and checkout', 'Grooming and vet services booking', 'Donations page and sign-in', 'Arabic / English switch', 'Intro video and twelve pages'],
  },
];

const CATS = { all: 'All', react: 'React', python: 'Python · Flask', vanilla: 'HTML · CSS · JS' };

const JOURNEY = [
  { when: '2026 — now', role: 'Founder & web developer', org: 'The Social Club', note: 'Digital growth agency', url: 'https://thesocialclubgrowth.com',
    points: ['Founded an agency for web development, marketing and lead generation, and built its website', 'Designed, built and deployed 5+ responsive sites for real estate, specialty coffee, travel, luxury watches and pet care', 'On-page SEO — meta tags, Open Graph, social previews — and layouts tuned for mobile, tablet and desktop', 'Code in Git and GitHub; production deploys to Surge and custom domains'] },
  { when: '2026', role: 'Full-stack developer', org: 'EduGuide', note: 'Graduation project', url: '',
    points: ['Architecture across an HTML/CSS/JS front end, Flask back end, MySQL and an AI layer', 'Integrated Groq Llama 3.3, Gemini and the Paymob payment gateway through REST APIs', 'Built authentication, role-based access control and GPA calculation'] },
  { when: 'Apr — Aug 2025', role: 'Real estate sales representative', org: 'Al Tameyoz Real Estate', note: '', url: '', points: [] },
  { when: 'Dec 2024 — Feb 2025', role: 'HR specialist', org: 'Concentrix', note: '', url: '', points: [] },
  { when: 'Jul — Dec 2024', role: 'Recruitment team leader', org: 'Black Hand', note: '', url: '', points: [] },
];

const EDUCATION = {
  degree: 'Bachelor of Business Informatics Systems', school: 'The Egyptian E-Learning University', year: '2026',
  coursework: ['Information Security', 'Enterprise Systems', 'E-Commerce', 'Decision Support Systems'],
};

const CERTS = [
  { id: 'bapm', title: 'Business Analysis & Process Management', issuer: 'Coursera Project Network', date: 'Dec 2024', img: 'assets/certs/bapm.webp', verify: 'https://coursera.org/verify/9QKDMZVJ85UT' },
  { id: 'hsbc', title: 'Global Banking & Markets Job Simulation', issuer: 'HSBC · Forage', date: 'Dec 2024', img: 'assets/certs/hsbc.webp', verify: '',
    note: 'M&A targets, debt market updates, debt financing, trading opportunities and trade-process improvement' },
  { id: 'excel', title: 'Introduction to Microsoft Excel', issuer: 'Coursera Project Network', date: 'Dec 2024', img: 'assets/certs/excel.webp', verify: 'https://coursera.org/verify/INWVVM3MN5DA' },
  { id: 'ilc', title: '4th International Logistics Camp', issuer: 'Arab Academy for Science, Technology & Maritime Transport', date: 'Sep 2024', img: 'assets/certs/ilc.webp', verify: '',
    note: 'Certificate of appreciation — College of International Transport and Logistics, Alamein' },
  { id: 'bcs', title: 'Diploma in Business Communication Skills', issuer: 'Alison · CPD certified', date: 'Jan 2024', img: '', verify: '' },
];

const SKILLS = [
  ['Front end', ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Bootstrap', 'Vite', 'Responsive & RTL']],
  ['Back end', ['Node.js', 'Python', 'Flask', 'RESTful APIs', 'SQLAlchemy', 'Java', 'pytest']],
  ['Data', ['MySQL', 'SQL', 'PostgreSQL', 'SQLite', 'Firebase', 'Firestore']],
  ['AI & payments', ['Groq Llama 3.3', 'Gemini', 'Gradio', 'Decart AI', 'Paymob & Fawry', 'Chart.js']],
  ['Shipping', ['Git & GitHub', 'Surge & custom domains', 'Docker', 'SEO & Open Graph', 'Auth & RBAC', 'Debugging']],
  ['People', ['Communication', 'Problem-solving', 'Team leadership', 'Remote work', 'Time management']],
  ['Languages', ['Arabic — native', 'English — very good']],
];
