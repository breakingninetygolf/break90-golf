import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import courseMaps from './src/lib/course-maps-remark.mjs';
export default defineConfig({ site: 'https://breakingninetygolf.com', integrations: [sitemap()], markdown:{remarkPlugins:[courseMaps]}, output:'static', trailingSlash:'always' });
