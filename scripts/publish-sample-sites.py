"""Copies the example designs (design/web-montage/mock-sites/<slug>/) into the samples app's public/ folder with a
noindex tag and a small "Example design" label, so the ads pages can link to each one as a working website
(18 Oct 2026). Deploy the samples app (../lps-samples-app), never public/ on its own: a deploy replaces the whole
site, and on 18 Oct a --dir deploy of a static folder dropped the app's samples API, so leads' samples failed until 20 Oct.

    python3 scripts/publish-sample-sites.py [slug ...]      # default: every design that has a card picture
    cd ../lps-samples-app && npm run deps:linux && netlify deploy --prod   # functions + public, together
"""
import re
import shutil
import sys
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'design/web-montage/mock-sites'
CARDS = ROOT / 'src/components/web-examples/img'
DEPLOY = (ROOT.parent / 'lps-samples-app' if (ROOT.parent / 'lps-samples-app').exists() else Path('/Users/jeremymartin/Code/Cursor/Websites/lps-samples-app')) / 'public'
ASHLEY = '27783628921'

# Business names from the catalogue, for the WhatsApp line
names = dict(re.findall(r"slug: '([^']+)', name: '([^']+)'", (ROOT / 'src/components/web-examples/catalogue.ts').read_text()))

LABEL = """
<!-- Example design label (scripts/publish-sample-sites.py) -->
<div id="lps-example" role="note" style="position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483647;display:flex;align-items:center;gap:12px;max-width:560px;margin:0 auto;padding:12px 12px 12px 16px;border-radius:14px;background:#1c1917;color:#fafaf9;font:500 14px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;box-shadow:0 12px 32px rgba(0,0,0,.35)">
  <span style="flex:1">Example design by <strong>Local Pros Studio</strong>. Not a real business.</span>
  <a href="{wa}" target="_blank" rel="noopener" style="flex-shrink:0;padding:10px 14px;border-radius:10px;background:#25d366;color:#0b3d20;font-weight:700;text-decoration:none;white-space:nowrap">Get one like this</a>
  <button type="button" aria-label="Hide" onclick="this.parentNode.remove()" style="flex-shrink:0;width:32px;height:32px;border:0;border-radius:8px;background:transparent;color:#d6d3d1;font-size:20px;line-height:1;cursor:pointer">&times;</button>
</div>
"""

slugs = sys.argv[1:] or sorted(p.stem for p in CARDS.glob('*.webp') if (SOURCE / p.stem / 'index.html').exists())
for slug in slugs:
    src = SOURCE / slug
    dst = DEPLOY / slug
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    page = dst / 'index.html'
    html = page.read_text()
    if 'name="robots"' not in html:
        html = re.sub(r'(<head[^>]*>)', r'\1\n<meta name="robots" content="noindex, nofollow">', html, count=1)
    name = names.get(slug, 'your example design')
    text = f'Hi Ashley, I saw your {name} example design and I’d like a website like it.'
    wa = f'https://wa.me/{ASHLEY}?text={urllib.parse.quote(text)}'
    html = html.replace('</body>', LABEL.replace('{wa}', wa) + '</body>', 1)
    page.write_text(html)
    print(f'{slug}: {DEPLOY.name}/{slug}/')
