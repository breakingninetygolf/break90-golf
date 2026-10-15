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
export function overviewMap(geometry,state,courses,value){
 const {path,point}=projector(geometry,{x:635,y:142,w:500,h:372});
 let s=start(1200,630,`${state}: approximate locations of all ${courses.length} courses in this guide`)+`<rect x="48" y="40" width="1104" height="6" fill="#c7ff35"/>`+text(48,80,'BREAK 90 GOLF / THE PLAYBOOK',18,'#c7ff35',700)+ball(1135,83,11);
 const title=state.toUpperCase()+' / '+(value?'PLAY FOR VALUE':'PLAN THE TRIP');let line='',y=206;
 for(const word of title.split(' ')){if((line+' '+word).trim().length>20&&line){s+=text(48,y,line,43,'#f7f8f4',700);y+=57;line=word}else line=(line+' '+word).trim()}
 s+=text(48,y,line,43,'#f7f8f4',700);y+=66;
 const subtitles=value?['Compare the complete cost','of your round.']:['Book the course before','booking the trip.'];
 for(const line of subtitles){s+=text(50,y,line,23,'#b7c3b8');y+=33}
 s+=`<path d="${path}" fill="#2b4433" stroke="#839a7e" stroke-width="1.4" fill-rule="evenodd"/>`;
 // Retain each property's actual approximate position; shared properties naturally overlap.
 for(const c of courses){const [x,y]=point([c.lon,c.lat]);s+=ball(x,y,7)}
 s+=text(648,534,`${courses.length} COURSES / APPROXIMATE LOCATIONS`,13,'#b7c3b8');
 s+=`<line x1="48" y1="552" x2="1152" y2="552" stroke="#435347"/>`+text(48,589,'LESS THINKING. BETTER GOLF.',18,'#c7ff35',700)+text(872,589,'BREAKINGNINETYGOLF.COM',12,'#b7c3b8');
 return s+'</g></svg>';
}
