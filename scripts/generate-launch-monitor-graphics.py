"""Original branded setup and practice diagrams; no product-photo reproductions."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
R=Path(__file__).resolve().parents[1];O=R/'public/images/articles'
B='#141B17';L='#C7FF35';W='#F7F8F4';M='#B7C3B8'
def f(n,b=False):return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans'+('-Bold' if b else '')+'.ttf',n)
def text(d,xy,s,n=25,c=W,b=False):d.text(xy,s,font=f(n,b),fill=c)
def base(label):
 im=Image.new('RGB',(1200,630),B);d=ImageDraw.Draw(im);d.rectangle((48,40,1152,46),fill=L);text(d,(48,68),'BREAK 90 GOLF / THE GEAR LOCKER',18,L,True);text(d,(48,126),label,43,W,True);d.line((48,552,1152,552),fill='#435347',width=2);text(d,(48,580),'LESS THINKING. BETTER GOLF.',17,L,True);text(d,(864,582),'BREAKINGNINETYGOLF.COM',14,M);return im,d
def save(im,slug,hero=False):
 im.save(O/(slug+'.webp'),quality=90,method=6)
 if hero:
  im.save(O/(slug+'.png'),optimize=True);im.resize((600,315),Image.Resampling.LANCZOS).save(O/(slug+'-600.webp'),quality=85,method=6)
im,d=base('BUY FOR THE PRACTICE YOU WILL DO.')
for i,(a,b,c) in enumerate([('01 / SPACE','MEASURE FIRST','Room depth + full swing clearance'),('02 / SOFTWARE','COUNT THE COST','Membership + simulator software'),('03 / PURPOSE','KNOW YOUR SHOT','Typical carry + common miss')]):
 x=48+372*i;d.rectangle((x,234,x+350,493),fill='#233027');d.rectangle((x,234,x+350,240),fill=L);text(d,(x+20,261),a,19,L,True);text(d,(x+20,312),b,25,W,True)
 words=c.split(' + ')
 for j,t in enumerate(words):text(d,(x+20,371+j*35),t,20,M)
save(im,'launch-monitors-rapsodo-mlm2pro-guide',True)
im,d=base('MLM2PRO / MEASURE YOUR DEPTH.')
text(d,(48,194),'INDOOR TRACKING DISTANCES / SCHEMATIC, NOT TO SCALE',18,M)
d.rectangle((77,296,143,367),outline=L,width=3);text(d,(48,390),'MONITOR',20,L,True)
d.ellipse((535,327,553,345),fill=W);text(d,(506,390),'BALL',20,L,True)
d.line((1090,250,1090,375),fill=L,width=5);text(d,(1059,390),'NET',20,L,True)
for x1,x2,label in [(168,515,'6.5–8.5 FT'),(575,1060,'8 FT')]:
 d.line((x1,336,x2,336),fill=M,width=2);d.polygon([(x1,336),(x1+11,329),(x1+11,343)],fill=M);d.polygon([(x2,336),(x2-11,329),(x2-11,343)],fill=M);text(d,((x1+x2)/2-80,278),label,27,W,True)
text(d,(48,460),'14.5–16.5 FT COMBINED TRACKING DEPTH',29,L,True);text(d,(48,507),'Extra room, swing, ceiling and net clearance still required. Source: Rapsodo.',19,M)
save(im,'mlm2pro-room-setup')
im,d=base('TURN SHOT DATA INTO A DECISION.')
for i,(a,b,c) in enumerate([('01 / HIT','10 NORMAL SHOTS','Use three familiar clubs.'),('02 / RECORD','CARRY + PATTERN','Keep ordinary mishits in view.'),('03 / PLAY','CHANGE TARGETS','One ball. One normal routine.')]):
 y=227+100*i;d.rectangle((48,y,1152,y+83),fill='#233027');text(d,(68,y+24),a,20,L,True);text(d,(280,y+23),b,25,W,True);text(d,(687,y+26),c,21,M)
save(im,'launch-monitor-practice-plan')
print('Created five responsive image assets.')
