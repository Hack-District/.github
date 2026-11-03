# Hack District organization profile

The public welcome page at [github.com/Hack-District](https://github.com/Hack-District) is maintained in [`profile/README.md`](profile/README.md).

The redesign uses one detailed monochrome maker-workshop illustration, a separate mobile header, and two coordinated event cards. Event descriptions, registration links, and community information remain native, selectable text. No JavaScript, external badge services, or custom stylesheet is required by the live profile.

## Artwork

Published graphics live in `profile/assets/v2/`. The desktop header is 1800 × 720; the mobile header is 900 × 730; event cards are 900 × 480. Lossless WebP delivery is approximately 848 KiB for all three desktop images, or 318 KiB with the mobile header. Original illustration PNGs and outlined typography data are included for future edits.

The workshop is an original AI-generated concept illustration, not a photograph of a fabricated badge or rover. The event illustrations reuse the organization's FrontierHacks Field Kit artwork. Creation details and prompts are in [`profile/assets/v2/provenance.json`](profile/assets/v2/provenance.json). Geist Pixel Square is included with its SIL Open Font License. Outlined letterforms make rendering independent of installed system fonts.

## Rebuild

Requires Node.js and Python 3.10+:

```sh
npm ci
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/requirements.txt
.venv/bin/python scripts/build-type.py
npm run art:render
.venv/bin/python scripts/export-webp.py
```

SVG/PNG composition intermediates are written to ignored `artifacts/render/`. The WebP encoder verifies exact decoded pixel parity with each final PNG. The published profile uses only the four WebP outputs; source PNGs, fonts, and build dependencies are not fetched by visitors.

## Review

GitHub's Markdown API preserved the responsive `<picture>` markup, native headings and links, and event table. The rendered draft was reviewed at desktop and 390 px phone widths, with light and dark GitHub-style Markdown themes. Mobile uses the compact header and has no horizontal overflow. The profile keeps event dates out of artwork and directs visitors to the official event pages for confirmed details.
