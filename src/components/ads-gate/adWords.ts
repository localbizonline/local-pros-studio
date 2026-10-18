// The words the category-first ads pages change for each visitor (18 Oct 2026): their area and how the
// headline starts. Shared by the pages (AdsGate.tsx) and the edge function that fills them in before the page
// reaches the phone (netlify/edge-functions/ads-area.ts), so both always write exactly the same text and the
// page doesn't jump when its code loads. No imports: the edge function bundles this file as it is.
//
// The ads add two things to the link (the campaign's final URL suffix): loc={loc_physical_ms}, Google's id for
// where the searcher is, and kw={keyword}, the keyword their search matched. Searches are general ("website
// design", "website designers near me"), so the keyword only decides "Website design" or "Website designers".

export type AdWords = { area: string; designers: boolean };

// Set by the edge function on the window before the page's code runs
export const AD_WORDS_GLOBAL = '__LPS_AD__';

export const NO_AD_WORDS: AdWords = { area: '', designers: false };

export const designersFromKeyword = (kw: string | null | undefined) => /designer/i.test(kw || '');

// What the marked spans hold: <span data-ad="lead"> and <span data-ad="area">
export const leadText = (w: AdWords) => (w.designers ? 'Website designers' : 'Website design');
export const areaText = (w: AdWords) => (w.area ? ` in ${w.area}` : '');

// What the page was built with (no area, "Website design"), which the edge function looks for and replaces
export const DEFAULT_LEAD_SPAN = `<span data-ad="lead">${leadText(NO_AD_WORDS)}</span>`;
export const DEFAULT_AREA_SPAN = '<span data-ad="area"></span>';
