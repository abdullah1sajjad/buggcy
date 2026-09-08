import type { Blog, Service, Industry, SuccessStory, WhyChooseUsItem, PolicyPage } from "../types";

export const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "Education Software Development | Create A Brilliant eLearning App",
    content:
      "The world is changing. When people are looking for a place to shop, they usually open their online platforms to check out products first. Now, when people want to learn something, they are also looking for it online.\n\nClassifying Applications In Education Software Development:\n\nOnline Learning Websites - These are the platforms which most of you might have heard of, like Udacity, Coursera and EdX.\n\nOnline Learning Marketplaces - Another form of educational software development work in eLearning.\n\nWeb Conferencing Software - This software is made for students and teachers who would rather prefer a joint session in a virtual classroom like manner.\n\nStarting Your eLearning Platform - Education software development aims to target students and teachers with brilliant content and interactive features.",
    author: "Editor",
    date: "2020-06-22",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/education-software-development-elearning-app.png",
    tags: ["Education", "eLearning", "Software Development"],
    category: "Blog",
  },
  {
    id: "2",
    title: "Outsourcing Software Development - 5 Mistakes Businesses Should Avoid",
    content:
      "Outsourcing software development has become a strategic move for businesses looking to scale efficiently. However, many companies make critical mistakes when choosing their development partners.\n\nFrom not defining clear requirements to ignoring cultural fit, these mistakes can cost businesses time and money. In this article, we explore the top 5 mistakes businesses should avoid when outsourcing their software development needs.\n\nAt buggcy, we have helped numerous businesses navigate the outsourcing landscape successfully. Our experience working with global clients has given us deep insights into what makes an outsourcing partnership work.",
    author: "Editor",
    date: "2020-07-24",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    tags: ["Outsourcing", "Software Development", "Business"],
    category: "Blog",
  },
  {
    id: "3",
    title: "How We Reduced Healthcare Costs by 40% with AI",
    content: "A comprehensive case study on how our AI-powered patient management system transformed a regional hospital network, reducing operational costs by 40% while improving patient outcomes significantly.",
    author: "buggcy Team",
    date: "2024-01-20",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/healthcare.png",
    tags: ["Healthcare", "AI", "Case Study"],
    category: "Case Study",
  },
  {
    id: "4",
    title: "Building Scalable Fintech Platforms with Microservices",
    content: "This case study explores how we architected a payment processing platform handling 10M+ transactions daily using microservices, event-driven architecture, and real-time fraud detection.",
    author: "buggcy Team",
    date: "2024-02-10",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/fintech.png",
    tags: ["FinTech", "Architecture", "Case Study"],
    category: "Case Study",
  },
  {
    id: "5",
    title: "Complete Guide to RAG Architecture with LLMs",
    content: "Retrieval-Augmented Generation (RAG) combines the power of large language models with external knowledge retrieval. This guide covers everything from basic concepts to production-ready implementations using LangChain, vector databases, and cloud-native deployment strategies.",
    author: "buggcy Team",
    date: "2024-03-05",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/big-data.png",
    tags: ["AI", "LLM", "RAG", "Guide"],
    category: "AI Guide",
  },
  {
    id: "6",
    title: "DevOps Best Practices for Startup Teams",
    content: "A practical guide to setting up CI/CD pipelines, containerization, and infrastructure as code for lean engineering teams. Learn how to deploy confidently multiple times a day with limited resources.",
    author: "buggcy Team",
    date: "2024-03-15",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/devops.png",
    tags: ["DevOps", "CI/CD", "Guide"],
    category: "AI Guide",
  },
];

export const mockCareers = [
  {
    id: "1",
    title: "Web Developer",
    description:
      "buggcy is a growing company in Lahore that offers a combination of consulting, outsourcing and specialized services to global clientele across all types of web and mobile app development. Collaborate with the development team to design, develop, and deploy web applications. Write clean, efficient, and maintainable code following best practices and coding standards. Assist in troubleshooting and debugging issues to ensure smooth project execution. Participate in code reviews and provide constructive feedback to team members.",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    category: "Engineering",
    requirements: [
      "Bachelors or Masters in Computer Science or related field",
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Understanding of web development concepts and technologies",
      "Stay up-to-date with emerging technologies and trends in web development",
    ],
  },
  {
    id: "2",
    title: "Front-end React Developer",
    description:
      "Gather and refine specifications and requirements based on technical requirements or UX design. Convert Figma designs into fully responsive web pages actively using native CSS and SCSS. Make sure the site's design is Responsive, adaptable and strike a balance between useful and aesthetically pleasing design. Work with back-end developers to integrate UI components with APIs and databases.",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    category: "Engineering",
    requirements: [
      "Minimum 18 months of experience with JavaScript and React.js development, consuming REST and/or GraphQL APIs",
      "Experience in Semantic HTML, CSS, SCSS styling and Typescript",
      "Worked with Redux, and React Hooks",
      "Familiarity with the GraphQL/Mongodb/Postgres",
      "Basic knowledge of Git",
      "Hands on experience on Next JS (optional)",
    ],
  },
  {
    id: "3",
    title: "Backend Engineer",
    description:
      "Build scalable APIs and microservices that power our client products. Work with modern tech stacks and cloud infrastructure.",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    category: "Engineering",
    requirements: [
      "3+ years with Node.js or Python",
      "Experience with PostgreSQL or MongoDB",
      "REST API and GraphQL knowledge",
      "Cloud deployment experience (AWS/GCP)",
    ],
  },
  {
    id: "4",
    title: "DevOps Engineer",
    description:
      "Manage and optimize our cloud infrastructure, CI/CD pipelines, and deployment workflows. Ensure reliability and scalability across all services.",
    location: "Lahore, Pakistan",
    type: "Full-time",
    department: "Engineering",
    category: "Engineering",
    requirements: [
      "Experience with AWS or GCP",
      "Proficiency in Docker and Kubernetes",
      "CI/CD pipeline setup and management",
      "Infrastructure as Code (Terraform)",
    ],
  },
  {
    id: "5",
    title: "Mobile Developer",
    description:
      "Build high-performance cross-platform mobile applications using React Native or Flutter. Deliver seamless experiences on iOS and Android.",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    category: "Engineering",
    requirements: [
      "3+ years with React Native or Flutter",
      "Published apps on App Store / Play Store",
      "Experience with state management",
      "Performance optimization skills",
    ],
  },
  {
    id: "6",
    title: "UI/UX Designer",
    description:
      "Create intuitive and visually stunning interfaces for web and mobile products. Conduct user research and translate insights into beautiful designs.",
    location: "Lahore, Pakistan",
    type: "Full-time",
    department: "Design",
    category: "Design",
    requirements: [
      "Strong portfolio of web/mobile designs",
      "Expertise in Figma and prototyping",
      "Understanding of user-centered design",
      "Experience with design tokens and systems",
    ],
  },
  {
    id: "7",
    title: "Business Development Executive",
    description:
      "Drive growth by identifying new business opportunities, building client relationships, and closing deals across global markets.",
    location: "Lahore, Pakistan",
    type: "Full-time",
    department: "Business",
    category: "Business",
    requirements: [
      "1+ years in B2B sales or business development",
      "Experience with Upwork or freelance platforms",
      "Strong negotiation and communication skills",
      "Self-motivated and target-driven",
    ],
  },
  {
    id: "8",
    title: "QA Engineer",
    description:
      "Ensure product quality through manual and automated testing. Design test plans, write test cases, and collaborate with engineering to ship bug-free software.",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    category: "Engineering",
    requirements: [
      "2+ years in software QA",
      "Experience with automated testing frameworks",
      "Knowledge of API testing (Postman)",
      "Strong attention to detail",
    ],
  },
];

