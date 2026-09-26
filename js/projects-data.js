/**
 * PROJECTS DATA REPOSITORY
 * Uddyalok Biswas Portfolio
 * Complete data store for filterable project cards and modal deep dives
 */

const PROJECTS_DATA = [
  {
    id: 'customer-feedback-analytics',
    title: 'Customer Feedback Behaviour Analytics',
    category: 'data',
    status: 'Completed',
    statusClass: 'cyber-badge-emerald',
    image: 'assets/images/customer-analytics.jpg',
    summary: 'A comprehensive SQL & Python data analytics project focused on analyzing customer feedback datasets to discover behavioral trends, cohort retention, and actionable sentiment drivers.',
    tags: ['SQL', 'Data Analytics', 'Customer Behaviour', 'Data Interpretation', 'Cohort Analysis'],
    modal: {
      headline: 'Customer Feedback Behaviour & Retention Analysis',
      overview: 'This project investigates large-scale customer feedback records across multiple touchpoints. Using optimized SQL querying pipelines and Python analytical workflows, the system extracts critical behavioral patterns, churn risk indicators, and cohort sentiment metrics to inform product optimization.',
      highlights: [
        'Advanced SQL queries aggregating over 24,000 feedback entries across multiple cohorts.',
        'Customer sentiment radar mapping distribution between positive satisfaction and friction points.',
        'Cohort retention heatmaps identifying the primary 30-day drop-off milestones.',
        'Data interpretation models providing actionable recommendations to enhance retention by up to 18%.'
      ],
      stack: ['PostgreSQL', 'SQL Optimization', 'Python', 'Pandas', 'Matplotlib', 'Tableau / Dashboards'],
      github: 'https://github.com/uddyalokbiswas',
      demo: '#'
    }
  },
  {
    id: 'fin-ai-app',
    title: 'Fin AI App — Intelligent Financial Assistant',
    category: 'ai',
    status: 'In Development 🚀',
    statusClass: 'cyber-badge-purple',
    image: 'assets/images/fin-ai.jpg',
    summary: 'An AI-powered financial intelligence application designed to forecast portfolio growth, parse real-time market movements, and deliver personalized advisory insights.',
    tags: ['AI', 'Finance', 'Data Analysis', 'Application Development', 'Backend Development'],
    modal: {
      headline: 'Fin AI — Next-Gen AI Financial Advisor & Analytics',
      overview: 'Fin AI is an ongoing application engineering project aimed at bridging deep learning forecasting with intuitive user interfaces. It combines backend machine learning microservices with a responsive dashboard to simulate market forecasts and analyze portfolio risk parameters in real-time.',
      highlights: [
        'Neural forecasting engine simulating 6-month portfolio trajectory with multi-variable risk scoring.',
        'Conversational AI financial assistant providing instant contextual query answers.',
        'Real-time streaming market analytics for crypto, equities, and ETF metrics.',
        'Built with robust backend API architecture prioritizing data privacy and rapid response latency.'
      ],
      stack: ['Python', 'FastAPI / Node.js', 'React', 'PyTorch / Scikit-Learn', 'Tailored Data Pipelines'],
      github: 'https://github.com/uddyalokbiswas',
      demo: '#'
    }
  },
  {
    id: 'ecopulse-hackathon',
    title: 'EcoPulse — Smart Sustainability Platform',
    category: 'hackathons',
    status: 'Hackathon Project',
    statusClass: 'cyber-badge',
    image: 'assets/images/ecopulse-hackathon.jpg',
    summary: 'A fast-paced hackathon project delivering real-time carbon footprint telemetry, green energy analytics, and global heatmaps built under strict sprint constraints.',
    tags: ['Hackathons', 'React', 'IoT Telemetry', 'Data Visualization', 'UI/UX'],
    modal: {
      headline: 'EcoPulse Hackathon Prototype — Global Green Intelligence',
      overview: 'Developed during a high-intensity online hackathon sprint, EcoPulse enables organizations and cities to visualize emission vectors across transportation, industrial, and residential sectors with intuitive 3D spatial representations.',
      highlights: [
        'Rapid prototype designed, coded, and demonstrated within a 36-hour hackathon timeframe.',
        'Interactive global 3D geospatial heatmap highlighting renewable energy penetration.',
        'Real-time carbon telemetry charts with dynamic projection modeling.',
        'Demonstrates ability to collaborate rapidly and ship working MVPs under intense deadlines.'
      ],
      stack: ['React', 'Three.js / WebGL', 'Node.js', 'Chart.js', 'Figma'],
      github: 'https://github.com/uddyalokbiswas',
      demo: '#'
    }
  },
  {
    id: 'nexus-design-system',
    title: 'Nexus — Dark Futuristic UI/UX Design System',
    category: 'ui/ux',
    status: 'Design System',
    statusClass: 'cyber-badge',
    image: 'assets/images/nexus-uiux.jpg',
    summary: 'A modular, high-contrast dark futuristic design system and component architecture inspired by modern developer tooling, cyber aesthetics, and clean human interface guidelines.',
    tags: ['UI/UX Design', 'Web Design', 'Design Tokens', 'Figma', 'Frontend Dev'],
    modal: {
      headline: 'Nexus Design System — Precision UI/UX Architecture',
      overview: 'Nexus is a comprehensive digital design system crafted to accelerate the creation of futuristic developer tools and SaaS platforms. It includes strict token hierarchies, fluid typography rules, accessible dark contrast ratios, and glassmorphic surface components.',
      highlights: [
        'Over 120+ reusable component variants (buttons, switches, data sliders, modal dialogs, telemetry pills).',
        'Cohesive color token architecture utilizing obsidian backgrounds and neon accents.',
        'Tested for WCAG AAA contrast compliance in dark interfaces.',
        'Complete Figma library and matching Vanilla CSS / React component implementations.'
      ],
      stack: ['Figma', 'UI/UX Research', 'Design Tokens', 'CSS3 Variables', 'Component Architecture'],
      github: 'https://github.com/uddyalokbiswas',
      demo: '#'
    }
  }
];
