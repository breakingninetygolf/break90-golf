import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const catalogPath = 'src/data/products.json';
const readJson = path => JSON.parse(readFileSync(path, 'utf8'));
const catalog = readJson(catalogPath);
const batches = readJson('scripts/gear-release-queue.json');
const presentIds = new Set(catalog.map(product => product.id));
const presentNames = new Set(catalog.map(product => product.name.toLowerCase()));
const presentAsins = new Set(catalog.map(product => product.url?.match(/\/dp\/([A-Z0-9]{10})/)?.[1]));
const pending = batches.find(batch => !batch.products.every(product => presentIds.has(product.id)));
if (!pending) {
  console.log('All five Gear batches are in the catalog.');
  process.exit(0);
}

if (pending.products.length !== 5 || pending.products.some(product => presentIds.has(product.id))) {
  throw new Error(`Gear batch ${pending.day} must contain five unpublished products.`);
}

const blockers = pending.products.filter(product => product.pending || !product.verifiedAt);
if (blockers.length) {
  throw new Error(blockers.map(product => `${product.name}: ${product.pending || 'Missing verification date.'}`).join('\n'));
}

const previous = batches.find(batch => batch.day === pending.day - 1);
const liveUrl = 'https://breakingninetygolf.com/gear/';
if (previous) {
  const response = await fetch(liveUrl, { signal: AbortSignal.timeout(30000) });
  const html = await response.text();
  if (!response.ok || previous.products.some(product =>
    !html.includes(`id="gear-${product.id}"`) || !html.includes(`/dp/${product.asin}?tag=breakingninet-20`)
  )) {
    throw new Error(`Confirm Day ${previous.day} on the live Gear page before releasing Day ${pending.day}.`);
  }
}

const additions = pending.products.map(({ id, name, category, description, asin, image, imageAlt, source, variant }) => {
  if (!/^[A-Z0-9]{10}$/.test(asin) || !source || !variant ||
      !/^\/images\/gear\/[a-z0-9-]+\.webp$/.test(image) || !imageAlt ||
      !existsSync(`public${image}`) || !existsSync(`public${image.replace('.webp', '-600.webp')}`)) {
    throw new Error(`Missing verified listing or responsive images for ${name}.`);
  }
  if (presentIds.has(id) || presentNames.has(name.toLowerCase()) || presentAsins.has(asin)) {
    throw new Error(`Duplicate Gear product or Amazon listing for ${name}.`);
  }
  presentIds.add(id);
  presentNames.add(name.toLowerCase());
  presentAsins.add(asin);
  return {
    id, name, category, description, image, imageAlt,
    url: `https://www.amazon.com/dp/${asin}?tag=breakingninet-20`,
  };
});

writeFileSync(catalogPath, JSON.stringify([...additions, ...catalog], null, 2) + '\n');
console.log(`Prepared five products for Gear Day ${pending.day}.`);
