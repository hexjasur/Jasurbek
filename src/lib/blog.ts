import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

const WORDS_PER_MINUTE = 220;

/** All published blog posts, newest first. */
export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );
}

/** Estimated reading time in whole minutes (code blocks are skimmed, so they count less). */
export function readingTime(body = ''): number {
  const withoutCode = body.replace(/```[\s\S]*?```/g, ' ');
  const codeWords = (body.match(/```[\s\S]*?```/g) ?? []).join(' ').split(/\s+/).filter(Boolean).length;
  const words = withoutCode.split(/\s+/).filter(Boolean).length + Math.round(codeWords * 0.4);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** URL-safe tag slug: `Developer Tools` -> `developer-tools`. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Map of tag slug -> { label, posts } built from all posts (newest first within each tag). */
export async function getTagMap(): Promise<Map<string, { label: string; posts: Post[] }>> {
  const posts = await getSortedPosts();
  const map = new Map<string, { label: string; posts: Post[] }>();
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      const slug = tagSlug(tag);
      const entry = map.get(slug) ?? { label: tag, posts: [] };
      entry.posts.push(post);
      map.set(slug, entry);
    }
  }
  return map;
}
