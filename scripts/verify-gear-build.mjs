import { existsSync, readFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';

const catalog = JSON.parse(readFileSync('src/data/products.json', 'utf8'));

function verify(html, products) {
  const articleSection = html.indexOf('id="gear-books"');
  if (!html.includes('id="gear-search"') || articleSection < 0) throw new Error('Gear search or articles are missing.');
  let previous = -1;
  for (const product of products) {
    const index = html.indexOf(`id="gear-${product.id}"`);
    const start = html.lastIndexOf('<article', index);
    const end = html.indexOf('</article>', index);
    const card = html.slice(start, end);
    const group = card.match(/data-category="([^"]+)"/)?.[1];
    if (index <= previous || index >= articleSection || start < 0 || end < 0 ||
        !group || !html.includes(`data-filter="${group}"`) || !card.includes('data-search=') ||
        (product.url && !card.includes(product.url)) || !card.includes(product.image)) {
      throw new Error(`Gear card, order, filter, image, or link is incorrect for ${product.name}.`);
    }
    previous = index;
  }
}

if (process.argv.includes('--live')) {
  const url = 'https://breakingninetygolf.com/gear/';
  for (let attempt = 0; attempt < 24; attempt++) {
    try {
      const response = await fetch(`${url}?release-check=${Date.now()}`, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`Gear returned HTTP ${response.status}.`);
      verify(await response.text(), catalog);
      await Promise.all(catalog.slice(0, 5).flatMap(product =>
        [product.image, product.image.replace('.webp', '-600.webp')].map(async path => {
          const image = await fetch(new URL(path, url), { method: 'HEAD', signal: AbortSignal.timeout(15000) });
          if (!image.ok || !image.headers.get('content-type')?.startsWith('image/')) {
            throw new Error(`Live Gear image unavailable: ${path}`);
          }
        }),
      ));
      console.log(`Verified ${catalog.length} product cards on the live Gear page.`);
      process.exit(0);
    } catch (error) {
      if (attempt === 23) throw error;
      await delay(15000);
    }
  }
} else {
  verify(readFileSync('dist/gear/index.html', 'utf8'), catalog);
  for (const { image } of catalog) {
    if (!existsSync(`dist${image}`) || !existsSync(`dist${image.replace('.webp', '-600.webp')}`)) {
      throw new Error(`Missing built Gear image: ${image}`);
    }
  }
  console.log(`Verified ${catalog.length} Gear cards, links, filter mappings, and responsive images.`);
}
