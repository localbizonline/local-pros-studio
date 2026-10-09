# Builds image-library.html at the project root: every photo and picture in the project, grouped, each marked
# "Not used yet" or with the live pages it is on. Run from the project root: python3 design/photo-library/build-image-library.py
# Which images are live comes from design/photo-library/live-images.json, written by crawl-live-images.js (Playwright:
# it opens every live page on studio.localpros.co.za, scrolls it and records the images). Re-run the crawl when pages change.
import json, os, re, urllib.parse, html
from PIL import Image

live = json.load(open('design/photo-library/live-images.json'))
onpages = {}
for u, pgs in live.items():
    n = urllib.parse.unquote(u.rsplit('/', 1)[1])
    n = re.sub(r'-[A-Za-z0-9_-]{8}(\.[a-z]+)$', r'\1', n).lower()  # strip the build's file hash
    onpages.setdefault(n, set()).update(pgs)

def pretty(pg):
    return 'homepage' if pg == '/' else pg

files = []
for base in ['src/assets/images', 'src/components', 'public', 'design']:
    for root, _, fs in os.walk(base):
        if 'logo-options' in root or '/screens' in root:
            continue  # logo drafts and site screenshots are not reusable photos
        for f in sorted(fs):
            if f.lower().endswith(('.webp', '.png', '.jpg', '.jpeg')):
                files.append(os.path.join(root, f))

def group(p):
    if 'photo-library' in p: return ('Saved photos made for pages, not on the site', 0)
    if 'mock-sites' in p: return ('Photos for other kinds of business (made for the example websites)', 1)
    if 'clients/posts' in p: return ('Real client posts', 3)
    if 'clients/logos' in p: return ('Client logos', 6)
    if p.startswith('design/') and any(x in p for x in ['reviews-page', 'social-page']): return ('Screenshots and option boards (not photos)', 7)
    if '/img/' in p and p.startswith('src/components'): return ('Photos made for page drafts and pages', 2)
    return ('Photos and pictures in the images folder and design folder', 2)

groups = {}
for p in files:
    g, o = group(p)
    try:
        w, h = Image.open(p).size
    except Exception:
        w = h = 0
    groups.setdefault((o, g), []).append((p, w, h, os.path.getsize(p) // 1024, sorted(onpages.get(os.path.basename(p).lower(), []))))

total = sum(len(v) for v in groups.values())
used = sum(1 for v in groups.values() for x in v if x[4])
cards = []
for (o, g), items in sorted(groups.items()):
    items.sort(key=lambda x: (bool(x[4]), x[0]))
    un = sum(1 for x in items if not x[4])
    cards.append(f'<section><h2>{html.escape(g)} <span>{un} not used yet · {len(items) - un} live</span></h2><div class="grid">')
    for p, w, h, kb, pg in items:
        tag = ('<b class="live">Live: ' + ', '.join(pretty(x) for x in pg) + '</b>') if pg else '<b class="new">Not used yet</b>'
        src = '/' + urllib.parse.quote(p)
        cards.append(f'<figure class="{"is-live" if pg else ""}"><a href="{src}" target="_blank"><img loading="lazy" src="{src}" alt=""></a>'
                     f'<figcaption>{tag}<span>{html.escape(os.path.basename(p))}</span><small>{w}×{h} · {kb} KB · {html.escape(os.path.dirname(p))}</small></figcaption></figure>')
    cards.append('</div></section>')

page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Image library</title>
<!-- Built by design/photo-library/build-image-library.py. Open http://localhost:4321/image-library.html with the dev server running. -->
<style>
:root{{--ink:#1c1917;--body:#44403c;--muted:#78716c;--line:#e7e5e4}}
*{{box-sizing:border-box}} body{{margin:0;font:15px/1.45 system-ui,sans-serif;color:var(--ink);background:#fafaf9}}
header{{position:sticky;top:0;z-index:2;background:#fff;border-bottom:1px solid var(--line);padding:14px 24px;display:flex;flex-wrap:wrap;gap:8px 20px;align-items:center}}
h1{{margin:0;font-size:18px}} header p{{margin:0;color:var(--muted)}} label{{margin-left:auto;display:flex;gap:8px;align-items:center;min-height:44px;cursor:pointer}}
section{{padding:24px}} h2{{font-size:18px;margin:0 0 14px}} h2 span{{font-weight:400;color:var(--muted);font-size:14px;margin-left:8px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}}
figure{{margin:0;background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden}}
figure img{{display:block;width:100%;height:170px;object-fit:cover;background:#f5f5f4}}
figcaption{{padding:10px 12px;display:grid;gap:3px}} figcaption span{{font-size:13px;word-break:break-all}} small{{color:var(--muted);font-size:12px;word-break:break-all}}
b{{font-size:12px;padding:2px 8px;border-radius:999px;justify-self:start}} .new{{background:#fef3c7}} .live{{background:#e7e5e4;color:var(--body)}}
body.only-new figure.is-live{{display:none}}
</style></head><body>
<header><h1>Image library</h1><p>{total} images · {total - used} not used on the live site yet · tap a picture for full size</p>
<label><input type="checkbox" id="only"> Show only images not used yet</label></header>
{"".join(cards)}
<script>document.getElementById('only').addEventListener('change',e=>document.body.classList.toggle('only-new',e.target.checked))</script>
</body></html>'''
open('image-library.html', 'w').write(page)
print(total, 'images,', total - used, 'not used yet')
