"""Original Break 90 gift illustrations and decision diagrams, not product photos."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import math
R=Path(__file__).resolve().parents[1];O=R/'public/images/articles';B='#141B17';L='#C7FF35';W='#F7F8F4';M='#B7C3B8';P='#26392C'
def font(n,b=False):return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans'+('-Bold' if b else '')+'.ttf',n)
def txt(d,xy,s,n=24,c=W,b=False):d.text(xy,s,font=font(n,b),fill=c)
def base(title,sub):
 im=Image.new('RGB',(1200,630),B);d=ImageDraw.Draw(im);d.rectangle((48,42,1152,48),fill=L);txt(d,(48,70),'BREAK 90 GOLF / CHRISTMAS GIFT GUIDE',18,L,True);txt(d,(48,128),title,40,W,True);txt(d,(48,188),sub,21,M)
 d.line((48,552,1152,552),fill='#435347',width=2);txt(d,(48,579),'LESS THINKING. BETTER GOLF.',17,L,True);txt(d,(866,581),'BREAKINGNINETYGOLF.COM',13,M);return im,d
def ball(d,x,y,r=42):
 d.ellipse((x-r,y-r,x+r,y+r),fill=W)
 for dy in range(-2,3):
  for dx in range(-2,3):
   if dx*dx+dy*dy<7:
    xx=x+dx*r*.29;yy=y+dy*r*.29;rr=r*.06;d.ellipse((xx-rr,yy-rr,xx+rr,yy+rr),fill='#C6CEC3')
def book(d,x,y):
 d.polygon([(x,y+15),(x+60,y),(x+60,y+109),(x,y+123)],fill=L);d.polygon([(x+60,y),(x+118,y+15),(x+118,y+123),(x+60,y+109)],fill='#EEF3E7');d.line((x+60,y+4,x+60,y+108),fill='#5D7830',width=3)
 for yy in [35,52,69]:d.line((x+72,y+yy,x+106,y+yy+8),fill='#A8B49E',width=2)
def save(im,slug,hero=False):
 im.save(O/(slug+'.webp'),quality=90,method=6)
 if hero:
  im.save(O/(slug+'.png'),optimize=True);im.resize((600,315),Image.Resampling.LANCZOS).save(O/(slug+'-600.webp'),quality=85,method=6)
im,d=base('GOLF GIFTS HE WILL ACTUALLY USE.','Christmas ideas for Dad, the practice enthusiast and your favorite golf partner.')
# Three generous illustration panels, with gift box, book, ball.
for i,(small,caption) in enumerate([('PRACTICE','Make the next session useful.'),('PLAY','Know his favorite ball.'),('LEARN','Give a good read + a round.')]):
 x=48+374*i;d.rounded_rectangle((x,245,x+354,518),radius=6,fill=P);txt(d,(x+22,267),small,18,L,True);txt(d,(x+22,478),caption,17,M)
x=177;y=340;d.rectangle((x-45,y,x+75,y+99),fill='#6B8356');d.rectangle((x-52,y-16,x+82,y+12),fill=W);d.rectangle((x+4,y-16,x+24,y+99),fill=L);d.ellipse((x-27,y-48,x+14,y-13),outline=L,width=4);d.ellipse((x+14,y-48,x+55,y-13),outline=L,width=4)
ball(d,598,386,60);book(d,914,335);save(im,'best-christmas-golf-gifts-for-dad',True)
im,d=base('BUILD A PUTTING PRACTICE CORNER.','The rolling surface and the alignment tool have different jobs.')
# Schematic top view of green; mirror shown as an abstract reflective rectangle.
d.rounded_rectangle((75,255,690,502),radius=85,fill='#41633F');d.ellipse((585,343,620,378),fill=B);d.line((187,361,580,361),fill='#A2BD77',width=3)
d.rounded_rectangle((140,308,260,413),radius=5,fill='#C4D2CC',outline=W,width=2);d.line((158,361,244,361),fill='#40604D',width=2);d.line((201,320,201,399),fill='#40604D',width=2);ball(d,208,361,13)
for y,a,b in [(261,'SURFACE','Practice roll and pace.'),(351,'MIRROR','Check a repeatable setup.'),(441,'BALLS','Use a clear target.')]:txt(d,(750,y),a,18,L,True);txt(d,(750,y+31),b,20,W)
save(im,'golf-gifts-putting-station')
im,d=base('BIG GIFT? CHECK THE WHOLE SETUP.','Room dimensions are only the starting point.')
for i,(a,b,c) in enumerate([('01 / FOOTPRINT','Mat + green + storage','Measure the selected model.'),('02 / SWING','Width + ceiling + tracks','Check the full swing area.'),('03 / CONTAINMENT','Net + enclosure clearance','Follow its setup instructions.')]):
 x=48+374*i;d.rounded_rectangle((x,254,x+354,511),radius=6,fill=P);txt(d,(x+20,277),a,18,L,True)
 # distinct simple native icons
 if i==0:
  d.rectangle((x+30,330,x+130,404),outline=W,width=3);d.line((x+155,330,x+155,404),fill=L,width=3);d.line((x+144,330,x+166,330),fill=L,width=3);d.line((x+144,404,x+166,404),fill=L,width=3)
 elif i==1:
  d.arc((x+40,318,x+170,424),190,355,fill=L,width=4);d.line((x+105,363,x+156,405),fill=W,width=4);d.line((x+156,405,x+180,405),fill=W,width=6)
 else:
  d.rectangle((x+45,327,x+170,409),outline=W,width=3)
  for xx in range(x+60,x+170,20):d.line((xx,330,xx,407),fill='#6F8B72',width=1)
 txt(d,(x+20,436),b,21,W,True);txt(d,(x+20,476),c,17,M)
save(im,'golf-gifts-space-check')
im,d=base('PAIR THE GIFT WITH A REASON TO PLAY.','Three thoughtful combinations for Dad—without buying more than he needs.')
for i,(a,b,c) in enumerate([('THE READER','A golf book','+ a round together'),('THE PRACTICER','A putting green','+ an alignment mirror'),('THE REGULAR','His preferred golf balls','+ a cleaning towel')]):
 x=48+374*i;d.rounded_rectangle((x,254,x+354,518),radius=6,fill=P);txt(d,(x+20,277),a,18,L,True)
 if i==0:book(d,x+40,322)
 elif i==1:
  d.rounded_rectangle((x+35,330,x+235,403),radius=32,fill='#547B43');d.ellipse((x+195,355,x+214,374),fill=B);d.rectangle((x+55,346,x+94,386),fill='#C4D2CC')
 else:ball(d,x+85,372,38);d.polygon([(x+150,335),(x+235,348),(x+219,413),(x+141,400)],fill=L);d.line((x+166,344,x+153,396),fill='#6D9234',width=2)
 txt(d,(x+20,447),b,22,W,True);txt(d,(x+20,482),c,20,M)
save(im,'golf-gifts-for-dad-pairings');print('Created six image assets.')
