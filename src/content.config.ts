import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const articles = defineCollection({
 loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
 schema: z.object({
  title:z.string(),seoTitle:z.string().optional(),description:z.string(),date:z.coerce.date(),
  updated:z.coerce.date().optional(),category:z.string(),readTime:z.string(),featured:z.boolean().optional(),
  image:z.string().optional(),imageAlt:z.string().optional(),imageCaption:z.string().optional()
 })
});
export const collections = { articles };
