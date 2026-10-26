import type { APIRoute } from 'astro';
const paths = ['/', '/products/', '/products/vrccm/', '/technology/', '/about/', '/docs/', '/news/', '/contact/', '/404/'];
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://liugelstudio.github.io/');
  const pages = paths.filter(path => path !== '/404/');
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages.map(path => `  <url><loc>${new URL(path, base).href}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
