import fs from 'node:fs';import path from 'node:path';import sharp from 'sharp';
import {overviewMap,singleMap} from '../src/lib/course-map-renderer.mjs';
const root=process.cwd();const manifest=JSON.parse(fs.readFileSync('src/data/course-maps.json','utf8'));const states=JSON.parse(fs.readFileSync('scripts/map-data/state-outlines.json','utf8'));
fs.mkdirSync('public/images/course-maps',{recursive:true});
const articles=fs.readdirSync('src/content/articles').filter(n=>n.includes('golf-courses-')&&n.endsWith('.md'));
for(const filename of articles){const slug=filename.slice(0,-3);const guide=manifest.guides[slug];if(!guide)throw Error(`Course guide ${slug} needs verified entries in src/data/course-maps.json before publishing.`);
 const source=fs.readFileSync(path.join('src/content/articles',filename),'utf8');const headings=[...source.matchAll(/^## (\d+)\. (.+)$/gm)];
 if(headings.length!==guide.courses.length)throw Error(`Course/map count mismatch in ${slug}`);
 const numbers=new Set();
 for(const [_,n,name] of headings){const c=guide.courses.find(c=>c.number===Number(n));if(!c||c.name!==name||numbers.has(c.number)||!Number.isFinite(c.lon)||!Number.isFinite(c.lat)||!c.locationSource)throw Error(`Missing or stale mapped course ${slug} #${n}`);numbers.add(c.number)}
 const geom=states.features.find(f=>f.properties.name===guide.state)?.geometry;if(!geom)throw Error(`No state outline for ${guide.state}`);
 for(const c of guide.courses)fs.writeFileSync(`public/images/course-maps/${slug}-${c.number}.svg`,singleMap(geom,guide.state,c));
 const svg=overviewMap(geom,guide.state,guide.courses,slug.startsWith('best-value'));
 fs.writeFileSync(`public/images/course-maps/${slug}-overview.svg`,svg);
 await sharp(Buffer.from(svg)).png().toFile(`public/images/articles/${slug}.png`);
 await sharp(Buffer.from(svg)).webp({quality:88}).toFile(`public/images/articles/${slug}.webp`);
 await sharp(Buffer.from(svg)).resize(600,315).webp({quality:85}).toFile(`public/images/articles/${slug}-600.webp`);
}
console.log(`Generated overview and individual maps for ${articles.length} course guides.`);