export const mockServices: Service[] = [
  {
    id: "1",
    title: "Web Development",
    slug: "web-development",
    icon: "Code2",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    description:
      "Making Sure Your Business Reaches New Heights",
    features: [
      "Frontend Development",
      "Backend Development",
      "Full Stack Solutions",
      "API Development & Integration",
      "E-commerce Platforms",
      "Progressive Web Apps",
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    detailedContent:
      "From frontend to backend to even full-stack development, we fast-track your project delivery to create an experience beyond your expectations. Our web development services comprise of tech leaders and developers who have significant experience in this niche. buggcy is a complete web development company and we warrant to generating most striking results.",
    process: [
      { step: "01", title: "Discovery & Planning", description: "We analyze your business goals, user personas, and technical requirements. Deliverables include a project roadmap, tech stack recommendation, and sprint plan." },
      { step: "02", title: "UI/UX Design", description: "Our designers create wireframes, high-fidelity mockups, and interactive prototypes. We validate designs with real users before development begins." },
      { step: "03", title: "Development", description: "Agile sprints with working demos every 2 weeks. Frontend and backend built in parallel with automated testing at every stage." },
      { step: "04", title: "Launch & Support", description: "CI/CD setup, cloud deployment, performance monitoring, and 3 months of post-launch support included with every project." },
    ],
    stats: [
      { label: "Projects Delivered", value: "50+" },
      { label: "Client Satisfaction", value: "98%" },
      { label: "Avg Load Time", value: "<2s" },
      { label: "Uptime SLA", value: "99.9%" },
    ],
    whyChooseUs: [
      { title: "Full-Stack Expertise", description: "One team handles frontend, backend, database, and DevOps — no coordination overhead between vendors." },
      { title: "Modern Tech Stack", description: "We use React, Next.js, Node.js, and cloud-native architectures that are built to scale." },
      { title: "Agile Process", description: "2-week sprints with working demos, so you see progress constantly and can pivot quickly." },
      { title: "Post-Launch Support", description: "3 months of free maintenance and bug fixes after launch. We don't disappear after deployment." },
    ],
    faqs: [
      { question: "How long does a typical web project take?", answer: "A landing page takes 2-4 weeks. A full SaaS platform takes 3-6 months depending on complexity. We provide a detailed timeline after discovery." },
      { question: "Do you work with startups or only enterprises?", answer: "Both. We've built MVPs for seed-stage startups and enterprise platforms for Fortune 500 companies. Our process adapts to your scale." },
      { question: "What if I need changes after launch?", answer: "We include 3 months of free post-launch support. After that, we offer monthly maintenance plans starting at $1,500/month." },
    ],
    useCases: [
      "SaaS dashboards and admin panels",
      "E-commerce storefronts with payment integration",
      "Customer portals and self-service platforms",
      "Marketing websites with CMS",
      "Real-time collaboration tools",
      "Internal tools and workflow apps",
    ],
  },
  {
    id: "2",
    title: "Mobile Application",
    slug: "mobile-development",
    icon: "Smartphone",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/mobile.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/mobile.png",
    description:
      "New Possibilities for Mobile Applications",
    features: [
      "iOS Applications",
      "Android Applications",
      "Cross-Platform Apps",
      "App Store Deployment",
      "Push Notifications",
      "Offline Support",
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Firebase"],
    detailedContent:
      "Our latest QA testing methods and out-of-box designs ensure that your mobile application is more like a sweet experience than just a project. Our experience in the field of iOS mobile application development enables us to create a ground-breaking app for your business needs.",
    process: [
      { step: "01", title: "Strategy & Research", description: "Platform selection (iOS/Android/cross), competitor analysis, and feature prioritization based on your target audience." },
      { step: "02", title: "Design", description: "Mobile-first UI/UX with platform-specific patterns. Interactive prototypes tested with real users on actual devices." },
      { step: "03", title: "Build & Test", description: "Iterative development with device lab testing, beta releases via TestFlight/Play Console, and performance profiling." },
      { step: "04", title: "Launch & Grow", description: "App Store submission, ASO optimization, analytics setup, and ongoing feature updates based on user feedback." },
    ],
    stats: [
      { label: "Apps Published", value: "30+" },
      { label: "App Store Rating", value: "4.8★" },
      { label: "Downloads Managed", value: "1M+" },
      { label: "Crash Rate", value: "<0.5%" },
    ],
    whyChooseUs: [
      { title: "Cross-Platform Efficiency", description: "One codebase for iOS and Android saves 40% development time without compromising native performance." },
      { title: "App Store Expertise", description: "We've published 30+ apps and know exactly what Apple and Google require for approval." },
      { title: "Performance First", description: "60fps animations, <100ms touch response, and optimized memory usage are our baseline standards." },
      { title: "End-to-End Service", description: "From App Store graphics to push notification setup, we handle every detail of your mobile presence." },
    ],
    faqs: [
      { question: "Native or cross-platform?", answer: "For most projects, React Native or Flutter gives 95% native performance at half the cost. We recommend native only for performance-critical apps like gaming." },
      { question: "How do you handle app store rejection?", answer: "We've published 30+ apps with a 98% first-submission approval rate. If rejection occurs, we fix the issue and resubmit at no extra cost." },
      { question: "Do you maintain the app after launch?", answer: "Yes. We offer monthly maintenance plans that include OS updates, bug fixes, and feature enhancements." },
    ],
    useCases: [
      "Consumer-facing mobile apps",
      "On-demand service platforms (food, ride, delivery)",
      "Social networking and community apps",
      "Enterprise mobile solutions for field teams",
      "Health and fitness tracking apps",
      "Mobile commerce and payment apps",
    ],
  },
  {
    id: "3",
    title: "Frontend Development",
    slug: "frontend",
    icon: "Globe",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    description:
      "Pixel-perfect, performant user interfaces built with React, Next.js, and modern frontend frameworks. We make your design come alive.",
    features: [
      "React & Next.js Apps",
      "Component Libraries",
      "Responsive Design",
      "Animation & Interactions",
      "Performance Optimization",
      "Accessibility (WCAG)",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Storybook"],
    detailedContent:
      "Our frontend team specializes in building blazing-fast, accessible, and visually stunning user interfaces. We create reusable component libraries, implement complex animations, and optimize for Core Web Vitals. Every pixel matters to us — we match your designs with 100% accuracy.",
    process: [
      { step: "01", title: "Design Analysis", description: "We study your Figma/Sketch files, identify reusable patterns, and plan component architecture before writing code." },
      { step: "02", title: "Component Build", description: "Building a design system with atomic components, proper state management, and TypeScript interfaces." },
      { step: "03", title: "Integration", description: "Connecting to APIs, implementing auth flows, handling real-time data, and adding error boundaries." },
      { step: "04", title: "Polish & Optimize", description: "Lighthouse optimization to 95+, accessibility audits, cross-browser testing, and animation refinement." },
    ],
    stats: [
      { label: "Lighthouse Score", value: "95+" },
      { label: "First Paint", value: "<1s" },
      { label: "Components Built", value: "500+" },
      { label: "Accessibility", value: "WCAG AA" },
    ],
    whyChooseUs: [
      { title: "Pixel-Perfect Delivery", description: "We match your designs with 100% accuracy. Every spacing, color, and typography detail is precise." },
      { title: "Performance Obsessed", description: "We optimize bundle sizes, implement lazy loading, and achieve sub-second load times consistently." },
      { title: "Reusable Architecture", description: "Component libraries that your team can extend and maintain long after our engagement ends." },
      { title: "Accessibility First", description: "WCAG 2.1 AA compliance built in from day one, not an afterthought." },
    ],
    faqs: [
      { question: "React or Next.js?", answer: "Next.js for most projects — it gives you SSR, SSG, and API routes out of the box. We use plain React only for embedded widgets." },
      { question: "Can you work with our existing backend?", answer: "Absolutely. We integrate with any REST or GraphQL API. We just need the API docs or a Postman collection." },
      { question: "Do you provide design services?", answer: "We have an in-house design team. We can work from your existing designs or create new ones from scratch." },
    ],
    useCases: [
      "Design system and component library creation",
      "Marketing website redesigns",
      "SaaS dashboard and admin panel development",
      "Progressive Web Apps (PWA)",
      "Animation-rich landing pages",
      "Legacy frontend modernization (jQuery → React)",
    ],
  },
  {
    id: "4",
    title: "Backend Development",
    slug: "backend",
    icon: "Server",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    description:
      "Scalable APIs, microservices, and server-side architecture that powers your product behind the scenes. Built for millions of requests.",
    features: [
      "REST API Development",
      "GraphQL APIs",
      "Microservices Architecture",
      "Database Design",
      "Authentication & Authorization",
      "Message Queues & Events",
    ],
    technologies: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB", "Redis"],
    detailedContent:
      "Our backend engineers build robust, scalable server-side systems that handle millions of requests. From RESTful APIs to event-driven microservices, we architect solutions that are secure, performant, and easy to maintain. We follow 12-factor app principles and design for horizontal scaling.",
    process: [
      { step: "01", title: "Architecture Design", description: "Choosing between monolith, microservices, or serverless based on your scale requirements and team size." },
      { step: "02", title: "API Contract", description: "Defining OpenAPI specs, data models, auth strategies, and rate limiting policies before writing implementation code." },
      { step: "03", title: "Implementation", description: "Building endpoints, database schemas, caching layers, background jobs, and real-time subscriptions." },
      { step: "04", title: "Production Ready", description: "Load testing, security hardening, monitoring setup, and documentation for your engineering team." },
    ],
    stats: [
      { label: "APIs Built", value: "100+" },
      { label: "Avg Response", value: "<50ms" },
      { label: "Uptime", value: "99.99%" },
      { label: "DB Queries Optimized", value: "1000+" },
    ],
    whyChooseUs: [
      { title: "Scale-Ready Architecture", description: "We design systems that handle 10x your current traffic without rewrites. Horizontal scaling is built in." },
      { title: "Security by Default", description: "OWASP top 10 protection, input validation, rate limiting, and encryption at rest and in transit." },
      { title: "API-First Approach", description: "Well-documented APIs with versioning, so your frontend, mobile, and third-party integrations stay in sync." },
      { title: "Observability Built In", description: "Structured logging, distributed tracing, and health checks from day one — not an afterthought." },
    ],
    faqs: [
      { question: "SQL or NoSQL?", answer: "Depends on your data. PostgreSQL for relational data with complex queries. MongoDB for document-based flexible schemas. We often use both in the same system." },
      { question: "How do you handle authentication?", answer: "JWT with refresh tokens for most apps. OAuth2/SSO for enterprise. We implement role-based access control (RBAC) with fine-grained permissions." },
      { question: "Can you optimize our existing database?", answer: "Yes. We audit query performance, add proper indexing, implement caching with Redis, and can migrate to more efficient schemas." },
    ],
    useCases: [
      "RESTful and GraphQL API development",
      "Real-time systems (chat, notifications, live feeds)",
      "Payment processing and billing systems",
      "Content management systems",
      "Data processing pipelines",
      "Third-party API integrations",
    ],
  },
  {
    id: "5",
    title: "Full-Stack Development",
    slug: "fullstack",
    icon: "Layers",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    description:
      "End-to-end product delivery — from database to pixel — with a single, synchronized team. Faster shipping, fewer miscommunications.",
    features: [
      "End-to-End Product Development",
      "SaaS Platforms",
      "Marketplace Solutions",
      "Real-time Applications",
      "DevOps Integration",
      "Continuous Delivery",
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
    detailedContent:
      "Our full-stack teams own the entire product — from database schema to UI components. This eliminates handoff delays, reduces miscommunication, and accelerates delivery. We build SaaS platforms, marketplaces, and complex web apps with a single, cohesive team that ships features end-to-end.",
    process: [
      { step: "01", title: "Product Sprint", description: "2-week sprints with working demos, stakeholder feedback, and continuous backlog refinement. You see working software every two weeks." },
      { step: "02", title: "Vertical Slices", description: "Building features top-to-end (UI → API → DB) in each sprint for immediate testability and demo readiness." },
      { step: "03", title: "Quality Gates", description: "Automated testing, code reviews, and CI/CD pipelines ensure every commit is production-ready." },
      { step: "04", title: "Ship & Iterate", description: "Deploy to production, monitor metrics, gather user feedback, and iterate based on real data." },
    ],
    stats: [
      { label: "Products Launched", value: "40+" },
      { label: "Avg Time to MVP", value: "8 weeks" },
      { label: "Sprint Velocity", value: "95%" },
      { label: "Client Retention", value: "92%" },
    ],
    whyChooseUs: [
      { title: "Single Team Efficiency", description: "No frontend/backend coordination overhead. One team, one vision, one delivery timeline." },
      { title: "MVP in 8 Weeks", description: "We've launched 40+ products. Our battle-tested process gets your MVP to market in 8 weeks." },
      { title: "Full Ownership", description: "We own the code, the infrastructure, and the deployment pipeline. One throat to choke." },
      { title: "Startup-Friendly", description: "Flexible engagement models — fixed price for MVPs, dedicated teams for scaling products." },
    ],
    faqs: [
      { question: "What's your typical team composition?", answer: "2-3 full-stack developers, 1 designer, 1 QA engineer, and a project manager. We scale up or down based on your needs." },
      { question: "Do you use a specific methodology?", answer: "Scrum with 2-week sprints. Daily standups, sprint planning, retrospectives, and demo sessions. We use Linear for project management." },
      { question: "How do you handle technical debt?", answer: "We allocate 20% of each sprint to tech debt and refactoring. This keeps code quality high without slowing feature delivery." },
    ],
    useCases: [
      "SaaS product development from scratch",
      "Marketplace platforms (B2B/B2C)",
      "Internal tool development",
      "Legacy system modernization",
      "MVP development for startups",
      "Product team augmentation",
    ],
  },
  {
    id: "6",
    title: "Branding & UI/UX Designing",
    slug: "ui-ux-design",
    icon: "Palette",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/uiux.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/uiux.png",
    description:
      "Designing, Building & Launching Great Digital Products",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "UI Design Systems",
      "Interaction Design",
      "Usability Audits",
      "Design Handoff",
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Maze", "Hotjar"],
    detailedContent:
      "Save time and money by allowing us to build unique interactive features. We work together to understand clients and what business goals they have. When designing products, we ensure a high-quality prototype.",
    process: [
      { step: "01", title: "User Research", description: "Interviews, surveys, competitor analysis, and persona development. We talk to your actual users before designing." },
      { step: "02", title: "Information Architecture", description: "User flows, sitemaps, and content strategy that make navigation intuitive and reduce cognitive load." },
      { step: "03", title: "Visual Design", description: "High-fidelity mockups, design tokens, and component libraries. We present 2-3 directions before narrowing down." },
      { step: "04", title: "Validate & Handoff", description: "Usability testing with real users, design QA during development, and pixel-perfect Figma handoff." },
    ],
    stats: [
      { label: "Designs Delivered", value: "200+" },
      { label: "User Satisfaction", value: "4.9/5" },
      { label: "Conversion Lift", value: "+35%" },
      { label: "Design Systems", value: "50+" },
    ],
    whyChooseUs: [
      { title: "Research-Backed Decisions", description: "Every design choice is validated with real user data, not personal preferences or trends." },
      { title: "Design Systems That Scale", description: "We create component libraries and design tokens that your team can extend for years." },
      { title: "Conversion Focused", description: "Our designs have helped clients increase conversion rates by an average of 35%." },
      { title: "Seamless Handoff", description: "Organized Figma files with auto-layout, variants, and documentation that developers love." },
    ],
    faqs: [
      { question: "How long does a design project take?", answer: "A landing page: 1-2 weeks. A full SaaS product: 4-6 weeks. Enterprise design system: 6-10 weeks." },
      { question: "Do you do branding too?", answer: "Yes. Logo design, brand guidelines, typography, color systems, and complete brand identity packages." },
      { question: "How many revision rounds?", answer: "We include 3 revision rounds per phase. Most projects don't need more because we validate with users early." },
    ],
    useCases: [
      "Complete product UI/UX redesign",
      "Design system creation and maintenance",
      "Mobile app UX design",
      "Landing page and marketing site design",
      "Brand identity and visual language",
      "UX audit and conversion optimization",
    ],
  },
  {
    id: "7",
    title: "Software Quality Assurance (QA)",
    slug: "qa-testing",
    icon: "TestTube2",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/qa.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/qa.png",
    description:
      "Ensuring That Your Product Code Is Flawless",
    features: [
      "Test Strategy & Planning",
      "Automated Testing (E2E, Unit, Integration)",
      "Performance Testing",
      "Security Testing",
      "API Testing",
      "Regression Testing",
    ],
    technologies: ["Playwright", "Jest", "Cypress", "Postman", "k6", "OWASP ZAP"],
    detailedContent:
      "Agile development environment ensures that automated and manual testing. buggcy not only likes to showcase its brilliant set of programming solutions.",
    process: [
      { step: "01", title: "Test Strategy", description: "Defining test coverage goals, test pyramid, automation priorities, and quality metrics aligned with business requirements." },
      { step: "02", title: "Automation Setup", description: "Building E2E, integration, and unit test frameworks. CI/CD integration so tests run on every commit." },
      { step: "03", title: "Execution", description: "Manual exploratory testing, performance benchmarking, security scanning, and cross-device compatibility checks." },
      { step: "04", title: "Report & Improve", description: "Detailed bug reports, severity classification, root cause analysis, and quality trend dashboards." },
    ],
    stats: [
      { label: "Bugs Caught", value: "5000+" },
      { label: "Test Coverage", value: "90%+" },
      { label: "Automated Tests", value: "10K+" },
      { label: "Avg Fix Time", value: "<4h" },
    ],
    whyChooseUs: [
      { title: "Shift-Left Testing", description: "We test early in the development cycle, catching 80% of bugs before they reach production." },
      { title: "Automation at Scale", description: "10,000+ automated tests running in CI/CD pipelines, catching regressions in minutes." },
      { title: "Security First", description: "OWASP top 10 scanning, penetration testing, and vulnerability assessments included." },
      { title: "Real Device Testing", description: "We test on real devices, not just emulators. iOS, Android, Chrome, Safari, Firefox — all covered." },
    ],
    faqs: [
      { question: "Manual or automated testing?", answer: "Both. Automated for regression and smoke tests (run every commit). Manual for exploratory, usability, and edge case testing." },
      { question: "What's your test coverage target?", answer: "90%+ unit test coverage, 80%+ integration coverage, and critical user journeys covered by E2E tests." },
      { question: "Can you test our existing product?", answer: "Yes. We start with a QA audit, identify gaps, build a test plan, and then execute. Most clients see 60% fewer production bugs." },
    ],
    useCases: [
      "Pre-launch QA for new products",
      "Regression test suite creation",
      "Performance and load testing",
      "Security vulnerability assessments",
      "Mobile device compatibility testing",
      "QA process consulting and setup",
    ],
  },
  {
    id: "8",
    title: "Product Support Services",
    slug: "product-support",
    icon: "HeadphonesIcon",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/suport.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/suport.png",
    description:
      "Endless Support Even After We Have Delivered",
    features: [
      "Software Quality Assurance",
      "Thorough Maintenance",
      "Support Service Up To 3rd Degree",
      "Analytics & Reporting",
      "Bug Fixes & Patches",
      "Performance Monitoring",
    ],
    technologies: ["Jira", "Sentry", "Datadog", "New Relic", "Grafana", "Prometheus"],
    detailedContent:
      "Work does not end when we deliver what you want. Our team handles your product as if they are our own. With buggcy, get a complete analysis of software.",
    process: [
      { step: "01", title: "Understand", description: "Stakeholder interviews, market research, user journeys, and problem framing to define the design challenge clearly." },
      { step: "02", title: "Diverge", description: "Brainstorming, sketching, crazy-8s, and exploring multiple solution directions rapidly." },
      { step: "03", title: "Prototype & Test", description: "Clickable prototypes tested with 5-8 real users per round. We iterate until usability scores hit 80+." },
      { step: "04", title: "Deliver", description: "Polished designs with specs, redlines, and Figma handoff. We stay through development for design QA." },
    ],
    stats: [
      { label: "Products Designed", value: "60+" },
      { label: "Design Sprints", value: "100+" },
      { label: "User Tests Run", value: "300+" },
      { label: "Ideas Validated", value: "95%" },
    ],
    whyChooseUs: [
      { title: "Speed to Insight", description: "5-day design sprints that go from problem to tested prototype in one week." },
      { title: "User-Centric Process", description: "We test with real users every week. No guessing — every decision is validated." },
      { title: "Business Thinking", description: "We don't just design screens. We design business models, monetization, and go-to-market strategies." },
      { title: "Developer Handoff", description: "Clean Figma files with auto-layout, variants, and interaction specs that developers can implement directly." },
    ],
    faqs: [
      { question: "What's a design sprint?", answer: "A 5-day process: Monday (map), Tuesday (sketch), Wednesday (decide), Thursday (prototype), Friday (test). We validate ideas before building them." },
      { question: "Do you work with our engineers?", answer: "Yes. We stay through development for design QA, answering questions, and making sure pixels match." },
      { question: "What if we don't have a clear problem?", answer: "That's where we start. Our discovery phase helps you define the right problem before we design solutions." },
    ],
    useCases: [
      "New product concept development",
      "Design sprint facilitation",
      "Existing product UX improvement",
      "Feature ideation and validation",
      "Competitive product analysis",
      "Design-to-development handoff",
    ],
  },
  {
    id: "9",
    title: "Enterprise Software Development",
    slug: "enterprise-software",
    icon: "Building2",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/erp.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/erp.png",
    description:
      "Providing a Firm Software Foundation for Businesses",
    features: [
      "ERP Systems",
      "CRM Solutions",
      "Custom Enterprise Apps",
      "System Integration",
      "Legacy Modernization",
      "Workflow Automation",
    ],
    technologies: ["Java", ".NET", "React", "Node.js", "PostgreSQL", "AWS"],
    detailedContent:
      "At buggcy, our expertise in the wide spectrum of the technology enables us to skilfully provide services. A well-structured enterprise software development company has a systematic process.",
    process: [
      { step: "01", title: "Problem Framing", description: "Defining the ML problem, success metrics, data requirements, and feasibility assessment with stakeholders." },
      { step: "02", title: "Data & Model", description: "Data collection, cleaning, feature engineering, model selection, training, and validation with proper train/test splits." },
      { step: "03", title: "Integration", description: "Building inference APIs, embedding models into products, and setting up real-time prediction pipelines." },
      { step: "04", title: "Monitor & Improve", description: "Model performance monitoring, drift detection, A/B testing, and continuous retraining with new data." },
    ],
    stats: [
      { label: "Models Deployed", value: "25+" },
      { label: "Accuracy Rate", value: "95%+" },
      { label: "Data Processed", value: "10TB+" },
      { label: "Cost Savings", value: "40%" },
    ],
    whyChooseUs: [
      { title: "Production-First AI", description: "We don't just build models in Jupyter notebooks. We deploy them to production with monitoring and alerting." },
      { title: "Custom > Generic", description: "Off-the-shelf AI gets you 70%. We build custom models that get you to 95%+ accuracy for your specific use case." },
      { title: "Data Pipeline Expertise", description: "Clean data is half the battle. We build robust ETL pipelines that prepare data for ML automatically." },
      { title: "ROI Focused", description: "Every AI project starts with a business case. We measure impact in dollars saved or revenue gained." },
    ],
    faqs: [
      { question: "Do we need a lot of data?", answer: "Not always. Transfer learning and fine-tuning pre-trained models can work with 100-1000 labeled examples. We assess your data during discovery." },
      { question: "LLM or custom model?", answer: "LLMs for language tasks with broad knowledge. Custom models for domain-specific tasks requiring high accuracy. We help you choose." },
      { question: "How do you handle data privacy?", answer: "On-premise deployment, data anonymization, federated learning, and compliance with GDPR/CCPA. Your data never leaves your infrastructure." },
    ],
    useCases: [
      "Intelligent document processing (OCR + NLP)",
      "Recommendation engines",
      "Predictive maintenance for manufacturing",
      "Customer churn prediction",
      "AI-powered search and chatbots",
      "Fraud detection systems",
    ],
  },
  {
    id: "10",
    title: "Big Data & Data Science",
    slug: "big-data",
    icon: "BarChart3",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/big-data.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/big-data.png",
    description:
      "Drive Your Business Forward Using Big Data",
    features: [
      "Data Analytics",
      "Machine Learning Models",
      "Business Intelligence",
      "Predictive Analytics",
      "Data Pipelines",
      "Visualization Dashboards",
    ],
    technologies: ["Python", "Apache Spark", "Kafka", "Tableau", "Power BI", "AWS Redshift"],
    detailedContent:
      "Multiple streams of structured and unstructured data won't get organized unless you hire professionals. All forms of structured and unstructured data are meaningless unless proper algorithms are placed.",
    process: [
      { step: "01", title: "Data Audit", description: "Assessing data sources, quality, volume, and availability. Identifying gaps and building a data strategy." },
      { step: "02", title: "Pipeline Build", description: "ETL/ELT pipelines that clean, transform, and load data into your analytics warehouse. Real-time or batch." },
      { step: "03", title: "Model & Analyze", description: "Statistical analysis, ML modeling, cohort analysis, and pattern discovery across your datasets." },
      { step: "04", title: "Visualize & Act", description: "Interactive dashboards, automated reports, and alerts that surface insights to the right people at the right time." },
    ],
    stats: [
      { label: "Pipelines Built", value: "80+" },
      { label: "Data Processed Daily", value: "5TB+" },
      { label: "Dashboards Created", value: "150+" },
      { label: "Decision Speed", value: "3x faster" },
    ],
    whyChooseUs: [
      { title: "End-to-End Data", description: "From raw data collection to executive dashboards. We handle the entire data lifecycle." },
      { title: "Real-Time Capabilities", description: "Kafka-based streaming pipelines that process millions of events per second for real-time analytics." },
      { title: "Cost Optimization", description: "We right-size your data infrastructure, reducing cloud costs by 30-50% while improving performance." },
      { title: "Actionable Insights", description: "Dashboards that answer business questions, not just display charts. Every visualization has a purpose." },
    ],
    faqs: [
      { question: "What data tools do you work with?", answer: "Spark, Kafka, Airflow, dbt for pipelines. PostgreSQL, Redshift, BigQuery for warehouses. Tableau, Power BI, Metabase for visualization." },
      { question: "Real-time or batch processing?", answer: "Depends on your use case. Real-time for fraud detection, live dashboards. Batch for nightly reports, historical analysis. We often implement both." },
      { question: "Can you clean our messy data?", answer: "That's usually step one. We build data quality pipelines that deduplicate, validate, and standardize data automatically." },
    ],
    useCases: [
      "Customer analytics and segmentation",
      "Sales forecasting and pipeline analytics",
      "Operational efficiency dashboards",
      "Marketing attribution and ROI tracking",
      "Supply chain analytics",
      "Financial reporting automation",
    ],
  },
  {
    id: "11",
    title: "Cryptography & IoT",
    slug: "cybersecurity",
    icon: "ShieldCheck",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/iot.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/iot.png",
    description:
      "Adding Confidence to the Internet of Things & Much More",
    features: [
      "Encryption Solutions",
      "Penetration Testing",
      "IoT Device Integration",
      "Smart Home Systems",
      "Industrial IoT",
      "Security Audits",
    ],
    technologies: ["Node.js", "Python", "MQTT", "AWS IoT", "Raspberry Pi", "TensorFlow"],
    detailedContent:
      "We offer cryptography-based security solutions, and IOT consultancy to businesses across a wide range of sectors. buggcy works to limit the access to protected systems and data to only authorized devices and users.",
    process: [
      { step: "01", title: "Security Assessment", description: "Vulnerability scanning, penetration testing, code review, and threat modeling for your entire stack." },
      { step: "02", title: "Architecture", description: "Designing zero-trust architectures, encryption strategies, and access control policies." },
      { step: "03", title: "Implement", description: "Building secure IoT pipelines, implementing encryption at rest and in transit, setting up WAF and IDS." },
      { step: "04", title: "Monitor & Respond", description: "24/7 security monitoring, incident response playbooks, and regular penetration testing." },
    ],
    stats: [
      { label: "Vulnerabilities Found", value: "2000+" },
      { label: "IoT Devices Managed", value: "10K+" },
      { label: "Security Incidents", value: "0" },
      { label: "Compliance", value: "SOC2, HIPAA" },
    ],
    whyChooseUs: [
      { title: "Zero Trust Architecture", description: "We assume breach and design systems that verify every request, regardless of origin." },
      { title: "IoT + Security Expertise", description: "Rare combination of hardware integration and security engineering in one team." },
      { title: "Compliance Ready", description: "SOC2, HIPAA, GDPR, PCI DSS — we build compliance into your infrastructure from day one." },
      { title: "Incident Response", description: "Proven incident response playbooks. When (not if) something happens, we respond in minutes." },
    ],
    faqs: [
      { question: "Do you do penetration testing?", answer: "Yes. Black box, white box, and gray box pen testing. We test web apps, APIs, mobile apps, and network infrastructure." },
      { question: "What IoT platforms do you support?", answer: "AWS IoT, Azure IoT Hub, Google Cloud IoT, MQTT, CoAP, and custom protocols. We work with any hardware that has an IP stack." },
      { question: "How do you handle compliance?", answer: "We build compliance controls into your infrastructure. Automated auditing, access logging, encryption key rotation — all built in." },
    ],
    useCases: [
      "Smart home and building automation",
      "Industrial IoT (IIoT) monitoring",
      "Connected healthcare devices",
      "Fleet tracking and telematics",
      "Security audit and remediation",
      "Compliance implementation (SOC2, HIPAA)",
    ],
  },
  {
    id: "12",
    title: "DevOps",
    slug: "devops",
    icon: "Cloud",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/devops.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/devops.png",
    description:
      "Let Our Engineers Define The Best Strategy For You!",
    features: [
      "CI/CD Pipelines",
      "Cloud Migration",
      "Infrastructure as Code",
      "Container Orchestration",
      "Monitoring & Alerting",
      "Security Automation",
    ],
    technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Jenkins"],
    detailedContent:
      "DevOps development is a set of practices that bridge and automate the work happening between the development team and the IT operations teams. Our belief in Agile methodology ensures that you get your product sooner with the best experience.",
    process: [
      { step: "01", title: "Infrastructure Audit", description: "Reviewing current setup, identifying bottlenecks, security gaps, and cost optimization opportunities." },
      { step: "02", title: "Automate", description: "Building CI/CD pipelines, IaC templates (Terraform/Pulumi), and container orchestration with Kubernetes." },
      { step: "03", title: "Migrate & Deploy", description: "Executing cloud migrations with blue-green deployments, canary releases, and zero-downtime strategies." },
      { step: "04", title: "Monitor & Scale", description: "Prometheus/Grafana dashboards, auto-scaling policies, cost alerts, and incident response automation." },
    ],
    stats: [
      { label: "Deploy Frequency", value: "50x/day" },
      { label: "Downtime Reduced", value: "90%" },
      { label: "Cloud Cost Savings", value: "30%" },
      { label: "MTTR", value: "<15min" },
    ],
    whyChooseUs: [
      { title: "Infrastructure as Code", description: "Every server, network, and resource is version-controlled. Reproduce your entire infrastructure from Git." },
      { title: "Zero-Downtime Deployments", description: "Blue-green and canary deployments ensure your users never see a maintenance page." },
      { title: "Cost Optimization", description: "We regularly save clients 30% on cloud bills through right-sizing, spot instances, and reserved capacity." },
      { title: "24/7 Monitoring", description: "Prometheus, Grafana, PagerDuty — we set up alerting that notifies the right person before users notice." },
    ],
    faqs: [
      { question: "AWS or Azure or GCP?", answer: "We're cloud-agnostic but AWS-certified. We recommend based on your needs: AWS for breadth, Azure for Microsoft shops, GCP for data/AI workloads." },
      { question: "How long does cloud migration take?", answer: "Depends on complexity. A simple lift-and-shift: 4-8 weeks. A full re-architecture: 3-6 months. We provide a detailed plan after audit." },
      { question: "Do you offer managed DevOps?", answer: "Yes. We can manage your infrastructure ongoing with SLAs for uptime, response time, and cost optimization." },
    ],
    useCases: [
      "Cloud migration (on-prem to AWS/Azure/GCP)",
      "CI/CD pipeline setup and optimization",
      "Kubernetes cluster management",
      "Infrastructure cost optimization",
      "Disaster recovery and backup strategies",
      "Compliance automation (SOC2, HIPAA)",
    ],
  },
  {
    id: "13",
    title: "Data Scraping",
    slug: "data-scraping",
    icon: "ScanLine",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/data-scraping.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/data-scraping.png",
    description:
      "Accurate, scalable data extraction for market research, lead generation, and competitive intelligence.",
    features: [
      "Web Scraping",
      "Data Extraction",
      "Real-time Data Feeds",
      "Competitor Monitoring",
      "Lead Generation Data",
      "Custom Crawlers",
    ],
    technologies: ["Python", "Scrapy", "Puppeteer", "Beautiful Soup", "Selenium", "PostgreSQL"],
    detailedContent:
      "If you require accurate and reliable datasets with unlimited scale, select from our one-off subscription-based or enterprise services to get the best crawl engineers. buggcy provides custom tools that can scan the web and extract the exact information you need.",
    process: [
      { step: "01", title: "Source Analysis", description: "Analyzing target websites, page structures, anti-bot measures, and data extraction requirements." },
      { step: "02", title: "Crawler Build", description: "Custom scrapers with proxy rotation, rate limiting, CAPTCHA handling, and retry logic." },
      { step: "03", title: "Clean & Validate", description: "Data deduplication, normalization, format conversion, and quality validation against source data." },
      { step: "04", title: "Deliver & Monitor", description: "Automated delivery via API, SFTP, or database. Monitoring for site changes with auto-adaptation." },
    ],
    stats: [
      { label: "Pages Scraped Daily", value: "1M+" },
      { label: "Data Accuracy", value: "99.5%" },
      { label: "Clients Served", value: "50+" },
      { label: "Delivery Uptime", value: "99.9%" },
    ],
    whyChooseUs: [
      { title: "Anti-Bot Evasion", description: "We handle CAPTCHAs, IP rotation, browser fingerprinting, and rate limiting to keep scrapers running." },
      { title: "Structured Output", description: "Clean JSON, CSV, or database-ready data. No HTML parsing required on your end." },
      { title: "Site Change Detection", description: "Our crawlers auto-detect site changes and adapt. You get consistent data even when targets update." },
      { title: "Flexible Delivery", description: "API endpoints, webhooks, S3 drops, or database inserts — we deliver data how you need it." },
    ],
    faqs: [
      { question: "Is web scraping legal?", answer: "Public data scraping is legal in most jurisdictions. We comply with robots.txt, rate limits, and terms of service. We don't scrape private or authenticated data." },
      { question: "How do you handle site changes?", answer: "Our crawlers monitor page structure and alert when changes are detected. We update extraction rules within 24 hours." },
      { question: "What data formats do you deliver?", answer: "JSON, CSV, XML, or direct database insertion. We can also set up real-time API endpoints for live data access." },
    ],
    useCases: [
      "Competitor price monitoring",
      "Lead generation and contact enrichment",
      "Market research data collection",
      "Real estate listing aggregation",
      "Job market analysis",
      "Social media sentiment data",
    ],
  },
  {
    id: "14",
    title: "Product Management",
    slug: "product-management",
    icon: "Package",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/product-mangament.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/product-mangament.png",
    description:
      "Technology Solutions for Your Product",
    features: [
      "Product Strategy",
      "Roadmap Planning",
      "Agile Development",
      "Sprint Management",
      "Stakeholder Reporting",
      "Launch Planning",
    ],
    technologies: ["Jira", "Confluence", "Notion", "Slack", "Linear", "Miro"],
    detailedContent:
      "Our technical proficiency and business acumen enable us to develop your product and deliver it on time. At buggcy we understand how much the UXD contributes.",
    process: [
      { step: "01", title: "Business Analysis", description: "Mapping workflows, identifying inefficiencies, interviewing stakeholders, and defining transformation roadmap." },
      { step: "02", title: "Solution Design", description: "Architecture planning, technology selection, integration mapping, and compliance requirements gathering." },
      { step: "03", title: "Build & Integrate", description: "Modular development, data migration, third-party integrations, and user acceptance testing." },
      { step: "04", title: "Deploy & Train", description: "Phased rollout, user training programs, documentation, and ongoing support with SLAs." },
    ],
    stats: [
      { label: "Enterprise Clients", value: "30+" },
      { label: "Systems Modernized", value: "100+" },
      { label: "Process Efficiency", value: "+45%" },
      { label: "ROI Delivered", value: "3x" },
    ],
    whyChooseUs: [
      { title: "Enterprise Scale", description: "We've built systems handling 100K+ users, millions of transactions, and petabytes of data." },
      { title: "Compliance Expertise", description: "SOC2, HIPAA, GDPR, SOX — we build compliance controls into enterprise systems from day one." },
      { title: "Legacy Modernization", description: "We modernize COBOL, mainframe, and legacy .NET systems without disrupting business operations." },
      { title: "Change Management", description: "Training programs, documentation, and phased rollouts that ensure user adoption." },
    ],
    faqs: [
      { question: "Build or buy?", answer: "We help you decide. Custom build for competitive differentiators. Buy/COTS for commodity functions. We integrate both seamlessly." },
      { question: "How do you handle legacy systems?", answer: "Strangler fig pattern — we incrementally replace legacy components without big-bang rewrites. Zero downtime." },
      { question: "Do you provide training?", answer: "Yes. Custom training programs, video tutorials, documentation, and ongoing support. We ensure your team adopts the new system." },
    ],
    useCases: [
      "Custom ERP implementation",
      "CRM customization and integration",
      "Legacy system modernization",
      "Workflow automation platforms",
      "Document management systems",
      "Business intelligence and reporting",
    ],
  },
  {
    id: "15",
    title: "UI/UX Design",
    slug: "ui-ux-design-fallback",
    icon: "Palette",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/uiux.png",
    secondaryImageUrl: "https://buggcy.com/wp-content/uploads/2020/06/uiux.png",
    description:
      "Research-driven design that creates intuitive, beautiful digital experiences. We don't just make things pretty — we make them work.",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "UI Design Systems",
      "Interaction Design",
      "Usability Audits",
      "Design Handoff",
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Maze", "Hotjar"],
    detailedContent:
      "We craft memorable brands and intuitive digital experiences. Our design team conducts user research, builds wireframes and prototypes, and delivers pixel-perfect interfaces. We create design systems that scale with your product and ensure every touchpoint reflects your brand identity.",
    process: [
      { step: "01", title: "Discover", description: "User research, market analysis, competitive landscape, and opportunity sizing to validate product ideas." },
      { step: "02", title: "Define", description: "PRDs, user stories, acceptance criteria, prioritized roadmaps, and success metrics." },
      { step: "03", title: "Execute", description: "Sprint planning, daily standups, stakeholder updates, blocker removal, and quality gate enforcement." },
      { step: "04", title: "Launch & Measure", description: "Go-to-market coordination, release management, KPI tracking, and post-launch iteration." },
    ],
    stats: [
      { label: "Products Shipped", value: "45+" },
      { label: "On-Time Delivery", value: "95%" },
      { label: "Features Launched", value: "500+" },
      { label: "Client NPS", value: "85" },
    ],
    whyChooseUs: [
      { title: "Technical PMs", description: "Our PMs write SQL, read code, and talk to engineers in their language. No translation layer needed." },
      { title: "Data-Driven Prioritization", description: "RICE, MoSCoW, Kano — we use frameworks backed by data, not HiPPO opinions." },
      { title: "Stakeholder Alignment", description: "Weekly demos, monthly business reviews, and transparent roadmaps keep everyone on the same page." },
      { title: "Outcome Focused", description: "We measure success by business outcomes (revenue, retention), not output (features shipped)." },
    ],
    faqs: [
      { question: "Do you provide just a PM or a full team?", answer: "Both. Dedicated PM, or PM + design + engineering team. We scope based on your needs and budget." },
      { question: "What tools do you use?", answer: "Linear for issue tracking, Notion for docs, Figma for design, Slack for comms. We adapt to your existing tools." },
      { question: "How do you handle scope creep?", answer: "Clear PRDs, defined acceptance criteria, and a change request process. We're flexible but disciplined." },
    ],
    useCases: [
      "Product strategy and roadmap creation",
      "Agile process setup and facilitation",
      "Product team augmentation",
      "Go-to-market planning",
      "Product-market fit validation",
      "Stakeholder reporting and communication",
    ],
  },
];

export const mockIndustries: Industry[] = [
  {
    id: "1",
    title: "Healthcare",
    slug: "healthcare",
    icon: "HeartPulse",
    description:
      "Reshaping Healthcare With Custom Software Development",
    heroSubtitle: "From Telemedicine to AI Diagnostics. Built to Improve Patient Outcomes.",
    heroCta: "Get My Free Healthcare Tech Review",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/Healthcare-1.png",
    features: [
      "Telemedicine Platforms",
      "Electronic Health Records (EHR)",
      "Patient Management Systems",
      "Medical IoT Devices",
      "Health Data Analytics",
      "HIPAA Compliance",
    ],
    challenges: [
      "Strict regulatory compliance (HIPAA, GDPR)",
      "Sensitive patient data security",
      "Integration with legacy hospital systems",
      "Real-time monitoring requirements",
    ],
    solutions: [
      "HIPAA-compliant cloud architecture with end-to-end encryption",
      "FHIR-based interoperability for EHR integration",
      "Real-time patient monitoring dashboards",
      "AI-powered diagnostics and predictive analytics",
    ],
    technologies: ["React", "Node.js", "Python", "AWS Healthcare", "FHIR", "TensorFlow"],
    detailedContent:
      "Keeping up with a digitally transforming healthcare industry should not be overwhelming when you have the right people guiding you. We specialize in building and implementing growth models using the latest healthcare software development methodologies.",
    challengesDetailed: [
      {
        title: "Regulatory Compliance and Patient Trust",
        description: "Healthcare is one of the most heavily regulated industries in the world. HIPAA in the United States, GDPR in Europe, and dozens of regional regulations create a complex compliance landscape that affects every layer of the technology stack. A single compliance violation can result in millions in fines and irreparable damage to patient trust. Most engineering teams underestimate the depth of compliance requirements until they are deep into development, at which point retrofitting compliance becomes exponentially more expensive."
      },
      {
        title: "Data Security and Privacy",
        description: "Patient health information is among the most sensitive data that exists. Unlike financial data, which can be reset after a breach, medical records contain immutable information about diagnoses, treatments, and genetic data. Healthcare organizations are the number one target for cyberattacks, and a single breach can expose millions of patient records. Building secure healthcare systems requires encryption at rest and in transit, role-based access controls, audit logging, and continuous security monitoring."
      },
      {
        title: "Legacy System Integration",
        description: "Most hospitals and healthcare providers run on legacy systems that were designed decades ago. These systems were never built for modern interoperability, yet they contain critical patient data that cannot be lost or disrupted. Integrating modern digital health solutions with HL7, FHIR, and proprietary hospital systems requires deep domain expertise and careful architecture that maintains data integrity while enabling new capabilities."
      },
      {
        title: "Real-Time Clinical Decision Support",
        description: "Patient monitoring systems, clinical decision support tools, and emergency response platforms demand sub-second response times where delays can directly impact patient outcomes. Building systems that process thousands of vital signs per second, trigger alerts based on complex medical rules, and present actionable information to clinicians requires specialized architecture that balances speed with accuracy."
      },
    ],
    lifecycle: [
      { step: "01", title: "Telemedicine and Virtual Care", description: "We build HIPAA-compliant telemedicine platforms that connect patients with healthcare providers through secure video consultations, real-time messaging, and digital prescription management. Our platforms support multi-provider scheduling, patient intake workflows, and integrated payment processing." },
      { step: "02", title: "Electronic Health Records", description: "Custom EHR systems that streamline clinical documentation, reduce administrative burden, and improve care coordination. We build FHIR-compliant record systems that integrate with existing hospital infrastructure while providing modern interfaces for healthcare professionals." },
      { step: "03", title: "AI-Powered Diagnostics", description: "Machine learning models trained on medical imaging, lab results, and patient history to assist healthcare professionals in making faster, more accurate diagnoses. Our AI diagnostic tools have helped reduce diagnostic turnaround times by up to 60%." },
      { step: "04", title: "Remote Patient Monitoring", description: "IoT-connected devices and dashboards that enable continuous patient monitoring outside the hospital. Our RPM platforms collect vital signs in real-time, trigger alerts for abnormal readings, and provide clinicians with actionable insights." },
      { step: "05", title: "Health Data Analytics", description: "Analytics platforms that transform raw healthcare data into actionable insights for clinical decision-making, operational optimization, and population health management. Our dashboards help healthcare organizations identify trends, reduce costs, and improve patient outcomes." },
      { step: "06", title: "Hospital Management Systems", description: "Comprehensive hospital management platforms that integrate patient registration, bed management, pharmacy, laboratory, billing, and administrative functions into a unified system. Our HMS solutions reduce operational costs while improving care quality." },
    ],
    approach: [
      { step: "01", title: "Compliance-First Discovery", description: "We map your clinical workflows, regulatory requirements, patient data flows, and integration needs. The output is a compliance-first architecture blueprint that ensures every feature is built with HIPAA, GDPR, and regional regulations baked in from day one." },
      { step: "02", title: "Core Platform Build", description: "HIPAA-compliant infrastructure, secure data pipelines, FHIR integration layers, and the core clinical features are built in the correct sequence. Each layer is tested before the next is added so compliance does not become a bottleneck." },
      { step: "03", title: "AI and Analytics Layer", description: "Diagnostic AI models, predictive analytics, and clinical decision support tools are added as structured layers. Each model is validated against medical datasets and integrated with the clinical workflow." },
      { step: "04", title: "Validation and Deployment", description: "Security audits, penetration testing, compliance validation, and HIPAA certification support. We prepare the documentation your compliance team needs and support you through the certification process." },
    ],
    stats: [
      { value: "50+", label: "Healthcare Projects" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "10M+", label: "Patient Records Managed" },
      { value: "HIPAA", label: "Compliant" },
    ],
    relatedServices: [
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "AI & ML Solutions", href: "/services/ai-ml" },
      { title: "Cloud & DevOps", href: "/services/devops" },
      { title: "QA & Testing", href: "/services/qa-testing" },
    ],
    successStories: [
      {
        slug: "ai-patient-management",
        title: "MedCare: AI-Powered Patient Management System",
        problem: "MedCare Health Network was struggling with fragmented patient records across 12 hospitals, inefficient scheduling that left doctors idle and patients waiting, and diagnosis turnaround times thataveraged 72 hours. Staff spent hours on manual data entry while patients faced long wait times for results.",
        solution: "We built a unified AI-powered patient management platform that integrated all EHR systems into a single FHIR-compliant architecture, implemented智能 scheduling algorithms that reduced wait times by 40%, and deployed ML-based diagnostic assistance tools that cut diagnosis turnaround from 72 hours to under 24 hours.",
        results: [
          { value: "40%", label: "Cost Reduction" },
          { value: "60%", label: "Faster Diagnosis" },
        ],
      },
      {
        slug: "remote-patient-monitoring",
        title: "HealthFirst: Remote Patient Monitoring Platform",
        problem: "HealthFirst needed to monitor 5,000 chronic disease patients across multiple locations but their existing tools could not handle real-time vital sign processing, leading to delayed interventions and preventable hospital readmissions.",
        solution: "We built an IoT-connected RPM platform that processes 50,000 vital signs per minute, triggers intelligent alerts based on patient-specific thresholds, and provides clinicians with dashboards that prioritize patients by risk level.",
        results: [
          { value: "50%", label: "Fewer Readmissions" },
          { value: "24/7", label: "Patient Monitoring" },
        ],
      },
    ],
    testimonials: [
      { quote: "Buggcy delivered a HIPAA-compliant telemedicine platform that our doctors actually enjoy using. The integration with our legacy EHR was seamless and took weeks instead of the months other vendors quoted.", name: "Dr. Sarah Chen", role: "CTO", company: "MedLink Health", location: "San Francisco, USA" },
      { quote: "The team understood healthcare compliance from day one. They didn't just build features — they built with patient safety as the priority. Their AI diagnostic tool reduced our turnaround time by 60%.", name: "James Wright", role: "VP Engineering", company: "CarePoint Digital", location: "London, UK" },
      { quote: "We had worked with three other development teams before Buggcy. The difference was the engineering discipline and deep healthcare domain knowledge. They wrote code we could actually maintain and scale.", name: "Dr. Michael Park", role: "Chief Medical Informatics Officer", company: "Pacific Health Systems", location: "Toronto, Canada" },
    ],
  },
  {
    id: "2",
    title: "Education",
    slug: "education",
    icon: "GraduationCap",
    description:
      "E-Learning Opportunities for Brighter Tomorrow",
    heroSubtitle: "From LMS to Adaptive Learning. Built to Transform How People Learn.",
    heroCta: "Get My Free EdTech Review",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/Education-1.png",
    features: [
      "Learning Management Systems",
      "Virtual Classrooms",
      "Student Information Systems",
      "Adaptive Learning Platforms",
      "Assessment & Grading Tools",
      "Parent-Teacher Portals",
    ],
    challenges: [
      "Engaging diverse learning styles at scale",
      "Managing large volumes of student data",
      "Ensuring accessibility across devices",
      "Integrating with existing school infrastructure",
    ],
    solutions: [
      "AI-driven personalized learning paths for each student",
      "Gamified learning modules that boost engagement",
      "Cloud-native LMS with real-time collaboration tools",
      "Analytics dashboards for educators and administrators",
    ],
    technologies: ["React", "Next.js", "Python", "WebSocket", "PostgreSQL", "AWS"],
    detailedContent:
      "buggcy has worked on some amazing and out-of-box educational software development projects to create solutions to distant learning. With mobile access almost everywhere around us, so are the digital publishing platforms.",
    challengesDetailed: [
      {
        title: "Student Engagement at Scale",
        description: "Keeping students engaged across thousands of concurrent users while personalizing the learning experience for each individual is one of the hardest challenges in EdTech. Traditional one-size-fits-all approaches fail because students learn at different paces, have different preferences, and require different types of content to stay motivated."
      },
      {
        title: "Data Privacy for Minors",
        description: "Educational platforms handle some of the most sensitive data — information about minors. COPPA in the United States, FERPA for educational records, and GDPR in Europe create strict requirements for how student data is collected, stored, and shared. A single compliance violation can result in severe penalties and loss of institutional trust."
      },
      {
        title: "Accessibility Across Devices",
        description: "Students access educational platforms from smartphones, tablets, laptops, and desktop computers — often with varying bandwidth conditions. Platforms must work flawlessly across all devices, comply with WCAG accessibility standards, and provide a consistent experience regardless of connection speed."
      },
      {
        title: "Legacy Infrastructure Integration",
        description: "Schools and universities run on legacy student information systems, grading platforms, and administrative tools that were never designed for modern interoperability. Integrating new EdTech solutions with these systems while maintaining data integrity requires careful architecture and deep institutional knowledge."
      },
    ],
    lifecycle: [
      { step: "01", title: "Learning Management Systems", description: "Full-featured LMS platforms with course management, content delivery, progress tracking, and assessment tools. Our LMS solutions support SCORM, xAPI, and LTI standards for maximum interoperability." },
      { step: "02", title: "Virtual Classrooms", description: "Real-time virtual classroom solutions with HD video, interactive whiteboards, screen sharing, breakout rooms, and recording capabilities. Built to handle thousands of concurrent students with sub-second latency." },
      { step: "03", title: "Adaptive Learning", description: "AI-powered adaptive learning engines that personalize content based on student performance, learning style, and pace. Our systems continuously adjust difficulty and content type to maximize learning outcomes." },
      { step: "04", title: "Assessment and Analytics", description: "Automated assessment tools with plagiarism detection, rubric-based grading, and detailed analytics dashboards for educators. Real-time insights into student performance and learning gaps." },
      { step: "05", title: "Student Information Systems", description: "Comprehensive SIS platforms that manage enrollment, scheduling, grades, attendance, and communication between students, parents, and educators." },
      { step: "06", title: "Content Authoring Tools", description: "Interactive content creation tools that enable educators to build engaging courses with multimedia, quizzes, and interactive exercises — no coding required." },
    ],
    approach: [
      { step: "01", title: "Learning Design Discovery", description: "We map curriculum goals, student personas, institutional requirements, and existing infrastructure to create a platform blueprint that supports both current needs and future growth." },
      { step: "02", title: "Core Platform Build", description: "LMS engine, content delivery system, and assessment tools built with scalability in mind. Each module is tested independently before integration." },
      { step: "03", title: "AI and Personalization Layer", description: "Adaptive learning algorithms, recommendation engines, and analytics dashboards are added. Each model is trained on educational data and validated against learning outcomes." },
      { step: "04", title: "Launch and Optimization", description: "Phased rollout with educator training, student onboarding, and continuous optimization based on learning data and user feedback." },
    ],
    stats: [
      { value: "30+", label: "EdTech Projects" },
      { value: "500K+", label: "Students Served" },
      { value: "40%", label: "Engagement Increase" },
      { value: "99.9%", label: "Platform Uptime" },
    ],
    relatedServices: [
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "AI & ML Solutions", href: "/services/ai-ml" },
      { title: "UI/UX Design", href: "/services/ui-ux-design" },
      { title: "Cloud & DevOps", href: "/services/devops" },
    ],
    successStories: [
      {
        slug: "adaptive-learning-platform",
        title: "LearnPath: AI-Powered Adaptive Learning Platform",
        problem: "LearnPath's existing LMS used a one-size-fits-all approach that failed to engage students with different learning styles. Completion rates were below 30% and educators had no visibility into where students were struggling.",
        solution: "We built an AI-powered adaptive learning engine that personalizes content based on student performance, learning pace, and engagement patterns. The system continuously adjusts difficulty and content type to maximize learning outcomes.",
        results: [
          { value: "45%", label: "Higher Completion Rates" },
          { value: "60%", label: "Better Learning Outcomes" },
        ],
      },
      {
        slug: "virtual-campus-platform",
        title: "Pacific University: Virtual Campus Platform",
        problem: "Pacific University needed to transition 20,000 students to remote learning during a crisis but their existing tools could not handle concurrent video sessions, leading to constant crashes and student frustration.",
        solution: "We built a scalable virtual campus platform with HD video classrooms, interactive whiteboards, and real-time collaboration tools that handled 20,000 concurrent students with zero downtime.",
        results: [
          { value: "20K", label: "Concurrent Students" },
          { value: "99.9%", label: "Uptime" },
        ],
      },
    ],
    testimonials: [
      { quote: "Buggcy built an LMS that our students actually want to use. The adaptive learning engine improved completion rates by 45% and gave our educators insights they never had before.", name: "Dr. Michael Park", role: "Dean of Digital Learning", company: "Pacific University", location: "San Francisco, USA" },
      { quote: "The virtual classroom platform handled 10,000 concurrent students flawlessly. The team understood education technology deeply and delivered on time.", name: "Lisa Thompson", role: "CEO", company: "LearnPath", location: "New York, USA" },
      { quote: "What impressed us most was the design thinking. They didn't just execute the brief, they pushed back with better ideas. The final product looks and feels nothing like a typical EdTech app.", name: "Aiko Tanaka", role: "VP of Product", company: "STORYMII", location: "New Jersey, USA" },
    ],
  },
  {
    id: "3",
    title: "Finance",
    slug: "finance",
    icon: "Landmark",
    description:
      "Gain Efficiency Through Fintech Development",
    heroSubtitle: "From Payments to Trading. Built to Handle Money at Scale.",
    heroCta: "Get My Free FinTech Review",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/Finance-1.png",
    features: [
      "Payment Processing Systems",
      "Digital Banking Solutions",
      "Trading Platforms",
      "Blockchain & Crypto",
      "Fraud Detection",
      "Regulatory Compliance (PCI DSS)",
    ],
    challenges: [
      "Real-time transaction processing at scale",
      "Financial fraud prevention and detection",
      "Strict regulatory and compliance requirements",
      "High availability and zero-downtime needs",
    ],
    solutions: [
      "Event-driven microservices for real-time transaction processing",
      "ML-powered fraud detection with sub-second response times",
      "PCI DSS Level 1 compliant payment infrastructure",
      "Multi-region deployment with automatic failover",
    ],
    technologies: ["Node.js", "Java", "PostgreSQL", "Kafka", "AWS", "Redis"],
    detailedContent:
      "At buggcy, we work to create a solution for banks, exchanges and brokers to provide them with a saving on their online trading platforms. buggcy hosts teams of developers that have expertise in the finance industry.",
    challengesDetailed: [
      {
        title: "Transaction Speed and Scale at the Speed of Money",
        description: "Financial platforms must process thousands of transactions per second with sub-millisecond latency and zero data loss. Unlike other industries where a few seconds of delay is acceptable, financial transactions happen in real-time. A payment gateway that takes 500ms instead of 50ms can lose millions in revenue. Trading platforms that lag by even a fraction of a second can cost traders significant amounts of money."
      },
      {
        title: "Regulatory Compliance Across Jurisdictions",
        description: "PCI DSS for payment processing, SOX for financial reporting, GDPR for data privacy, and dozens of regional financial regulations create a complex compliance landscape. Each regulation has different requirements, different audit cycles, and different penalties for non-compliance. Building systems that satisfy all applicable regulations simultaneously requires deep domain expertise."
      },
      {
        title: "Fraud Detection That Adapts in Real-Time",
        description: "Fraudsters are constantly evolving their techniques, using sophisticated methods that traditional rule-based systems cannot catch. ML-powered fraud detection must identify suspicious patterns in real-time without blocking legitimate transactions. The balance between security and user experience is critical — too many false positives drive customers away, while too few controls expose the business to fraud losses."
      },
      {
        title: "Zero Downtime Is Not Optional",
        description: "Financial services cannot afford downtime. A payment processing outage during peak hours can cost millions in lost revenue. Every system must be designed for high availability with multi-region deployment, automatic failover, and disaster recovery capabilities. The engineering complexity of maintaining 99.99% uptime while continuously deploying new features is immense."
      },
    ],
    lifecycle: [
      { step: "01", title: "Payment Processing Systems", description: "High-throughput payment gateways that process thousands of transactions per second with PCI DSS Level 1 compliance. Multi-currency support, recurring billing, and real-time settlement capabilities." },
      { step: "02", title: "Digital Banking Solutions", description: "Modern digital banking platforms with account management, fund transfers, bill payments, and financial analytics. Built for mobile-first experiences with bank-grade security." },
      { step: "03", title: "Trading Platforms", description: "Real-time trading platforms with live market data, order management, portfolio tracking, and advanced charting. Built for both retail and institutional traders with sub-millisecond execution." },
      { step: "04", title: "Fraud Detection Systems", description: "ML-powered fraud detection that analyzes transaction patterns in real-time, identifies suspicious activity, and adapts to new fraud techniques. Reduces false positives while catching actual fraud." },
      { step: "05", title: "Blockchain and DeFi", description: "Smart contract development, DeFi protocol engineering, and token economics design. From token launches to enterprise blockchain solutions." },
      { step: "06", title: "Regulatory Compliance Infrastructure", description: "Automated compliance monitoring, audit trail generation, KYC/AML integration, and regulatory reporting tools that keep your business compliant across jurisdictions." },
    ],
    approach: [
      { step: "01", title: "Compliance and Architecture", description: "We map regulatory requirements, transaction flows, security needs, and integration requirements into a compliance-first architecture that satisfies all applicable regulations." },
      { step: "02", title: "Core Engine Build", description: "Payment processing, ledger systems, and the core financial engine built with event-driven architecture for real-time performance and guaranteed delivery." },
      { step: "03", title: "Security Layer", description: "Fraud detection, encryption, audit logging, and compliance controls are added as structured layers. Each layer is independently tested and validated." },
      { step: "04", title: "Scale and Certify", description: "Load testing to validate throughput requirements, security audits, PCI DSS certification support, and production deployment with comprehensive monitoring." },
    ],
    stats: [
      { value: "20+", label: "FinTech Projects" },
      { value: "$2B+", label: "Transactions Processed" },
      { value: "99.99%", label: "Uptime" },
      { value: "PCI DSS", label: "Level 1 Certified" },
    ],
    relatedServices: [
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "Cybersecurity", href: "/services/cybersecurity" },
      { title: "Cloud & DevOps", href: "/services/devops" },
      { title: "AI & ML Solutions", href: "/services/ai-ml" },
    ],
    successStories: [
      {
        slug: "real-time-payment-processing",
        title: "PayFlow: Real-Time Payment Processing Platform",
        problem: "PayFlow's existing payment gateway could not handle more than 1,000 transactions per second, causing timeouts during peak hours and losing significant revenue from failed transactions.",
        solution: "We rebuilt their payment engine using event-driven microservices with Kafka for guaranteed delivery, achieving 50,000 TPS with sub-10ms latency. Added multi-region deployment for zero-downtime guarantee.",
        results: [
          { value: "50K", label: "Transactions Per Second" },
          { value: "99.99%", label: "Uptime" },
        ],
      },
      {
        slug: "ai-fraud-detection",
        title: "FinServe: AI Fraud Detection System",
        problem: "FinServe's rule-based fraud detection system was catching only 60% of fraud while blocking 15% of legitimate transactions, resulting in both fraud losses and customer complaints.",
        solution: "We built an ML-powered fraud detection system that analyzes 200+ signals per transaction in real-time, reducing fraud losses by 80% while cutting false positives by 60%.",
        results: [
          { value: "80%", label: "Fraud Reduction" },
          { value: "60%", label: "Fewer False Positives" },
        ],
      },
    ],
    testimonials: [
      { quote: "Buggcy built our payment processing platform to handle 50,000 TPS with zero downtime. Their understanding of financial compliance is exceptional — they saved us months of compliance headaches.", name: "Ahmad Raza", role: "CTO", company: "PayFlow", location: "Dubai, UAE" },
      { quote: "The fraud detection system they built reduced our false positives by 60% while catching more actual fraud. The ROI was visible within the first month of deployment.", name: "Nadia Karim", role: "Head of Risk", company: "FinServe Global", location: "London, UK" },
      { quote: "We had worked with three other development teams before Buggcy. The difference was the engineering discipline. They wrote code we could actually maintain and scale. That is rarer than it should be.", name: "David Mercer", role: "CEO", company: "CORETAL", location: "London, UK" },
    ],
  },
  {
    id: "4",
    title: "E-Commerce",
    slug: "e-commerce",
    icon: "ShoppingCart",
    description:
      "Build a shopping experience like no other",
    heroSubtitle: "From Storefront to Marketplace. Built to Convert Browsers into Buyers.",
    heroCta: "Get My Free E-Commerce Review",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/Ecommerce.png",
    features: [
      "Custom E-commerce Platforms",
      "Inventory Management Systems",
      "Order Management & Fulfillment",
      "Payment Gateway Integration",
      "AI Recommendation Engines",
      "Omnichannel Retail Solutions",
    ],
    challenges: [
      "Handling high-traffic spikes during sales events",
      "Personalizing shopping experiences at scale",
      "Managing complex inventory across channels",
      "Seamless checkout and payment experience",
    ],
    solutions: [
      "Auto-scaling cloud architecture for flash sale readiness",
      "AI-powered product recommendations and dynamic pricing",
      "Unified inventory management across online and offline channels",
      "One-click checkout with multiple payment options",
    ],
    technologies: ["Next.js", "React", "Node.js", "Stripe", "Redis", "Elasticsearch"],
    detailedContent:
      "This is one platform any size of business can benefit from if just the processes are carried out by the book. The accessibility of the internet has opened a bigger world in conducting business.",
    challengesDetailed: [
      {
        title: "Traffic Spikes and Flash Sales",
        description: "E-commerce platforms must handle 100x normal traffic during flash sales, holiday seasons, and marketing campaigns. A site that crashes during peak traffic doesn't just lose sales — it damages brand reputation. Auto-scaling architecture must be designed from day one to handle unpredictable traffic patterns without over-provisioning during quiet periods."
      },
      {
        title: "Personalization at Scale",
        description: "Showing the right product to the right customer in milliseconds requires sophisticated ML pipelines that process browsing history, purchase patterns, and real-time behavior. Generic recommendations convert poorly. True personalization means understanding customer intent and presenting products that match their specific needs and preferences."
      },
      {
        title: "Inventory Complexity Across Channels",
        description: "Modern retailers sell across multiple channels — online stores, physical locations, marketplaces, and social media. Inventory must be synced in real-time across all channels to prevent overselling and stockouts. This requires a unified inventory management system that handles returns, transfers, and reservations across the entire supply chain."
      },
      {
        title: "Checkout Friction Kills Conversions",
        description: "Every extra step in the checkout process costs conversions. Studies show that 70% of online shopping carts are abandoned, and the top reason is a complicated checkout process. Building a seamless one-click checkout experience that supports multiple payment methods, shipping options, and tax calculations requires careful engineering."
      },
    ],
    lifecycle: [
      { step: "01", title: "Custom E-commerce Platforms", description: "Headless commerce architecture with Next.js or React frontends, microservices backend, and flexible APIs that support any business model — from B2C to B2B to marketplace." },
      { step: "02", title: "Product Discovery and Search", description: "AI-powered search with faceted filtering, typo tolerance, and personalized ranking. Visual search capabilities and intelligent product recommendations that increase average order value." },
      { step: "03", title: "Checkout and Payments", description: "Frictionless one-click checkout with support for 50+ payment methods, including credit cards, digital wallets, buy-now-pay-later, and regional payment options." },
      { step: "04", title: "Inventory and Order Management", description: "Real-time inventory sync across all channels, automated order routing, warehouse management integration, and returns processing. Unified view of all inventory across the supply chain." },
      { step: "05", title: "Analytics and Optimization", description: "Real-time dashboards for sales, inventory, customer behavior, and marketing performance. A/B testing infrastructure for continuous conversion optimization." },
      { step: "06", title: "Mobile Commerce", description: "Native mobile apps and progressive web apps with push notifications, barcode scanning, and offline capabilities. Mobile-first design that accounts for on-the-go shopping behavior." },
    ],
    approach: [
      { step: "01", title: "Commerce Strategy", description: "We analyze your product catalog, customer segments, channel strategy, and competitive landscape to design the right commerce architecture for your business model." },
      { step: "02", title: "Platform Build", description: "Headless commerce engine, product catalog, and cart/checkout built for performance and scale. Each component is independently deployable and horizontally scalable." },
      { step: "03", title: "AI and Personalization", description: "Recommendation engines, dynamic pricing, and search personalization are integrated. Each model is trained on your specific customer data and validated against conversion metrics." },
      { step: "04", title: "Optimize and Scale", description: "A/B testing, performance optimization, and infrastructure scaling for peak events. Load testing to validate readiness for flash sales and holiday traffic." },
    ],
    stats: [
      { value: "40+", label: "E-Commerce Projects" },
      { value: "35%", label: "Avg. Conversion Increase" },
      { value: "$500M+", label: "GMV Processed" },
      { value: "100ms", label: "Page Load Time" },
    ],
    relatedServices: [
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "AI & ML Solutions", href: "/services/ai-ml" },
      { title: "UI/UX Design", href: "/services/ui-ux-design" },
      { title: "Cloud & DevOps", href: "/services/devops" },
    ],
    successStories: [
      {
        slug: "enterprise-ecommerce-platform",
        title: "ShopMax: Enterprise E-Commerce Platform",
        problem: "ShopMax's platform crashed during their biggest flash sale, losing $2M in revenue in 3 hours. Their monolithic architecture could not scale to handle 100K concurrent users.",
        solution: "We rebuilt their platform using headless commerce architecture with auto-scaling Kubernetes infrastructure that handled 100K concurrent users during their next flash sale without any issues.",
        results: [
          { value: "100K", label: "Concurrent Users" },
          { value: "Zero", label: "Downtime During Sales" },
        ],
      },
      {
        slug: "ai-recommendation-engine",
        title: "StyleHub: AI Recommendation Engine",
        problem: "StyleHub's generic product recommendations were converting at only 2%. Their customers struggled to find relevant products among 500K+ SKUs.",
        solution: "We built an AI recommendation engine that analyzes browsing behavior, purchase history, and real-time intent to show personalized product suggestions, increasing conversion rate by 35%.",
        results: [
          { value: "35%", label: "Higher Conversions" },
          { value: "25%", label: "Higher Average Order Value" },
        ],
      },
    ],
    testimonials: [
      { quote: "Our new platform handles 100K concurrent users during flash sales without breaking a sweat. Buggcy delivered true enterprise-scale e-commerce that transformed our business.", name: "Chris Nguyen", role: "VP Digital", company: "ShopMax", location: "San Francisco, USA" },
      { quote: "The AI recommendation engine increased our average order value by 35%. The ROI was visible within the first month. They understood our customers better than we did.", name: "Emma Wilson", role: "CEO", company: "StyleHub", location: "London, UK" },
      { quote: "Buggcy treated our product like it was their own. They kept us aligned through every phase and made sure we never lost sight of the business outcome we were building toward.", name: "Oliver Bennett", role: "Head of Product", company: "GoPDF", location: "Sydney, Australia" },
    ],
  },
  {
    id: "5",
    title: "On-Demand Services",
    slug: "on-demand-services",
    icon: "Zap",
    description:
      "Efficiently Connecting Buyers & Sellers",
    heroSubtitle: "From Booking to Delivery. Built for Instant Gratification.",
    heroCta: "Get My Free On-Demand Review",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/On-Demand-Services.png",
    features: [
      "Customer Apps",
      "Provider Apps",
      "Admin Dashboards",
      "Real-time Tracking",
      "Payment Integration",
      "Rating Systems",
    ],
    challenges: [
      "Real-time matching of buyers and sellers",
      "Scalable infrastructure for peak demand",
      "Secure payment processing",
      "Reliable delivery tracking",
    ],
    solutions: [
      "AI-powered matching algorithms for instant connections",
      "Auto-scaling cloud architecture for demand spikes",
      "Multi-layered payment security with escrow support",
      "Real-time GPS tracking with ETA predictions",
    ],
    technologies: ["React", "Node.js", "React Native", "PostgreSQL", "Redis", "Mapbox"],
    detailedContent:
      "The service on-demand industry is becoming a bigger need of today's market with every passing day. A platform where buyers can connect with their sellers and give them exactly what they demand.",
    challengesDetailed: [
      {
        title: "Real-Time Matching at Scale",
        description: "Connecting buyers with available sellers in real-time requires sophisticated matching algorithms that consider location, availability, ratings, and pricing. The system must handle thousands of concurrent match requests without delays."
      },
      {
        title: "Dynamic Pricing and Surge Management",
        description: "On-demand platforms must balance supply and demand through dynamic pricing. Too high and customers leave, too low and providers lose interest. The algorithm must adapt in real-time based on location, time, and demand patterns."
      },
      {
        title: "Trust and Safety",
        description: "Users are entering vehicles with strangers or inviting them into their homes. Background checks, real-time ride tracking, emergency buttons, and two-way rating systems are essential for building trust in on-demand platforms."
      },
      {
        title: "Provider Retention and Management",
        description: "Keeping providers engaged and active requires fair compensation, incentives, and a smooth onboarding experience. High provider churn destroys the supply-demand balance that makes on-demand platforms work."
      },
    ],
    lifecycle: [
      { step: "01", title: "Customer App Development", description: "Intuitive booking flow, real-time tracking, in-app payments, and rating system. Designed for conversion with minimal friction from search to confirmed service." },
      { step: "02", title: "Provider App Development", description: "Order management, navigation, earnings tracking, and availability controls. Built for efficiency with one-tap acceptance and optimized route guidance." },
      { step: "03", title: "Admin Dashboard", description: "Real-time fleet monitoring, analytics, payout management, and customer support tools. Complete operational visibility from a single interface." },
      { step: "04", title: "Matching Engine", description: "AI-powered matching that considers proximity, ratings, availability, and demand patterns. Optimizes for provider utilization and customer wait times." },
      { step: "05", title: "Payment and Escrow", description: "Secure payment processing with escrow support, split payments, and automated provider payouts. Multi-currency and multi-method support." },
      { step: "06", title: "Analytics and Growth", description: "Demand forecasting, provider performance analytics, customer behavior insights, and A/B testing infrastructure for continuous optimization." },
    ],
    approach: [
      { step: "01", title: "Market Analysis", description: "We study your market, competitors, and target audience to define the right on-demand model — marketplace, aggregator, or direct service." },
      { step: "02", title: "Platform Build", description: "Customer app, provider app, and admin dashboard built simultaneously with shared APIs and real-time infrastructure." },
      { step: "03", title: "Matching and Payments", description: "AI matching engine, payment processing, and escrow system integrated and tested with real-world scenarios." },
      { step: "04", title: "Launch and Scale", description: "City-by-city rollout with supply-demand monitoring, provider onboarding campaigns, and continuous optimization." },
    ],
    stats: [
      { value: "20+", label: "On-Demand Projects" },
      { value: "100K+", label: "Daily Transactions" },
      { value: "<3min", label: "Average Match Time" },
      { value: "4.8/5", label: "User Satisfaction" },
    ],
    relatedServices: [
      { title: "Mobile Development", href: "/services/mobile-development" },
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "Payment Integration", href: "/services/web-development" },
      { title: "Cloud & DevOps", href: "/services/devops" },
    ],
    successStories: [
      {
        slug: "ride-sharing-platform",
        title: "RideNow: Ride-Sharing Platform",
        problem: "RideNow was struggling with long wait times, mismatched rides, and driver churn. Their legacy system couldn't handle peak demand in major cities.",
        solution: "We built a real-time matching engine with dynamic pricing, reducing average wait times by 40% and increasing driver utilization by 35%.",
        results: [
          { value: "40%", label: "Shorter Wait Times" },
          { value: "35%", label: "Higher Driver Utilization" },
        ],
      },
      {
        slug: "food-delivery-platform",
        title: "QuickBite: Food Delivery Platform",
        problem: "QuickBite's platform crashed during lunch and dinner rush hours, losing thousands of orders daily. Their monolithic architecture couldn't scale.",
        solution: "We rebuilt with microservices and auto-scaling infrastructure that handles 10x traffic spikes without performance degradation.",
        results: [
          { value: "10x", label: "Traffic Handling" },
          { value: "99.9%", label: "Uptime During Peaks" },
        ],
      },
    ],
    testimonials: [
      { quote: "Buggcy transformed our on-demand platform from a basic booking app to a sophisticated marketplace. The matching engine they built reduced our wait times by 40%.", name: "Sarah Mitchell", role: "CEO", company: "RideNow", location: "New York, USA" },
      { quote: "The scalability they delivered was game-changing. We went from crashing during rush hours to handling 10x traffic without breaking a sweat.", name: "Ahmed Khan", role: "CTO", company: "QuickBite", location: "London, UK" },
    ],
  },
  {
    id: "11",
    title: "Logistics & Supply Chain",
    slug: "logistics-supply-chain",
    icon: "Truck",
    description:
      "Optimize your supply chain with real-time tracking, route optimization, and warehouse management systems that reduce costs and improve delivery times.",
    heroSubtitle: "From Fleet to Warehouse. Built to Optimize Every Shipment.",
    heroCta: "Get My Free Logistics Review",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/service-on-demand.png",
    features: [
      "Fleet Management Systems",
      "Route Optimization",
      "Warehouse Management",
      "Real-time Shipment Tracking",
      "Demand Forecasting",
      "Supply Chain Analytics",
    ],
    challenges: [
      "Real-time visibility across the supply chain",
      "Route optimization for cost reduction",
      "Warehouse operations efficiency",
      "Demand prediction and inventory planning",
    ],
    solutions: [
      "IoT-enabled real-time tracking with live GPS dashboards",
      "AI-optimized routing reducing fuel costs by 20-30%",
      "Automated warehouse management with barcode/RFID scanning",
      "ML-based demand forecasting for inventory optimization",
    ],
    technologies: ["React", "Node.js", "Python", "IoT", "PostgreSQL", "Mapbox"],
    detailedContent:
      "Our logistics solutions provide end-to-end supply chain visibility. We build fleet management systems that track vehicles in real-time, route optimization engines that minimize delivery costs, and warehouse management systems that automate picking, packing, and shipping.",
    challengesDetailed: [
      {
        title: "End-to-End Supply Chain Visibility",
        description: "Tracking shipments across multiple carriers, warehouses, and transportation modes in real-time is one of the biggest challenges in logistics. Most organizations have visibility gaps where shipments disappear from tracking between handoffs. Real-time visibility requires IoT sensors, GPS tracking, and integration with dozens of carrier APIs — each with different data formats and update frequencies."
      },
      {
        title: "Route Optimization for Cost Reduction",
        description: "Balancing delivery speed, fuel costs, vehicle capacity, and customer time windows across thousands of deliveries is a complex optimization problem. Manual route planning wastes fuel, misses delivery windows, and fails to adapt to real-time traffic conditions. AI-powered route optimization can reduce fuel costs by 20-30% while improving on-time delivery rates."
      },
      {
        title: "Warehouse Operations Efficiency",
        description: "Optimizing picking paths, packing processes, and storage allocation in high-volume warehouses requires sophisticated algorithms and real-time data. A poorly optimized warehouse can add hours to order fulfillment time and increase error rates. Automated warehouse management with barcode/RFID scanning and intelligent picking algorithms can dramatically improve throughput."
      },
      {
        title: "Demand Volatility and Inventory Planning",
        description: "Predicting demand fluctuations to maintain optimal inventory without overstocking or stockouts is critical for supply chain efficiency. Traditional forecasting methods based on historical data fail during unexpected events. ML-based demand forecasting that incorporates market trends, seasonality, and external factors provides more accurate predictions."
      },
    ],
    lifecycle: [
      { step: "01", title: "Fleet Management Systems", description: "Real-time fleet tracking with GPS, geofencing, driver behavior monitoring, and maintenance scheduling. Complete visibility into vehicle location, status, and utilization across your entire fleet." },
      { step: "02", title: "Route Optimization", description: "AI-powered route optimization that considers traffic, weather, delivery windows, vehicle capacity, and driver hours. Reduces fuel costs by 20-30% while improving on-time delivery rates." },
      { step: "03", title: "Warehouse Management", description: "Automated warehouse management with intelligent picking paths, barcode/RFID scanning, and real-time inventory tracking. Supports multiple warehouse layouts and picking strategies." },
      { step: "04", title: "Shipment Tracking", description: "Real-time shipment tracking across multiple carriers with unified tracking dashboards. Automated customer notifications and proactive delay alerts." },
      { step: "05", title: "Demand Forecasting", description: "ML-based demand forecasting that analyzes historical data, market trends, and external factors to predict demand at SKU level. Helps maintain optimal inventory levels." },
      { step: "06", title: "Supply Chain Analytics", description: "Comprehensive analytics dashboards for supply chain performance, carrier comparison, cost analysis, and operational optimization. Real-time KPIs and custom reporting." },
    ],
    approach: [
      { step: "01", title: "Operations Audit", description: "We map your supply chain flows, identify bottlenecks, audit existing systems, and understand your integration requirements. The output is a comprehensive operations blueprint." },
      { step: "02", title: "Core Systems Build", description: "TMS, WMS, and tracking infrastructure built with real-time data pipelines. Each system is independently deployable and designed for horizontal scaling." },
      { step: "03", title: "AI and IoT Layer", description: "Route optimization, demand forecasting, and IoT sensor integration. Each model is trained on your specific logistics data and validated against operational metrics." },
      { step: "04", title: "Deploy and Optimize", description: "Phased rollout across facilities, team training, and continuous optimization based on operational data and performance metrics." },
    ],
    stats: [
      { value: "25+", label: "Logistics Projects" },
      { value: "30%", label: "Fuel Cost Reduction" },
      { value: "50%", label: "Faster Delivery" },
      { value: "99.5%", label: "Tracking Accuracy" },
    ],
    relatedServices: [
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "AI & ML Solutions", href: "/services/ai-ml" },
      { title: "Data Scraping", href: "/services/data-scraping" },
      { title: "Cloud & DevOps", href: "/services/devops" },
    ],
    successStories: [
      {
        slug: "ai-route-optimization",
        title: "FastFreight: AI Route Optimization System",
        problem: "FastFreight's manual route planning was costing them $3M extra per year in fuel expenses and causing 15% of deliveries to miss their time windows.",
        solution: "We built an AI-powered route optimization system that analyzes traffic, weather, and delivery constraints in real-time, reducing fuel costs by 28% and improving on-time delivery to 98%.",
        results: [
          { value: "28%", label: "Fuel Cost Reduction" },
          { value: "98%", label: "On-Time Delivery" },
        ],
      },
      {
        slug: "warehouse-management-system",
        title: "LogiTrack: Warehouse Management System",
        problem: "LogiTrack's paper-based warehouse processes were causing 5% error rates in order fulfillment and taking 48 hours to process orders.",
        solution: "We built an automated WMS with barcode scanning, intelligent picking paths, and real-time inventory tracking that reduced errors to 0.2% and cut processing time to 12 hours.",
        results: [
          { value: "0.2%", label: "Error Rate" },
          { value: "75%", label: "Faster Processing" },
        ],
      },
    ],
    testimonials: [
      { quote: "The route optimization system reduced our fuel costs by 28% and improved delivery times by 40%. Transformative for our operations — the ROI was immediate.", name: "Marco Silva", role: "Head of Logistics", company: "FastFreight", location: "São Paulo, Brazil" },
      { quote: "Buggcy built a warehouse management system that handles 10,000 orders per day with 99.8% accuracy. Incredible attention to detail and deep logistics domain knowledge.", name: "Priya Patel", role: "COO", company: "LogiTrack", location: "Mumbai, India" },
      { quote: "The real-time tracking dashboard gave us complete visibility into our supply chain for the first time. We can now proactively address delays before they become problems.", name: "James Whitfield", role: "Head of Engineering", company: "Covertly", location: "Manchester, UK" },
    ],
  },
  {
    id: "12",
    title: "Manufacturing",
    slug: "manufacturing",
    icon: "Factory",
    description:
      "Digitize your manufacturing operations with IoT-driven monitoring, predictive maintenance systems, and production analytics that maximize uptime and efficiency.",
    heroSubtitle: "From Factory Floor to Cloud. Built for Industry 4.0.",
    heroCta: "Get My Free Manufacturing Tech Review",
    imageUrl: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
    features: [
      "IoT-enabled Production Monitoring",
      "Predictive Maintenance Systems",
      "Quality Control Automation",
      "Production Analytics Dashboards",
      "Digital Twin Solutions",
      "ERP Integration",
    ],
    challenges: [
      "Unplanned equipment downtime",
      "Quality control consistency at scale",
      "Integration with legacy OT systems",
      "Real-time production visibility",
    ],
    solutions: [
      "IoT sensor networks with predictive maintenance ML models",
      "Computer vision-based quality inspection systems",
      "IT/OT convergence platform connecting SCADA to cloud",
      "Real-time OEE dashboards with actionable insights",
    ],
    technologies: ["Python", "React", "MQTT", "TensorFlow", "Azure IoT", "Node.js"],
    detailedContent:
      "We help manufacturers embrace Industry 4.0 with smart factory solutions. Our IoT platforms collect data from production line sensors, enabling real-time monitoring of equipment health and production metrics. Our predictive maintenance systems use machine learning to forecast equipment failures before they happen, reducing unplanned downtime by up to 50%. We also build computer vision solutions for automated quality inspection that catch defects invisible to the human eye.",
    challengesDetailed: [
      {
        title: "Unplanned Equipment Downtime",
        description: "Equipment failures cost manufacturers thousands of dollars per minute in lost production. Traditional maintenance schedules (time-based or reactive) are inefficient — time-based maintenance replaces parts that still have useful life, while reactive maintenance leads to unplanned downtime. Predictive maintenance using IoT sensors and ML models can forecast failures days or weeks in advance, allowing maintenance to be scheduled during planned downtime windows."
      },
      {
        title: "Quality Control at Production Speed",
        description: "Manual quality inspection is slow, error-prone, and cannot keep up with modern production line speeds. Defects that slip through quality control reach customers, resulting in returns, warranties, and brand damage. Computer vision-based quality inspection systems can inspect 100% of products at production speed, catching defects that human inspectors miss."
      },
      {
        title: "Legacy OT System Integration",
        description: "Most factories run on legacy OT systems (SCADA, PLC, DCS) that were designed for isolation, not connectivity. These systems contain critical production data but were never built for cloud integration. IT/OT convergence requires careful architecture that bridges the gap between operational technology and information technology without disrupting production."
      },
      {
        title: "Real-Time Production Visibility",
        description: "Manufacturing managers need real-time visibility into Overall Equipment Effectiveness (OEE), production throughput, scrap rates, and quality metrics. Traditional reporting methods (shift reports, Excel spreadsheets) provide lagging indicators. Real-time dashboards that aggregate data from multiple production lines and shifts enable faster, data-driven decisions."
      },
    ],
    lifecycle: [
      { step: "01", title: "IoT Production Monitoring", description: "Sensor deployment across production lines for real-time monitoring of equipment health, production metrics, and environmental conditions. Edge computing for local processing and cloud sync." },
      { step: "02", title: "Predictive Maintenance", description: "ML models trained on equipment sensor data to forecast failures before they happen. Integrates with maintenance management systems for automated work order generation." },
      { step: "03", title: "Quality Control Automation", description: "Computer vision systems for automated quality inspection at production speed. Catches defects invisible to the human eye with 99.5%+ accuracy." },
      { step: "04", title: "Production Analytics", description: "Real-time OEE dashboards, production throughput tracking, scrap rate analysis, and custom manufacturing KPIs. Actionable insights for continuous improvement." },
      { step: "05", title: "Digital Twin Solutions", description: "Virtual replicas of physical production lines for simulation, optimization, and what-if analysis. Enables testing changes before implementing them on the factory floor." },
      { step: "06", title: "ERP Integration", description: "Seamless integration with existing ERP systems for production planning, inventory management, and financial reporting. Unified view of manufacturing operations." },
    ],
    approach: [
      { step: "01", title: "Factory Assessment", description: "We audit your production lines, OT systems, data infrastructure, and pain points to identify automation opportunities and create a digital transformation roadmap." },
      { step: "02", title: "IoT Infrastructure", description: "Sensor deployment, edge computing nodes, and data pipelines connecting shop floor to cloud. Designed for reliability in harsh manufacturing environments." },
      { step: "03", title: "Analytics and AI", description: "Predictive maintenance models, quality inspection systems, and production optimization algorithms. Each model is trained on your specific equipment and validated against production data." },
      { step: "04", title: "Scale and Optimize", description: "Rollout across production lines, continuous model training, and operational optimization based on production data and feedback from shop floor operators." },
    ],
    stats: [
      { value: "15+", label: "Manufacturing Projects" },
      { value: "50%", label: "Downtime Reduction" },
      { value: "99.5%", label: "Quality Accuracy" },
      { value: "20%", label: "Efficiency Gain" },
    ],
    relatedServices: [
      { title: "AI & ML Solutions", href: "/services/ai-ml" },
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "Cloud & DevOps", href: "/services/devops" },
      { title: "Cybersecurity", href: "/services/cybersecurity" },
    ],
    successStories: [
      {
        slug: "predictive-maintenance-system",
        title: "PrecisionParts: Predictive Maintenance System",
        problem: "PrecisionParts experienced 15% unplanned downtime across their production lines, costing $500K per month in lost production. Their time-based maintenance schedule was replacing parts that still had useful life.",
        solution: "We deployed IoT sensors across 200 pieces of equipment and built ML models that predict failures 2-3 weeks in advance, reducing unplanned downtime by 45% and maintenance costs by 30%.",
        results: [
          { value: "45%", label: "Less Downtime" },
          { value: "30%", label: "Lower Maintenance Costs" },
        ],
      },
      {
        slug: "computer-vision-quality-inspection",
        title: "TechManufacturing: Computer Vision Quality Inspection",
        problem: "TechManufacturing's manual quality inspection was catching only 85% of defects, with human inspectors missing microscopic flaws at production speed.",
        solution: "We built a computer vision quality inspection system that inspects 100% of products at production speed with 99.5% accuracy, catching defects invisible to the human eye.",
        results: [
          { value: "99.5%", label: "Inspection Accuracy" },
          { value: "100%", label: "Products Inspected" },
        ],
      },
    ],
    testimonials: [
      { quote: "The predictive maintenance system reduced our unplanned downtime by 45%. Buggcy understood our factory operations deeply and delivered a system our operators actually use.", name: "Thomas Mueller", role: "Plant Director", company: "PrecisionParts", location: "Munich, Germany" },
      { quote: "Computer vision quality inspection caught defects we missed for years. The ROI was immediate and significant — we reduced customer complaints by 60%.", name: "Yuki Tanaka", role: "VP Operations", company: "TechManufacturing", location: "Tokyo, Japan" },
      { quote: "Buggcy was the first team that truly understood the intersection of IT and OT. They built a system that integrates with our legacy SCADA without disrupting production.", name: "Marcus Reid", role: "Founder", company: "Beast Mode Soccer", location: "Chicago, USA" },
    ],
  },
  {
    id: "13",
    title: "Gaming & Entertainment",
    slug: "gaming-entertainment",
    icon: "Gamepad2",
    description:
      "Build immersive gaming and entertainment platforms — from multiplayer game backends to streaming services — with real-time performance and scalability.",
    heroSubtitle: "From Multiplayer to Streaming. Built for Millisecond Performance.",
    heroCta: "Get My Free Gaming Tech Review",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    features: [
      "Multiplayer Game Backends",
      "Real-time Leaderboards & Matchmaking",
      "Content Management Systems",
      "Video Streaming Platforms",
      "In-app Purchase Systems",
      "Community & Social Features",
    ],
    challenges: [
      "Real-time multiplayer synchronization",
      "Handling millions of concurrent users",
      "Content delivery at global scale",
      "Monetization without compromising UX",
    ],
    solutions: [
      "WebSocket-based real-time multiplayer with anti-cheat systems",
      "Auto-scaling game server infrastructure on Kubernetes",
      "CDN-integrated content delivery for global low-latency access",
      "Seamless in-app purchase and subscription management",
    ],
    technologies: ["Node.js", "WebSocket", "Redis", "Unity", "AWS", "CloudFront"],
    detailedContent:
      "Our gaming and entertainment team builds the infrastructure behind engaging digital experiences. We develop multiplayer game backends with real-time synchronization, matchmaking systems, and anti-cheat mechanisms. For streaming platforms, we build adaptive bitrate streaming, content recommendation engines, and community features. Our solutions are built to handle millions of concurrent users while maintaining sub-100ms latency for competitive gaming scenarios.",
    challengesDetailed: [
      {
        title: "Real-Time Multiplayer Synchronization",
        description: "Multiplayer games require sub-100ms state synchronization across thousands of concurrent players. Lag, desync, and cheating can ruin the player experience. Building a multiplayer backend that handles player actions, physics calculations, and game state updates in real-time while preventing cheating requires specialized networking architecture and deep understanding of game engine integration."
      },
      {
        title: "Massive Concurrency on Launch Day",
        description: "Game launches and major updates can generate millions of simultaneous connections within minutes. Traditional server infrastructure cannot scale fast enough to handle these spikes. Auto-scaling game server infrastructure on Kubernetes must be designed to spin up hundreds of game server instances in seconds while maintaining session state and player progress."
      },
      {
        title: "Global Content Delivery",
        description: "Game assets, updates, and streaming content must be delivered with low latency worldwide. A player in Tokyo should have the same experience as a player in New York. CDN-integrated content delivery with edge caching, progressive downloads, and delta updates ensures players get the best experience regardless of location."
      },
      {
        title: "Monetization Without Compromising Experience",
        description: "In-app purchases, subscriptions, and ads must generate revenue without degrading the player experience. Aggressive monetization drives players away, while too-lenient approaches leave money on the table. The balance requires understanding player psychology, A/B testing, and building systems that feel fair while driving sustainable revenue."
      },
    ],
    lifecycle: [
      { step: "01", title: "Multiplayer Game Backends", description: "Real-time multiplayer infrastructure with WebSocket networking, state synchronization, anti-cheat systems, and matchmaking. Supports both peer-to-peer and client-server architectures." },
      { step: "02", title: "Live Services Infrastructure", description: "Leaderboards, achievements, daily challenges, and live event systems that keep players engaged. Real-time game state management with Redis and event-driven architecture." },
      { step: "03", title: "Content Delivery Systems", description: "Global content delivery with CDN integration, progressive downloads, delta updates, and asset management. Optimized for large game assets and frequent updates." },
      { step: "04", title: "Monetization Platforms", description: "In-app purchase systems, subscription management, battle pass infrastructure, and ad integration. Designed to maximize revenue while maintaining player satisfaction." },
      { step: "05", title: "Community and Social Features", description: "Chat systems, friend lists, guilds, clans, and social features that build community and increase retention. Real-time messaging with moderation and safety systems." },
      { step: "06", title: "Analytics and Player Insights", description: "Player behavior analytics, retention tracking, monetization metrics, and A/B testing infrastructure. Data-driven decisions to improve game design and business outcomes." },
    ],
    approach: [
      { step: "01", title: "Game Architecture Design", description: "We design the backend architecture for real-time multiplayer, matchmaking, content delivery, and monetization based on your game genre and target audience." },
      { step: "02", title: "Core Backend Build", description: "Game servers, real-time networking, and player management systems built on scalable cloud infrastructure with auto-scaling capabilities." },
      { step: "03", title: "Live Services Layer", description: "Matchmaking, leaderboards, in-app purchases, and community features are integrated. Each system is designed for real-time performance at scale." },
      { step: "04", title: "Launch and Live Ops", description: "Global deployment, performance monitoring, and live operations support for ongoing events, updates, and community management." },
    ],
    stats: [
      { value: "10+", label: "Gaming Projects" },
      { value: "1M+", label: "Concurrent Users Supported" },
      { value: "<100ms", label: "Latency" },
      { value: "99.99%", label: "Uptime" },
    ],
    relatedServices: [
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "Cloud & DevOps", href: "/services/devops" },
      { title: "AI & ML Solutions", href: "/services/ai-ml" },
      { title: "UI/UX Design", href: "/services/ui-ux-design" },
    ],
    successStories: [
      {
        slug: "multiplayer-game-backend",
        title: "PlayForge: Multiplayer Game Backend",
        problem: "PlayForge's peer-to-peer multiplayer architecture was plagued with lag, cheating, and synchronization issues. Players were leaving matches early and review scores were dropping.",
        solution: "We built a dedicated server architecture with server-authoritative physics, anti-cheat systems, and intelligent matchmaking that reduced latency by 60% and virtually eliminated cheating.",
        results: [
          { value: "60%", label: "Latency Reduction" },
          { value: "95%", label: "Player Retention" },
        ],
      },
      {
        slug: "4k-streaming-platform",
        title: "StreamVault: 4K Streaming Platform",
        problem: "StreamVault's streaming platform was buffering constantly during peak hours, losing viewers to competitors. Their encoding pipeline could not handle 4K content at scale.",
        solution: "We built an adaptive bitrate streaming system with edge caching and CDN integration that delivered 4K content to 1M+ concurrent viewers with zero buffering.",
        results: [
          { value: "1M+", label: "Concurrent Viewers" },
          { value: "Zero", label: "Buffering Issues" },
        ],
      },
    ],
    testimonials: [
      { quote: "Buggcy built a multiplayer backend that handles 500K concurrent players with sub-50ms latency. They understand gaming infrastructure at a level I haven't seen from other teams.", name: "Alex Kim", role: "CTO", company: "PlayForge", location: "Seoul, South Korea" },
      { quote: "The streaming platform they delivered supports 4K adaptive streaming to millions. Zero buffering issues since launch. The engineering discipline was exceptional.", name: "Jordan Hayes", role: "Head of Platform", company: "StreamVault", location: "Los Angeles, USA" },
      { quote: "What impressed us most was the design thinking. They didn't just execute the brief, they pushed back with better ideas. The final product feels premium.", name: "Aiko Tanaka", role: "VP of Product", company: "STORYMII", location: "New Jersey, USA" },
    ],
  },
  {
    id: "14",
    title: "Real Estate & PropTech",
    slug: "real-estate-proptech",
    icon: "Building",
    description:
      "Modernize real estate with smart property management platforms, virtual tour solutions, and AI-powered property valuation tools that give you a competitive edge.",
    heroSubtitle: "From Property Management to Virtual Tours. Built for Modern Real Estate.",
    heroCta: "Get My Free PropTech Review",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    features: [
      "Property Management Platforms",
      "Virtual Tour Solutions",
      "AI Property Valuation",
      "Tenant Management Systems",
      "MLS Integration",
      "Document Management",
    ],
    challenges: [
      "Managing properties across multiple locations",
      "Providing immersive property visualization",
      "Accurate property valuation in volatile markets",
      "Streamlining lease and document management",
    ],
    solutions: [
      "Unified property management dashboard with mobile apps",
      "360-degree virtual tours with VR compatibility",
      "ML-based property valuation using market data and trends",
      "Digital lease management with e-signature integration",
    ],
    technologies: ["React", "Node.js", "Three.js", "Python", "PostgreSQL", "AWS"],
    detailedContent:
      "We build technology solutions for the modern real estate industry. Our property management platforms give landlords and property managers a single pane of glass for tenant communication, rent collection, maintenance requests, and financial reporting. We create immersive virtual tour experiences using 3D scanning and WebVR, and our AI valuation models analyze thousands of data points to provide accurate property estimates in real-time.",
    challengesDetailed: [
      {
        title: "Portfolio Complexity Across Locations",
        description: "Managing properties across multiple locations, each with different lease terms, tenant profiles, maintenance needs, and local regulations, requires a unified platform that provides centralized visibility while supporting location-specific workflows. Traditional property management tools struggle to handle the complexity of multi-location portfolios, leading to data silos, inconsistent processes, and missed opportunities."
      },
      {
        title: "Immersive Property Visualization",
        description: "Buyers and tenants expect virtual tours and 3D walkthroughs before visiting properties in person. Static photos no longer convert. Creating immersive virtual tour experiences that showcase properties from every angle requires specialized 3D scanning technology, WebVR compatibility, and streaming infrastructure that delivers smooth experiences across devices and bandwidth conditions."
      },
      {
        title: "Accurate Property Valuation",
        description: "Property values fluctuate based on dozens of factors — market trends, neighborhood development, school ratings, crime statistics, and economic indicators. Manual appraisals are slow, expensive, and inconsistent. ML-based valuation models that analyze thousands of data points in real-time provide faster, more accurate, and more consistent property estimates."
      },
      {
        title: "Document and Lease Overhead",
        description: "Lease agreements, compliance documents, maintenance records, and financial reports consume hours of property manager time. Manual document management leads to errors, missed deadlines, and compliance risks. Digital lease management with e-signature integration, automated renewals, and compliance tracking streamlines the entire document lifecycle."
      },
    ],
    lifecycle: [
      { step: "01", title: "Property Management Platforms", description: "Unified dashboards for tenant communication, rent collection, maintenance requests, and financial reporting. Mobile apps for tenants and property managers." },
      { step: "02", title: "Virtual Tour Solutions", description: "360-degree virtual tours with 3D scanning, WebVR compatibility, and interactive floor plans. Immersive property showcase experiences that convert browsers into buyers." },
      { step: "03", title: "AI Property Valuation", description: "ML-based property valuation using market data, neighborhood trends, and property characteristics. Real-time estimates with confidence scores and comparable analysis." },
      { step: "04", title: "Tenant Management", description: "Tenant screening, lease management, payment processing, and communication tools. Automated rent collection with late fee management and payment tracking." },
      { step: "05", title: "MLS Integration", description: "Integration with MLS systems for property listing syndication, data synchronization, and market analysis. Real-time listing updates across multiple platforms." },
      { step: "06", title: "Document Management", description: "Digital lease management with e-signature integration, automated renewals, compliance tracking, and secure document storage. Paperless property management." },
    ],
    approach: [
      { step: "01", title: "Property Operations Audit", description: "We map your portfolio structure, tenant workflows, maintenance processes, and pain points to identify automation opportunities." },
      { step: "02", title: "Platform Build", description: "Property management engine, tenant portals, and financial reporting built for scale. Each module is independently deployable and designed for multi-location portfolios." },
      { step: "03", title: "Immersive and AI Layer", description: "Virtual tour integration, AI valuation models, and document automation are added. Each system is validated against real property data." },
      { step: "04", title: "Deploy and Scale", description: "Phased rollout across properties, mobile app launch, tenant onboarding, and continuous feature optimization based on user feedback." },
    ],
    stats: [
      { value: "12+", label: "PropTech Projects" },
      { value: "20K+", label: "Properties Managed" },
      { value: "35%", label: "Faster Lease Processing" },
      { value: "99.9%", label: "Platform Uptime" },
    ],
    relatedServices: [
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "UI/UX Design", href: "/services/ui-ux-design" },
      { title: "AI & ML Solutions", href: "/services/ai-ml" },
      { title: "Mobile Development", href: "/services/mobile-development" },
    ],
    successStories: [
      {
        slug: "property-management-platform",
        title: "UrbanNest: Property Management Platform",
        problem: "UrbanNest managed 5,000 properties across 3 cities using spreadsheets and manual processes. Tenant communication was slow, rent collection was inconsistent, and maintenance requests were lost.",
        solution: "We built a unified property management platform with tenant portals, automated rent collection, and maintenance tracking that reduced administrative overhead by 60% and improved tenant satisfaction.",
        results: [
          { value: "60%", label: "Less Admin Work" },
          { value: "95%", label: "Tenant Satisfaction" },
        ],
      },
      {
        slug: "ai-property-valuation",
        title: "PropValue: AI Property Valuation",
        problem: "PropValue's manual appraisal process took 2 weeks per property and cost $500 per valuation. Their valuations were inconsistent and often outdated by the time they were delivered.",
        solution: "We built an AI valuation engine that analyzes 200+ data points to provide accurate property estimates in seconds, with confidence scores and comparable analysis.",
        results: [
          { value: "Seconds", label: "Valuation Time" },
          { value: "95%", label: "Accuracy Rate" },
        ],
      },
    ],
    testimonials: [
      { quote: "Buggcy built a property management platform that handles 5,000 units across 3 cities. The tenant portal reduced support calls by 60% and improved tenant satisfaction significantly.", name: "Rachel Kim", role: "Director of Operations", company: "UrbanNest Properties", location: "Toronto, Canada" },
      { quote: "The AI valuation model they built is more accurate than our manual appraisals. It processes valuations in seconds instead of days. Transformative for our business.", name: "David Chen", role: "CEO", company: "PropValue", location: "San Francisco, USA" },
      { quote: "We had a vision for social commerce that most agencies told us was too complex. Buggcy was the first team that said yes and meant it. They made it feel like a product built by a team twice our size.", name: "Fatima Al-Hassan", role: "VP of Design", company: "AVA", location: "Dubai, UAE" },
    ],
  },
  {
    id: "15",
    title: "Travel & Tourism",
    slug: "travel-tourism",
    icon: "Plane",
    description:
      "Redefining the future of travel and hospitality",
    heroSubtitle: "From Booking to Experience. Built for the Modern Traveler.",
    heroCta: "Get My Free Travel Tech Review",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/Travel-and-Tourisum.png",
    features: [
      "Booking Platforms",
      "Customer Portals",
      "Back-office Management",
      "Payment Integration",
      "Travel Itinerary Planning",
      "Multi-currency Support",
    ],
    challenges: [
      "Real-time availability and booking management",
      "Multi-currency and multi-language support",
      "Seasonal demand scaling",
      "Integration with global distribution systems",
    ],
    solutions: [
      "Real-time inventory management with GDS integration",
      "Multi-currency payment processing with live exchange rates",
      "Auto-scaling infrastructure for seasonal peaks",
      "Unified back-office management system",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe", "AWS"],
    detailedContent:
      "With buggcy, there is no need to look further in order to upscale your booming travel and tourism business. Our exciting travel business solutions empower your business with technical consultancy, customer portals and a back-office management system.",
    challengesDetailed: [
      {
        title: "Real-Time Availability Across Channels",
        description: "Travel platforms must sync availability across multiple channels — direct bookings, OTAs, and global distribution systems. A double booking or outdated availability destroys customer trust and revenue."
      },
      {
        title: "Seasonal Demand Spikes",
        description: "Travel demand is highly seasonal with massive spikes during holidays, festivals, and vacation periods. Infrastructure must handle 10-20x normal traffic during peak booking seasons without performance degradation."
      },
      {
        title: "Complex Pricing and Packaging",
        description: "Travel products involve dynamic pricing based on season, demand, and inventory. Bundling flights, hotels, and activities while maintaining pricing flexibility requires sophisticated rules engines."
      },
      {
        title: "Global Compliance and Payments",
        description: "Operating across borders means dealing with different currencies, payment methods, tax regulations, and consumer protection laws. The platform must handle all of this seamlessly."
      },
    ],
    lifecycle: [
      { step: "01", title: "Booking Platform", description: "Real-time search, availability, and booking engine with support for multiple inventory sources. Optimized for conversion with minimal friction." },
      { step: "02", title: "Customer Portal", description: "Self-service portals for bookings, itineraries, modifications, and support. Multi-device experience with offline access for travel itineraries." },
      { step: "03", title: "Back-office Management", description: "Booking management, payment reconciliation, provider communication, and reporting tools. Streamlined operations for travel agencies and operators." },
      { step: "04", title: "Payment Integration", description: "Multi-currency payment processing with support for credit cards, digital wallets, and local payment methods. Automated refund and cancellation handling." },
      { step: "05", title: "Itinerary Planning", description: "AI-powered itinerary suggestions based on preferences, budget, and travel history. Interactive maps and offline itinerary access." },
      { step: "06", title: "Analytics and Optimization", description: "Booking analytics, demand forecasting, pricing optimization, and customer behavior insights for data-driven decisions." },
    ],
    approach: [
      { step: "01", title: "Travel Business Audit", description: "We map your booking flows, inventory sources, payment processes, and integration needs to design the right platform architecture." },
      { step: "02", title: "Platform Build", description: "Booking engine, customer portal, and admin system built with real-time inventory sync and multi-channel support." },
      { step: "03", title: "Integrations", description: "GDS integration, payment gateway setup, and third-party API connections. Each integration tested for reliability and performance." },
      { step: "04", title: "Launch and Optimize", description: "Phased rollout with demand monitoring, A/B testing, and continuous optimization based on booking data and user behavior." },
    ],
    stats: [
      { value: "15+", label: "Travel Projects" },
      { value: "1M+", label: "Bookings Processed" },
      { value: "99.9%", label: "Uptime During Peaks" },
      { value: "30%", label: "Booking Conversion" },
    ],
    relatedServices: [
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "Mobile Development", href: "/services/mobile-development" },
      { title: "Payment Integration", href: "/services/web-development" },
      { title: "Cloud & DevOps", href: "/services/devops" },
    ],
    successStories: [
      {
        slug: "travel-booking-platform",
        title: "TravelEase: Multi-Service Booking Platform",
        problem: "TravelEase managed bookings through phone calls and spreadsheets, missing 40% of potential online bookings. Their manual process couldn't scale.",
        solution: "We built a real-time booking platform with GDS integration, multi-currency payments, and a customer self-service portal that increased online bookings by 200%.",
        results: [
          { value: "200%", label: "More Online Bookings" },
          { value: "60%", label: "Less Manual Work" },
        ],
      },
      {
        slug: "hotel-management-system",
        title: "GrandStay: Hotel Management System",
        problem: "GrandStay's 50-property portfolio used different systems with no unified view. Revenue management was manual and pricing was inconsistent.",
        solution: "We built a unified hotel management platform with dynamic pricing, channel management, and real-time analytics that increased revenue per available room by 25%.",
        results: [
          { value: "25%", label: "Higher RevPAR" },
          { value: "50", label: "Properties Unified" },
        ],
      },
    ],
    testimonials: [
      { quote: "Buggcy built a booking platform that handles 10,000 bookings per day across 50 properties. The GDS integration was seamless and the real-time analytics transformed our revenue management.", name: "Carlos Mendez", role: "VP Operations", company: "GrandStay Hotels", location: "Miami, USA" },
      { quote: "Online bookings increased by 200% within three months of launch. The customer portal reduced support calls by 60%. Transformative for our business.", name: "Priya Sharma", role: "CEO", company: "TravelEase", location: "Dubai, UAE" },
    ],
  },
  {
    id: "16",
    title: "Food & Groceries",
    slug: "food-groceries",
    icon: "Apple",
    description:
      "Modern solutions for food and grocery business",
    heroSubtitle: "From Ordering to Delivery. Built for Freshness and Speed.",
    heroCta: "Get My Free Food Tech Review",
    imageUrl: "https://buggcy.com/wp-content/uploads/2020/06/Food-and-Grocery.png",
    features: [
      "Online Ordering Systems",
      "Delivery Management",
      "Inventory Tracking",
      "Restaurant Platforms",
      "Grocery Delivery Apps",
      "POS Integration",
    ],
    challenges: [
      "Real-time inventory and freshness management",
      "Delivery time optimization",
      "Perishable goods tracking",
      "Peak order volume handling",
    ],
    solutions: [
      "Real-time inventory with automatic stock adjustment",
      "AI-optimized delivery routing for freshness",
      "Cold chain monitoring with IoT sensors",
      "Auto-scaling for lunch and dinner rush hours",
    ],
    technologies: ["React", "Node.js", "React Native", "PostgreSQL", "Redis", "Mapbox"],
    detailedContent:
      "Food and grocery business doesn't have to stick to the way it has been in the past. Modern solutions state the need for software that redefines how groceries are bought, sold and business operations are done.",
    challengesDetailed: [
      {
        title: "Real-Time Inventory and Freshness",
        description: "Food and grocery businesses must track inventory in real-time while managing expiration dates, seasonal availability, and supplier delivery schedules. Out-of-stock items frustrate customers, while overstocking leads to waste."
      },
      {
        title: "Last-Mile Delivery Optimization",
        description: "Delivering fresh food within tight time windows requires sophisticated route optimization. Late deliveries mean spoiled food and unhappy customers. The system must balance delivery speed, cost, and freshness."
      },
      {
        title: "Peak Volume Management",
        description: "Online food orders spike during lunch and dinner hours. The platform must handle 10x normal traffic during these windows without crashes or slowdowns that lose orders."
      },
      {
        title: "Multi-Vendor Management",
        description: "Food aggregators must manage multiple restaurants and grocery stores with different menus, pricing, delivery zones, and operating hours. Unified management while preserving vendor autonomy is challenging."
      },
    ],
    lifecycle: [
      { step: "01", title: "Customer Ordering App", description: "Intuitive browsing, search, and ordering experience with real-time menu updates, dietary filters, and delivery time estimates." },
      { step: "02", title: "Restaurant/Store Portal", description: "Menu management, order acceptance, preparation tracking, and analytics. Built for speed with one-tap order processing." },
      { step: "03", title: "Delivery Management", description: "Real-time driver tracking, route optimization, and delivery confirmation. Multi-driver dispatch with ETA predictions." },
      { step: "04", title: "Inventory Management", description: "Real-time stock tracking, automatic menu updates, and supplier integration. Prevents overselling and manages perishables." },
      { step: "05", title: "Payment and Promotions", description: "Multiple payment methods, promotional campaigns, loyalty programs, and subscription-based delivery passes." },
      { step: "06", title: "Analytics and Growth", description: "Order analytics, demand forecasting, customer behavior insights, and marketing automation for growth." },
    ],
    approach: [
      { step: "01", title: "Business Model Analysis", description: "We analyze your food business model — restaurant delivery, grocery delivery, or hybrid — to design the right platform architecture." },
      { step: "02", title: "Platform Build", description: "Customer app, vendor portal, delivery management, and admin system built with real-time inventory sync." },
      { step: "03", title: "Delivery and Payments", description: "Route optimization, delivery tracking, and payment processing integrated and tested for reliability during peak hours." },
      { step: "04", title: "Launch and Scale", description: "Area-by-area rollout with demand monitoring, driver onboarding, and continuous optimization based on order data." },
    ],
    stats: [
      { value: "18+", label: "Food Tech Projects" },
      { value: "500K+", label: "Orders Delivered" },
      { value: "<30min", label: "Average Delivery" },
      { value: "99.5%", label: "Order Accuracy" },
    ],
    relatedServices: [
      { title: "Mobile Development", href: "/services/mobile-development" },
      { title: "Custom Software Engineering", href: "/services/web-development" },
      { title: "Payment Integration", href: "/services/web-development" },
      { title: "Cloud & DevOps", href: "/services/devops" },
    ],
    successStories: [
      {
        slug: "food-delivery-scaling",
        title: "FreshBite: Food Delivery Scaling",
        problem: "FreshBite's platform crashed during dinner rush, losing 30% of daily orders. Their single-server architecture couldn't handle peak traffic.",
        solution: "We rebuilt with auto-scaling microservices and CDN-integrated delivery tracking that handles 50,000 concurrent orders without issues.",
        results: [
          { value: "50K", label: "Concurrent Orders" },
          { value: "Zero", label: "Crashes During Rush" },
        ],
      },
      {
        slug: "grocery-delivery-platform",
        title: "GreenBasket: Grocery Delivery Platform",
        problem: "GreenBasket's manual inventory tracking led to 15% out-of-stock rates and frustrated customers who received substitute items.",
        solution: "We built real-time inventory management with automatic menu updates and smart substitution suggestions that reduced out-of-stock rates to 2%.",
        results: [
          { value: "2%", label: "Out-of-Stock Rate" },
          { value: "40%", label: "Fewer Complaints" },
        ],
      },
    ],
    testimonials: [
      { quote: "Buggcy built a food delivery platform that handles our dinner rush without breaking a sweat. Zero crashes since launch, even during 50K concurrent orders.", name: "Michael Torres", role: "CEO", company: "FreshBite", location: "Los Angeles, USA" },
      { quote: "Out-of-stock rates dropped from 15% to 2% after they implemented real-time inventory management. Our customers love the accuracy.", name: "Nadia Rahman", role: "Head of Operations", company: "GreenBasket", location: "London, UK" },
    ],
  },
];

