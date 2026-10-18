// Writes the visitor's area and how the headline starts into a category-first ads page's HTML (18 Oct 2026),
// before it reaches the phone: "Website designers in Sandton". Used by both edge functions (ads-area.ts for
// /go/websites*, ads-split.ts when it serves the question-first page at the ad's own address). The ads add
// loc={loc_physical_ms} (where the searcher is) and kw={keyword} (the keyword their search matched) to the link.
// An area we can't name is left out rather than guessed. The same words go on the window for the page's code
// (src/components/ads-gate/adWords.ts), so the page takes over the HTML without changing it.

import { SA_AREAS } from './sa-areas.ts';
import {
  AD_WORDS_GLOBAL,
  DEFAULT_AREA_SPAN,
  DEFAULT_LEAD_SPAN,
  DEFAULT_PLACE_SPAN,
  areaText,
  placeText,
  designersFromKeyword,
  leadText,
  type AdWords,
} from '../../src/components/ads-gate/adWords.ts';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

export const adWordsFrom = (url: URL): AdWords => {
  const id = Number(url.searchParams.get('loc'));
  return {
    area: (Number.isInteger(id) && SA_AREAS[id]) || '',
    designers: designersFromKeyword(url.searchParams.get('kw')),
  };
};

export const hasAdWords = (words: AdWords) => !!(words.area || words.designers);

export const fillAdWords = (html: string, words: AdWords) =>
  !hasAdWords(words)
    ? html
    : html
        .split(DEFAULT_LEAD_SPAN)
        .join(`<span data-ad="lead">${escapeHtml(leadText(words))}</span>`)
        .split(DEFAULT_AREA_SPAN)
        .join(`<span data-ad="area">${escapeHtml(areaText(words))}</span>`)
        .split(DEFAULT_PLACE_SPAN)
        .join(`<span data-ad="place">${escapeHtml(placeText(words))}</span>`)
        .replace('</head>', `<script>window.${AD_WORDS_GLOBAL}=${JSON.stringify(words).replace(/</g, '\\u003c')}</script></head>`);
