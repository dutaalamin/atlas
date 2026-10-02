# Template Style Guide

Rules for every new template in Atlas. Follow these so the catalogue stays consistent.

## Do NOT use

### 1. Announcement pills / badges above the headline
No rounded "pill" or "badge" chips sitting above the `h1` (e.g. "v2.0 is here", "New · now with...", "Join us at...").

```html
<!-- BAD -->
<span class="pill"><span class="dot"></span> Hush 2.0 is here</span>
<h1>Write without the noise.</h1>
```

Start the hero with the headline directly. If a small label is needed, use a plain uppercase text line, not a chip with a dot.

```html
<!-- GOOD -->
<p class="kicker">Hush 2.0</p>
<h1>Write without the noise.</h1>
```

### 2. Decorative line prefixes before labels
No short horizontal rule drawn before an eyebrow/label via `::before`.

```css
/* BAD */
.label::before { content: ""; width: 30px; height: 2px; background: var(--blue); }
```

```css
/* GOOD */
.label { letter-spacing: .08em; text-transform: uppercase; color: var(--dim); }
```

### 3. Em dashes (—)
Never use the em dash character in copy, titles, or UI text. Use a comma, a period, or a pipe `|` instead.

| Avoid | Use |
|---|---|
| `one calm place — so your team...` | `one calm place, so your team...` |
| `Cancel any time — no contracts.` | `Cancel any time, no contracts.` |
| `<title>Bravo Hero — Section template</title>` | `<title>Bravo Hero | Section template</title>` |

### 4. Neon / multi-colour gradients ("AI slop")
No aurora gradients, no glowing blur orbs, no conic-gradient marks, no gradient text. Keep it clean.

**Allowed palettes:** white, black, grey, plus ONE accent colour (e.g. blue `#2563EB`, brown `#6F4E37`).
Solid fills and subtle single-hue tints only. No rainbow gradients.

## Do use

- One accent colour, solid fills.
- Clean type scale, generous spacing.
- Real product mockups (plain divs), not stock imagery.
- Plain HTML + CSS. No build step, no frameworks.
- Semantic markup and visible focus states.

## File checklist for a new template

1. Place it at `templates/<name>.html`.
2. Self-contained (inline CSS or an own `-assets/` folder). No shared external CSS.
3. No pills, no label lines, no em dashes, no neon gradients.
4. Add a preview screenshot to `assets/img/<name>-1.png` and `assets/img/<name>-full.png`.
5. Register it in `assets/data/templates.json` with `collection`, `accent`, `preview`, `full`, `url`.
6. If it is a section extracted from a landing page, keep the original landing page intact.
