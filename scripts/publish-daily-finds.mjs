import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
const root=process.cwd(),file=join(root,'src/data/daily-finds.json');
const products=JSON.parse(readFileSync(join(root,'src/data/products.json'),'utf8'));
const history=JSON.parse(readFileSync(file,'utf8'));
const date=new Date().toISOString().slice(0,10);
if(history.some(e=>e.date===date)){console.log('Already published today');process.exit(0)}
const used=new Set(history.flatMap(e=>e.ids));
const eligible=products.filter(p=>p.id&&p.name&&p.description&&p.category&&p.imageAlt&&/^https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}\?tag=breakingninet-20$/.test(p.url||'')&&p.image?.startsWith('/images/gear/')&&existsSync(join(root,'public',p.image.slice(1))));
const picks=eligible.filter(p=>!used.has(p.id)).slice(0,5);
if(picks.length!==5){console.log('Not enough unused approved items for five finds; skipping.');process.exit(0)}
history.push({date,ids:picks.map(p=>p.id)});
writeFileSync(file,JSON.stringify(history,null,2)+'\n');
console.log('New edition:',date,picks.map(p=>p.id).join(', '));
