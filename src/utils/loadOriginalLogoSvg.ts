import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Read the exact user-provided logo.svg for inline display, without altering its artwork. */
export function loadOriginalLogoSvg(): string {
  const source = readFileSync(join(process.cwd(), 'public', 'assets', 'brand', 'logo.svg'), 'utf8');
  const svgStart = source.indexOf('<svg');
  if (svgStart === -1) throw new Error('The original public/assets/brand/logo.svg has no <svg element.');
  return source.slice(svgStart);
}
