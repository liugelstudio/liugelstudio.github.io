# LIÜGEL STUDIO M2 — Technical audit

Date: 20261027 / baseline commit `d3e1269566f890211d7da3ef7d7c3543d3e17fec`.

**Project root** `C:\Dev\LiugelStudio.Web` / Astro static output / GitHub Pages organization site.
**Do not merge/push** until the user's own `npm run build` succeeds. This environment cannot install `astro`: offline `npm install` returned `ENOTCACHED`, and `npm run build` returned `astro: not found`.

## Sequential stages

1. **CSS**: extracted the final effective declarations for all selectors at five media stages. Source CSS 424 lines, 30,502 bytes; refactor 1494 lines, 29387 bytes (readable, unminified). @media 13 blocks (12 viewport + 1 reduced-motion) -> 5 blocks (4 viewport + 1 reduced-motion). Original cascade had 102 repeating selector names. After initial merge, `font` shorthand precedence and `.showcase-desc` shorthand cascade caused deviations. Both were corrected; sample computed-style comparison gave **0 non-requested differences** on the audited elements at widths 320, 360, 375, 390, 500, 768, 900, 1000, 1366, 1920. Subsequent explicitly requested font/color/mobile changes cause intentional differences. Full before/after declaration inventories are in JSON audit files.
2. **Logo**: original `public/assets/brand/logo.svg` had four `<text>` elements referencing Teko SemiBold, with position-specific tspans. The vector wordmark now has 13 `<path>` elements, **zero `<text>` or font-family references**. The displayed "LIÜGEL STUDIO" with Ü and the existing dot separator are retained; the screenshot test at 1000×500 showed matching bounding bounds and 98.23% pixel-area overlap (font rasterization differences). Build-time Astro component `src/components/BrandLogo.astro` loads `src/assets/brand/logo.svg?raw`. `public/assets/js/brand-logo.js` and both alternate legacy logo files must be deleted by `Apply-M2.ps1`. Cropping with `.brand overflow:hidden` is removed. The new favicon uses the wordmark's existing L outline; approval of this as the permanent brand symbol remains open.
3. **Showcase media**: original, unchanged PNG **3,521,563 bytes (3.36 MiB)** kept as fallback. Same artwork resized/compressed as AVIF and WebP, widths 768 / 1200 / 1920, `sizes="100vw"` and `fetchpriority="high"`. The largest AVIF **126,547 B** and WebP **179,642 B** are both below 400KB. All seven asset files total **4,092,788 bytes** in the repository, compared with 3,521,563 bytes prior, because the original PNG is kept for fallback. The typical modern browser downloads one responsive version, not the total. Source is 1672×941; 1920 variants are proportionally upscaled to satisfy the requested candidate sizes. No creative alteration to the art.
4. **Fonts**: supplied TTF source sizes 154,700 + 154,872 = **309,572 bytes**. Locally converted Latin subset WOFF2 sizes 7,300 + 7,376 = **14,676 bytes**, 95.26% less. Only real weights 400/600 in CSS; synthesis removed, Japanese fallback restored consistently. Due to font distribution restrictions, WOFF2 bytes are not in the ZIP; `prepare_webfonts.py` regenerates exact files from the user's TTFs. A copy of upstream Teko OFL license notice should accompany published fonts.
5. **Mobile/a11y**: section-heading wraps, works index button moves under title <=680; footer nav two columns; tested menu summary/works index/filter/footer tap targets >=44px. Header scroll padding now switches at 900px. Menu includes visible MENU name, synced aria-expanded, Esc and outside-click closing. Light-background text #5a626b contrast on #f3f3f0 **5.57:1** (old #757c84 **3.80:1**, #737d8a **3.76:1**). White on hover background changed from #3879E0 (**4.22:1**, below AA normal-text threshold) to **#2E66C0 (5.56:1)**. `<dl>/<dt>/<dd>` now used on About and VRCCM pages; content unchanged. Existing skip and focus-visible retained.
6. **SEO**: canonical absolute URLs, OGP/Twitter tags, 1200×630 og-image, Organization JSON-LD on top, robots.txt, generated sitemap endpoint, apple-touch-icon (180×180). Existing copy and link targets unchanged; canonical and touch icon are new non-navigation links.
7. **Brand colors**: three central tokens `--blue: #3879E0`, `--blue-hover: #2E66C0`, `--blue-pale: #a3c3ff`. Core links, hover buttons, focus indicators and the contact strip use these. Fixed illustrative gradients/background blues in showcase and product artwork remain literal so that the design is not inadvertently changed; standardizing *those artistic colors* would conflict with the no-visual-change instruction and is a deferred design decision.

## Verification

| Test | Result |
|---|---|
| CSS syntax (tinycss2/PostCSS) | PASS |
| TypeScript frontmatter syntax (ts.transpileModule) | PASS |
| Existing visible text/anchor href parity (source audit) | PASS except intended canonical/touch-icon link additions |
| Logo outline source `<text>`/font-family | 0 / 0 |
| Display widths 320/360/375/390/768/1366/1920, eight page fixtures = 56 tests | 56 PASS, zero horizontal document scroll |
| `MENU`: click, aria-expanded, Escape, outside pointer | PASS in browser fixture |
| Click targets ≥44px (sampled summary/works link/filter/footer) | PASS at 320/390/768 |
| Browser real Astro build + screenshot of compiled site | **NOT PERFORMED** (Astro package not installed) |
| iPhone Safari device test | **NOT PERFORMED** |
| GitHub Pages publish/deploy after M2 | **NOT PERFORMED** |

The 56 responsive tests used HTML fixtures reconstructed from the actual pages with the refactored CSS and assets. They do **not** replace a full compiled Astro + device regression suite.

## Deferred decisions and questions

1. The supplied official wordmark does not identify a separate standalone symbol. Is the extracted L character acceptable for favicon and apple-touch-icon, or is a separate official studio symbol intended? The implementation currently uses the L-derived variant provisionally.
2. Should fixed blue shades in the showcase artwork and product concept graphics remain protected (current behavior), or may they be normalized to the three palette tokens even if their appearance changes?
3. Is the supplied local Teko version distributed with its matching OFL.txt/license metadata, and does its reserved-font-name policy permit these names for the subsets? Include the verified upstream license text before public deployment.
