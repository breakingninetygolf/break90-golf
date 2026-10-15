import fs from 'node:fs';
const {guides}=JSON.parse(fs.readFileSync('src/data/course-maps.json','utf8'));
let total=0;
for(const [slug,guide] of Object.entries(guides)){
 const html=fs.readFileSync(`dist/articles/${slug}/index.html`,'utf8');
 const count=(html.match(/class="course-location-map"/g)||[]).length;
 if(count!==guide.courses.length)throw Error(`${slug}: expected ${guide.courses.length} course maps, found ${count}. Clear Astro's content cache and rebuild.`);
 for(const c of guide.courses)if(!fs.existsSync(`dist/images/course-maps/${slug}-${c.number}.svg`))throw Error(`Missing map asset for ${slug} #${c.number}`);
 total+=count;
}
console.log(`Verified ${total} course figures and their map assets across ${Object.keys(guides).length} guides.`);
