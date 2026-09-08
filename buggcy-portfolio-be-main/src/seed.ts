import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { SiteService } from './site-services/entities/service.entity';
import { Service } from './services/entities/service.entity';
import { SiteIndustry } from './site-industries/entities/industry.entity';
import { SiteSuccessStory } from './site-success-stories/entities/success-story.entity';
import { Career, JobType, JobStatus } from './careers/entities/career.entity';
import { ContactSubmission } from './contact/entities/contact-submission.entity';
import { Role } from './common/enums/role.enum';
import * as bcrypt from 'bcryptjs';

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'NOT FOUND');

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,    // Neon connection string
  ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false }, // Match app.module.ts; Neon/hosted Postgres
  entities: [User, SiteService, Service, SiteIndustry, SiteSuccessStory, Career, ContactSubmission],
  synchronize: true,
});

const servicesData = [
  {
    title: 'Web Development',
    slug: 'web-development',
    icon: 'Code2',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    description: 'Making Sure Your Business Reaches New Heights',
    features: ['Frontend Development', 'Backend Development', 'Full Stack Solutions', 'API Development & Integration', 'E-commerce Platforms', 'Progressive Web Apps'],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    detailedContent: 'From frontend to backend to even full-stack development, we fast-track your project delivery to create an experience beyond your expectations. Our web development services comprise of tech leaders and developers who have significant experience in this niche. buggcy is a complete web development company and we warrant to generating most striking results.',
    process: [
      { step: '01', title: 'Discovery & Planning', description: 'We analyze your business goals, user personas, and technical requirements. Deliverables include a project roadmap, tech stack recommendation, and sprint plan.' },
      { step: '02', title: 'UI/UX Design', description: 'Our designers create wireframes, high-fidelity mockups, and interactive prototypes. We validate designs with real users before development begins.' },
      { step: '03', title: 'Development', description: 'Agile sprints with working demos every 2 weeks. Frontend and backend built in parallel with automated testing at every stage.' },
      { step: '04', title: 'Launch & Support', description: 'CI/CD setup, cloud deployment, performance monitoring, and 3 months of post-launch support included with every project.' },
    ],
    stats: [
      { label: 'Projects Delivered', value: '50+' },
      { label: 'Client Satisfaction', value: '98%' },
      { label: 'Avg Load Time', value: '<2s' },
      { label: 'Uptime SLA', value: '99.9%' },
    ],
    whyChooseUs: [
      { title: 'Full-Stack Expertise', description: 'One team handles frontend, backend, database, and DevOps — no coordination overhead between vendors.' },
      { title: 'Modern Tech Stack', description: 'We use React, Next.js, Node.js, and cloud-native architectures that are built to scale.' },
      { title: 'Agile Process', description: '2-week sprints with working demos, so you see progress constantly and can pivot quickly.' },
      { title: 'Post-Launch Support', description: "3 months of free maintenance and bug fixes after launch. We don't disappear after deployment." },
    ],
    faqs: [
      { question: 'How long does a typical web project take?', answer: 'A landing page takes 2-4 weeks. A full SaaS platform takes 3-6 months depending on complexity. We provide a detailed timeline after discovery.' },
      { question: 'Do you work with startups or only enterprises?', answer: "Both. We've built MVPs for seed-stage startups and enterprise platforms for Fortune 500 companies. Our process adapts to your scale." },
      { question: 'What if I need changes after launch?', answer: 'We include 3 months of free post-launch support. After that, we offer monthly maintenance plans starting at $1,500/month.' },
    ],
    useCases: ['SaaS dashboards and admin panels', 'E-commerce storefronts with payment integration', 'Customer portals and self-service platforms', 'Marketing websites with CMS', 'Real-time collaboration tools', 'Internal tools and workflow apps'],
  },
  {
    title: 'Mobile Application',
    slug: 'mobile-development',
    icon: 'Smartphone',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    description: 'New Possibilities for Mobile Applications',
    features: ['iOS Applications', 'Android Applications', 'Cross-Platform Apps', 'App Store Deployment', 'Push Notifications', 'Offline Support'],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
    detailedContent: 'Our latest QA testing methods and out-of-box designs ensure that your mobile application is more like a sweet experience than just a project. Our experience in the field of iOS mobile application development enables us to create a ground-breaking app for your business needs.',
    process: [
      { step: '01', title: 'Strategy & Research', description: 'Platform selection (iOS/Android/cross), competitor analysis, and feature prioritization based on your target audience.' },
      { step: '02', title: 'Design', description: 'Mobile-first UI/UX with platform-specific patterns. Interactive prototypes tested with real users on actual devices.' },
      { step: '03', title: 'Build & Test', description: 'Iterative development with device lab testing, beta releases via TestFlight/Play Console, and performance profiling.' },
      { step: '04', title: 'Launch & Grow', description: 'App Store submission, ASO optimization, analytics setup, and ongoing feature updates based on user feedback.' },
    ],
    stats: [
      { label: 'Apps Published', value: '30+' },
      { label: 'App Store Rating', value: '4.8' },
      { label: 'Downloads Managed', value: '1M+' },
      { label: 'Crash Rate', value: '<0.5%' },
    ],
    whyChooseUs: [
      { title: 'Cross-Platform Efficiency', description: 'One codebase for iOS and Android saves 40% development time without compromising native performance.' },
      { title: 'App Store Expertise', description: "We've published 30+ apps and know exactly what Apple and Google require for approval." },
      { title: 'Performance First', description: '60fps animations, <100ms touch response, and optimized memory usage are our baseline standards.' },
      { title: 'End-to-End Service', description: 'From App Store graphics to push notification setup, we handle every detail of your mobile presence.' },
    ],
    faqs: [
      { question: 'Native or cross-platform?', answer: 'For most projects, React Native or Flutter gives 95% native performance at half the cost. We recommend native only for performance-critical apps like gaming.' },
      { question: 'How do you handle app store rejection?', answer: "We've published 30+ apps with a 98% first-submission approval rate. If rejection occurs, we fix the issue and resubmit at no extra cost." },
      { question: 'Do you maintain the app after launch?', answer: 'Yes. We offer monthly maintenance plans that include OS updates, bug fixes, and feature enhancements.' },
    ],
    useCases: ['Consumer-facing mobile apps', 'On-demand service platforms (food, ride, delivery)', 'Social networking and community apps', 'Enterprise mobile solutions for field teams', 'Health and fitness tracking apps', 'Mobile commerce and payment apps'],
  },
  {
    title: 'Frontend Development',
    slug: 'frontend',
    icon: 'Globe',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    description: 'Pixel-perfect, performant user interfaces built with React, Next.js, and modern frontend frameworks. We make your design come alive.',
    features: ['React & Next.js Apps', 'Component Libraries', 'Responsive Design', 'Animation & Interactions', 'Performance Optimization', 'Accessibility (WCAG)'],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Storybook'],
    detailedContent: 'Our frontend team specializes in building blazing-fast, accessible, and visually stunning user interfaces. We create reusable component libraries, implement complex animations, and optimize for Core Web Vitals. Every pixel matters to us — we match your designs with 100% accuracy.',
    process: [
      { step: '01', title: 'Design Analysis', description: 'We study your Figma/Sketch files, identify reusable patterns, and plan component architecture before writing code.' },
      { step: '02', title: 'Component Build', description: 'Building a design system with atomic components, proper state management, and TypeScript interfaces.' },
      { step: '03', title: 'Integration', description: 'Connecting to APIs, implementing auth flows, handling real-time data, and adding error boundaries.' },
      { step: '04', title: 'Polish & Optimize', description: 'Lighthouse optimization to 95+, accessibility audits, cross-browser testing, and animation refinement.' },
    ],
    stats: [
      { label: 'Lighthouse Score', value: '95+' },
      { label: 'First Paint', value: '<1s' },
      { label: 'Components Built', value: '500+' },
      { label: 'Accessibility', value: 'WCAG AA' },
    ],
    whyChooseUs: [
      { title: 'Pixel-Perfect Delivery', description: 'We match your designs with 100% accuracy. Every spacing, color, and typography detail is precise.' },
      { title: 'Performance Obsessed', description: 'We optimize bundle sizes, implement lazy loading, and achieve sub-second load times consistently.' },
      { title: 'Reusable Architecture', description: 'Component libraries that your team can extend and maintain long after our engagement ends.' },
      { title: 'Accessibility First', description: 'WCAG 2.1 AA compliance built in from day one, not an afterthought.' },
    ],
    faqs: [
      { question: 'React or Next.js?', answer: 'Next.js for most projects — it gives you SSR, SSG, and API routes out of the box. We use plain React only for embedded widgets.' },
      { question: 'Can you work with our existing backend?', answer: 'Absolutely. We integrate with any REST or GraphQL API. We just need the API docs or a Postman collection.' },
      { question: 'Do you provide design services?', answer: 'We have an in-house design team. We can work from your existing designs or create new ones from scratch.' },
    ],
    useCases: ['Design system and component library creation', 'Marketing website redesigns', 'SaaS dashboard and admin panel development', 'Progressive Web Apps (PWA)', 'Animation-rich landing pages', 'Legacy frontend modernization (jQuery to React)'],
  },
  {
    title: 'Backend Development',
    slug: 'backend',
    icon: 'Server',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    description: 'Scalable APIs, microservices, and server-side architecture that powers your product behind the scenes. Built for millions of requests.',
    features: ['REST API Development', 'GraphQL APIs', 'Microservices Architecture', 'Database Design', 'Authentication & Authorization', 'Message Queues & Events'],
    technologies: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB', 'Redis'],
    detailedContent: 'Our backend engineers build robust, scalable server-side systems that handle millions of requests. From RESTful APIs to event-driven microservices, we architect solutions that are secure, performant, and easy to maintain. We follow 12-factor app principles and design for horizontal scaling.',
    process: [
      { step: '01', title: 'Architecture Design', description: 'Choosing between monolith, microservices, or serverless based on your scale requirements and team size.' },
      { step: '02', title: 'API Contract', description: 'Defining OpenAPI specs, data models, auth strategies, and rate limiting policies before writing implementation code.' },
      { step: '03', title: 'Implementation', description: 'Building endpoints, database schemas, caching layers, background jobs, and real-time subscriptions.' },
      { step: '04', title: 'Production Ready', description: 'Load testing, security hardening, monitoring setup, and documentation for your engineering team.' },
    ],
    stats: [
      { label: 'APIs Built', value: '100+' },
      { label: 'Avg Response', value: '<50ms' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'DB Queries Optimized', value: '1000+' },
    ],
    whyChooseUs: [
      { title: 'Scale-Ready Architecture', description: 'We design systems that handle 10x your current traffic without rewrites. Horizontal scaling is built in.' },
      { title: 'Security by Default', description: 'OWASP top 10 protection, input validation, rate limiting, and encryption at rest and in transit.' },
      { title: 'API-First Approach', description: 'Well-documented APIs with versioning, so your frontend, mobile, and third-party integrations stay in sync.' },
      { title: 'Observability Built In', description: 'Structured logging, distributed tracing, and health checks from day one — not an afterthought.' },
    ],
    faqs: [
      { question: 'SQL or NoSQL?', answer: 'Depends on your data. PostgreSQL for relational data with complex queries. MongoDB for document-based flexible schemas. We often use both in the same system.' },
      { question: 'How do you handle authentication?', answer: 'JWT with refresh tokens for most apps. OAuth2/SSO for enterprise. We implement role-based access control (RBAC) with fine-grained permissions.' },
      { question: 'Can you optimize our existing database?', answer: 'Yes. We audit query performance, add proper indexing, implement caching with Redis, and can migrate to more efficient schemas.' },
    ],
    useCases: ['RESTful and GraphQL API development', 'Real-time systems (chat, notifications, live feeds)', 'Payment processing and billing systems', 'Content management systems', 'Data processing pipelines', 'Third-party API integrations'],
  },
  {
    title: 'Full-Stack Development',
    slug: 'fullstack',
    icon: 'Layers',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
    description: 'End-to-end product delivery — from database to pixel — with a single, synchronized team. Faster shipping, fewer miscommunications.',
    features: ['End-to-End Product Development', 'SaaS Platforms', 'Marketplace Solutions', 'Real-time Applications', 'DevOps Integration', 'Continuous Delivery'],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    detailedContent: 'Our full-stack teams own the entire product — from database schema to UI components. This eliminates handoff delays, reduces miscommunication, and accelerates delivery. We build SaaS platforms, marketplaces, and complex web apps with a single, cohesive team that ships features end-to-end.',
    process: [
      { step: '01', title: 'Product Sprint', description: '2-week sprints with working demos, stakeholder feedback, and continuous backlog refinement. You see working software every two weeks.' },
      { step: '02', title: 'Vertical Slices', description: 'Building features top-to-end (UI, API, DB) in each sprint for immediate testability and demo readiness.' },
      { step: '03', title: 'Quality Gates', description: 'Automated testing, code reviews, and CI/CD pipelines ensure every commit is production-ready.' },
      { step: '04', title: 'Ship & Iterate', description: 'Deploy to production, monitor metrics, gather user feedback, and iterate based on real data.' },
    ],
    stats: [
      { label: 'Products Launched', value: '40+' },
      { label: 'Avg Time to MVP', value: '8 weeks' },
      { label: 'Sprint Velocity', value: '95%' },
      { label: 'Client Retention', value: '92%' },
    ],
    whyChooseUs: [
      { title: 'Single Team Efficiency', description: 'No frontend/backend coordination overhead. One team, one vision, one delivery timeline.' },
      { title: 'MVP in 8 Weeks', description: "We've launched 40+ products. Our battle-tested process gets your MVP to market in 8 weeks." },
      { title: 'Full Ownership', description: 'We own the code, the infrastructure, and the deployment pipeline. One throat to choke.' },
      { title: 'Startup-Friendly', description: 'Flexible engagement models — fixed price for MVPs, dedicated teams for scaling products.' },
    ],
    faqs: [
      { question: "What's your typical team composition?", answer: '2-3 full-stack developers, 1 designer, 1 QA engineer, and a project manager. We scale up or down based on your needs.' },
      { question: 'Do you use a specific methodology?', answer: 'Scrum with 2-week sprints. Daily standups, sprint planning, retrospectives, and demo sessions. We use Linear for project management.' },
      { question: 'How do you handle technical debt?', answer: 'We allocate 20% of each sprint to tech debt and refactoring. This keeps code quality high without slowing feature delivery.' },
    ],
    useCases: ['SaaS product development from scratch', 'Marketplace platforms (B2B/B2C)', 'Internal tool development', 'Legacy system modernization', 'MVP development for startups', 'Product team augmentation'],
  },
  {
    title: 'Branding & UI/UX Designing',
    slug: 'ui-ux-design',
    icon: 'Palette',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    description: 'Designing, Building & Launching Great Digital Products',
    features: ['User Research & Testing', 'Wireframing & Prototyping', 'UI Design Systems', 'Interaction Design', 'Usability Audits', 'Design Handoff'],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Maze', 'Hotjar'],
    detailedContent: 'Save time and money by allowing us to build unique interactive features. We work together to understand clients and what business goals they have. When designing products, we ensure a high-quality prototype.',
    process: [
      { step: '01', title: 'User Research', description: 'Interviews, surveys, competitor analysis, and persona development. We talk to your actual users before designing.' },
      { step: '02', title: 'Information Architecture', description: 'User flows, sitemaps, and content strategy that make navigation intuitive and reduce cognitive load.' },
      { step: '03', title: 'Visual Design', description: 'High-fidelity mockups, design tokens, and component libraries. We present 2-3 directions before narrowing down.' },
      { step: '04', title: 'Validate & Handoff', description: 'Usability testing with real users, design QA during development, and pixel-perfect Figma handoff.' },
    ],
    stats: [
      { label: 'Designs Delivered', value: '200+' },
      { label: 'User Satisfaction', value: '4.9/5' },
      { label: 'Conversion Lift', value: '+35%' },
      { label: 'Design Systems', value: '50+' },
    ],
    whyChooseUs: [
      { title: 'Research-Backed Decisions', description: 'Every design choice is validated with real user data, not personal preferences or trends.' },
      { title: 'Design Systems That Scale', description: 'We create component libraries and design tokens that your team can extend for years.' },
      { title: 'Conversion Focused', description: 'Our designs have helped clients increase conversion rates by an average of 35%.' },
      { title: 'Seamless Handoff', description: 'Organized Figma files with auto-layout, variants, and documentation that developers love.' },
    ],
    faqs: [
      { question: 'How long does a design project take?', answer: 'A landing page: 1-2 weeks. A full SaaS product: 4-6 weeks. Enterprise design system: 6-10 weeks.' },
      { question: 'Do you do branding too?', answer: 'Yes. Logo design, brand guidelines, typography, color systems, and complete brand identity packages.' },
      { question: 'How many revision rounds?', answer: "We include 3 revision rounds per phase. Most projects don't need more because we validate with users early." },
    ],
    useCases: ['Complete product UI/UX redesign', 'Design system creation and maintenance', 'Mobile app UX design', 'Landing page and marketing site design', 'Brand identity and visual language', 'UX audit and conversion optimization'],
  },
  {
    title: 'Software Quality Assurance (QA)',
    slug: 'qa-testing',
    icon: 'TestTube2',
    imageUrl: 'https://images.unsplash.com/photo-1576444356170-66073fe06c44?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1576444356170-66073fe06c44?w=600&q=80',
    description: 'Ensuring That Your Product Code Is Flawless',
    features: ['Test Strategy & Planning', 'Automated Testing (E2E, Unit, Integration)', 'Performance Testing', 'Security Testing', 'API Testing', 'Regression Testing'],
    technologies: ['Playwright', 'Jest', 'Cypress', 'Postman', 'k6', 'OWASP ZAP'],
    detailedContent: 'Agile development environment ensures that automated and manual testing. buggcy not only likes to showcase its brilliant set of programming solutions.',
    process: [
      { step: '01', title: 'Test Strategy', description: 'Defining test coverage goals, test pyramid, automation priorities, and quality metrics aligned with business requirements.' },
      { step: '02', title: 'Automation Setup', description: 'Building E2E, integration, and unit test frameworks. CI/CD integration so tests run on every commit.' },
      { step: '03', title: 'Execution', description: 'Manual exploratory testing, performance benchmarking, security scanning, and cross-device compatibility checks.' },
      { step: '04', title: 'Report & Improve', description: 'Detailed bug reports, severity classification, root cause analysis, and quality trend dashboards.' },
    ],
    stats: [
      { label: 'Bugs Caught', value: '5000+' },
      { label: 'Test Coverage', value: '90%+' },
      { label: 'Automated Tests', value: '10K+' },
      { label: 'Avg Fix Time', value: '<4h' },
    ],
    whyChooseUs: [
      { title: 'Shift-Left Testing', description: 'We test early in the development cycle, catching 80% of bugs before they reach production.' },
      { title: 'Automation at Scale', description: '10,000+ automated tests running in CI/CD pipelines, catching regressions in minutes.' },
      { title: 'Security First', description: 'OWASP top 10 scanning, penetration testing, and vulnerability assessments included.' },
      { title: 'Real Device Testing', description: 'We test on real devices, not just emulators. iOS, Android, Chrome, Safari, Firefox — all covered.' },
    ],
    faqs: [
      { question: 'Manual or automated testing?', answer: 'Both. Automated for regression and smoke tests (run every commit). Manual for exploratory, usability, and edge case testing.' },
      { question: "What's your test coverage target?", answer: '90%+ unit test coverage, 80%+ integration coverage, and critical user journeys covered by E2E tests.' },
      { question: 'Can you test our existing product?', answer: 'Yes. We start with a QA audit, identify gaps, build a test plan, and then execute. Most clients see 60% fewer production bugs.' },
    ],
    useCases: ['Pre-launch QA for new products', 'Regression test suite creation', 'Performance and load testing', 'Security vulnerability assessments', 'Mobile device compatibility testing', 'QA process consulting and setup'],
  },
  {
    title: 'Product Support Services',
    slug: 'product-support',
    icon: 'HeadphonesIcon',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    description: 'Endless Support Even After We Have Delivered',
    features: ['Software Quality Assurance', 'Thorough Maintenance', 'Support Service Up To 3rd Degree', 'Analytics & Reporting', 'Bug Fixes & Patches', 'Performance Monitoring'],
    technologies: ['Jira', 'Sentry', 'Datadog', 'New Relic', 'Grafana', 'Prometheus'],
    detailedContent: 'Work does not end when we deliver what you want. Our team handles your product as if they are our own. With buggcy, get a complete analysis of software.',
    process: [
      { step: '01', title: 'Understand', description: 'Stakeholder interviews, market research, user journeys, and problem framing to define the design challenge clearly.' },
      { step: '02', title: 'Diverge', description: 'Brainstorming, sketching, crazy-8s, and exploring multiple solution directions rapidly.' },
      { step: '03', title: 'Prototype & Test', description: 'Clickable prototypes tested with 5-8 real users per round. We iterate until usability scores hit 80+.' },
      { step: '04', title: 'Deliver', description: 'Polished designs with specs, redlines, and Figma handoff. We stay through development for design QA.' },
    ],
    stats: [
      { label: 'Products Designed', value: '60+' },
      { label: 'Design Sprints', value: '100+' },
      { label: 'User Tests Run', value: '300+' },
      { label: 'Ideas Validated', value: '95%' },
    ],
    whyChooseUs: [
      { title: 'Speed to Insight', description: '5-day design sprints that go from problem to tested prototype in one week.' },
      { title: 'User-Centric Process', description: 'We test with real users every week. No guessing — every decision is validated.' },
      { title: 'Business Thinking', description: "We don't just design screens. We design business models, monetization, and go-to-market strategies." },
      { title: 'Developer Handoff', description: 'Clean Figma files with auto-layout, variants, and interaction specs that developers can implement directly.' },
    ],
    faqs: [
      { question: "What's a design sprint?", answer: 'A 5-day process: Monday (map), Tuesday (sketch), Wednesday (decide), Thursday (prototype), Friday (test). We validate ideas before building them.' },
      { question: 'Do you work with our engineers?', answer: 'Yes. We stay through development for design QA, answering questions, and making sure pixels match.' },
      { question: "What if we don't have a clear problem?", answer: "That's where we start. Our discovery phase helps you define the right problem before we design solutions." },
    ],
    useCases: ['New product concept development', 'Design sprint facilitation', 'Existing product UX improvement', 'Feature ideation and validation', 'Competitive product analysis', 'Design-to-development handoff'],
  },
  {
    title: 'Enterprise Software Development',
    slug: 'enterprise-software',
    icon: 'Building2',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    description: 'Providing a Firm Software Foundation for Businesses',
    features: ['ERP Systems', 'CRM Solutions', 'Custom Enterprise Apps', 'System Integration', 'Legacy Modernization', 'Workflow Automation'],
    technologies: ['Java', '.NET', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    detailedContent: 'At buggcy, our expertise in the wide spectrum of the technology enables us to skilfully provide services. A well-structured enterprise software development company has a systematic process.',
    process: [
      { step: '01', title: 'Problem Framing', description: 'Defining the ML problem, success metrics, data requirements, and feasibility assessment with stakeholders.' },
      { step: '02', title: 'Data & Model', description: 'Data collection, cleaning, feature engineering, model selection, training, and validation with proper train/test splits.' },
      { step: '03', title: 'Integration', description: 'Building inference APIs, embedding models into products, and setting up real-time prediction pipelines.' },
      { step: '04', title: 'Monitor & Improve', description: 'Model performance monitoring, drift detection, A/B testing, and continuous retraining with new data.' },
    ],
    stats: [
      { label: 'Models Deployed', value: '25+' },
      { label: 'Accuracy Rate', value: '95%+' },
      { label: 'Data Processed', value: '10TB+' },
      { label: 'Cost Savings', value: '40%' },
    ],
    whyChooseUs: [
      { title: 'Production-First AI', description: "We don't just build models in Jupyter notebooks. We deploy them to production with monitoring and alerting." },
      { title: 'Custom > Generic', description: 'Off-the-shelf AI gets you 70%. We build custom models that get you to 95%+ accuracy for your specific use case.' },
      { title: 'Data Pipeline Expertise', description: 'Clean data is half the battle. We build robust ETL pipelines that prepare data for ML automatically.' },
      { title: 'ROI Focused', description: 'Every AI project starts with a business case. We measure impact in dollars saved or revenue gained.' },
    ],
    faqs: [
      { question: 'Do we need a lot of data?', answer: 'Not always. Transfer learning and fine-tuning pre-trained models can work with 100-1000 labeled examples. We assess your data during discovery.' },
      { question: 'LLM or custom model?', answer: 'LLMs for language tasks with broad knowledge. Custom models for domain-specific tasks requiring high accuracy. We help you choose.' },
      { question: 'How do you handle data privacy?', answer: 'On-premise deployment, data anonymization, federated learning, and compliance with GDPR/CCPA. Your data never leaves your infrastructure.' },
    ],
    useCases: ['Intelligent document processing (OCR + NLP)', 'Recommendation engines', 'Predictive maintenance for manufacturing', 'Customer churn prediction', 'AI-powered search and chatbots', 'Fraud detection systems'],
  },
  {
    title: 'Big Data & Data Science',
    slug: 'big-data',
    icon: 'BarChart3',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    description: 'Drive Your Business Forward Using Big Data',
    features: ['Data Analytics', 'Machine Learning Models', 'Business Intelligence', 'Predictive Analytics', 'Data Pipelines', 'Visualization Dashboards'],
    technologies: ['Python', 'Apache Spark', 'Kafka', 'Tableau', 'Power BI', 'AWS Redshift'],
    detailedContent: "Multiple streams of structured and unstructured data won't get organized unless you hire professionals. All forms of structured and unstructured data are meaningless unless proper algorithms are placed.",
    process: [
      { step: '01', title: 'Data Audit', description: 'Assessing data sources, quality, volume, and availability. Identifying gaps and building a data strategy.' },
      { step: '02', title: 'Pipeline Build', description: 'ETL/ELT pipelines that clean, transform, and load data into your analytics warehouse. Real-time or batch.' },
      { step: '03', title: 'Model & Analyze', description: 'Statistical analysis, ML modeling, cohort analysis, and pattern discovery across your datasets.' },
      { step: '04', title: 'Visualize & Act', description: 'Interactive dashboards, automated reports, and alerts that surface insights to the right people at the right time.' },
    ],
    stats: [
      { label: 'Pipelines Built', value: '80+' },
      { label: 'Data Processed Daily', value: '5TB+' },
      { label: 'Dashboards Created', value: '150+' },
      { label: 'Decision Speed', value: '3x faster' },
    ],
    whyChooseUs: [
      { title: 'End-to-End Data', description: 'From raw data collection to executive dashboards. We handle the entire data lifecycle.' },
      { title: 'Real-Time Capabilities', description: 'Kafka-based streaming pipelines that process millions of events per second for real-time analytics.' },
      { title: 'Cost Optimization', description: 'We right-size your data infrastructure, reducing cloud costs by 30-50% while improving performance.' },
      { title: 'Actionable Insights', description: 'Dashboards that answer business questions, not just display charts. Every visualization has a purpose.' },
    ],
    faqs: [
      { question: 'What data tools do you work with?', answer: 'Spark, Kafka, Airflow, dbt for pipelines. PostgreSQL, Redshift, BigQuery for warehouses. Tableau, Power BI, Metabase for visualization.' },
      { question: 'Real-time or batch processing?', answer: 'Depends on your use case. Real-time for fraud detection, live dashboards. Batch for nightly reports, historical analysis. We often implement both.' },
      { question: 'Can you clean our messy data?', answer: "That's usually step one. We build data quality pipelines that deduplicate, validate, and standardize data automatically." },
    ],
    useCases: ['Customer analytics and segmentation', 'Sales forecasting and pipeline analytics', 'Operational efficiency dashboards', 'Marketing attribution and ROI tracking', 'Supply chain analytics', 'Financial reporting automation'],
  },
  {
    title: 'Cryptography & IoT',
    slug: 'cybersecurity',
    icon: 'ShieldCheck',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
    description: 'Adding Confidence to the Internet of Things & Much More',
    features: ['Encryption Solutions', 'Penetration Testing', 'IoT Device Integration', 'Smart Home Systems', 'Industrial IoT', 'Security Audits'],
    technologies: ['Node.js', 'Python', 'MQTT', 'AWS IoT', 'Raspberry Pi', 'TensorFlow'],
    detailedContent: 'We offer cryptography-based security solutions, and IOT consultancy to businesses across a wide range of sectors. buggcy works to limit the access to protected systems and data to only authorized devices and users.',
    process: [
      { step: '01', title: 'Security Assessment', description: 'Vulnerability scanning, penetration testing, code review, and threat modeling for your entire stack.' },
      { step: '02', title: 'Architecture', description: 'Designing zero-trust architectures, encryption strategies, and access control policies.' },
      { step: '03', title: 'Implement', description: 'Building secure IoT pipelines, implementing encryption at rest and in transit, setting up WAF and IDS.' },
      { step: '04', title: 'Monitor & Respond', description: '24/7 security monitoring, incident response playbooks, and regular penetration testing.' },
    ],
    stats: [
      { label: 'Vulnerabilities Found', value: '2000+' },
      { label: 'IoT Devices Managed', value: '10K+' },
      { label: 'Security Incidents', value: '0' },
      { label: 'Compliance', value: 'SOC2, HIPAA' },
    ],
    whyChooseUs: [
      { title: 'Zero Trust Architecture', description: 'We assume breach and design systems that verify every request, regardless of origin.' },
      { title: 'IoT + Security Expertise', description: 'Rare combination of hardware integration and security engineering in one team.' },
      { title: 'Compliance Ready', description: 'SOC2, HIPAA, GDPR, PCI DSS — we build compliance into your infrastructure from day one.' },
      { title: 'Incident Response', description: 'Proven incident response playbooks. When (not if) something happens, we respond in minutes.' },
    ],
    faqs: [
      { question: 'Do you do penetration testing?', answer: 'Yes. Black box, white box, and gray box pen testing. We test web apps, APIs, mobile apps, and network infrastructure.' },
      { question: 'What IoT platforms do you support?', answer: 'AWS IoT, Azure IoT Hub, Google Cloud IoT, MQTT, CoAP, and custom protocols. We work with any hardware that has an IP stack.' },
      { question: 'How do you handle compliance?', answer: 'We build compliance controls into your infrastructure. Automated auditing, access logging, encryption key rotation — all built in.' },
    ],
    useCases: ['Smart home and building automation', 'Industrial IoT (IIoT) monitoring', 'Connected healthcare devices', 'Fleet tracking and telematics', 'Security audit and remediation', 'Compliance implementation (SOC2, HIPAA)'],
  },
  {
    title: 'DevOps',
    slug: 'devops',
    icon: 'Cloud',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
    description: 'Let Our Engineers Define The Best Strategy For You!',
    features: ['CI/CD Pipelines', 'Cloud Migration', 'Infrastructure as Code', 'Container Orchestration', 'Monitoring & Alerting', 'Security Automation'],
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
    detailedContent: 'DevOps development is a set of practices that bridge and automate the work happening between the development team and the IT operations teams. Our belief in Agile methodology ensures that you get your product sooner with the best experience.',
    process: [
      { step: '01', title: 'Infrastructure Audit', description: 'Reviewing current setup, identifying bottlenecks, security gaps, and cost optimization opportunities.' },
      { step: '02', title: 'Automate', description: 'Building CI/CD pipelines, IaC templates (Terraform/Pulumi), and container orchestration with Kubernetes.' },
      { step: '03', title: 'Migrate & Deploy', description: 'Executing cloud migrations with blue-green deployments, canary releases, and zero-downtime strategies.' },
      { step: '04', title: 'Monitor & Scale', description: 'Prometheus/Grafana dashboards, auto-scaling policies, cost alerts, and incident response automation.' },
    ],
    stats: [
      { label: 'Deploy Frequency', value: '50x/day' },
      { label: 'Downtime Reduced', value: '90%' },
      { label: 'Cloud Cost Savings', value: '30%' },
      { label: 'MTTR', value: '<15min' },
    ],
    whyChooseUs: [
      { title: 'Infrastructure as Code', description: 'Every server, network, and resource is version-controlled. Reproduce your entire infrastructure from Git.' },
      { title: 'Zero-Downtime Deployments', description: 'Blue-green and canary deployments ensure your users never see a maintenance page.' },
      { title: 'Cost Optimization', description: 'We regularly save clients 30% on cloud bills through right-sizing, spot instances, and reserved capacity.' },
      { title: '24/7 Monitoring', description: 'Prometheus, Grafana, PagerDuty — we set up alerting that notifies the right person before users notice.' },
    ],
    faqs: [
      { question: 'AWS or Azure or GCP?', answer: "We're cloud-agnostic but AWS-certified. We recommend based on your needs: AWS for breadth, Azure for Microsoft shops, GCP for data/AI workloads." },
      { question: 'How long does cloud migration take?', answer: 'Depends on complexity. A simple lift-and-shift: 4-8 weeks. A full re-architecture: 3-6 months. We provide a detailed plan after audit.' },
      { question: 'Do you offer managed DevOps?', answer: 'Yes. We can manage your infrastructure ongoing with SLAs for uptime, response time, and cost optimization.' },
    ],
    useCases: ['Cloud migration (on-prem to AWS/Azure/GCP)', 'CI/CD pipeline setup and optimization', 'Kubernetes cluster management', 'Infrastructure cost optimization', 'Disaster recovery and backup strategies', 'Compliance automation (SOC2, HIPAA)'],
  },
  {
    title: 'Data Scraping',
    slug: 'data-scraping',
    icon: 'ScanLine',
    imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80',
    description: 'Accurate, scalable data extraction for market research, lead generation, and competitive intelligence.',
    features: ['Web Scraping', 'Data Extraction', 'Real-time Data Feeds', 'Competitor Monitoring', 'Lead Generation Data', 'Custom Crawlers'],
    technologies: ['Python', 'Scrapy', 'Puppeteer', 'Beautiful Soup', 'Selenium', 'PostgreSQL'],
    detailedContent: 'If you require accurate and reliable datasets with unlimited scale, select from our one-off subscription-based or enterprise services to get the best crawl engineers. buggcy provides custom tools that can scan the web and extract the exact information you need.',
    process: [
      { step: '01', title: 'Source Analysis', description: 'Analyzing target websites, page structures, anti-bot measures, and data extraction requirements.' },
      { step: '02', title: 'Crawler Build', description: 'Custom scrapers with proxy rotation, rate limiting, CAPTCHA handling, and retry logic.' },
      { step: '03', title: 'Clean & Validate', description: 'Data deduplication, normalization, format conversion, and quality validation against source data.' },
      { step: '04', title: 'Deliver & Monitor', description: 'Automated delivery via API, SFTP, or database. Monitoring for site changes with auto-adaptation.' },
    ],
    stats: [
      { label: 'Pages Scraped Daily', value: '1M+' },
      { label: 'Data Accuracy', value: '99.5%' },
      { label: 'Clients Served', value: '50+' },
      { label: 'Delivery Uptime', value: '99.9%' },
    ],
    whyChooseUs: [
      { title: 'Anti-Bot Evasion', description: 'We handle CAPTCHAs, IP rotation, browser fingerprinting, and rate limiting to keep scrapers running.' },
      { title: 'Structured Output', description: 'Clean JSON, CSV, or database-ready data. No HTML parsing required on your end.' },
      { title: 'Site Change Detection', description: 'Our crawlers auto-detect site changes and adapt. You get consistent data even when targets update.' },
      { title: 'Flexible Delivery', description: 'API endpoints, webhooks, S3 drops, or database inserts — we deliver data how you need it.' },
    ],
    faqs: [
      { question: 'Is web scraping legal?', answer: "Public data scraping is legal in most jurisdictions. We comply with robots.txt, rate limits, and terms of service. We don't scrape private or authenticated data." },
      { question: 'How do you handle site changes?', answer: 'Our crawlers monitor page structure and alert when changes are detected. We update extraction rules within 24 hours.' },
      { question: 'What data formats do you deliver?', answer: 'JSON, CSV, XML, or direct database insertion. We can also set up real-time API endpoints for live data access.' },
    ],
    useCases: ['Competitor price monitoring', 'Lead generation and contact enrichment', 'Market research data collection', 'Real estate listing aggregation', 'Job market analysis', 'Social media sentiment data'],
  },
  {
    title: 'Product Management',
    slug: 'product-management',
    icon: 'Package',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    description: 'Technology Solutions for Your Product',
    features: ['Product Strategy', 'Roadmap Planning', 'Agile Development', 'Sprint Management', 'Stakeholder Reporting', 'Launch Planning'],
    technologies: ['Jira', 'Confluence', 'Notion', 'Slack', 'Linear', 'Miro'],
    detailedContent: 'Our technical proficiency and business acumen enable us to develop your product and deliver it on time. At buggcy we understand how much the UXD contributes.',
    process: [
      { step: '01', title: 'Business Analysis', description: 'Mapping workflows, identifying inefficiencies, interviewing stakeholders, and defining transformation roadmap.' },
      { step: '02', title: 'Solution Design', description: 'Architecture planning, technology selection, integration mapping, and compliance requirements gathering.' },
      { step: '03', title: 'Build & Integrate', description: 'Modular development, data migration, third-party integrations, and user acceptance testing.' },
      { step: '04', title: 'Deploy & Train', description: 'Phased rollout, user training programs, documentation, and ongoing support with SLAs.' },
    ],
    stats: [
      { label: 'Enterprise Clients', value: '30+' },
      { label: 'Systems Modernized', value: '100+' },
      { label: 'Process Efficiency', value: '+45%' },
      { label: 'ROI Delivered', value: '3x' },
    ],
    whyChooseUs: [
      { title: 'Enterprise Scale', description: "We've built systems handling 100K+ users, millions of transactions, and petabytes of data." },
      { title: 'Compliance Expertise', description: 'SOC2, HIPAA, GDPR, SOX — we build compliance controls into enterprise systems from day one.' },
      { title: 'Legacy Modernization', description: 'We modernize COBOL, mainframe, and legacy .NET systems without disrupting business operations.' },
      { title: 'Change Management', description: 'Training programs, documentation, and phased rollouts that ensure user adoption.' },
    ],
    faqs: [
      { question: 'Build or buy?', answer: 'We help you decide. Custom build for competitive differentiators. Buy/COTS for commodity functions. We integrate both seamlessly.' },
      { question: 'How do you handle legacy systems?', answer: 'Strangler fig pattern — we incrementally replace legacy components without big-bang rewrites. Zero downtime.' },
      { question: 'Do you provide training?', answer: 'Yes. Custom training programs, video tutorials, documentation, and ongoing support. We ensure your team adopts the new system.' },
    ],
    useCases: ['Custom ERP implementation', 'CRM customization and integration', 'Legacy system modernization', 'Workflow automation platforms', 'Document management systems', 'Business intelligence and reporting'],
  },
];

const industriesData = [
  {
    title: 'Healthcare',
    slug: 'healthcare',
    icon: 'HeartPulse',
    description: 'Reshaping Healthcare With Custom Software Development',
    heroSubtitle: 'From Telemedicine to AI Diagnostics. Built to Improve Patient Outcomes.',
    heroCta: 'Get My Free Healthcare Tech Review',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    features: ['Telemedicine Platforms', 'Electronic Health Records (EHR)', 'Patient Management Systems', 'Medical IoT Devices', 'Health Data Analytics', 'HIPAA Compliance'],
    challenges: ['Strict regulatory compliance (HIPAA, GDPR)', 'Sensitive patient data security', 'Integration with legacy hospital systems', 'Real-time monitoring requirements'],
    solutions: ['HIPAA-compliant cloud architecture with end-to-end encryption', 'FHIR-based interoperability for EHR integration', 'Real-time patient monitoring dashboards', 'AI-powered diagnostics and predictive analytics'],
    technologies: ['React', 'Node.js', 'Python', 'AWS Healthcare', 'FHIR', 'TensorFlow'],
    detailedContent: 'Keeping up with a digitally transforming healthcare industry should not be overwhelming when you have the right people guiding you. We specialize in building and implementing growth models using the latest healthcare software development methodologies.',
    challengesDetailed: [
      { title: 'Regulatory Compliance and Patient Trust', description: 'Healthcare is one of the most heavily regulated industries in the world. HIPAA in the United States, GDPR in Europe, and dozens of regional regulations create a complex compliance landscape that affects every layer of the technology stack. A single compliance violation can result in millions in fines and irreparable damage to patient trust. Most engineering teams underestimate the depth of compliance requirements until they are deep into development, at which point retrofitting compliance becomes exponentially more expensive.' },
      { title: 'Data Security and Privacy', description: 'Patient health information is among the most sensitive data that exists. Unlike financial data, which can be reset after a breach, medical records contain immutable information about diagnoses, treatments, and genetic data. Healthcare organizations are the number one target for cyberattacks, and a single breach can expose millions of patient records. Building secure healthcare systems requires encryption at rest and in transit, role-based access controls, audit logging, and continuous security monitoring.' },
      { title: 'Legacy System Integration', description: 'Most hospitals and healthcare providers run on legacy systems that were designed decades ago. These systems were never built for modern interoperability, yet they contain critical patient data that cannot be lost or disrupted. Integrating modern digital health solutions with HL7, FHIR, and proprietary hospital systems requires deep domain expertise and careful architecture that maintains data integrity while enabling new capabilities.' },
      { title: 'Real-Time Clinical Decision Support', description: 'Patient monitoring systems, clinical decision support tools, and emergency response platforms demand sub-second response times where delays can directly impact patient outcomes. Building systems that process thousands of vital signs per second, trigger alerts based on complex medical rules, and present actionable information to clinicians requires specialized architecture that balances speed with accuracy.' },
    ],
    lifecycle: [
      { step: '01', title: 'Telemedicine and Virtual Care', description: 'We build HIPAA-compliant telemedicine platforms that connect patients with healthcare providers through secure video consultations, real-time messaging, and digital prescription management. Our platforms support multi-provider scheduling, patient intake workflows, and integrated payment processing.' },
      { step: '02', title: 'Electronic Health Records', description: 'Custom EHR systems that streamline clinical documentation, reduce administrative burden, and improve care coordination. We build FHIR-compliant record systems that integrate with existing hospital infrastructure while providing modern interfaces for healthcare professionals.' },
      { step: '03', title: 'AI-Powered Diagnostics', description: 'Machine learning models trained on medical imaging, lab results, and patient history to assist healthcare professionals in making faster, more accurate diagnoses. Our AI diagnostic tools have helped reduce diagnostic turnaround times by up to 60%.' },
      { step: '04', title: 'Remote Patient Monitoring', description: 'IoT-connected devices and dashboards that enable continuous patient monitoring outside the hospital. Our RPM platforms collect vital signs in real-time, trigger alerts for abnormal readings, and provide clinicians with actionable insights.' },
      { step: '05', title: 'Health Data Analytics', description: 'Analytics platforms that transform raw healthcare data into actionable insights for clinical decision-making, operational optimization, and population health management. Our dashboards help healthcare organizations identify trends, reduce costs, and improve patient outcomes.' },
      { step: '06', title: 'Hospital Management Systems', description: 'Comprehensive hospital management platforms that integrate patient registration, bed management, pharmacy, laboratory, billing, and administrative functions into a unified system. Our HMS solutions reduce operational costs while improving care quality.' },
    ],
    approach: [
      { step: '01', title: 'Compliance-First Discovery', description: 'We map your clinical workflows, regulatory requirements, patient data flows, and integration needs. The output is a compliance-first architecture blueprint that ensures every feature is built with HIPAA, GDPR, and regional regulations baked in from day one.' },
      { step: '02', title: 'Core Platform Build', description: 'HIPAA-compliant infrastructure, secure data pipelines, FHIR integration layers, and the core clinical features are built in the correct sequence. Each layer is tested before the next is added so compliance does not become a bottleneck.' },
      { step: '03', title: 'AI and Analytics Layer', description: 'Diagnostic AI models, predictive analytics, and clinical decision support tools are added as structured layers. Each model is validated against medical datasets and integrated with the clinical workflow.' },
      { step: '04', title: 'Validation and Deployment', description: 'Security audits, penetration testing, compliance validation, and HIPAA certification support. We prepare the documentation your compliance team needs and support you through the certification process.' },
    ],
    stats: [{ value: '50+', label: 'Healthcare Projects' }, { value: '99.9%', label: 'Uptime SLA' }, { value: '10M+', label: 'Patient Records Managed' }, { value: 'HIPAA', label: 'Compliant' }],
    relatedServices: [{ title: 'Custom Software Engineering', href: '/services/web-development' }, { title: 'AI & ML Solutions', href: '/services/ai-ml' }, { title: 'Cloud & DevOps', href: '/services/devops' }, { title: 'QA & Testing', href: '/services/qa-testing' }],
    successStories: [
      { slug: 'ai-patient-management', title: 'MedCare: AI-Powered Patient Management System', problem: 'MedCare Health Network was struggling with fragmented patient records across 12 hospitals, inefficient scheduling that left doctors idle and patients waiting, and diagnosis turnaround times that averaged 72 hours. Staff spent hours on manual data entry while patients faced long wait times for results.', solution: 'We built a unified AI-powered patient management platform that integrated all EHR systems into a single FHIR-compliant architecture, implemented smart scheduling algorithms that reduced wait times by 40%, and deployed ML-based diagnostic assistance tools that cut diagnosis turnaround from 72 hours to under 24 hours.', results: [{ value: '40%', label: 'Cost Reduction' }, { value: '60%', label: 'Faster Diagnosis' }] },
      { slug: 'remote-patient-monitoring', title: 'HealthFirst: Remote Patient Monitoring Platform', problem: 'HealthFirst needed to monitor 5,000 chronic disease patients across multiple locations but their existing tools could not handle real-time vital sign processing, leading to delayed interventions and preventable hospital readmissions.', solution: 'We built an IoT-connected RPM platform that processes 50,000 vital signs per minute, triggers intelligent alerts based on patient-specific thresholds, and provides clinicians with dashboards that prioritize patients by risk level.', results: [{ value: '50%', label: 'Fewer Readmissions' }, { value: '24/7', label: 'Patient Monitoring' }] },
    ],
    testimonials: [
      { quote: 'Buggcy delivered a HIPAA-compliant telemedicine platform that our doctors actually enjoy using. The integration with our legacy EHR was seamless and took weeks instead of the months other vendors quoted.', name: 'Dr. Sarah Chen', role: 'CTO', company: 'MedLink Health', location: 'San Francisco, USA' },
      { quote: "The team understood healthcare compliance from day one. They didn't just build features — they built with patient safety as the priority. Their AI diagnostic tool reduced our turnaround time by 60%.", name: 'James Wright', role: 'VP Engineering', company: 'CarePoint Digital', location: 'London, UK' },
    ],
  },
  {
    title: 'Finance',
    slug: 'finance',
    icon: 'Landmark',
    description: 'Gain Efficiency Through Fintech Development',
    heroSubtitle: 'From Payments to Trading. Built to Handle Money at Scale.',
    heroCta: 'Get My Free FinTech Review',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    features: ['Payment Processing Systems', 'Digital Banking Solutions', 'Trading Platforms', 'Blockchain & Crypto', 'Fraud Detection', 'Regulatory Compliance (PCI DSS)'],
    challenges: ['Real-time transaction processing at scale', 'Financial fraud prevention and detection', 'Strict regulatory and compliance requirements', 'High availability and zero-downtime needs'],
    solutions: ['Event-driven microservices for real-time transaction processing', 'ML-powered fraud detection with sub-second response times', 'PCI DSS Level 1 compliant payment infrastructure', 'Multi-region deployment with automatic failover'],
    technologies: ['Node.js', 'Java', 'PostgreSQL', 'Kafka', 'AWS', 'Redis'],
    detailedContent: 'At buggcy, we work to create a solution for banks, exchanges and brokers to provide them with a saving on their online trading platforms. buggcy hosts teams of developers that have expertise in the finance industry.',
    challengesDetailed: [
      { title: 'Transaction Speed and Scale', description: 'Financial platforms must process thousands of transactions per second with sub-millisecond latency and zero data loss. A payment gateway that takes 500ms instead of 50ms can lose millions in revenue.' },
      { title: 'Regulatory Compliance', description: 'PCI DSS for payment processing, SOX for financial reporting, GDPR for data privacy, and dozens of regional financial regulations create a complex compliance landscape.' },
    ],
    lifecycle: [
      { step: '01', title: 'Payment Processing Systems', description: 'High-throughput payment gateways that process thousands of transactions per second with PCI DSS Level 1 compliance.' },
      { step: '02', title: 'Digital Banking Solutions', description: 'Modern digital banking platforms with account management, fund transfers, bill payments, and financial analytics.' },
    ],
    approach: [
      { step: '01', title: 'Compliance and Architecture', description: 'We map regulatory requirements, transaction flows, security needs, and integration requirements into a compliance-first architecture.' },
      { step: '02', title: 'Core Engine Build', description: 'Payment processing, ledger systems, and the core financial engine built with event-driven architecture.' },
    ],
    stats: [{ value: '20+', label: 'FinTech Projects' }, { value: '$2B+', label: 'Transactions Processed' }, { value: '99.99%', label: 'Uptime' }, { value: 'PCI DSS', label: 'Level 1 Certified' }],
    relatedServices: [{ title: 'Custom Software Engineering', href: '/services/web-development' }, { title: 'Cybersecurity', href: '/services/cybersecurity' }, { title: 'Cloud & DevOps', href: '/services/devops' }, { title: 'AI & ML Solutions', href: '/services/ai-ml' }],
    successStories: [
      { slug: 'real-time-payment-processing', title: 'PayFlow: Real-Time Payment Processing Platform', problem: "PayFlow's existing payment gateway could not handle more than 1,000 transactions per second, causing timeouts during peak hours.", solution: 'We rebuilt their payment engine using event-driven microservices with Kafka for guaranteed delivery, achieving 50,000 TPS with sub-10ms latency.', results: [{ value: '50K', label: 'Transactions Per Second' }, { value: '99.99%', label: 'Uptime' }] },
    ],
    testimonials: [
      { quote: 'Buggcy built our payment processing platform to handle 50,000 TPS with zero downtime. Their understanding of financial compliance is exceptional.', name: 'Ahmad Raza', role: 'CTO', company: 'PayFlow', location: 'Dubai, UAE' },
    ],
  },
  {
    title: 'E-Commerce',
    slug: 'e-commerce',
    icon: 'ShoppingCart',
    description: 'Build a shopping experience like no other',
    heroSubtitle: 'From Storefront to Marketplace. Built to Convert Browsers into Buyers.',
    heroCta: 'Get My Free E-Commerce Review',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    features: ['Custom E-commerce Platforms', 'Inventory Management Systems', 'Order Management & Fulfillment', 'Payment Gateway Integration', 'AI Recommendation Engines', 'Omnichannel Retail Solutions'],
    challenges: ['Handling high-traffic spikes during sales events', 'Personalizing shopping experiences at scale', 'Managing complex inventory across channels', 'Seamless checkout and payment experience'],
    solutions: ['Auto-scaling cloud architecture for flash sale readiness', 'AI-powered product recommendations and dynamic pricing', 'Unified inventory management across online and offline channels', 'One-click checkout with multiple payment options'],
    technologies: ['Next.js', 'React', 'Node.js', 'Stripe', 'Redis', 'Elasticsearch'],
    detailedContent: 'This is one platform any size of business can benefit from if just the processes are carried out by the book. The accessibility of the internet has opened a bigger world in conducting business.',
    challengesDetailed: [
      { title: 'Traffic Spikes and Flash Sales', description: 'E-commerce platforms must handle 100x normal traffic during flash sales, holiday seasons, and marketing campaigns.' },
      { title: 'Personalization at Scale', description: 'Showing the right product to the right customer in milliseconds requires sophisticated ML pipelines.' },
    ],
    lifecycle: [
      { step: '01', title: 'Custom E-commerce Platforms', description: 'Headless commerce architecture with Next.js or React frontends, microservices backend, and flexible APIs.' },
      { step: '02', title: 'Product Discovery and Search', description: 'AI-powered search with faceted filtering, typo tolerance, and personalized ranking.' },
    ],
    approach: [
      { step: '01', title: 'Commerce Strategy', description: 'We analyze your product catalog, customer segments, channel strategy, and competitive landscape.' },
      { step: '02', title: 'Platform Build', description: 'Headless commerce engine, product catalog, and cart/checkout built for performance and scale.' },
    ],
    stats: [{ value: '40+', label: 'E-Commerce Projects' }, { value: '35%', label: 'Avg. Conversion Increase' }, { value: '$500M+', label: 'GMV Processed' }, { value: '100ms', label: 'Page Load Time' }],
    relatedServices: [{ title: 'Custom Software Engineering', href: '/services/web-development' }, { title: 'AI & ML Solutions', href: '/services/ai-ml' }, { title: 'UI/UX Design', href: '/services/ui-ux-design' }, { title: 'Cloud & DevOps', href: '/services/devops' }],
    successStories: [
      { slug: 'enterprise-ecommerce-platform', title: 'ShopMax: Enterprise E-Commerce Platform', problem: "ShopMax's platform crashed during their biggest flash sale, losing $2M in revenue in 3 hours.", solution: 'We rebuilt their platform using headless commerce architecture with auto-scaling Kubernetes infrastructure that handled 100K concurrent users.', results: [{ value: '100K', label: 'Concurrent Users' }, { value: 'Zero', label: 'Downtime During Sales' }] },
    ],
    testimonials: [
      { quote: 'Our new platform handles 100K concurrent users during flash sales without breaking a sweat. Buggcy delivered true enterprise-scale e-commerce.', name: 'Chris Nguyen', role: 'VP Digital', company: 'ShopMax', location: 'San Francisco, USA' },
    ],
  },
  {
    title: 'Logistics & Supply Chain',
    slug: 'logistics-supply-chain',
    icon: 'Truck',
    description: 'Optimize your supply chain with real-time tracking, route optimization, and warehouse management systems.',
    heroSubtitle: 'From Fleet to Warehouse. Built to Optimize Every Shipment.',
    heroCta: 'Get My Free Logistics Review',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
    features: ['Fleet Management Systems', 'Route Optimization', 'Warehouse Management', 'Real-time Shipment Tracking', 'Demand Forecasting', 'Supply Chain Analytics'],
    challenges: ['Real-time visibility across the supply chain', 'Route optimization for cost reduction', 'Warehouse operations efficiency', 'Demand prediction and inventory planning'],
    solutions: ['IoT-enabled real-time tracking with live GPS dashboards', 'AI-optimized routing reducing fuel costs by 20-30%', 'Automated warehouse management with barcode/RFID scanning', 'ML-based demand forecasting for inventory optimization'],
    technologies: ['React', 'Node.js', 'Python', 'IoT', 'PostgreSQL', 'Mapbox'],
    detailedContent: 'Our logistics solutions provide end-to-end supply chain visibility. We build fleet management systems that track vehicles in real-time, route optimization engines that minimize delivery costs, and warehouse management systems that automate picking, packing, and shipping.',
    challengesDetailed: [
      { title: 'End-to-End Supply Chain Visibility', description: 'Tracking shipments across multiple carriers, warehouses, and transportation modes in real-time is one of the biggest challenges in logistics.' },
      { title: 'Route Optimization for Cost Reduction', description: 'Balancing delivery speed, fuel costs, vehicle capacity, and customer time windows across thousands of deliveries is a complex optimization problem.' },
    ],
    lifecycle: [
      { step: '01', title: 'Fleet Management Systems', description: 'Real-time fleet tracking with GPS, geofencing, driver behavior monitoring, and maintenance scheduling.' },
      { step: '02', title: 'Route Optimization', description: 'AI-powered route optimization that considers traffic, weather, delivery windows, vehicle capacity, and driver hours.' },
    ],
    approach: [
      { step: '01', title: 'Operations Audit', description: 'We map your supply chain flows, identify bottlenecks, audit existing systems, and understand your integration requirements.' },
      { step: '02', title: 'Core Systems Build', description: 'TMS, WMS, and tracking infrastructure built with real-time data pipelines.' },
    ],
    stats: [{ value: '25+', label: 'Logistics Projects' }, { value: '30%', label: 'Fuel Cost Reduction' }, { value: '50%', label: 'Faster Delivery' }, { value: '99.5%', label: 'Tracking Accuracy' }],
    relatedServices: [{ title: 'Custom Software Engineering', href: '/services/web-development' }, { title: 'AI & ML Solutions', href: '/services/ai-ml' }, { title: 'Data Scraping', href: '/services/data-scraping' }, { title: 'Cloud & DevOps', href: '/services/devops' }],
    successStories: [
      { slug: 'ai-route-optimization', title: 'FastFreight: AI Route Optimization System', problem: "FastFreight's manual route planning was costing them $3M extra per year in fuel expenses.", solution: 'We built an AI-powered route optimization system that analyzes traffic, weather, and delivery constraints in real-time, reducing fuel costs by 28%.', results: [{ value: '28%', label: 'Fuel Cost Reduction' }, { value: '98%', label: 'On-Time Delivery' }] },
    ],
    testimonials: [
      { quote: 'The route optimization system reduced our fuel costs by 28% and improved delivery times by 40%. Transformative for our operations.', name: 'Marco Silva', role: 'Head of Logistics', company: 'FastFreight', location: 'Sao Paulo, Brazil' },
    ],
  },
];

const successStoriesData = [
  {
    title: 'AI-Powered Patient Management System',
    slug: 'ai-patient-management',
    client: 'MedCare Health Network',
    category: 'Healthcare',
    description: "Transformed a regional hospital network's patient management with AI-driven scheduling, records, and diagnostics — reducing costs by 40%.",
    problem: 'MedCare Health Network was struggling with fragmented patient records, inefficient scheduling, and long diagnosis turnaround times across their 12 hospitals.',
    solution: 'We built a unified AI-powered patient management platform that integrated all EHR systems, implemented smart scheduling algorithms, and deployed ML-based diagnostic assistance tools.',
    results: [{ label: 'Cost Reduction', value: '40%' }, { label: 'Faster Diagnosis', value: '60%' }, { label: 'Patient Satisfaction', value: '95%' }, { label: 'Hospitals Connected', value: '12' }],
    technologies: ['React', 'Python', 'TensorFlow', 'AWS', 'FHIR', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    laptopImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
    tabletImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    desktopImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80',
  },
  {
    title: 'Real-Time Payment Processing Platform',
    slug: 'realtime-payment-platform',
    client: 'PayFlow Digital',
    category: 'FinTech',
    description: 'Built a payment gateway handling 10M+ daily transactions with real-time fraud detection, achieving 99.99% uptime.',
    problem: 'PayFlow needed to process millions of daily transactions with zero tolerance for downtime.',
    solution: 'We designed an event-driven microservices architecture with Kafka for real-time processing, implemented ML-based fraud detection with sub-second response times.',
    results: [{ label: 'Daily Transactions', value: '10M+' }, { label: 'Uptime', value: '99.99%' }, { label: 'Fraud Detection', value: '99.7%' }, { label: 'Response Time', value: '<50ms' }],
    technologies: ['Node.js', 'Java', 'Kafka', 'PostgreSQL', 'AWS', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    laptopImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
    tabletImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    desktopImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80',
  },
  {
    title: 'Smart Logistics & Fleet Management',
    slug: 'smart-logistics-fleet',
    client: 'SwiftMove Logistics',
    category: 'Logistics',
    description: 'Deployed IoT-based fleet tracking with AI route optimization, cutting fuel costs by 25% and improving delivery times by 35%.',
    problem: 'SwiftMove operated 500+ vehicles with no real-time visibility. Manual route planning wasted fuel and delayed deliveries.',
    solution: 'We built a comprehensive fleet management platform with IoT GPS tracking, AI-powered route optimization, and automated dispatch.',
    results: [{ label: 'Fuel Cost Savings', value: '25%' }, { label: 'Faster Deliveries', value: '35%' }, { label: 'Vehicles Tracked', value: '500+' }, { label: 'On-time Delivery', value: '98%' }],
    technologies: ['React', 'Node.js', 'Mapbox', 'IoT', 'Python', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    laptopImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
    tabletImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    desktopImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80',
  },
  {
    title: 'Adaptive Learning Platform for Universities',
    slug: 'adaptive-learning-university',
    client: 'EduVerse University',
    category: 'Education',
    description: 'Created an AI-driven learning platform that personalizes course content for 50,000+ students, improving pass rates by 28%.',
    problem: 'EduVerse University struggled with one-size-fits-all course delivery. Students had varying learning paces and styles.',
    solution: 'We developed an adaptive learning platform that uses AI to assess student knowledge levels and dynamically adjusts course content, pacing, and difficulty.',
    results: [{ label: 'Students Served', value: '50K+' }, { label: 'Pass Rate Improvement', value: '28%' }, { label: 'Engagement Increase', value: '45%' }, { label: 'Courses Available', value: '200+' }],
    technologies: ['Next.js', 'Python', 'PostgreSQL', 'AWS', 'WebSocket', 'TensorFlow'],
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    laptopImageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80',
    tabletImageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    desktopImageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600&q=80',
  },
  {
    title: 'E-Commerce Marketplace with AI Recommendations',
    slug: 'ecommerce-ai-marketplace',
    client: 'ShopNova',
    category: 'E-Commerce',
    description: 'Built a scalable marketplace with AI-powered product recommendations, increasing conversion rates by 35% and average order value by 22%.',
    problem: "ShopNova's existing platform had slow page loads, poor search functionality, and no personalization.",
    solution: 'We rebuilt the platform with a headless commerce architecture, implemented Elasticsearch for instant search, and deployed a collaborative filtering AI engine.',
    results: [{ label: 'Conversion Rate', value: '+35%' }, { label: 'Order Value', value: '+22%' }, { label: 'Page Load', value: '1.2s' }, { label: 'Monthly Users', value: '200K+' }],
    technologies: ['Next.js', 'Node.js', 'Elasticsearch', 'Redis', 'Stripe', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    laptopImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
    tabletImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    desktopImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80',
  },
];

const careersData = [
  {
    title: 'Web Developer',
    department: 'Engineering',
    location: 'Remote',
    description: 'We are looking for a skilled Web Developer to join our team. You will be responsible for building and maintaining web applications using modern technologies.',
    requirements: '3+ years of experience in web development. Proficiency in React, Next.js, Node.js. Experience with TypeScript and modern CSS frameworks.',
    responsibilities: 'Develop and maintain web applications. Collaborate with design and product teams. Write clean, maintainable code.',
    jobType: JobType.FULL_TIME,
    status: JobStatus.OPEN,
    salaryRange: '60,000 - 90,000',
    salaryCurrency: 'USD',
  },
  {
    title: 'Front-end React Developer',
    department: 'Engineering',
    location: 'Remote',
    description: 'Join our frontend team to build beautiful, performant user interfaces using React and modern frontend technologies.',
    requirements: '2+ years of React experience. Strong TypeScript skills. Experience with Next.js and Tailwind CSS preferred.',
    responsibilities: 'Build pixel-perfect UI components. Optimize frontend performance. Collaborate with backend developers.',
    jobType: JobType.FULL_TIME,
    status: JobStatus.OPEN,
    salaryRange: '55,000 - 85,000',
    salaryCurrency: 'USD',
  },
];

async function seed() {
  console.log('Connecting to database...');
  await AppDataSource.initialize();
  console.log('Database connected.');

  const serviceRepo = AppDataSource.getRepository(SiteService);
  const mainServiceRepo = AppDataSource.getRepository(Service);
  const industryRepo = AppDataSource.getRepository(SiteIndustry);
  const successStoryRepo = AppDataSource.getRepository(SiteSuccessStory);
  const careerRepo = AppDataSource.getRepository(Career);

  const userRepo = AppDataSource.getRepository(User);
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@buggcy.com';
  const exists = await userRepo.findOne({ where: { email: adminEmail } });

  if (exists) {
    console.log('ℹ️  Admin already exists, skipping seed.');
  } else {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'Admin@1234',
      12,
    );

    // Insert directly to bypass @BeforeInsert double-hashing
    await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name:     'Admin',
        email:    adminEmail,
        password: hashedPassword,
        role:     Role.ADMIN,
        isActive: true,
      })
      .execute();

    console.log(`🌱 Admin seeded: ${adminEmail}`);
    console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD || 'Admin@1234'}`);
  }

  // Seed Industries (upsert - update image fields if exists)
  for (const industry of industriesData) {
    const existing = await industryRepo.findOne({ where: { slug: industry.slug } });
    if (existing) {
      existing.imageUrl = industry.imageUrl;
      await industryRepo.save(existing);
      console.log(`Updated industry: ${industry.title}`);
    } else {
      await industryRepo.save(industryRepo.create(industry));
      console.log(`Seeded industry: ${industry.title}`);
    }
  }

  // Seed Success Stories (upsert - update image fields if exists)
  for (const story of successStoriesData) {
    const existing = await successStoryRepo.findOne({ where: { slug: story.slug } });
    if (existing) {
      // Update image fields on existing records
      existing.imageUrl = story.imageUrl;
      existing.laptopImageUrl = story.laptopImageUrl;
      existing.mobileImageUrl = story.mobileImageUrl;
      existing.tabletImageUrl = story.tabletImageUrl;
      existing.desktopImageUrl = story.desktopImageUrl;
      await successStoryRepo.save(existing);
      console.log(`Updated success story: ${story.title}`);
    } else {
      await successStoryRepo.save(successStoryRepo.create(story));
      console.log(`Seeded success story: ${story.title}`);
    }
  }

  // Seed Careers
  for (const career of careersData) {
    const existing = await careerRepo.findOne({ where: { title: career.title } });
    if (!existing) {
      await careerRepo.save(careerRepo.create(career));
      console.log(`Seeded career: ${career.title}`);
    }
  }

  // Seed Services (upsert)
  for (const service of servicesData) {
    const existing = await serviceRepo.findOne({ where: { slug: service.slug } });
    if (existing) {
      existing.imageUrl = service.imageUrl;
      existing.secondaryImageUrl = service.secondaryImageUrl;
      await serviceRepo.save(existing);
      console.log(`Updated service: ${service.title}`);
    } else {
      await serviceRepo.save(serviceRepo.create(service));
      console.log(`Seeded service: ${service.title}`);
    }
  }

  // Seed Services (main services table with isActive + order)
  for (let i = 0; i < servicesData.length; i++) {
    const svc = servicesData[i];
    const existing = await mainServiceRepo.findOne({ where: { slug: svc.slug } });
    if (existing) {
      existing.imageUrl = svc.imageUrl;
      existing.secondaryImageUrl = svc.secondaryImageUrl;
      existing.isActive = true;
      existing.order = i;
      await mainServiceRepo.save(existing);
      console.log(`Updated main service: ${svc.title}`);
    } else {
      await mainServiceRepo.save(mainServiceRepo.create({ ...svc, isActive: true, order: i }));
      console.log(`Seeded main service: ${svc.title}`);
    }
  }

  console.log('Seeding complete!');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
