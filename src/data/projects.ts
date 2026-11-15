export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  contribution: string;
  decisions: string;
  outcome: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface ProjectEntry {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  longDescription: string;
  details: string[];
  tags: string[];
  caseStudy: ProjectCaseStudy;
  featured?: boolean;
  hasDownloads?: boolean;
  year: string;
  status: string;
  website?: string;
  repository?: string;
  image: string;
  imageAlt: string;
  screenshots?: ProjectScreenshot[];
}

/** Unified data store for all portfolio projects (index page, slug pages, OG cards). */
export const projectsList: ProjectEntry[] = [
  {
    slug: 'numeric-methods',
    title: 'Numeric Methods',
    eyebrow: 'Web, desktop and Android',
    tagline: 'Interactive algorithms. Step-by-step computation. Cross-platform.',
    description: 'An interactive laboratory for numerical methods and computational mathematics, designed to explain algorithms step by step with live charts, formula inspectors, and native binaries for Windows, Linux, and Android.',
    longDescription: `Numeric Methods is a cross-platform educational application that automates the tedious manual calculations students encounter in numerical analysis courses. Every algorithm shows its work — from initial setup through each iteration to the final result — so users can verify each step.

The project covers root-finding (bisection, Newton's method), interpolation, numerical integration (quadrature), and ODE solvers. Each method is presented with interactive inputs, live charts, step-by-step formula display, and exportable audit tables.`,
    details: [
      'Next.js 16, React 19 and Tailwind CSS 4',
      'Tauri v2 builds for Windows, Linux and Android',
      'Bisection, Newton, interpolation, quadrature and ODE solvers',
      'Interactive charts, formulas, audit tables and export tools',
    ],
    tags: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Tauri v2', 'Rust', 'Open Source'],
    caseStudy: {
      problem: 'Solving numerical-method problems by hand can take hours, especially when finding roots requires many iterations or working through a long sequence of calculations.',
      solution: 'Numeric Methods automates these calculations and presents approximate results alongside exact or reference values where applicable, with step-by-step formulas, charts, and audit tables.',
      contribution: 'I built an interactive computational-mathematics application that helps users solve and inspect problems across root-finding, interpolation, quadrature, and ODE workflows.',
      decisions: 'I focused on making each calculation transparent rather than returning only a final answer. The application is available on the web, desktop, and Android.',
      outcome: 'The application reduces time spent on repetitive manual calculations and lets users focus more on understanding and verifying numerical methods.',
    },
    featured: true,
    hasDownloads: true,
    year: 'Mar 16, 2026 – Present',
    status: 'Active',
    website: 'https://sonli-usullar.uz',
    repository: 'https://github.com/hexjasur/numeric-methods',
    image: 'images/projects/nm/numeric-methods-main.webp',
    imageAlt: 'Numeric Methods application preview',
    screenshots: [
      { src: 'images/projects/nm/numeric-methods-home.webp', alt: 'Numeric Methods home preview' },
      { src: 'images/projects/nm/numeric-methods-ode.webp', alt: 'Numeric Methods ODE solver preview' },
    ],
  },
  {
    slug: 'yolnoma-app',
    title: 'Yolnoma-App',
    eyebrow: 'Desktop application',
    tagline: 'Developer workspace. Unified utilities. Tauri-powered.',
    description: 'A Tauri-powered desktop workspace that unifies developer utilities, network tools, media conversion, and local-first AI chat sessions into one lightweight native application.',
    longDescription: `Yolnoma is a native desktop application that unifies multiple developer workflows into a single polished experience. Instead of juggling separate apps for network tools, media conversion, AI chat, and developer utilities, Yolnoma brings them together with a cohesive interface and local-first data storage.

The application is built with React and TypeScript on the frontend, using Vite for fast iteration and Tailwind CSS for styling. The native layer is powered by Tauri v2 with Rust, providing system-level access while keeping the bundle size minimal compared to Electron-based alternatives.`,
    details: [
      'React, TypeScript, Vite and Tailwind CSS frontend',
      'Tauri v2 and Rust native desktop layer',
      'Local-first account and AI chat session storage',
      'Developer tools, network inspection and media workflows',
    ],
    tags: ['React', 'TypeScript', 'Tauri v2', 'Rust', 'Vite', 'Tailwind CSS', 'Open Source'],
    caseStudy: {
      problem: 'Useful developer, network, media, image, AI, and gaming utilities are often spread across separate apps, making everyday workflows feel fragmented.',
      solution: 'Yolnoma brings these utility categories together in a Tauri desktop workspace, with local-first storage for account data and AI chat sessions.',
      contribution: 'I built the application around a React and TypeScript interface, connected it to a Tauri v2 and Rust desktop layer, and brought multiple utility workflows into one product.',
      decisions: 'I chose a web-based React interface with Tauri for native desktop delivery, and kept key application data local-first rather than making the desktop workspace depend on a remote account service.',
      outcome: 'The result is a single desktop workspace for several everyday utility workflows, supported by a live web presence.',
    },
    featured: true,
    hasDownloads: false,
    year: 'Aug 10, 2026 – Present',
    status: 'Active',
    website: 'https://app.yolnoma.uz',
    repository: 'https://github.com/hexjasur/Yolnoma-App',
    image: 'images/projects/yolnoma-app/yolnoma-brand.webp',
    imageAlt: 'Yolnoma desktop workspace preview',
    screenshots: [
      { src: 'images/projects/yolnoma-app/yolnoma-dashboard.webp', alt: 'Yolnoma dashboard screenshot' },
      { src: 'images/projects/yolnoma-app/yolnoma-workspace.webp', alt: 'Yolnoma developer workspace screenshot' },
    ],
  },
  {
    slug: 'agents-md',
    title: 'AGENTS.md',
    eyebrow: 'CLI & Developer tooling',
    tagline: 'AI agent instructions. Distributed via npm. Engineering standards.',
    description: 'An active open-source CLI and documentation standard distributed via npm (@hexjasur/agents-md) for defining reproducible conventions, instructions, and workflows for autonomous AI coding agents across teams.',
    longDescription: `AGENTS.md is an active open-source developer tool distributed via npm that addresses the critical need for consistent AI-assisted coding workflows across software repositories. As autonomous AI coding agents become daily collaborators, having a standardized CLI to scaffold and maintain project rules, conventions, and agent skills is essential.

Distributed as the npm package \`@hexjasur/agents-md\`, the CLI allows developers to run \`npx -y @hexjasur/agents-md\` in any project directory to install customized \`AGENTS.md\` guidelines alongside specialized Agent Skills for React, TypeScript, Tauri, and CI/CD workflows without overwriting customized project files.

For a comprehensive walkthrough on installation, skill options, and update workflows, read the [AGENTS.md Installation & Usage Guide](/blog/agents-md-ai-project-guides).`,
    details: [
      'Published and actively installable via npm: npx -y @hexjasur/agents-md',
      'Interactive CLI to scaffold AGENTS.md instructions and curated Agent Skills',
      'Step-by-step installation and usage guide: /blog/agents-md-ai-project-guides',
      'Keeps AI coding agents aligned with project conventions, architecture, and tests',
      'Non-destructive update engine that preserves custom guidelines during upgrades',
    ],
    tags: ['npm', 'CLI', 'Documentation', 'AI Coding', 'Engineering Standards', 'Open Source'],
    caseStudy: {
      problem: 'AI coding agents need reliable repository context and consistent project conventions; without shared instructions, setup and expectations can vary between projects.',
      solution: 'The repository documents how to install and maintain AGENTS.md instructions, with an emphasis on repeatable conventions and repository context.',
      contribution: 'I created a focused documentation resource for setting up and updating agent instructions so teams can make their AI-assisted engineering workflows more consistent.',
      decisions: 'I kept the project centered on practical repository-level guidance and reusable instructions, rather than building a separate application.',
      outcome: 'The result is a reusable reference for maintaining agent guidance across software repositories.',
    },
    featured: false,
    hasDownloads: false,
    year: 'Oct 15, 2026 – Present',
    status: 'Active',
    repository: 'https://github.com/hexjasur/AGENTS.md',
    image: 'images/projects/agents-md/agents-md-readme.webp',
    imageAlt: 'AGENTS.md documentation project',
    screenshots: [],
  },
  {
    slug: 'izgara-cafe',
    title: 'Izgara Cafe',
    eyebrow: 'Enterprise web application',
    tagline: 'Restaurant operations. Catalog automation. Secure Swagger API integration.',
    description: 'A dedicated administrative dashboard and product catalog automation system developed for Izgara Cafe, streamlining menu management, category structuring, and inventory workflows via secure HTTPS REST APIs.',
    longDescription: `Izgara Cafe is an enterprise-grade administrative and menu management platform designed to automate catalog operations, product listings, and category workflows for Izgara Cafe. Prior to this system, updating daily menu items, prices, and availability across service channels was a manual process prone to operational delays.

The platform was built and shipped by a dedicated three-person engineering team: a Project Manager, a Backend Developer, and myself as the Frontend Engineer. Spanning from March 30, 2025, to May 10, 2025, our team engineered a modern, responsive web application utilizing React, TypeScript, and shadcn/ui. I owned the complete client-side architecture, developing accessible UI components, integrating comprehensive REST API contracts documented via Swagger/OpenAPI, and implementing authenticated HTTPS workflows that give restaurant staff real-time control over their product ecosystem.`,
    details: [
      'Next.js, React and TypeScript client architecture styled with shadcn/ui and Tailwind CSS',
      'Automated menu catalog, category structuring, and pricing management with instant CRUD feedback',
      'Interactive data charts for visual sales, orders, and category metrics monitoring',
      'End-to-end REST API integration adhering strictly to Swagger/OpenAPI documentation',
      'Secure token authentication and role-based access control transmitted over HTTPS',
      'Engineered in a collaborative 3-person team: Project Manager, Frontend Developer (Jasurbek), and Backend Developer',
      'Delivered on schedule within strict deadline: March 30, 2025 – May 10, 2025',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'shadcn/ui', 'Tailwind CSS', 'Charts', 'Swagger API', 'HTTPS', 'REST Integration'],
    caseStudy: {
      problem: 'Izgara Cafe required a centralized, reliable system to manage its dynamic menu catalog. Updating items, modifier groups, and availability manually across shifts created bottlenecks and inconsistent menu representations.',
      solution: 'We engineered and deployed a dedicated web-based administration panel that centralizes all catalog operations with rapid CRUD workflows, input validation, interactive analytics charts, and real-time status indicators.',
      contribution: 'As the frontend engineer in a focused three-person team (Project Manager, Backend Engineer, and Frontend Engineer), I spearheaded the complete client application. I built the interface using Next.js, React, Tailwind CSS, and shadcn/ui, integrated all REST endpoints defined via Swagger, designed visual metric charts, implemented secure token-based session handling over HTTPS, and delivered an intuitive administrative UX tailored to daily cafe operations.',
      decisions: 'We chose Next.js, React, shadcn/ui, and Tailwind CSS to establish an accessible, production-grade design system with minimal bundle overhead. Integrating against Swagger/OpenAPI specifications ensured strict type safety between client requests and backend payloads, eliminating contract mismatches throughout the development sprint.',
      outcome: 'The system was successfully completed and delivered on deadline (March 30, 2025 – May 10, 2025). It eliminated manual menu update bottlenecks, cut catalog maintenance overhead, and provided Izgara Cafe with a resilient, secure platform for ongoing restaurant operations.',
    },
    featured: false,
    hasDownloads: false,
    year: 'Mar 30, 2025 – May 10, 2025',
    status: 'Completed',
    image: 'images/projects/izgara/izgara-admin-dashboard.jpg',
    imageAlt: 'Izgara Cafe administrative dashboard preview',
    screenshots: [
      { src: 'images/projects/izgara/izgara-admin-login.png', alt: 'Izgara Cafe secure admin login interface' },
      { src: 'images/projects/izgara/izgara-admin-prouducts.jpg', alt: 'Izgara Cafe product and catalog management table' },
    ],
  },
];

export const projectsMap: Record<string, ProjectEntry> = Object.fromEntries(
  projectsList.map((p) => [p.slug, p])
);
