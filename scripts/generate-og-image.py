"""
Regenerate public/og-image.png — the social-share preview card.

Runs with stock Pillow on Windows. Uses Georgia (serif) for the brand mark
and wordmark, Segoe UI for the body, matching the site's typographic feel.

Why this script exists: prior og-image.png claimed "8 languages" (untrue —
content is English-only) and a stale program count. The script makes it easy
to regenerate without those claims.
"""

from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1200, 630

# Colors — match favicon.svg (#2e7d32 green) and the site's cream palette.
CREAM = (248, 248, 240)
GREEN = (46, 125, 50)
INK = (24, 24, 24)
MUTED = (90, 90, 90)
WHITE = (255, 255, 255)

# Font paths
GEORGIA = "C:/Windows/Fonts/georgia.ttf"
GEORGIA_BOLD = "C:/Windows/Fonts/georgiab.ttf"
SEGOE = "C:/Windows/Fonts/segoeui.ttf"
SEGOE_BOLD = "C:/Windows/Fonts/segoeuib.ttf"

img = Image.new("RGB", (WIDTH, HEIGHT), CREAM)
d = ImageDraw.Draw(img)

# Subtle grid background
for x in range(0, WIDTH, 60):
    d.line([(x, 0), (x, HEIGHT)], fill=(238, 238, 226), width=1)
for y in range(0, HEIGHT, 60):
    d.line([(0, y), (WIDTH, y)], fill=(238, 238, 226), width=1)

# Left accent bar
d.rectangle([(0, 0), (12, HEIGHT)], fill=GREEN)

# HF mark — green circle on the left
mark_cx, mark_cy, mark_r = 200, 240, 130
d.ellipse(
    [(mark_cx - mark_r, mark_cy - mark_r), (mark_cx + mark_r, mark_cy + mark_r)],
    fill=GREEN,
)
hf_font = ImageFont.truetype(GEORGIA_BOLD, 110)
hf_text = "HF"
hf_bbox = d.textbbox((0, 0), hf_text, font=hf_font)
hf_w = hf_bbox[2] - hf_bbox[0]
hf_h = hf_bbox[3] - hf_bbox[1]
d.text(
    (mark_cx - hf_w / 2 - hf_bbox[0], mark_cy - hf_h / 2 - hf_bbox[1] - 8),
    hf_text,
    fill=WHITE,
    font=hf_font,
)

# Wordmark
title_font = ImageFont.truetype(GEORGIA_BOLD, 96)
d.text((380, 170), "HelpFinder", fill=INK, font=title_font)

# Tagline — the .help branding line
tagline_font = ImageFont.truetype(GEORGIA, 44)
d.text((380, 290), "the only ", fill=MUTED, font=tagline_font)
only_bbox = d.textbbox((0, 0), "the only ", font=tagline_font)
only_w = only_bbox[2] - only_bbox[0]
help_font = ImageFont.truetype(GEORGIA_BOLD, 44)
d.text((380 + only_w, 290), ".help", fill=GREEN, font=help_font)
help_bbox = d.textbbox((0, 0), ".help", font=help_font)
help_w = help_bbox[2] - help_bbox[0]
d.text((380 + only_w + help_w, 290), " you need", fill=MUTED, font=tagline_font)

# Body
body_font = ImageFont.truetype(SEGOE, 28)
d.text(
    (380, 380),
    "Programs, rights, and answers for Rochester, NY.",
    fill=INK,
    font=body_font,
)
d.text(
    (380, 422),
    "Built by someone who needed this help and couldn't find it.",
    fill=MUTED,
    font=body_font,
)

# Footer pill — the domain
pill_font = ImageFont.truetype(SEGOE_BOLD, 32)
pill_text = "helpfinder.help"
pill_bbox = d.textbbox((0, 0), pill_text, font=pill_font)
pill_w = pill_bbox[2] - pill_bbox[0]
pill_h = pill_bbox[3] - pill_bbox[1]
pad_x, pad_y = 32, 18
pill_x, pill_y = 380, 510
pill_box = [
    (pill_x, pill_y),
    (pill_x + pill_w + pad_x * 2, pill_y + pill_h + pad_y * 2),
]
d.rounded_rectangle(pill_box, radius=40, fill=GREEN)
d.text(
    (pill_x + pad_x - pill_bbox[0], pill_y + pad_y - pill_bbox[1] - 4),
    pill_text,
    fill=WHITE,
    font=pill_font,
)

# Quiet footer line — privacy posture, no claims that stale
foot_font = ImageFont.truetype(SEGOE, 22)
d.text((380, 588), "No data collected. Free to use.", fill=MUTED, font=foot_font)

img.save("public/og-image.png", "PNG", optimize=True)
print("wrote public/og-image.png", img.size)
