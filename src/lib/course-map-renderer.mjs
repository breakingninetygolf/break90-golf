export const escapeXml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const E=escapeXml;
export function projector(geometry,box){
 const rings=geometry.type==='Polygon'?geometry.coordinates:geometry.coordinates.flat();
 const all=rings.flat();const ys=all.map(p=>p[1]);const cos=Math.cos((Math.min(...ys)+Math.max(...ys))/2*Math.PI/180);
 const xs=all.map(p=>p[0]*cos);const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 const scale=Math.min(box.w/(maxX-minX),box.h/(maxY-minY));
 const point=([lon,lat])=>[box.x+(box.w-(maxX-minX)*scale)/2+(lon*cos-minX)*scale,box.y+(box.h-(maxY-minY)*scale)/2+(maxY-lat)*scale];
 const path=rings.map(r=>r.map((p,i)=>(i?'L':'M')+point(p).map(n=>n.toFixed(2)).join(',')).join(' ')+'Z').join(' ');
 return {point,path};
}
export function ball(x,y,r=12){return `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)})"><circle r="${r+3}" fill="#141b17"/><circle r="${r}" fill="#c7ff35" stroke="#f7f8f4" stroke-width="1"/>${[[-.3,-.4],[.3,-.3],[0,.2],[-.4,.4],[.4,.4]].map(([a,b])=>`<circle cx="${a*r}" cy="${b*r}" r="${Math.max(1,r*.1)}" fill="#425720"/>`).join('')}</g>`}
function start(w,h,title){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>${E(title)}</title><rect width="100%" height="100%" fill="#141b17"/><g font-family="DejaVu Sans,Arial,sans-serif">`}
function text(x,y,s,size=18,color='#f7f8f4',weight=400){return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${E(s)}</text>`}
export function singleMap(geometry,state,course){const {path,point}=projector(geometry,{x:20,y:59,w:285,h:224});const [x,y]=point([course.lon,course.lat]);return start(500,330,`${course.name}: approximate location in ${state}`)+text(20,30,'BREAK 90 GOLF / COURSE LOCATION',14,'#c7ff35',700)+`<path d="${path}" fill="#2b4433" stroke="#839a7e" stroke-width="1.3" fill-rule="evenodd"/>`+ball(x,y,11)+text(329,111,state.toUpperCase(),17,'#f7f8f4',700)+text(329,143,course.locality.length>20?course.locality.slice(0,19)+'…':course.locality,14,'#b7c3b8')+ball(343,183,10)+text(365,189,'Course area',12,'#b7c3b8')+text(20,311,'Approximate location · Open map for directions',12,'#b7c3b8')+'</g></svg>'}
export function overviewMap(geometry,state,courses,value){const {path,point}=projector(geometry,{x:46,y:182,w:540,h:350});let s=start(1200,630,`${state}: all ${courses.length} courses in this guide`)+`<rect x="48" y="40" width="1104" height="6" fill="#c7ff35"/>`+text(48,80,'BREAK 90 GOLF / THE PLAYBOOK',18,'#c7ff35',700)+text(48,137,state.toUpperCase()+' / '+(value?'PLAY FOR VALUE':'PLAN THE TRIP'),37,'#f7f8f4',700)+`<path d="${path}" fill="#2b4433" stroke="#839a7e" stroke-width="1.5" fill-rule="evenodd"/>`;
 const groups=[];
 // Connected geographic clusters keep nearby markers/number labels readable at card size.
 const remaining=courses.map(c=>{const [x,y]=point([c.lon,c.lat]);return{x,y,number:c.number}});
 while(remaining.length){const members=[remaining.shift()];let changed=true;while(changed){changed=false;for(let i=remaining.length-1;i>=0;i--){if(members.some(m=>Math.hypot(m.x-remaining[i].x,m.y-remaining[i].y)<32)){members.push(remaining.splice(i,1)[0]);changed=true}}}groups.push({x:members.reduce((s,m)=>s+m.x,0)/members.length,y:members.reduce((s,m)=>s+m.y,0)/members.length,numbers:members.map(m=>m.number).sort((a,b)=>a-b)})}
 for(const g of groups){s+=ball(g.x,g.y,10);const label=g.numbers.join(',');const width=label.length*8+12;const labelX=Math.min(599-width,Math.max(30,g.x-width/2));const labelY=Math.min(526,g.y+13);s+=`<rect x="${labelX}" y="${labelY}" width="${width}" height="19" rx="3" fill="#f7f8f4"/>`+text(labelX+6,labelY+14,label,12,'#141b17',700)}
 for(const c of courses){const y=197+(c.number-1)*34;s+=text(646,y,String(c.number).padStart(2,'0'),16,'#c7ff35',700)+text(683,y,c.name,15,'#f7f8f4')}
 s+=`<line x1="48" y1="552" x2="1152" y2="552" stroke="#435347"/>`+text(48,581,'APPROXIMATE COURSE AREAS · NUMBERS MATCH THE GUIDE',13,'#b7c3b8')+text(870,581,'BREAKINGNINETYGOLF.COM',12,'#c7ff35');return s+'</g></svg>'}