export const mockSuccessStories: SuccessStory[] = [
  {
    id: "1",
    title: "AI-Powered Patient Management System",
    slug: "ai-patient-management",
    client: "MedCare Health Network",
    category: "Healthcare",
    description: "Transformed a regional hospital network's patient management with AI-driven scheduling, records, and diagnostics — reducing costs by 40%.",
    problem: "MedCare Health Network was struggling with fragmented patient records, inefficient scheduling, and long diagnosis turnaround times across their 12 hospitals. Staff spent hours on manual data entry and patients faced long wait times.",
    solution: "We built a unified AI-powered patient management platform that integrated all EHR systems, implemented智能 scheduling algorithms, and deployed ML-based diagnostic assistance tools. The system features real-time dashboards for administrators and a patient mobile app for self-service.",
    results: [
      { label: "Cost Reduction", value: "40%" },
      { label: "Faster Diagnosis", value: "60%" },
      { label: "Patient Satisfaction", value: "95%" },
      { label: "Hospitals Connected", value: "12" },
    ],
    technologies: ["React", "Python", "TensorFlow", "AWS", "FHIR", "PostgreSQL"],
  },
  {
    id: "2",
    title: "Real-Time Payment Processing Platform",
    slug: "realtime-payment-platform",
    client: "PayFlow Digital",
    category: "FinTech",
    description: "Built a payment gateway handling 10M+ daily transactions with real-time fraud detection, achieving 99.99% uptime.",
    problem: "PayFlow needed to process millions of daily transactions with zero tolerance for downtime. Their legacy system couldn't scale during peak hours and lacked modern fraud detection capabilities.",
    solution: "We designed an event-driven microservices architecture with Kafka for real-time processing, implemented ML-based fraud detection with sub-second response times, and deployed across multiple AWS regions with automatic failover.",
    results: [
      { label: "Daily Transactions", value: "10M+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Fraud Detection", value: "99.7%" },
      { label: "Response Time", value: "<50ms" },
    ],
    technologies: ["Node.js", "Java", "Kafka", "PostgreSQL", "AWS", "Redis"],
  },
  {
    id: "3",
    title: "Smart Logistics & Fleet Management",
    slug: "smart-logistics-fleet",
    client: "SwiftMove Logistics",
    category: "Logistics",
    description: "Deployed IoT-based fleet tracking with AI route optimization, cutting fuel costs by 25% and improving delivery times by 35%.",
    problem: "SwiftMove operated 500+ vehicles with no real-time visibility. Manual route planning wasted fuel and delayed deliveries, leading to unhappy customers and high operational costs.",
    solution: "We built a comprehensive fleet management platform with IoT GPS tracking, AI-powered route optimization, and automated dispatch. Drivers use a mobile app with turn-by-turn navigation and proof-of-delivery features.",
    results: [
      { label: "Fuel Cost Savings", value: "25%" },
      { label: "Faster Deliveries", value: "35%" },
      { label: "Vehicles Tracked", value: "500+" },
      { label: "On-time Delivery", value: "98%" },
    ],
    technologies: ["React", "Node.js", "Mapbox", "IoT", "Python", "PostgreSQL"],
  },
  {
    id: "4",
    title: "Adaptive Learning Platform for Universities",
    slug: "adaptive-learning-university",
    client: "EduVerse University",
    category: "Education",
    description: "Created an AI-driven learning platform that personalizes course content for 50,000+ students, improving pass rates by 28%.",
    problem: "EduVerse University struggled with one-size-fits-all course delivery. Students had varying learning paces and styles, resulting in high dropout rates and inconsistent academic performance across their online programs.",
    solution: "We developed an adaptive learning platform that uses AI to assess student knowledge levels and dynamically adjusts course content, pacing, and difficulty. The system includes interactive assessments, progress tracking dashboards, and automated tutoring.",
    results: [
      { label: "Students Served", value: "50K+" },
      { label: "Pass Rate Improvement", value: "28%" },
      { label: "Engagement Increase", value: "45%" },
      { label: "Courses Available", value: "200+" },
    ],
    technologies: ["Next.js", "Python", "PostgreSQL", "AWS", "WebSocket", "TensorFlow"],
  },
  {
    id: "5",
    title: "E-Commerce Marketplace with AI Recommendations",
    slug: "ecommerce-ai-marketplace",
    client: "ShopNova",
    category: "E-Commerce",
    description: "Built a scalable marketplace with AI-powered product recommendations, increasing conversion rates by 35% and average order value by 22%.",
    problem: "ShopNova's existing platform had slow page loads, poor search functionality, and no personalization. Customers struggled to find relevant products, leading to high bounce rates and low repeat purchases.",
    solution: "We rebuilt the platform with a headless commerce architecture, implemented Elasticsearch for instant search, and deployed a collaborative filtering AI engine for personalized recommendations. The new design focused on mobile-first experience.",
    results: [
      { label: "Conversion Rate", value: "+35%" },
      { label: "Order Value", value: "+22%" },
      { label: "Page Load", value: "1.2s" },
      { label: "Monthly Users", value: "200K+" },
    ],
    technologies: ["Next.js", "Node.js", "Elasticsearch", "Redis", "Stripe", "MongoDB"],
  },
  {
    id: "6",
    title: "Blockchain-Based Supply Chain Tracking",
    slug: "blockchain-supply-chain",
    client: "VerifyChain",
    category: "Blockchain",
    description: "Developed a transparent supply chain solution using blockchain, enabling end-to-end product traceability for Fortune 500 retailers.",
    problem: "Major retailers faced challenges tracking products from manufacturer to shelf. Counterfeit goods, lack of transparency, and manual paperwork caused delays and trust issues across the supply chain.",
    solution: "We built a permissioned blockchain network using Hyperledger Fabric that tracks every handoff point. Smart contracts automate compliance checks, and a dashboard provides real-time visibility for all stakeholders.",
    results: [
      { label: "Traceability", value: "100%" },
      { label: "Counterfeit Reduction", value: "95%" },
      { label: "Processing Time", value: "-60%" },
      { label: "Retail Partners", value: "15+" },
    ],
    technologies: ["Hyperledger Fabric", "Node.js", "React", "Docker", "Kubernetes", "PostgreSQL"],
  },
  {
    id: "7",
    title: "Smart Home IoT Control Platform",
    slug: "smart-home-iot",
    client: "NexaHome Technologies",
    category: "IoT",
    description: "Created a unified IoT platform controlling 10,000+ smart devices with voice integration and energy optimization algorithms.",
    problem: "NexaHome's smart home devices worked in silos with no unified control. Users needed multiple apps, and energy consumption was unoptimized, leading to high utility bills and poor user experience.",
    solution: "We developed a central IoT hub with MQTT protocol support, integrated with Alexa and Google Home for voice control. ML algorithms analyze usage patterns to automatically optimize energy consumption.",
    results: [
      { label: "Devices Connected", value: "10K+" },
      { label: "Energy Savings", value: "30%" },
      { label: "User Satisfaction", value: "4.8/5" },
      { label: "Response Time", value: "<100ms" },
    ],
    technologies: ["React Native", "Node.js", "MQTT", "AWS IoT", "TensorFlow", "Redis"],
  },
  {
    id: "8",
    title: "Real Estate Property Management System",
    slug: "real-estate-management",
    client: "PropTech Solutions",
    category: "Real Estate",
    description: "Built an end-to-end property management platform handling 5,000+ listings with automated tenant screening and maintenance tracking.",
    problem: "PropTech managed hundreds of properties using spreadsheets and phone calls. Tenant applications took days to process, maintenance requests were lost, and rent collection was inconsistent.",
    solution: "We created a comprehensive SaaS platform with automated tenant credit checks, online lease signing, maintenance ticketing with contractor dispatch, and automated rent reminders with integrated payment processing.",
    results: [
      { label: "Properties Managed", value: "5K+" },
      { label: "Rent Collection", value: "99%" },
      { label: "Tenant Screening", value: "24hrs" },
      { label: "Maintenance Response", value: "4hrs" },
    ],
    technologies: ["React", "Django", "PostgreSQL", "Stripe", "Twilio", "AWS"],
  },
  {
    id: "9",
    title: "AI Chatbot for Customer Support",
    slug: "ai-customer-support",
    client: "TechAssist Pro",
    category: "AI & Automation",
    description: "Deployed an AI-powered customer support chatbot handling 80% of inquiries automatically, reducing support costs by 50%.",
    problem: "TechAssist Pro's support team was overwhelmed with repetitive queries. Average response time was 24 hours, customer satisfaction was dropping, and support costs were escalating rapidly.",
    solution: "We built a conversational AI chatbot using GPT models fine-tuned on their knowledge base. The bot handles common queries instantly, escalates complex issues to human agents with context, and learns from interactions.",
    results: [
      { label: "Auto-Resolution", value: "80%" },
      { label: "Cost Reduction", value: "50%" },
      { label: "Response Time", value: "<30s" },
      { label: "CSAT Score", value: "92%" },
    ],
    technologies: ["Python", "OpenAI", "FastAPI", "React", "Redis", "PostgreSQL"],
  },
];

