"""Rebuilds netlify/lib/sa-areas.ts: Google Ads location id -> place name for South Africa (18 Oct 2026).

The ads add the searcher's location id to the landing link (loc={loc_physical_ms}); the ads-area edge function
looks it up here to say "Website design in Sandton". Needs the Google Ads toolkit and its credentials
(~/.claude/skills/google-ads-manager, ~/.config/gads-autopilot). Run from the project root:

    python3 scripts/make-sa-areas.py
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path.home() / '.claude/skills/google-ads-manager'))
from config import get_client, get_service  # noqa: E402

ACCOUNT = '4223962250'  # Local Pros Studio
QUERY = (
    'SELECT geo_target_constant.id, geo_target_constant.name, geo_target_constant.target_type, '
    'geo_target_constant.parent_geo_target, geo_target_constant.status '
    "FROM geo_target_constant WHERE geo_target_constant.country_code = 'ZA'"
)

client = get_client()
rows = {}
for r in get_service(client).search(customer_id=ACCOUNT, query=QUERY):
    g = r.geo_target_constant
    rows[str(g.id)] = {
        'name': g.name,
        'type': g.target_type,
        'parent': g.parent_geo_target.split('/')[-1] if g.parent_geo_target else '',
        'enabled': g.status.name == 'ENABLED',
    }

# Cities, suburbs and provinces by their own name; postal codes and the airport by their town.
# Municipalities ("City of Johannesburg Metropolitan Municipality") and the country are left out.
areas = {}
for gid, x in rows.items():
    if not x['enabled']:
        continue
    if x['type'] in ('City', 'Neighborhood', 'Province'):
        areas[gid] = x['name']
    elif x['type'] in ('Postal Code', 'Airport'):
        parent = rows.get(x['parent'])
        if parent and parent['type'] in ('City', 'Neighborhood'):
            areas[gid] = parent['name']

lines = ',\n'.join(f'  {k}: {json.dumps(v, ensure_ascii=False)}' for k, v in sorted(areas.items(), key=lambda kv: int(kv[0])))
header = (
    '// Google Ads location id -> place name, for every place Google lists in South Africa (cities, suburbs and\n'
    '// provinces; postal codes and the airport use their town). The ads add the searcher\'s location id to the link\n'
    '// (loc={loc_physical_ms}), and netlify/edge-functions/ads-area.ts turns it into "in Sandton" on the page.\n'
    '// Made from Google Ads (geo_target_constant, country ZA) with scripts/make-sa-areas.py.\n'
)
Path('netlify/lib/sa-areas.ts').write_text(f'{header}export const SA_AREAS: Record<number, string> = {{\n{lines},\n}};\n')
print(f'{len(areas)} places written to netlify/lib/sa-areas.ts')
