# Cadabams MindTalk — Design System

A warm, photographic, India-first mental health design system. Calm cream canvases, brand-orange CTAs, soft elevations, and a strict AI disclaimer pattern.

## When to use this skill

Use this design system whenever you're designing for **MindTalk** — the Cadabams mental health app. It covers home/journal/journey/booking/assessment surfaces and a full visual + voice language for any new screen.

Tell the user up front: this system is opinionated about three things — **brand-orange CTAs**, **soft cream canvases**, and **AI surfaces always carry a disclaimer**. Don't deviate from those without asking.

## Project layout

```
colors_and_type.css        — design tokens (CSS variables) — load this on every page
assets/
  logos/                   — orange wordmark, white wordmark, white icon
  imagery/                 — silk-flow, painterly, sprout reference renders
preview/                   — design system review cards (one HTML per token group)
ui_kits/mobile/            — React component library + 5 reference screens
README.md                  — full system documentation (read this first)
```

## How to use

1. **Read `README.md`** — it's the source of truth for color, type, voice, AI rules, and patterns.
2. **Always link `colors_and_type.css`** at the top of any new page. All tokens are CSS variables (`--mt-orange-500`, `--font-display`, etc.).
3. **Reuse, don't redraw** — components live in `ui_kits/mobile/primitives.jsx`. Import the file, then use `<MTButton>`, `<MTCard>`, `<MTChip>`, `<MTAIPill>`, `<MTTabBar>`, `<MTGlyphTile>`, etc.
4. **Look at the screens** — `ui_kits/mobile/Mobile UI Kit.html` shows five reference layouts. Match their density, spacing rhythm, and copy tone.

## Hard rules

- **Brand orange (#F97316) is reserved for primary CTA, active states, and the AI sparkle.** Never use it for body text, dividers, or decoration.
- **AI-generated content always shows the AI pill + a non-diagnosis disclaimer.** No exceptions. Use `<MTAIPill>` and the disclaimer pattern in `preview/components-ai-pattern.html`.
- **No emoji in product UI** except in the mood-faces selector.
- **Voice is concrete, not poetic.** "Day 9 of 90 · Anxiety Relief" — not "Your wellness journey awaits."
- **Never shame on a miss.** Streaks freeze, they don't break.
- **All surfaces sit on cream (#FAF7F4 or #F4F1EC)**, never pure white as a canvas.

## Quick recipes

- **New screen** → wrap content in `<MTScreen>`, add `<MTTopBar>` if needed, `<MTTabBar>` at bottom.
- **CTA stack** → primary `MTButton variant="primary"` or `"gradient"`, secondary `variant="secondary"`, destructive `variant="danger"`.
- **List of category cards** → `<MTCard>` with `<MTGlyphTile tint="...">` glyph; tints: blue, purple, green, pink, peach, orange.
- **Filter bar** → row of `<MTChip>`s, first one `active`.
- **AI summary** → `<MTAIPill>` at top, body, hairline divider, disclaimer with "not a diagnosis" emphasized in `--mt-orange-700`.