export const mockWhyChooseUs: WhyChooseUsItem[] = [
  {
    title: "Our Team",
    description:
      "Our work-intensive team craves success and achievement, which defines our positive mindset towards any sort of challenge, whether in outsourcing or software development as a whole.",
  },
  {
    title: "Agility",
    description:
      "Our work methodology works like a spearhead towards challenges, enabling us to complete our duties flawlessly, without any delays.",
  },
  {
    title: "Leadership",
    description:
      "Leaders lead by example and so do ours who have achieved their rightful place through years of experience and in-depth know-how of today's outsourcing software development trends.",
  },
  {
    title: "Culture",
    description: "We embrace the idea of meeting people with different knowledge and background because we are a pool that promotes innovation by leveraging emerging tools and technology.",
  },
];

export const mockPrivacyPolicy: PolicyPage = {
  icon: "Shield",
  label: "Legal",
  heading: "Privacy",
  headingAccent: "Policy",
  description:
    "Your privacy is important to us. This policy outlines how Buggcy collects, uses, and protects your personal information.",
  effectiveDate: "January 1, 2025",
  sections: [
    {
      title: "1. Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, company name, and any other information you choose to provide.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "We use the information we collect to operate and improve our website and services, to send you technical notices, updates, security alerts, and support messages, to respond to your comments, questions, and customer service requests, and to communicate with you about products, services, offers, promotions, rewards, and events offered by Buggcy.",
    },
    {
      title: "3. Information Sharing",
      content:
        "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee the absolute security of your data.",
    },
    {
      title: "5. Cookies",
      content:
        "Our website may use cookies to enhance your experience. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings. If you turn cookies off, some of the features that make your site experience more efficient may not function properly.",
    },
    {
      title: "6. Third-Party Links",
      content:
        "Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.",
    },
    {
      title: "7. Children's Privacy",
      content:
        "Our services are not directed to individuals under 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions.",
    },
    {
      title: "8. Your Rights",
      content:
        "You have the right to access, correct, or delete your personal information. You may also object to the processing of your personal data or request the restriction of processing. To exercise any of these rights, please contact us at contact@buggcy.com.",
    },
    {
      title: "9. Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the \"effective date\" at the top of this page. You are advised to review this policy periodically for any changes.",
    },
    {
      title: "10. Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at contact@buggcy.com or write to us at Buggcy, 123 Tech Street, San Francisco, CA 94105.",
    },
  ],
};

