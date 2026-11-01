import { SITE_CONFIG } from '../config';
import { absoluteUrl } from './url';
import type { ToolEntry } from '../data/tools';

/** Helpers that build schema.org JSON-LD nodes (rendered by the layout inside one @graph). */

export type SchemaNode = Record<string, unknown>;

export const personId = () => `${absoluteUrl()}#person`;
export const websiteId = () => `${absoluteUrl()}#website`;

export function personSchema(): SchemaNode {
  return {
    '@type': 'Person',
    '@id': personId(),
    name: SITE_CONFIG.author,
    url: absoluteUrl(),
    image: absoluteUrl('images/jasur-flora.webp'),
    jobTitle: SITE_CONFIG.jobTitle,
    description: SITE_CONFIG.description,
    sameAs: [SITE_CONFIG.github, SITE_CONFIG.telegram],
    knowsAbout: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Astro', 'Tailwind CSS', 'Desktop apps'],
  };
}

export function websiteSchema(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': websiteId(),
    url: absoluteUrl(),
    name: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.language,
    publisher: { '@id': personId() },
  };
}

export interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: Crumb[]): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface BlogPostingInput {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: Date | string;
  dateModified?: Date | string;
  tags?: string[];
}

export function blogPostingSchema(post: BlogPostingInput): SchemaNode {
  const published = new Date(post.datePublished).toISOString();
  return {
    '@type': 'BlogPosting',
    '@id': `${post.url}#article`,
    headline: post.title,
    description: post.description,
    url: post.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.url },
    image: [post.image],
    datePublished: published,
    dateModified: post.dateModified ? new Date(post.dateModified).toISOString() : published,
    keywords: (post.tags ?? []).join(', '),
    inLanguage: SITE_CONFIG.language,
    author: { '@id': personId() },
    publisher: { '@id': personId() },
    isPartOf: { '@id': websiteId() },
  };
}

export function webAppSchema(tool: ToolEntry, url: string, image: string): SchemaNode {
  return {
    '@type': 'WebApplication',
    '@id': `${url}#app`,
    name: tool.title,
    description: tool.description,
    url,
    image,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any (runs in the browser)',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@id': personId() },
    inLanguage: SITE_CONFIG.language,
  };
}
