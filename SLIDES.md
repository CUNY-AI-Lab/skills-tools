# Customizing Skills & Tools -- Slide Deck Content

> CUNY AI Lab Sandbox Workshop (28 slides)
> Source: `index.html`

---

## Slide 1 -- Title (`title-slide`)

**Customizing Skills & Tools**
A Workshop for the CUNY AI Lab Sandbox
March 30, 2026
Developed by Stefano Morello and Zach Muhlbauer

---

## Slide 2 -- Workshop Roadmap (`layout-full-dark`)

**Three Weeks, Three Skills**

| Date | Session | Description |
|------|---------|-------------|
| March 16 | Composing System Prompts ✓ | Defined how the AI thinks, responds, and engages with students |
| March 23 | Curating Knowledge Collections ✓ | Grounded the model in course materials so it can reference real documents |
| March 30 (This Week) | Customizing Skills & Tools | Build specialized skills, tools, and workflows tailored to your courses |

---

## Slide 3 -- Pre-Flight (`layout-content`, centered, step-reveal 1–3)

**Label:** Quick Check

Verify your setup, then identify the move you'll build today.

1. **System Prompt** -- What role and constraints did you set? Have you revised or tested it?
2. **Knowledge Collection** -- Is it attached? Does the model draw on it when you test?
3. **Name One Pedagogical Move** -- A move with a repeatable structure: *quote a passage, ask a question, narrow focus, repeat.*

---

## Slide 4 -- What Is a Skill? (`layout-split`)

**Label:** The Basics

A **skill** is a structured procedure you write in plain language -- no code. It tells the model how to handle a task your system prompt can't cover on its own.

> Think of it as a **recipe** for a move you'd make as an instructor -- establishing stasis, sourcing a document, reading a cinematic frame -- written so the model executes it consistently.

**Key distinction:** The system prompt sets general behavior. A skill decomposes a *specific* task into steps the model won't follow unprompted.

**Stage:** Theater diagram showing three layers (System Prompt + Knowledge + Skill) behind the curtain, student interaction below

---

## Slide 5 -- Why Skills Matter (`layout-content`)

**Label:** Why Bother?

A student types: "I want to write about social media and mental health."

**Without a Skill** *(appears first)*
"That's a great topic! You could narrow it by focusing on a specific platform, age group, or type of mental health impact. Consider looking at recent studies on Instagram and anxiety, or TikTok and body image. You'll also want a clear thesis statement."
*Lists options instead of asking questions. The student still has no method for choosing among them.*

**With a Stasis Theory Skill** *(revealed on next advance)*
"Your topic: social media and mental health. Let's start with the facts. What specific situation are you responding to -- something you've read, noticed, or experienced? What has happened that makes this a question worth asking right now?"
*Opens with one stasis question (conjecture), grounded in the student's own words. The skill told the model how to narrow, not just to narrow.*

---

## Slide 6 -- The Gap Skills Fill (`layout-split`)

**Label:** The Problem

Models can do many things, but not unless you spell it out. Certain moves need a **step-by-step recipe** to work consistently.

What models won't do without a skill:
- Walk through stasis theory one question at a time
- Quote a passage from an uploaded source before asking a question
- Ask *one* focused question instead of listing five
- Build on what the student just said
- Scaffold from description to analysis to interpretation

**Stage:** Diagram showing System Prompt Alone (knows *what*, not *how*) → System Prompt + Skill (knows *what* and *how*)

---

## Slide 7 -- Section Divider: Example 1 (`layout-divider`)

**Section label:** Example 1
Establishing Stasis
Composition -- Stasis Theory

---

## Slide 8 -- Composition: Instruction (`layout-content`)

**Label:** Composition & Writing (progression: 1 of 2)

**Starting Point:** `When a student is developing a research topic, walk them through four stages -- conjecture, definition, quality, and policy -- to help them narrow their question. Ask one stasis at a time.`

What's missing *(step-reveal)*:
1. Model walks through all four stages in a single response instead of pausing at each
2. No procedure for connecting the student's working topic to each stasis question
3. Treats stasis as a checklist rather than a deliberative process
4. No mechanism to let the student reformulate before moving on
5. Skips the key move: helping the student see which stasis their argument lives in

---

## Slide 9 -- A Skill That Establishes Stasis (`layout-content`)

**Label:** Composition & Writing (progression: 2 of 2)

**Skill: Establishing Stasis for a Research Topic**

