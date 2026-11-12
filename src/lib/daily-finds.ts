import products from '../data/products.json';
import history from '../data/daily-finds.json';
export const categories = [
 {slug:'putting-short-game',name:'Putting & Short Game',description:'Putting trainers, chipping aids and short-game practice essentials.',terms:['putt','chip','short-game','wedge','alignment']},
 {slug:'launch-monitors',name:'Launch Monitors',description:'Launch monitors and tools for measuring practice sessions.',terms:['launch monitor','simulation']},
 {slug:'rangefinders-gps',name:'Rangefinders & GPS',description:'Distance measuring devices and on-course navigation accessories.',terms:['rangefinder','gps','distances']},
 {slug:'home-practice',name:'Home Practice & Simulators',description:'Hitting mats, nets and practice setups for home.',terms:['home practice','home simulation','swing practice']},
 {slug:'golf-balls',name:'Golf Balls',description:'Golf balls for different preferences and budgets.',terms:['golf balls']},
 {slug:'bags-accessories',name:'Bags & Accessories',description:'Golf bags, towels, cart accessories and useful essentials.',terms:['golf bags','bag essentials','cart essentials','gps & audio']}
];
export const categoryFor = (p:typeof products[number]) => {
 const c=p.category.toLowerCase();
 return categories.find(x=>x.terms.some(t=>c.includes(t))) ?? categories[categories.length-1];
};
const byId=new Map(products.map(p=>[p.id,p]));
export const editions=[...history].sort((a,b)=>b.date.localeCompare(a.date)).map(e=>({...e,products:e.ids.map(id=>byId.get(id)).filter((p):p is typeof products[number]=>!!p)}));
export const publishedProducts=Array.from(new Set(editions.flatMap(e=>e.ids))).map(id=>byId.get(id)).filter((p):p is typeof products[number]=>!!p);
