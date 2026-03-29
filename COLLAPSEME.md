# Proposed Slide Collapses

> 32 → 27 slides (-5)

---

## Collapse 1: Anatomy + Trigger → "Building a Skill" (slides 17+18 → 1)

**Layout:** `layout-split`

**Left (content):**

Every skill has four parts:

1. **Trigger** — When does it activate?
2. **Procedure** — What steps, in order?
3. **Format** — What does output look like?
4. **Constraints** — What should the model never do?

Your turn: name the student action that triggers the move you want to build.

**Right (stage):** Full copyable template:

```text
Skill: [Skill Name]
When a student [action], follow this procedure:

Procedure:
1. [First step]
2. [Second step]
3. [Third step]

Format:
> [quoted text]
[Observation]
[One question]

Constraints:
- Never [shortcut].
- One [unit] per turn.
- If [deflection], redirect.
```

**Replaces:** Slide 17 (anatomy list) + Slide 18 (trigger template)

### Condensed copy (current → proposed)

| Element | Current | Proposed |
| --- | --- | --- |
| Heading | "Anatomy of a Skill" | "Building a Skill" |
| Intro | "Every skill follows the same basic structure. We'll write yours one piece at a time." | "Every skill has four parts:" |
| Trigger questions (3→2) | What student action starts this? / Does it activate when they share a draft, ask about a source, upload an image? / Should it run automatically or only when asked? | What student action starts this? / Should it run automatically or only when the student asks? |
| Tip box | "What pedagogical move are you trying to teach the model? Name the student action that should trigger it." | "Name the student action that triggers the move you want to build." |

---

## Collapse 2: Procedure + Format + Constraints → "The Details" (slides 19+20+21 → 1)

**Layout:** `layout-content` with 3-column step-reveal grid

Card 1 — **Procedure** (visible on load):
- Numbered steps — what to do, when to wait.
- What comes first? Where does the model pause for the student?

Card 2 — **Format** (step-reveal):
- What the output looks like.
- Quote text? End with a question?

Card 3 — **Constraints** (step-reveal):
- What the model should never do.
- What shortcut to prevent? How to redirect?

**Replaces:** Slide 19 (procedure) + Slide 20 (format) + Slide 21 (constraints)

### Condensed copy (current → proposed)

| Element | Current | Proposed |
| --- | --- | --- |
| Procedure intro | "The core of every skill. Numbered steps that tell the model exactly what to do, in what order. This is what turns a vague instruction into a reliable workflow." | "Numbered steps — what to do, when to wait." |
| Procedure bullets (3→2) | What should happen first? What comes next? / Where should the model wait for the student before continuing? / Should it quote, cite, or reference specific materials? | What comes first? Where does the model pause for the student? |
| Format intro | "Specify what the output should look like. Format instructions are what make the model quote student writing in block quotes, respond underneath, or keep responses to one question at a time." | "What the output looks like." |
| Format bullets (3→2) | Should the model quote the student's text? / Should each response end with a question? / How long should a response be? | Quote text? End with a question? |
| Constraints intro | "What should the model never do within this skill? Skill-level constraints are more specific than system-prompt constraints. They address the particular ways this workflow could go wrong." | "What the model should never do." |
| Constraints bullets (3→2) | What shortcut will the model take if you don't prevent it? / How should it redirect when students push back? / Should it limit itself to one question or one observation per turn? | What shortcut to prevent? How to redirect? |

---

## Collapse 3: Skills Worth Building + Common Pitfalls → "Strategy" (slides 23+24 → 1)

**Layout:** `layout-grid` with step-reveal divider

**Top row — Skills Worth Building (visible on load):**

| Card | Current | Proposed |
| --- | --- | --- |
| Excerpt-and-Respond | "Quote a passage from the student's draft in a block quote. Name one observation directly below it. Ask one question. Stop." | "Quote a passage. Name one observation. Ask one question." |
| Source-Grounded Q&A | "When a student asks a question answerable from the knowledge collection, retrieve and quote the relevant passage before responding. Cite the document by name." | "Retrieve and quote from the knowledge collection before responding." |
| Rubric Walk-Through | "Walk the student through one rubric criterion at a time. For each, quote the criterion, ask the student to evaluate their own work against it, and discuss before moving on." | "One criterion at a time. Quote it, ask the student to self-evaluate." |
| One-Question Focus | "Respond with a single focused question. No preamble, no list of observations. If the model would normally say five things, force it to choose the one that matters most." | "One focused question — no list, no preamble." |

