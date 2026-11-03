"""Lossless web encoding of composed artwork; visible pixels are unchanged."""
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
for name in ['welcome-wide','welcome-compact','event-zero-to-demo','event-frontierhacks']:
    im=Image.open(ROOT/f'artifacts/render/{name}.png').convert('RGBA')
    out=ROOT/f'profile/assets/v2/{name}.webp'
    im.save(out,lossless=True,method=6)
    check=Image.open(out).convert('RGBA')
    assert check.tobytes()==im.tobytes(), name
    print(f'{name}: {out.stat().st_size:,} bytes, exact RGBA parity')
