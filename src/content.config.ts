import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const articles = defineCollection({
 loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
 schema: z.object({title:z.string(),description:z.string(),date:z.coerce.date(),category:z.string(),readTime:z.string(),featured:z.boolean().optional()})
});
export const collections = { articles };
