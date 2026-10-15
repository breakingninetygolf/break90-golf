import fs from 'node:fs';import path from 'node:path';
let count=0;
function visit(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())visit(p);else if(e.name.endsWith('.html')){
 const html=fs.readFileSync(p,'utf8');
 for(const a of html.matchAll(/<a\b[^>]*>/g)){
  const tag=a[0];if(!/rel="[^"]*\bsponsored\b/.test(tag))continue;
  const href=tag.match(/href="([^"]+)"/)?.[1]?.replaceAll('&amp;','&');
  if(!href)throw Error(`${p}: affiliate link has no destination`);
  const u=new URL(href);
  if(u.hostname!=='www.amazon.com'||!/^\/dp\/[A-Z0-9]{10}$/.test(u.pathname)||u.searchParams.get('tag')!=='breakingninet-20')throw Error(`${p}: purchase link must be a direct tagged Amazon product URL: ${href}`);
  const classes=tag.match(/class="([^"]+)"/)?.[1]?.split(/\s+/)||[];
  if(!classes.includes('btn')||!classes.includes('dark'))throw Error(`${p}: affiliate link is missing the approved dark button style`);
  count++;
 }
}}}
visit('dist');if(!count)throw Error('No affiliate product buttons found');
console.log(`Verified ${count} direct tagged Amazon purchase buttons.`);
