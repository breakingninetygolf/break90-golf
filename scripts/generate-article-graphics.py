"""Build original, deterministic editorial diagrams. No venue or product photography."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import yaml,json,math,textwrap
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/images/articles';OUT.mkdir(parents=True,exist_ok=True)
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
BG='#141B17';LIME='#C7FF35';PAPER='#F7F8F4';MUTED='#B7C3B8';LINE='#435347'
def font(n,b=False):return ImageFont.truetype(BOLD if b else FONT,n)
def txt(d,xy,s,n=24,fill=PAPER,b=False):d.text(xy,s,font=font(n,b),fill=fill)
def ball(d,x,y,r=12):
 d.ellipse((x-r,y-r,x+r,y+r),fill=LIME)
 for dx,dy in [(-.3,-.4),(.3,-.3),(0,.2),(-.4,.4),(.4,.4)]:
  a=x+dx*r;c=y+dy*r;z=max(1,r*.09);d.ellipse((a-z,c-z,a+z,c+z),fill='#667E27')
def wrap(d,s,x,y,width=490,size=50):
 words=s.split();line=''
 for word in words:
  nextline=(line+' '+word).strip()
  if d.textlength(nextline,font=font(size,True))>width and line:
   txt(d,(x,y),line,size,b=True);y+=size+9;line=word
  else:line=nextline
 txt(d,(x,y),line,size,b=True);return y+size+9
specs={
'30-minute-practice-plan':('MAKE 30 MINUTES COUNT','A practical session with three clear tasks.','practice','Practice plan: minutes 0–10 short putts, 10–20 lag putting and chips, 20–30 tee-shot targets.','Three focused ten-minute blocks. Count successful repetitions rather than just the balls you hit.'),
'how-to-break-90-without-changing-your-swing':('BUILD A PLAN FOR 89','Keep the next shot in play.','score','Scoring example on a par-72 course: 17 bogeys plus one par equals 89.','One route to 89 on a par-72 course. This is a planning example, not a required scorecard.'),
'why-bogey-golf-is-good-golf':('BOGEY IS A USEFUL SCORE','Protect the next shot after a mistake.','score','A par-72 scoring example shows 17 bogeys and one par totaling 89.','A bogey does not end a good round. On par 72, seventeen bogeys and one par add up to 89.'),
'should-you-hit-driver-on-every-par-four':('CHOOSE THE LANDING AREA','Judge your usual miss, not your best drive.','driver','Schematic fairway with a wide safe landing area and trouble beside a narrow target.','Illustrative hole, not a real course map. Compare the landing areas your normal shots can reach.'),
'simple-grip-adjustment-for-a-slice':('ONE CHANGE AT A TIME','Use ball flight as feedback.','grip','Three-step range checklist: check setup, make one small grip adjustment, observe the ball flight.','A small grip experiment belongs on the range. It is not a guarantee of a straighter shot.'),
'stop-three-putting':('LEAVE AN EASIER SECOND PUTT','Practice pace from three starting distances.','putting','Lag-putting drill from 15, 25 and 35 feet, aiming to finish within three feet of the cup.','Schematic drill: use a three-foot finishing radius and count successful putts from each distance.'),
'golf-books-for-breaking-90':('READ WITH A PURPOSE','Pick the book that fits your next task.','books','Reading choices grouped by strategy, mental game and short lessons.','Start with one topic and take one useful idea to practice. These are reading categories, not book-cover reproductions.'),
'golf-practice-tools-for-breaking-90':('BUY FOR THE DRILL','A useful tool gives practice a clear task.','gear','Three practice tasks: alignment for setup, a putting target for pace, and a chipping target for landing control.','Choose the task first. A spare club, coin or towel may do the job before you buy a training aid.')}
for state in ['florida','michigan','california','new-york']:
 name=state.replace('-',' ').title()
 for value in [False,True]:
  slug=('best-value-public-golf-courses-' if value else 'top-public-golf-courses-')+state
  specs[slug]=(name.upper()+(' / PLAY FOR VALUE' if value else ' / PLAN THE TRIP'),('Compare the complete cost of your round.' if value else 'Book the course before booking the trip.'),'value' if value else 'course',f'{name} golf planning graphic: '+('green fee plus cart plus booking fees equals the round cost.' if value else 'confirm the tee time, check course conditions, then plan travel.'),'Original planning illustration, not a photograph or map of a named golf course. '+('Compare equivalent walking or riding totals.' if value else 'Confirm access, maintenance and cancellation terms before traveling.'))
metadata={}
for slug,(title,sub,kind,alt,caption) in specs.items():
 im=Image.new('RGB',(1200,630),BG);d=ImageDraw.Draw(im)
 d.rectangle((48,44,1152,50),fill=LIME);txt(d,(48,71),'BREAK 90 GOLF  /  THE PLAYBOOK',18,LIME,True)
 y=wrap(d,title,48,150,size=48)
 for line in textwrap.wrap(sub,32):txt(d,(50,y+20),line,23,MUTED);y+=33
 d.line((48,544,1152,544),fill=LINE,width=2);txt(d,(48,570),'LESS THINKING. BETTER GOLF.',18,LIME,True)
 txt(d,(895,570),'BREAKINGNINETYGOLF.COM',12,MUTED);ball(d,1135,88,13)
 x=645
 if kind=='score':
  txt(d,(x,144),'PAR 72 / EXAMPLE',18,MUTED,True)
  txt(d,(x,196),'17 BOGEYS',36,b=True);txt(d,(x,253),'+ 1 PAR',36,LIME,True)
  d.line((x,315,1100,315),fill=LINE,width=2);txt(d,(x,333),'89',104,LIME,True)
 elif kind=='putting':
  d.ellipse((702,123,1130,455),fill='#263C2E');d.ellipse((920,218,1030,328),outline=LIME,width=3);d.ellipse((967,265,981,279),fill=PAPER)
  for yy,label in [(173,'15 FT'),(278,'25 FT'),(393,'35 FT')]:
   d.line((715,yy,966,273),fill=MUTED,width=2);d.ellipse((705,yy-6,717,yy+6),fill=PAPER);txt(d,(x,yy-32),label,19,LIME,True)
  txt(d,(850,465),'FINISH WITHIN 3 FT',19,LIME,True)
 elif kind=='driver':
  d.polygon([(760,480),(1090,480),(1000,165),(910,165)],fill='#2E4C37');d.ellipse((887,133,1027,209),fill='#77916D')
  d.ellipse((990,255,1130,360),fill='#335967');txt(d,(1018,368),'TROUBLE',15,MUTED)
  d.ellipse((798,330,995,408),outline=LIME,width=3);txt(d,(790,427),'COMPARE LANDING AREAS',17,LIME,True)
  d.line((850,480,888,366),fill=PAPER,width=3);ball(d,850,480,8)
 else:
  if kind=='practice':rows=[('01 / 0–10 MIN','Short putts'),('02 / 10–20 MIN','Lag putts + chips'),('03 / 20–30 MIN','Tee-shot targets')]
  elif kind=='grip':rows=[('01 / CHECK','Setup + target'),('02 / CHANGE','One small adjustment'),('03 / OBSERVE','Flight + contact')]
  elif kind=='books':rows=[('STRATEGY','The Four Foundations'),('MENTAL GAME','Not a Game of Perfect'),('SHORT LESSONS','Penick’s Little Red Book')]
  elif kind=='gear':rows=[('SETUP','Alignment reference'),('PUTTING','A pace target'),('CHIPPING','A landing target')]
  elif kind=='value':rows=[('01 / GREEN FEE','Your eligible rate'),('02 / EXTRAS','Cart + booking fees'),('03 / COMPARE','The complete total')]
  else:rows=[('01 / RESERVE','The exact course'),('02 / CHECK','Conditions + access'),('03 / PLAN','Travel + tee choice')]
  for i,(small,big) in enumerate(rows):
   yy=147+i*114;d.rounded_rectangle((x,yy,1140,yy+97),radius=4,fill='#233027');d.rectangle((x,yy,x+5,yy+97),fill=LIME)
   txt(d,(x+23,yy+15),small,17,LIME,True);txt(d,(x+23,yy+47),big,24,PAPER,True)
 im.save(OUT/(slug+'.png'),optimize=True)
 im.save(OUT/(slug+'.webp'),quality=88,method=6)
 im.resize((600,315),Image.Resampling.LANCZOS).save(OUT/(slug+'-600.webp'),quality=84,method=6)
 metadata[slug]=dict(image='/images/articles/'+slug+'.png',imageAlt=alt,imageCaption=caption)
for f in (ROOT/'src/content/articles').glob('*.md'):
 if f.stem not in metadata:continue
 _,raw,body=f.read_text().split('---',2);data=yaml.safe_load(raw);data.update(metadata[f.stem]);data['seoTitle']=data['title']
 if 'golf-courses-' in f.stem:
  state=f.stem.split('golf-courses-')[1].replace('-',' ').title();data['seoTitle']=f'10 Best '+('Value ' if f.stem.startswith('best-value') else '')+f'Public Golf Courses in {state}'
 data['updated']= '2026-10-15'
 # YAML library normalizes dates without changing original publication date.
 f.write_text('---\n'+yaml.safe_dump(data,sort_keys=False,allow_unicode=True,width=1000)+'---'+body)
print('Built',len(specs),'original graphics in three formats each.')
print('Combined image bytes:',sum(f.stat().st_size for f in OUT.iterdir()))
