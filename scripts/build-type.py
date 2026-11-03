"""Outline the self-hosted pixel font for deterministic, portable artwork."""
import json
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[1]
font = TTFont(ROOT/'profile/assets/v2/fonts/geist-pixel-square.woff2')
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
strings = {
    'wordmark': 'HACK DISTRICT',
    'hack': 'HACK',
    'district': 'DISTRICT',
    'disciplines': 'HACKATHONS / SOFTWARE / HARDWARE',
    'zero': 'ZERO',
    'to-demo': 'TO DEMO',
    'frontier': 'FRONTIER',
    'hacks': 'HACKS',
}
result = {'unitsPerEm': font['head'].unitsPerEm, 'strings': {}}
for key, text in strings.items():
    pen = SVGPathPen(glyphs)
    x = 0
    for char in text:
        name = cmap[ord(char)]
        glyphs[name].draw(TransformPen(pen, (1,0,0,1,x,0)))
        x += font['hmtx'][name][0]
    result['strings'][key] = {'text': text, 'width': x, 'path': pen.getCommands()}
(ROOT/'profile/assets/v2/type-paths.json').write_text(json.dumps(result,separators=(',',':'))+'\n')
print('Outlined eight type treatments.')