Procedure:
1. Ask the student to state their topic in one sentence. Do not evaluate or refine it yet.
2. Conjecture: "What has happened or is happening that makes this worth investigating?" Wait. Use what they say to sharpen the next question.
3. Definition: Point to a key term in their response. "How are you defining [term]? What kind of problem is this -- legal, ethical, empirical, cultural?" Wait.
4. Quality: "What's at stake, and for whom?" If scope is too broad, ask them to name one specific population or context. Wait.
5. Policy: "What should be done, and by whom?" Help the student see whether their argument is factual, definitional, evaluative, or policy-based.
6. Ask: "Which of these four questions does your argument most need to answer?" Guide toward a thesis grounded in that stasis.

Format:
Your topic: [student's stated topic]
[One stasis question, tied to a specific phrase the student used]
[1-2 sentences explaining why this question matters for their project]

---

## Slide 10 -- Section Divider: History (`layout-divider`)

**Section label:** Example 2
Sourcing a Document
History -- The Sourcing Heuristic

---

## Slide 11 -- History: Instruction (`layout-content`)

**Label:** History (progression: 1 of 2)

**Starting Point:** `When a student asks about a primary source, retrieve it from the knowledge collection and walk them through its rhetorical situation using SOAPS. Ask questions one element at a time rather than summarizing.`

What's missing *(step-reveal)*:
1. Model paraphrases the source instead of quoting from the uploaded document
2. No procedure for retrieving and presenting specific passages as evidence
3. Rushes through all SOAPS dimensions in a single response
4. Student receives a finished reading rather than a structured inquiry
5. No requirement to ground each analytical move in the source's own language

---

## Slide 12 -- A Skill That Helps Vet a Source (`layout-content`)

**Label:** History (progression: 2 of 2)

**Skill: Sourcing a Primary Document**

Procedure:
1. Retrieve the document from the knowledge collection. Quote a key passage -- do not paraphrase.
2. Present the passage in a block quote with metadata (title, date, author).
3. Ask: "Who created this document, and what was their position or stake?" Wait.
4. Point to a *specific phrase* in the passage that supports, complicates, or challenges their answer.
5. Ask: "When and where was this written? What was happening that shaped what the author could say?" Wait.
6. Ask: "Who was the intended audience? How does that change what the document means?" Wait.
7. Ask: "Given what you now know about the author, the moment, and the audience -- what can this source tell us, and what can't it?"

---

## Slide 13 -- Section Divider: Literature (`layout-divider`)

**Section label:** Example 3
Reading the Frame
Literature -- Cinematic Mise-en-Scène

---

## Slide 14 -- Literature: Instruction (`layout-content`)

**Label:** Literature & Cultural Studies (progression: 1 of 2)

**Starting Point:** `When a student shares a film still or visual artifact, guide them from describing formal elements -- composition, lighting, framing -- toward interpreting how those choices construct meaning in context.`

What's missing *(step-reveal)*:
1. Model describes the image for the student instead of directing their attention
2. No scaffolding from observation to formal analysis to interpretive claim
3. Treats all visual elements at once rather than isolating one per turn
4. No mechanism to keep the student doing the looking and the arguing
5. Skips the gap between "what's in the frame" and "what argument it makes"

---

## Slide 15 -- A Skill That Reads the Frame (`layout-content`)

**Label:** Literature & Cultural Studies (progression: 2 of 2)

**Skill: Reading Cinematic Images**

Procedure:
1. If the student uploaded an image, use it directly. If they reference a visual from the course, retrieve it from the knowledge collection. If not in the collection, say so.
2. Ask: "What do you notice first?" Let the student describe before you respond.
3. Direct attention to one formal element they haven't mentioned -- composition, lighting, color, framing, depth of field, or gaze. Ask what it does.
4. Ask how that formal choice shapes the viewer's experience. Move from *what* to *how*.
5. Ask the student to connect the visual choices to the cultural moment, genre, or argument. If relevant context exists in the knowledge collection, quote it.
6. Guide toward an interpretive claim: "Based on what you've observed, what argument is this image making?"

Framework: Description → Analysis → Interpretation

---

## Slide 16 -- Section Divider: Building Blocks (`layout-divider`)

**Section label:** Building Blocks
Writing Your Own Skills

---

## Slide 17 -- Anatomy of a Skill (`layout-content`, centered)

**Label:** Structure

Every skill has three parts.

1. **Trigger** -- When should this skill activate?
2. **Procedure** -- What steps does the model follow, in order?
3. **Format** -- What should the output look like?

---

## Slide 18 -- Component 1: Trigger (`layout-split`)

Define when this skill should activate.

- What student action starts this workflow?
- Does it activate when they share a draft? Ask about a source? Upload an image?
- Should it run automatically, or only when the student asks?

Template with copy button.

---

## Slide 19 -- Component 2: Procedure (`layout-split`)

The core of every skill. Numbered steps that tell the model what to do, in what order, and when to wait.

- What should happen first? What comes next?
- Where should the model wait for the student before continuing?
- Should it quote, cite, or reference specific materials?

Template with copy button.

---

## Slide 20 -- Component 3: Format (`layout-split`)

Specify what the output should look like. Without a format, the model structures responses however it wants.

- Should the model quote the student's text?
- Should each response end with a question?
- How long should a response be?

Template with copy button.

---

---

## Slide 22 -- Section Divider: Integration (`layout-divider`)

**Section label:** Integration
Skills & Tools

---

## Slide 23 -- Activating Skills (`layout-content`)

**Label:** Skills in Open WebUI

A skill is worth making when the move has a **repeatable structure** -- trigger, steps, output shape -- that you want the model to follow every time.

- **Toggle in the Model Card** -- Open **Workspace → Models**, find your model, and toggle the skill on. It activates automatically in every chat with that model.
- **Paste at End of System Prompt** -- Copy the skill text and append it to your system prompt. Best when you want a single, always-active workflow.

**Signpost the trigger:** Start your skill with a clear trigger line so the model knows exactly when to activate it -- and so you can tell at a glance which move each skill handles.

---

## Slide 24 -- Skills vs. Tools (`layout-split`)

**Label:** Tools in Open WebUI

A **skill** is a document you write in markdown or plain text, whereas a **tool** is code -- a function the model calls to do something it can't do with language alone.

- **Per Chat:** Click **+** in the message bar to toggle individual tools on for that conversation.
- **Per Model:** Attach tools permanently in **Workspace → Models → Tools**.

**Caveat:** Smaller models (e.g. Gemma 3 27B) call tools inconsistently. Use Kimi K2.5 or GLM 5 for reliable tool use.

**Stage:** Skill (plain text) vs. Tool (code) diagram + 2×2 grid of built-in tools (Web Search, Knowledge Query, Code Execution, Image Generation)

---

## Slide 25 -- Section Divider: Hands-On (`layout-divider`)

**Section label:** Hands-On
Write Your First Skill
Pick one pedagogical move from your course and turn it into a step-by-step recipe.

---

## Slide 26 -- Choose Your Move (`layout-content`, centered)

**Label:** Exercise

Which is closest to the skill you want to build?

- **Establishing Stasis** -- Narrow a research topic one question at a time
- **Sourcing a Document** -- Quote, then ask who, when, for whom
- **Reading the Frame** -- Describe → analyze → interpret
- **Something Else** -- Any repeatable pedagogical move

---

## Slide 27 -- Write Your Skill (`layout-split`)

**Label:** Draft It

Use the four-part structure to write a skill for the move you chose.

1. **Trigger** *(step-reveal)*
2. **Procedure** *(step-reveal)*
3. **Format** *(step-reveal)*

Full template with copy button.

---

## Slide 28 -- Add Your Skill (`layout-split`)

**Label:** Integrate It

Connect the skill you wrote to the model you built in the previous workshops.

1. **Paste into System Prompt** -- Workspace → Models. Add the skill at the end of your system prompt. Save.
2. **Or upload as .txt** -- Save the skill as a `.txt` file. Upload to Workspace → Knowledge.

*(step-reveal:)*
- **Test It** -- Open a new chat. Trigger the skill with realistic student input. Does it follow the procedure?
- **Iterate:** If the model skips steps, add wait points. If it dumps everything, add "one per turn."

**Stage:** Three layers (System Prompt + Knowledge Collection + Your Skill) → Your Complete AI Tool (Directive + sources + workflows)

---

## Slide 29 -- Workshop Complete (`layout-full-dark closing-slide`)

| Date | Session | Description |
|------|---------|-------------|
| March 16 | System Prompts ✓ | Role, constraints, tone |
| March 23 | Knowledge Collections ✓ | Grounded in your materials |
| March 30 (Today) | Skills & Tools ✓ | Step-by-step workflows |

You now have a custom AI tool with three modular layers that can be tested as a configuration and refined iteratively.
That way, you can see what each component contributes and where to focus before you introduce it in the classroom.

ailab.gc.cuny.edu
