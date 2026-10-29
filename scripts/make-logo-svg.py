"""Build the Local Pros Studio wordmark (flyer option C: LOCAL PROS with a red STUDIO tag) as outlined SVG.

Usage: pip install fonttools uharfbuzz
       python3 scripts/make-logo-svg.py <Montserrat-Black.ttf> src/assets/images/logo
Montserrat 900 TTF: from https://fonts.googleapis.com/css2?family=Montserrat:wght@900

Geometry copies the flyer CSS (marketing repo campaigns/2026-10-studio-flyer/print/src/front.html, .wm):
  .wm      font: 900 8.2mm/1 Montserrat; letter-spacing: -0.3mm
  .wm span font-size: 6mm; letter-spacing: 0.2mm; padding: 1mm 2mm 0.9mm; border-radius: 1.2mm; vertical-align: 0.6mm
Units below: 1 unit = 1/100 of the main font size (8.2mm).
"""
import sys
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

FONT = sys.argv[1]
OUT = sys.argv[2]

tt = TTFont(FONT)
upm = tt['head'].unitsPerEm
gs = tt.getGlyphSet()
hhea = tt['hhea']
asc, desc = hhea.ascent, -hhea.descent  # Chrome uses hhea (or typo if USE_TYPO_METRICS) metrics
os2 = tt['OS/2']
if os2.fsSelection & (1 << 7):
    asc, desc = os2.sTypoAscender, -os2.sTypoDescender

blob = hb.Blob.from_file_path(FONT)
face = hb.Face(blob)
font = hb.Font(face)

MM = 100 / 8.2  # units per mm


def shape(text):
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})
    return list(zip(buf.glyph_infos, buf.glyph_positions))


def run(text, size, spacing, x0, baseline):
    """Return (path_d, x_end, bounds) for text at size (units), letter-spacing after each glyph."""
    scale = size / upm
    order = tt.getGlyphOrder()
    pen = SVGPathPen(gs)
    x = x0
    for info, pos in shape(text):
        name = order[info.codepoint]
        tp = TransformPen(pen, (scale, 0, 0, -scale, x + pos.x_offset * scale, baseline - pos.y_offset * scale))
        gs[name].draw(tp)
        x += pos.x_advance * scale + spacing
    return pen.getCommands(), x


def text_bounds(text, size, x0, baseline):
    scale = size / upm
    order = tt.getGlyphOrder()
    bp = BoundsPen(gs)
    x = x0
    for info, pos in shape(text):
        name = order[info.codepoint]
        tp = TransformPen(bp, (scale, 0, 0, -scale, x, baseline))
        gs[name].draw(tp)
        x += pos.x_advance * scale
    return bp.bounds


# Main run: "LOCAL PROS " (the trailing space sits before the inline-block tag)
S = 100.0
LS = -0.3 * MM
base = 0.0
main_d, x_after = run("LOCAL PROS ", S, LS, 0.0, base)

# Tag
TS = 6 * MM
TLS = 0.2 * MM
pad_t, pad_x, pad_b = 1 * MM, 2 * MM, 0.9 * MM
radius = 1.2 * MM
raise_ = 0.6 * MM
# inline-block with line-height 1: content box height = TS, text baseline at half-leading + ascent
half_lead = (TS - (asc + desc) * TS / upm) / 2
tag_base = base - raise_  # the tag's text baseline sits on the raised line baseline
box_top = tag_base - (half_lead + asc * TS / upm) - pad_t
box_left = x_after
tag_d, tag_text_end = run("STUDIO", TS, TLS, box_left + pad_x, tag_base)
box_right = tag_text_end + pad_x
box_bottom = box_top + pad_t + TS + pad_b

# Tight viewBox around ink, with a small margin
mb = text_bounds("LOCAL PROS", S, 0, base)
top = min(mb[1], box_top)
bottom = max(mb[3], box_bottom)
left = mb[0]
right = box_right
m = 0  # no margin: trimmed like a logo file
vb = (left - m, top - m, right - left + 2 * m, bottom - top + 2 * m)
r = lambda v: f"{v:.2f}".rstrip('0').rstrip('.')


def svg(word_fill, tag_fill, tag_text_fill, title="Local Pros Studio"):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{" ".join(r(v) for v in vb)}" role="img" aria-label="{title}">'
        f'<title>{title}</title>'
        f'<path fill="{word_fill}" d="{main_d}"/>'
        f'<rect fill="{tag_fill}" x="{r(box_left)}" y="{r(box_top)}" width="{r(box_right - box_left)}" height="{r(box_bottom - box_top)}" rx="{r(radius)}"/>'
        f'<path fill="{tag_text_fill}" d="{tag_d}"/>'
        f'</svg>\n'
    )


import re
def compact(s):
    # round path numbers to 2 dp to keep the file small
    return re.sub(r"-?\d+\.\d+", lambda mo: r(float(mo.group())), s)

INK, RED, WHITE = "#141414", "#E63946", "#FFFFFF"
open(f"{OUT}/local-pros-studio-logo.svg", "w").write(compact(svg(INK, RED, WHITE)))
open(f"{OUT}/local-pros-studio-logo-white.svg", "w").write(compact(svg(WHITE, RED, WHITE)))
print("viewBox", vb, "aspect", vb[2] / vb[3])
