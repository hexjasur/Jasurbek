export interface PlaygroundEntry {
  id: string;
  num: number;
  title: string;
  description: string;
  slug: string;
  /** Path relative to the site root, for entries that live outside /playground/. */
  href?: string;
}

/** Single source of truth for the playground demos (index page, OG images, breadcrumbs). */
export const playgroundList: PlaygroundEntry[] = [
  {
    id: 'reaction-time',
    num: 2,
    title: 'Reaction Time Test',
    description: 'Click the moment the panel turns green and measure your reflexes in milliseconds, with best and rolling average scores.',
    slug: 'reaction-time',
  },
  {
    id: 'snake',
    num: 1,
    title: 'Snake',
    description: 'The classic arcade game in under 200 lines of vanilla TypeScript. Keyboard, swipe and on-screen controls, with a saved best score.',
    slug: 'snake',
  },
  {
    id: 'git-playground',
    num: 3,
    title: 'Git Playground',
    description: 'Learn Git visually: edit, stage, commit, branch, merge and reset while the commit graph updates. Guided challenges included.',
    slug: 'git-playground',
  },
  {
    id: 'terminal',
    num: 4,
    title: 'Terminal',
    description: 'A portfolio in a terminal. Run projects, tools, playground, blog and whoami to get the same data as JSON.',
    slug: 'terminal',
    href: 'terminal',
  },
];
