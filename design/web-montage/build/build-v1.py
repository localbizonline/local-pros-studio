import sys
from PIL import Image, ImageDraw, ImageFilter
SP,P=sys.argv[1],sys.argv[2]; R=P+'/src/assets/images/portfolio/'; M=SP+'/mock-sites/'; S=SP+'/sites/'
CREAM=(251,246,236,255)
def fit_crop(im,w,h):
    tw=im.width; th=int(tw*h/w)
    if th>im.height: th=im.height; tw=int(th*w/h)
    x=(im.width-tw)//2
    return im.crop((x,0,x+tw,th)).resize((w,h),Image.LANCZOS)
def rmask(size,r):
    m=Image.new('L',size,0); ImageDraw.Draw(m).rounded_rectangle((0,0,size[0]-1,size[1]-1),r,fill=255); return m
def shadow(base,im,xy,blur=28,off=(0,18),alpha=70):
    sh=Image.new('RGBA',(im.width+blur*4,im.height+blur*4),(0,0,0,0))
    a=im.split()[-1].point(lambda v: alpha if v>0 else 0)
    sh.paste((28,25,23,255),(blur*2,blur*2),a); sh=sh.filter(ImageFilter.GaussianBlur(blur))
    base.alpha_composite(sh,(int(xy[0]-blur*2+off[0]),int(xy[1]-blur*2+off[1]))); base.alpha_composite(im,(int(xy[0]),int(xy[1])))
def phone(f,pw,ph):
    # light frame: white bezel, hairline grey outline, rounded screen (no black body)
    b=max(6,pw//26); r=int(pw*0.14)
    W,H=pw+2*b,ph+2*b
    body=Image.new('RGBA',(W,H),(0,0,0,0))
    d=ImageDraw.Draw(body); d.rounded_rectangle((0,0,W-1,H-1),r,fill=(255,255,255,255),outline=(214,211,209,255),width=2)
    scr=fit_crop(Image.open(f).convert('RGB'),pw,ph).convert('RGBA'); scr.putalpha(rmask((pw,ph),r-b))
    body.alpha_composite(scr,(b,b)); return body
def desk(f,dw,dh):
    im=fit_crop(Image.open(f).convert('RGB'),dw,dh); bar=max(18,dw//18)
    fr=Image.new('RGB',(dw,dh+bar),(255,255,255)); d=ImageDraw.Draw(fr); r=bar//5
    for i in range(3): d.ellipse((bar//2+i*bar*0.7-r,bar//2-r,bar//2+i*bar*0.7+r,bar//2+r),fill=(231,229,228))
    fr.paste(im,(0,bar)); fr=fr.convert('RGBA'); fr.putalpha(rmask(fr.size,max(10,dw//36))); return fr
C=SP+'/clean/'
PH={k:C+k+'-mobile-done.png' for k in ['topspec','willa','reachmax','ridgeway','maramba']}
DK={k:C+k+'-desktop-done.png' for k in ['topspec','willa','reachmax','ridgeway']}
W,H=1600,1000
# A
base=Image.new('RGBA',(W,H),CREAM)
order=[('maramba',0.8),('willa',0.9),('topspec',1.0),('ridgeway',0.9),('reachmax',0.8)]
ps=[phone(PH[k],int(310*sc),int(672*sc)) for k,sc in order]; gap=18
x=(W-(sum(p.width for p in ps)+gap*4))//2
for p in ps: shadow(base,p,(x,(H-p.height)//2),blur=30,off=(0,20),alpha=60); x+=p.width+gap
base.convert('RGB').save(SP+'/montage/A.webp','WEBP',quality=84)
# B
base=Image.new('RGBA',(W,H),CREAM)
for k,(cx,cy) in zip(['topspec','willa','reachmax','ridgeway'],[(60,50),(830,50),(60,520),(830,520)]):
    shadow(base,desk(DK[k],560,350),(cx,cy),blur=24,off=(0,14),alpha=55)
    shadow(base,phone(PH[k],150,325),(cx+560-110,cy+105),blur=24,off=(0,16),alpha=70)
base.convert('RGB').save(SP+'/montage/B.webp','WEBP',quality=84)
# C
base=Image.new('RGBA',(W,H),CREAM)
shadow(base,desk(DK['topspec'],960,600),((W-960)//2,30),blur=30,off=(0,18),alpha=55)
for k,ang,cx in [('willa',-8,250),('reachmax',-3,560),('ridgeway',3,870),('maramba',8,1180)]:
    p=phone(PH[k],196,424).rotate(-ang,resample=Image.BICUBIC,expand=True)
    shadow(base,p,(cx-p.width//2,H-p.height-30),blur=30,off=(0,22),alpha=75)
base.convert('RGB').save(SP+'/montage/C.webp','WEBP',quality=84)
print('ok')
