import { getSortedPosts } from './blog';
import { SITE_CONFIG } from '../config';
import { playgroundList } from '../data/playground';
import { projectsList } from '../data/projects';
import { toolsList } from '../data/tools';
import { absoluteUrl } from './url';

/**
 * Single source for the terminal page and any other surface that exposes site data.
 * Every value comes from the same modules the rest of the site renders from, so the
 * terminal never duplicates content: a new project, tool or post shows up automatically.
 */
export interface TerminalData {
  profile: Record<string, string>;
  projects: Record<string, unknown>[];
  tools: Record<string, unknown>[];
  playground: Record<string, unknown>[];
  blog: Record<string, unknown>[];
}

export async function buildTerminalData(): Promise<TerminalData> {
  const posts = await getSortedPosts();

  return {
    profile: {
      name: SITE_CONFIG.author,
      role: SITE_CONFIG.jobTitle,
      site: SITE_CONFIG.siteUrl,
      github: SITE_CONFIG.github,
      telegram: SITE_CONFIG.telegram,
      email: SITE_CONFIG.email,
    },
    projects: projectsList.map((project) => ({
      slug: project.slug,
      title: project.title,
      tagline: project.tagline,
      status: project.status,
      year: project.year,
      tags: project.tags,
      url: absoluteUrl(`projects/${project.slug}/`),
      website: project.website ?? null,
      repository: project.repository ?? null,
      description: project.description,
      details: project.details,
      caseStudy: project.caseStudy,
    })),
    tools: toolsList.map((tool) => ({
      num: tool.num,
      slug: tool.slug,
      title: tool.title,
      description: tool.description,
      url: absoluteUrl(`tools/${tool.slug}`),
    })),
    playground: playgroundList.map((demo) => ({
      num: demo.num,
      slug: demo.slug,
      title: demo.title,
      description: demo.description,
      url: absoluteUrl(demo.href ?? `playground/${demo.slug}`),
    })),
    blog: posts.map((post) => ({
      slug: post.id,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate.toISOString().slice(0, 10),
      updatedDate: post.data.updatedDate ? post.data.updatedDate.toISOString().slice(0, 10) : null,
      tags: post.data.tags ?? [],
      url: absoluteUrl(`blog/${post.id}/`),
    })),
  };
}
