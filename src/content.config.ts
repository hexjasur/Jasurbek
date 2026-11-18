import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    /** Set when a published post is meaningfully revised. Shown on the post and used as `dateModified`. */
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    /** Language of the post body. Sets <html lang> and the Pagefind/SEO language. Defaults to the site language. */
    lang: z.enum(['en', 'uz']).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
