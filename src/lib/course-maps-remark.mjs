import fs from 'node:fs';
import path from 'node:path';
import {escapeXml as E} from './course-map-renderer.mjs';
const data=JSON.parse(fs.readFileSync(new URL('../data/course-maps.json',import.meta.url),'utf8'));
const photos=JSON.parse(fs.readFileSync(new URL('../data/course-photos.json',import.meta.url),'utf8'));
export default function courseMaps(){return(tree,file)=>{
 const slug=path.basename(file.path||file.history?.[0]||'','.md');const guide=data.guides[slug];if(!guide)return;
 const result=[];
 for(const node of tree.children){result.push(node);if(node.type!=='heading'||node.depth!==2)continue;
 const label=node.children.map(n=>n.value||'').join('');const number=Number(label.match(/^(\d+)\./)?.[1]);const c=guide.courses.find(c=>c.number===number);if(!c)continue;
 const photo=photos[slug]?.[String(number)];
 if(photo)result.push({type:'html',value:`<figure class="course-photo"><img src="${E(photo.src)}" srcset="${E(photo.smallSrc)} 600w, ${E(photo.src)} 1200w" sizes="(max-width: 700px) 100vw, 760px" width="${photo.width}" height="${photo.height}" alt="${E(photo.caption+' Archival photograph from '+photo.date.slice(0,4)+'.')}" loading="lazy" decoding="async"/><figcaption>${E(photo.caption)} <span>Archival photo: ${E(photo.date)}; conditions may have changed. Photo by <a href="${E(photo.sourceUrl)}">${E(photo.author)} / Wikimedia Commons</a> · <a href="${E(photo.licenseUrl)}" rel="license">${E(photo.license)}</a>. ${E(photo.changes)}</span></figcaption></figure>`});
 const url='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(`${c.name} ${c.locality} ${guide.state}`);
 result.push({type:'html',value:`<figure class="course-location-map"><a href="${E(url)}" target="_blank" rel="noopener noreferrer" aria-label="${E('Open map for '+c.name)}"><img src="/images/course-maps/${slug}-${number}.svg" alt="${E(c.name+' near '+c.locality+', '+guide.state+'. Branded golf ball marks the approximate course area.')}" width="500" height="330" loading="lazy" decoding="async"/></a><figcaption>${E(c.locality+', '+guide.state)} · <a href="${E(url)}" target="_blank" rel="noopener noreferrer">Open map</a></figcaption></figure>`})
 }
 tree.children=result;
}}
