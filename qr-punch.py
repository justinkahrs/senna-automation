#!/usr/bin/env python3
import re
import sys
from pathlib import Path

def punch_svg(inp, out, cut_w, cut_h, radius):
    svg = open(inp, "r", encoding="utf-8").read()

    m = re.search(r'viewBox="([^"]+)"', svg)
    if not m:
        raise SystemExit("No viewBox found")

    x0, y0, w, h = map(float, m.group(1).split())
    x = x0 + (w - cut_w) / 2
    y = y0 + (h - cut_h) / 2

    rect = f'<rect x="{x}" y="{y}" width="{cut_w}" height="{cut_h}" rx="{radius}" ry="{radius}" fill="white"/>'
    svg = svg.replace("</svg>", rect + "\n</svg>")

    open(out, "w", encoding="utf-8").write(svg)


def punch_png(inp, out, cut_w, cut_h, radius):
    from PIL import Image, ImageDraw

    img = Image.open(inp).convert("RGBA")
    w, h = img.size

    x = (w - cut_w) // 2
    y = (h - cut_h) // 2

    draw = ImageDraw.Draw(img)

    if radius > 0:
        draw.rounded_rectangle(
            [x, y, x + cut_w, y + cut_h],
            radius=radius,
            fill=(255, 255, 255, 255)
        )
    else:
        draw.rectangle(
            [x, y, x + cut_w, y + cut_h],
            fill=(255, 255, 255, 255)
        )

    img.save(out)


if len(sys.argv) < 5:
    raise SystemExit("usage: qr-punch.py input output width height [radius]")

inp = sys.argv[1]
out = sys.argv[2]
cut_w = float(sys.argv[3])
cut_h = float(sys.argv[4])
radius = float(sys.argv[5]) if len(sys.argv) > 5 else 0

ext = Path(inp).suffix.lower()

if ext == ".svg":
    punch_svg(inp, out, cut_w, cut_h, radius)
elif ext == ".png":
    punch_png(inp, out, int(cut_w), int(cut_h), int(radius))
else:
    raise SystemExit("Unsupported format (use .svg or .png)")

print(out)