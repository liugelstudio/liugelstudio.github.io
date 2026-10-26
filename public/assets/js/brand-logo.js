/* Render the EXACT original /assets/brand/logo.svg as inline DOM.
 * No alternate logo, no SVG rewriting and no Astro server-side SVG injection.
 * This lets the document's Teko @font-face work in iOS Safari.
 */
(async () => {
  const placeholders = Array.from(document.querySelectorAll('img[data-original-logo]'));
  if (!placeholders.length) return;

  try {
    const url = placeholders[0].src;
    const response = await fetch(url, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`Logo HTTP ${response.status}`);
    const text = await response.text();
    const parsed = new DOMParser().parseFromString(text, 'image/svg+xml');
    const source = parsed.documentElement;
    if (source.localName !== 'svg' || parsed.querySelector('parsererror')) {
      throw new Error('Invalid original SVG file');
    }

    // SVG references the supplied Teko-SemiBold font; load it from the host first.
    if (document.fonts && document.fonts.load) {
      document.fonts.load('600 48px "Teko-SemiBold"').catch(() => {});
    }

    for (const image of placeholders) {
      const svg = document.importNode(source, true);
      const classes = image.className ? `${image.className} brand-inline` : 'brand-inline';
      svg.setAttribute('class', classes);
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', image.alt || 'LIÜGEL STUDIO');
      svg.setAttribute('focusable', 'false');
      image.replaceWith(svg);
    }
  } catch (error) {
    // The original image stays in place if loading fails; never replace it with another logo.
    console.error('LIÜGEL STUDIO: original SVG could not be inlined.', error);
  }
})();
