import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgImage, type OgEntry } from '../../lib/og';
import { toolsList } from '../../data/tools';
import { playgroundList } from '../../data/playground';
import { SITE_CONFIG } from '../../config';

/**
 * Generates one branded 1200x630 PNG per page at build time:
 *  /og/default.png, /og/blog.png, /og/blog/<post>.png, /og/tools/<tool>.png ...
 */
export const getStaticPaths = (async () => {
  const posts = await getCollection('blog');

  const entries: OgEntry[] = [
    {
      slug: 'default',
      kicker: 'Portfolio & Tech Blog',
      title: SITE_CONFIG.author,
      description: 'Software engineer building web apps, desktop tools, and small experiments worth sharing.',
    },
    {
      slug: 'blog',
      kicker: 'Blog',
      title: 'Personal Tech Blog',
      description: 'Practical notes on modern web development, developer tools, and cross-platform apps.',
    },
    {
      slug: 'projects',
      kicker: 'Projects',
      title: 'Selected Projects',
      description: 'Apps, tools, and experiments I have built and shipped.',
    },
    {
      slug: 'tools',
      kicker: 'Tools',
      title: 'Free In-Browser Tools',
      description: 'Fast, private developer utilities. Everything runs locally in your browser.',
    },
    {
      slug: 'playground',
      kicker: 'Playground',
      title: 'Playground',
      description: 'Small interactive experiments and games built with vanilla TypeScript.',
    },
    ...posts.map((post) => ({
      slug: `blog/${post.id}`,
      kicker: 'Blog',
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
    })),
    ...playgroundList.map((demo) => ({
      slug: `playground/${demo.slug}`,
      kicker: 'Playground',
      title: demo.title,
      description: demo.description,
    })),
    ...toolsList.map((tool) => ({
      slug: `tools/${tool.slug}`,
      kicker: 'Tool',
      title: tool.title,
      description: tool.description,
    })),
  ];

  return entries.map((entry) => ({ params: { slug: entry.slug }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props.entry as OgEntry);
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
