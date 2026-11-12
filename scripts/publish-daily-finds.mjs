import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
const root=process.cwd();
const file=join(root,'src/data/daily-finds.json');
const queue=JSON.parse(readFileSync(join(root,'src/data/daily-finds-queue.json'),'utf8'));
const products=JSON.parse(readFileSync(join(root,'src/data/products.json'),'utf8'));
const history=JSON.parse(readFileSync(file,'utf8'));
const date=new Date().toISOString().slice(0,10);
if(history.some(e=>e.date===date)){console.log('Already published today');process.exit(0)}
const used=new Set(history.flatMap(e=>e.ids));
const catalog=new Map(products.map(p=>[p.id,p]));
const seen=new Set();
const pending=queue.filter(id=>{if(seen.has(id)||used.has(id))return false;seen.add(id);return true});
const picks=[];
for(const id of pending){
 const p=catalog.get(id);
 if(!p || !p.name || !p.description || !p.category || !p.imageAlt || !/^https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}\?tag=breakingninet-20$/.test(p.url||'') || !p.image?.startsWith('/images/gear/') || !existsSync(join(root,'public',p.image.slice(1)))){
   console.error('Queue contains invalid or missing product:',id,'— skipping publication until fixed.');
   process.exitCode=1;break;
 }
 picks.push(id);
 if(picks.length===5)break;
}
if(process.exitCode)process.exit();
if(!picks.length){console.log('Queue empty. No publication today.');process.exit(0)}
history.push({date,ids:picks});
writeFileSync(file,JSON.stringify(history,null,2)+'\n');
console.log('Published',picks.length,'queued products for',date,picks.join(', '));
