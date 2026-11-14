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
    tags: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Tauri v2', 'Rust'],
    caseStudy: {
      problem: 'Solving numerical-method problems by hand can take hours, especially when finding roots requires many iterations or working through a long sequence of calculations.',
      solution: 'Numeric Methods automates these calculations and presents approximate results alongside exact or reference values where applicable, with step-by-step formulas, charts, and audit tables.',
      contribution: 'I built an interactive computational-mathematics application that helps users solve and inspect problems across root-finding, interpolation, quadrature, and ODE workflows.',
      decisions: 'I focused on making each calculation transparent rather than returning only a final answer. The application is available on the web, desktop, and Android.',
      outcome: 'The application reduces time spent on repetitive manual calculations and lets users focus more on understanding and verifying numerical methods.',
    },
    featured: true,
    hasDownloads: true,
    year: '2025–Present',
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
    tags: ['React', 'TypeScript', 'Tauri v2', 'Rust', 'Vite', 'Tailwind CSS'],
    caseStudy: {
      problem: 'Useful developer, network, media, image, AI, and gaming utilities are often spread across separate apps, making everyday workflows feel fragmented.',
      solution: 'Yolnoma brings these utility categories together in a Tauri desktop workspace, with local-first storage for account data and AI chat sessions.',
      contribution: 'I built the application around a React and TypeScript interface, connected it to a Tauri v2 and Rust desktop layer, and brought multiple utility workflows into one product.',
      decisions: 'I chose a web-based React interface with Tauri for native desktop delivery, and kept key application data local-first rather than making the desktop workspace depend on a remote account service.',
      outcome: 'The result is a single desktop workspace for several everyday utility workflows, supported by a live web presence.',
    },
    featured: true,
    hasDownloads: false,
    year: '2025–Present',
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
    eyebrow: 'Developer documentation & tooling',
    tagline: 'AI agent instructions. Consistent workflows. Team standards.',
    description: 'A focused open-source repository and documentation standard for defining reproducible conventions, instructions, and workflows for autonomous AI coding agents across teams.',
    longDescription: `AGENTS.md is a documentation project that addresses the growing need for consistent AI-assisted coding workflows across teams and repositories. As AI coding agents become more common, having a standard way to define project conventions, coding standards, and agent instructions becomes essential.

The repository provides templates and guidance for creating AGENTS.md files that AI agents can reference when contributing to a project, ensuring consistency whether a human or AI is making changes.`,
    details: [
      'Documents repeatable agent instructions and project conventions',
      'Helps teams keep AI-assisted coding workflows consistent',
      'A documentation and engineering-process project rather than a visual app',
    ],
    tags: ['Documentation', 'AI Coding', 'Engineering Standards', 'Open Source'],
    caseStudy: {
      problem: 'AI coding agents need reliable repository context and consistent project conventions; without shared instructions, setup and expectations can vary between projects.',
      solution: 'The repository documents how to install and maintain AGENTS.md instructions, with an emphasis on repeatable conventions and repository context.',
      contribution: 'I created a focused documentation resource for setting up and updating agent instructions so teams can make their AI-assisted engineering workflows more consistent.',
      decisions: 'I kept the project centered on practical repository-level guidance and reusable instructions, rather than building a separate application.',
      outcome: 'The result is a reusable reference for maintaining agent guidance across software repositories.',
    },
    featured: false,
    hasDownloads: false,
    year: '2025',
    status: 'Maintained',
    repository: 'https://github.com/hexjasur/AGENTS.md',
    image: 'images/projects/agents-md/agents-md-readme.webp',
    imageAlt: 'AGENTS.md documentation project',
    screenshots: [],
  },
];

export const projectsMap: Record<string, ProjectEntry> = Object.fromEntries(
  projectsList.map((p) => [p.slug, p])
);