export const mockTermsOfService: PolicyPage = {
  icon: "FileText",
  label: "Legal",
  heading: "Terms of",
  headingAccent: "Service",
  description:
    "Please read these terms carefully before using our services. By using Buggcy's services, you agree to these terms.",
  effectiveDate: "January 1, 2025",
  sections: [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using the Buggcy website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.",
    },
    {
      title: "2. Services Description",
      content:
        "Buggcy provides software development, consulting, and technology services including but not limited to web development, mobile app development, UI/UX design, cloud infrastructure, and DevOps services. The specific scope, deliverables, and timelines for each project are defined in individual project agreements.",
    },
    {
      title: "3. Intellectual Property",
      content:
        "All content on this website, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Buggcy or its content suppliers and is protected by international copyright laws. Custom software developed for clients is owned by the client upon full payment, unless otherwise specified in the project agreement.",
    },
    {
      title: "4. Client Responsibilities",
      content:
        "Clients are responsible for providing accurate and complete information required for project delivery. Delays caused by incomplete or inaccurate client inputs may affect project timelines. Clients must also ensure they have the necessary rights and permissions for any content or materials provided to Buggcy.",
    },
    {
      title: "5. Payment Terms",
      content:
        "Payment terms are defined in individual project agreements. Generally, projects require an upfront deposit before work begins. Late payments may result in project suspension. All prices are exclusive of applicable taxes unless stated otherwise.",
    },
    {
      title: "6. Confidentiality",
      content:
        "Both parties agree to maintain the confidentiality of proprietary information shared during the course of engagement. Buggcy will not disclose client confidential information to third parties without prior written consent.",
    },
    {
      title: "7. Limitation of Liability",
      content:
        "Buggcy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use of our services. Our total liability shall not exceed the amount paid by the client for the specific service giving rise to the claim.",
    },
    {
      title: "8. Warranty",
      content:
        "Buggcy warrants that services will be performed in a professional and workmanlike manner. We provide a warranty period for custom development work as specified in individual project agreements. This warranty does not cover issues caused by third-party modifications or misuse.",
    },
    {
      title: "9. Termination",
      content:
        "Either party may terminate the agreement with written notice. Upon termination, the client shall pay for all services rendered up to the termination date. Buggcy will deliver all completed work product to the client upon full payment.",
    },
    {
      title: "10. Governing Law",
      content:
        "These terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising under these terms shall be resolved in the courts of Lahore, Pakistan.",
    },
    {
      title: "11. Changes to Terms",
      content:
        "Buggcy reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after any changes constitutes acceptance of the new terms.",
    },
    {
      title: "12. Contact",
      content:
        "For questions about these Terms of Service, please contact us at contact@buggcy.com or write to us at Buggcy, 123 Tech Street, San Francisco, CA 94105.",
    },
  ],
};

