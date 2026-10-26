# LIÜGEL STUDIO M2 — Technical Refactor

Baseline: `d3e1269` / M1.11 / `liugelstudio/liugelstudio.github.io`. This is not a redesign. The original full-bleed `.showcase` background PNG is preserved unchanged as the fallback; URLs, displayed text and link targets are unchanged.

## Application

1. Back up or commit your current M1.11 working tree.
2. Unzip this differential package **into the project root** `C:\Dev\LiugelStudio.Web`, preserving paths.
3. **Font source is not bundled.** Place your existing Teko Regular and SemiBold TTF files in `public\assets\fonts\` as `Teko-Regular.ttf` and `Teko-SemiBold.ttf`, or generate the two WOFF2 files directly with `py .\prepare_webfonts.py --fonts <YOUR_TTF_DIRECTORY> --output .\public\assets\fonts`. For this development-only step install `fonttools` and `brotli` if needed: `py -m pip install fonttools brotli`.
4. From PowerShell in the project directory, run `./Apply-M2.ps1`. This removes **only** the four obsolete logo/script assets, relocates source TTFs into `.local-font-sources` where necessary, and runs `npm run build`. The background PNG is **not removed or replaced**.
5. Verify the new icon, mobile menu, `sitemap.xml`, `robots.txt`, full-page links, and the iPhone Safari rendering before push.
6. If successful: `git status --short`, `git add -A`, `git diff --cached --stat`, `git commit -m "M2: Refactor CSS, logo, media, accessibility and SEO"`, `git push origin main`.

Do not push until `npm run build` is successful **on your PC**. This session could not run Astro itself because local dependencies were unavailable.

## Assets and font license

The only wordmark master is `src/assets/brand/logo.svg`, built from the supplied wordmark geometry using the supplied Teko SemiBold. It contains 13 vector paths and no text elements. `BrandLogo.astro` injects it at build time via Vite `?raw` without runtime fetch/DOMParser.

The Teko WOFF2 subsets are user-generated and are NOT included in this package. Before distributing those subsets, include the upstream Teko license notice/OFL.txt from the font distribution and verify whether the subset name needs adjustment under its specific OFL conditions. Do not bundle or redistribute the original TTFs unnecessarily.

The icon derives from the exact **L glyph** of the original wordmark plus its established blue accent. Because the supplied wordmark has no separate, unambiguous symbol, this is an interpretation to confirm before treating the icon as a permanent brand mark.

## Notes

* A new `src/pages/sitemap.xml.ts` generates URLs at build time; add future pages to its `paths` array.
* The 3.36 MiB original PNG remains as a fallback. Modern browsers receive the same artwork in AVIF or WebP through `srcset`.
* `--blue` is `#3879E0`, while `--blue-hover` is the darker `#2E66C0` for white-text AA contrast. Other fixed blues in decorative artwork remain unchanged to preserve appearance.
* The CSS is unminified and formatted into readable individual declarations; line count therefore increases even though duplicated patch rules are merged.
