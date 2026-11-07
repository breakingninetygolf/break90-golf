import type { CollectionEntry } from 'astro:content';

// Shared by the Playbook and Gear page so every matching article appears on both.
export function getGearAndBooksArticles(articles: CollectionEntry<'articles'>[]) {
  return articles
    .filter(article => ['Books & Improvement', 'Gear & Practice'].includes(article.data.category))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id));
}
