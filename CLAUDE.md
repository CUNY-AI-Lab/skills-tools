# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Rules

- **Always use the frontend-design skill when making changes that impact aesthetics.** This applies to any visual/styling modifications.

## Project Overview

Workshop 3 of 3 in the CUNY AI Lab Sandbox series ("Customizing Skills & Tools"). Static HTML/CSS/JS slide deck — no build process, no dependencies beyond CDN-loaded Google Fonts. Opens directly in a browser.

**Series context:** This deck follows "Composing System Prompts" (workshop 1) and "Curating Knowledge Collections" (workshop 2). All three share the same CSS/JS engine. Content changes should maintain continuity with the series narrative.

## Viewing

```bash
open index.html          # Open in default browser
open index.html#/5       # Jump to slide 5 (0-indexed in hash)
```

## Architecture

### Deck Engine (`js/deck-engine.js`)
Core presentation framework. Manages slide transitions, step-reveal progressions, keyboard/touch navigation, hash routing, and cross-module coordination. Exposes `window.deckEngine` API.

- **Step reveals:** Elements with `.step-hidden` + `data-step` gain `.step-visible` on advance. Deck engine tracks `currentStep` per slide.
- **Module communication:** Calls `window.updateCarousels()`, `window.startCarousel()`, `window.pauseCarousel()`, `window.updateScrubber()` — all defined by sibling JS files.

### CSS Design System (`css/styles.css`)
1584-line design system with CSS custom properties. Key tokens:
- `--accent-cyan: #4ECDC4` (primary accent), `--accent-blue: #3B6FB5`, `--accent-red: #C05B6E`, `--accent-amber: #B08840`, `--accent-green: #5B8A6F`
- `--dark-bg: #0B1D3A` (navy), `--bg-light: #F0F4F8`
- Typography: Fraunces (headings), DM Sans (body), JetBrains Mono (code)

### Layout Classes
| Class | Purpose |
|-------|---------|
| `.layout-split` | Two-column: `.content` (left) + `.stage` (right) |
| `.layout-full-dark` | Centered dark navy background |
| `.layout-content` | Scrollable prose with light background |
| `.layout-divider` | Section break with label + line |
| `.layout-grid` | Card grid with light background |
| `.title-slide` | Dark centered title with logo |
| `.closing-slide` | Final slide variant |

### Slide HTML Pattern
```html
<div class="slide [layout-class]"
     role="group"
     aria-roledescription="slide"
     aria-label="Slide N: [Title]"
     data-slide="[slug]"
     tabindex="-1">
```

### Component Patterns
- **Prompt blocks:** `.prompt-block` with `.prompt-bad` / `.prompt-mid` / `.prompt-good` quality variants
- **Progression dots:** `.progression-header` with `.progression-dot` (`.dot-bad`, `.dot-mid`, `.dot-good`, `.dot-active`)
- **Comparison panels:** `.comparison` container with `.comparison-panel` and step-reveal
- **Theater diagram:** `.theater-diagram` → `.theater-backstage` + `.theater-curtain` + `.theater-frontstage`
- **Flow nodes:** `.flow-node` with variants `.flow-prompt`, `.flow-model`, `.flow-student`
- **Cards:** `.card` with `.card-cyan`, `.card-navy` variants
- **Copy buttons:** `copyTemplate('tpl-id')` function for template copying

### JS Modules
- `carousel.js` — Image carousels with auto-advance, dot nav, swipe support. `data-sync-steps` attribute links carousel advancement to step reveals.
- `scrubber.js` — Timeline slider with drag, click, keyboard, and touch support.
- `tabs.js` — Simple tab switching via `switchTab(event, tabName)`.

### Responsive Strategy
Viewport-relative units via `clamp()` throughout. Breakpoints at 1024px (tablet) and 768px (mobile) in `responsive.css`. Split layouts stack vertically on mobile.

## Content Structure (37 slides)

- **1–3:** Title, roadmap, recap of workshops 1–2
- **4–6:** What is a skill, why it matters (before/after), the gap skills fill
- **7–10:** Composition example (bad → mid → good progression) — targeted writing feedback
- **11–14:** History example — source analysis with knowledge collection
- **15–18:** Literature example — reading cinematic images
- **19–24:** Building blocks (trigger, procedure, format, constraints) with copyable templates
- **25–28:** Skills worth building, common pitfalls, where skills live
- **29–32:** Open WebUI Tools — what they are, built-in tools, how to enable per-chat or per-model
- **33–37:** Hands-on exercise (choose a move, write the skill, add to model), closing

## Shared Assets

CSS, JS, and logo are identical copies from sibling workshop projects (`ccny-system-prompting`, `knowledge-collections`). When updating the engine or styles, sync changes across all three decks.
