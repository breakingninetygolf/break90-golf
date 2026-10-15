import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({ site: process.env.SITE_URL || 'https://break90-golf.pages.dev', integrations: [sitemap()], output:'static' });
