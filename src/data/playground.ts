export interface PlaygroundEntry {
  id: string;
  num: number;
  title: string;
  description: string;
  slug: string;
}

/** Single source of truth for the playground demos (index page, OG images, breadcrumbs). */
export const playgroundList: PlaygroundEntry[] = [
  {
    id: 'snake',
    num: 1,
    title: 'Snake',
    description: 'The classic arcade game in under 200 lines of vanilla TypeScript. Keyboard, swipe and on-screen controls, with a saved best score.',
    slug: 'snake',
  },
];