**Bottom row — Watch Out (step-reveal):**

| Card | Current | Proposed |
| --- | --- | --- |
| Everything in the System Prompt | "A 2,000-word system prompt with five embedded procedures confuses the model. Decompose workflows into separate skills. The system prompt sets identity; skills handle specific tasks." | "Keep the system prompt brief. Put procedures in separate skills." |
| Skipping the Format | "Without a format spec, the model defaults to its own structure — usually a long paragraph or numbered list. If you want 'quote then respond,' you have to spell it out." | "If you want 'quote then respond,' spell it out — the model won't guess." |
| No Wait Points | "If your procedure has five steps, the model may execute all five in one response. Explicit 'Stop. Wait for the student to respond' instructions force turn-taking." | "Add 'Stop. Wait for the student' between steps to force turn-taking." |
| Forgetting the Knowledge Collection | "Skills that reference course materials need explicit instructions to retrieve and quote from the knowledge collection. Without them, the model draws on its own training instead of your documents." | "Tell the model to quote from uploaded docs — otherwise it uses its own training." |

**Replaces:** Slide 23 (skills worth building) + Slide 24 (common pitfalls)

---

## Collapse 4: Choose Move + Write Skill → "Build It" (slides 29+30 → 1)

**Layout:** `layout-split`

**Left (content):**

Pick a move, then write the skill.

2x2 card grid:
- Writing Feedback
- Source Analysis
- Visual Reading
- Something Else

Step-reveal checklist:
1. Trigger
2. Procedure (3-5 steps)
3. Format
4. Constraints

**Right (stage):** Full copyable template + Copy button (same block as Collapse 1)

**Replaces:** Slide 29 (choose your move) + Slide 30 (write your skill)

### Condensed copy (current → proposed)

| Element | Current | Proposed |
| --- | --- | --- |
| Heading | "Choose Your Move" + "Write Your Skill" (2 slides) | "Build It" (1 slide) |
| Intro | "Think of one thing you do as an instructor that the model should learn to do. Which of these is closest to the skill you want to build?" | "Pick a move, then write the skill." |
| Card descriptions (per card, 2 lines→1) | "Feedback on Writing / Quote a passage, name what you notice, ask a question" | "Writing Feedback" (label only; examples already covered in Part I) |
| Step instructions (4 cards with paragraphs) | 4 separate step-reveal cards each with h4 + paragraph | 4-item numbered checklist |

---

## Additional tightening (no collapse)

| Slide | Current | Proposed |
| --- | --- | --- |
| 25 (Where Skills Live) | Tip-box restates the two cards above it | Remove tip-box |
| 31 (Add Skill) | "Open your model card in Workspace → Models. Paste the skill at the end of your system prompt, after a blank line. Save." | "Paste into your system prompt at Workspace → Models." |
| 31 (Add Skill) | "Save your skill as a .txt file (e.g., feedback-skill.txt). Upload it to your knowledge collection in Workspace → Knowledge." | "Save as .txt and upload to Workspace → Knowledge." |
| 31 (Add Skill) | Iteration tip in separate step-reveal box | Move inline: "If the model skips steps, add wait points. If it dumps everything, add 'one per turn.'" |

---

## Summary

```
BEFORE → AFTER

  Slides 17-21  (5 slides: anatomy + 4 components)  →  2 slides
  Slides 23-24  (2 slides: ideas + pitfalls)         →  1 slide
  Slides 29-30  (2 slides: choose + write)           →  1 slide
                                                     ─────────
                                             Total:  -5 slides (32 → 27)

  Bullet reductions:  6 lists of 3 → 2 items each
  Copy savings:       ~40% fewer words across collapsed slides
```
