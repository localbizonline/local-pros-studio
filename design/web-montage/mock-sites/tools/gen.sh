#!/bin/bash
# usage: gen.sh out.jpg W H maxwidth "prompt"
OUT="$1"; W="$2"; H="$3"; MAXW="$4"; PROMPT="$5"
BODY=$(jq -n --arg p "$PROMPT" --argjson w "$W" --argjson h "$H" '{prompt:$p,num_images:1,image_size:{width:$w,height:$h},quality:"medium",output_format:"jpeg"}')
RESP=$(curl -s -X POST "https://fal.run/openai/gpt-image-2.5/flare/text-to-image" -H "Authorization: Key $FAL_KEY" -H "Content-Type: application/json" -d "$BODY")
URL=$(echo "$RESP" | jq -r '.images[0].url // empty')
if [ -z "$URL" ]; then echo "FAIL $OUT: $(echo "$RESP" | head -c 300)"; exit 1; fi
curl -s -o "$OUT" "$URL"
sips --resampleWidth "$MAXW" "$OUT" --out "$OUT" >/dev/null 2>&1
sips -s formatOptions 82 "$OUT" --out "$OUT" >/dev/null 2>&1
echo "OK $OUT $(du -h "$OUT" | cut -f1)"
