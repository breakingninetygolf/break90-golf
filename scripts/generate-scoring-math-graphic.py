"""Original scoring diagram; exact arithmetic, not generated photography."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).resolve().parents[1]
out=root/'public/images/articles/break-90-golf-scoring-math-find-lost-strokes'
im=Image.new('RGB',(1200,630),'#141B17');d=ImageDraw.Draw(im)
regular='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def text(x,y,s,n=24,color='#F7F8F4',heavy=False):d.text((x,y),s,font=ImageFont.truetype(bold if heavy else regular,n),fill=color)
lime='#C7FF35'
text(55,35,'BREAK90',26,heavy=True);d.ellipse((199,47,211,59),fill=lime)
text(55,97,'THE MATH',59,heavy=True);text(55,167,'OF BREAKING 90.',59,lime,True)
text(55,253,"You don't need pars everywhere.",26)
text(55,294,'You need a plan for 89.',26)
for y,heading,sub in [(370,'17 BOGEYS + 1 PAR','18 holes. One manageable target.'),(464,'15 BOGEYS + 2 PARS + 1 DOUBLE','A double can still fit your round.')]:
 d.line((55,y-14,1145,y-14),fill='#435347',width=2)
 text(55,y,heading,27,heavy=True);text(55,y+39,sub,21,'#B7C3B8')
text(845,99,'72',82,heavy=True);text(858,197,'PAR',21,'#B7C3B8')
text(1000,111,'+17',49,lime,True)
text(956,182,'=',43,'#B7C3B8')
text(974,235,'89',100,lime,True)
text(55,586,'PAR-72 EXAMPLES  /  GROSS SCORES',18,'#B7C3B8')
text(845,586,'breakingninetygolf.com',18,'#B7C3B8')
im.save(str(out)+'.png');im.save(str(out)+'.webp',quality=88)
im.resize((600,315),Image.Resampling.LANCZOS).save(str(out)+'-600.webp',quality=86)
print(out)
