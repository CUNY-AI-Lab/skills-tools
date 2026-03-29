# TODO

## emoji-to-svg-primitives

Replace emoji HTML entities in diagrams with scalable, animated SVG primitives via `widgets.js`.

### Primitives

| Emoji | Widget | Primitive | Status |
|-------|--------|-----------|--------|
| 🤖 `&#129302;` | `data-widget="robot"` | Pulsing orbital — cyan center dot + breathing concentric rings | sandbox |
| 👤 `&#128100;` | `data-widget="person"` | Silhouette badge — circle head + shoulder arc | sandbox |
| ✅ `&#9989;` | `data-widget="check-animated"` | Animated checkmark — stroke draws on via dashoffset | sandbox |
| ✓ `&#10003;` | `data-widget="check"` | Static tick — two-segment path, inherits text color | sandbox |
| ← `&#8592;` | `data-widget="arrow-left"` | Left chevron — angled bracket, hover scale | sandbox |
| → `&#8594;` | `data-widget="arrow-right"` | Right chevron — mirror of left | sandbox |

### Next steps

- [ ] Move `sandbox/widgets.js` → `js/widgets.js`
- [ ] Load `widgets.js` in `index.html` before `deck-engine.js`
- [ ] Replace emoji entities in theater diagram with `data-widget` spans
- [ ] Replace nav arrow entities with widget chevrons
- [ ] Replace roadmap/closing checkmarks with widget ticks
- [ ] Replace flow-node ✅ with animated check widget
- [ ] Test at all breakpoints (mobile, tablet, desktop)
- [ ] Create skill file at `~/.claude/skills/emoji-to-svg-primitives/SKILL.md`