export const mockCookiesPolicy: PolicyPage = {
  icon: "Cookie",
  label: "Legal",
  heading: "Cookies",
  headingAccent: "Policy",
  description:
    "This policy explains how Buggcy uses cookies and similar technologies to recognize you when you visit our website.",
  effectiveDate: "January 1, 2025",
  sections: [
    {
      title: "1. What Are Cookies",
      content:
        "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.",
    },
    {
      title: "2. How We Use Cookies",
      content:
        "We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.",
    },
    {
      title: "3. Types of Cookies We Use",
      content:
        "Essential Cookies: These are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.\n\nAnalytics Cookies: These help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website performance and user experience.\n\nFunctional Cookies: These enable personalized features such as remembering your preferences and settings. They may be set by us or by third-party providers whose services we have added to our pages.\n\nMarketing Cookies: These are used to track visitors across websites to display relevant advertisements. They help us measure the effectiveness of our advertising campaigns.",
    },
    {
      title: "4. Third-Party Cookies",
      content:
        "In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site:\n\nGoogle Analytics: One of the most widespread and trusted analytics solutions on the web. It helps us understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit.\n\nSocial Media Cookies: These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other services.",
    },
    {
      title: "5. Managing Cookies",
      content:
        "You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.\n\nMost browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites. Common browser cookie settings can be found in the preferences or settings menu of your browser.",
    },
    {
      title: "6. Cookie Duration",
      content:
        "Session Cookies: These are temporary cookies that exist only while your browser is open. They are deleted from your device once you close your browser.\n\nPersistent Cookies: These remain on your device after you close your browser until you delete them manually or until your browser deletes them based on the duration period contained within the cookie's data.",
    },
    {
      title: "7. Your Choices",
      content:
        "You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Banner that appears when you first visit our website, or by modifying your browser settings.\n\nPlease note that if you choose to reject cookies, you may not be able to use the full functionality of our website.",
    },
    {
      title: "8. Updates to This Policy",
      content:
        "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. Please revisit this page periodically to stay informed about our use of cookies.",
    },
    {
      title: "9. Contact Us",
      content:
        "If you have any questions about our use of cookies or other technologies, please contact us at contact@buggcy.com or write to us at Buggcy, 123 Tech Street, San Francisco, CA 94105.",
    },
  ],
};
