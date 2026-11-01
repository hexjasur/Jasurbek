import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/url';

/**
 * Note: crawlers only read robots.txt from the domain root. On a GitHub Pages project URL
 * (user.github.io/repo) this file is ignored; it starts working as soon as a custom domain is attached.
 */
export const GET: APIRoute = () =>
  new Response(
    ['User-agent: *', 'Allow: /', '', `Sitemap: ${absoluteUrl('sitemap-index.xml')}`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
