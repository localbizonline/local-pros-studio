# Website montages

The "lots of websites" pictures on the website design page (hero) and the homepage proof section.
Not part of the site build: these are the sources, kept so the pictures can be remade when we add sites.

- `screens/`: phone (and some desktop) screenshots of real client sites, cleaned so each ends at a section edge or fades out (8 Oct 2026).
- `mock-sites/`: example designs for industries we want to show (nail studio, accountants, vet clinic, attorneys, solar, driving school, car services, personal training). Fictional businesses, made for the montage; always called "example designs" on the page. Each folder is a one-page site; `<slug>-mobile.png` and `<slug>-desktop.png` are its screenshots. `tools/gen.sh` makes the photos with FAL; `tools/shoot.cjs` takes the screenshots.
- `build/montage.html`: lays the phones out. Open it with `?layout=rows|wall|labels&size=wide|phone`.
- `build/shoot.cjs`: `node build/shoot.cjs <out-folder> [layout ...]` saves every layout at both sizes. Copy the chosen pair to `src/assets/images/portfolio/web-hero-wide.webp` and `web-hero-phone.webp` (1600 and 1080 wide, WebP quality about 82).
- `build/build-v1.py`: the older Pillow script behind `websites-montage*.webp` on the homepage.

To add a client: screenshot their site on a phone (390 x 844 at 1.5x), save it in `screens/`, add it to `SITES` in `montage.html`, re-run `shoot.cjs`.
