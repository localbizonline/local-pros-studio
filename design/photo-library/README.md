# Photo library

Photos made for Local Pros Studio pages that are not (or no longer) on the site, kept so they can be reused.
All made with FAL (GPT Image) on 9 Oct 2026 in the site's photographic style. Names say what is in them.

- `builder-bakkie-stars-on-back-wide`: first reviews hero; Jeremy rejected it (stars on the back of the phone).
- `builder-bakkie-phone-back-wide`, `builder-bakkie-over-shoulder-wide`: the fixed versions (the second went live, then the
  Cape Town builder photo replaced it).
- `cape-town-builder-google-profile-v2-wide`: second version of the reviews hero (the floating phone shows a Google profile).
- `dog-groomer-*`: groomer versions for the reviews closing card. Jeremy disliked the dog on the counter and blank screens.
- Rebuild the gallery: `python3 design/photo-library/build-image-library.py`. The live-page crawl (`crawl-live-images.js`)
  needs Playwright; run it when pages change so the "Live" tags stay right.
- `hair-salon-owner-google-review-square`, `customer-couch-leaving-review-wide`: not used yet.

The full picture of every image in the project, used or not: `image-library.html` at the project root
(open http://localhost:4321/image-library.html with the dev server running).
