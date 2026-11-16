import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../config';
import { absoluteUrl } from '../lib/url';

export async function GET() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );

  return rss({
    title: `${SITE_CONFIG.author} — Tech Blog`,
    description: SITE_CONFIG.description,
    site: absoluteUrl(),
    trailingSlash: true,
    customData: `<language>${SITE_CONFIG.language}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: absoluteUrl(`blog/${post.id}/`),
      categories: post.data.tags,
    })),
  });
}
