"""Generate Teko WOFF2 Latin subset from user-owned TTF fonts.
Requires: python -m pip install fonttools brotli
No Python or TTF needed at runtime; execute during development only.
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
import argparse
p=argparse.ArgumentParser(description='Locally subset Teko Regular/SemiBold into WOFF2')
p.add_argument('--fonts', type=Path, default=Path('public/assets/fonts'), help='Directory containing source TTF')
p.add_argument('--output', type=Path, default=Path('public/assets/fonts'), help='Output directory')
a=p.parse_args();a.output.mkdir(parents=True,exist_ok=True)
characters=''.join(chr(i) for i in range(0x20,0x7f)) + ''.join(chr(i) for i in range(0xa0,0x100))+'‐‑–—‘’“”•↗→↓↑／Ü'
for style in ('Regular','SemiBold'):
    source=a.fonts/f'Teko-{style}.ttf'
    if not source.exists():raise FileNotFoundError(f'Source font is missing: {source}')
    f=TTFont(str(source));options=subset.Options(); options.flavor='woff2';options.layout_features=['*'];options.name_IDs=['*'];options.name_legacy=True
    engine=subset.Subsetter(options=options);engine.populate(text=characters);engine.subset(f);f.flavor='woff2'
    dest=a.output/f'Teko-{style}-latin.woff2';f.save(str(dest));print(f'{dest} {dest.stat().st_size:,} bytes')
