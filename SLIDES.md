# Customizing Skills & Tools -- Slide Deck Content

> CUNY AI Lab Sandbox Workshop
> Source: `index.html`

---

## Slide 1 -- Title (`title-slide`)

**Customizing Skills & Tools**
A Workshop for the CUNY AI Lab Sandbox
March 30, 2026

---

## Slide 2 -- Workshop Roadmap (`layout-full-dark`)

**Three Weeks, Three Skills**

| Date | Session | Description |
|------|---------|-------------|
| March 16 | Composing System Prompts &#10003; | Defined how the AI thinks, responds, and engages with students |
| March 23 | Curating Knowledge Collections &#10003; | Grounded the model in course materials so it can reference real documents |
| March 30 (This Week) | Customizing Skills & Tools | Build specialized skills, tools, and workflows tailored to your courses |

---

## Slide 3 -- What You've Built So Far (`layout-content`)

**Where We Are**

Over the last two workshops, you assembled two layers of a custom AI tool. Today you add the third.

1. **System Prompt** -- Tells the model how to behave: role, procedure, constraints, tone
2. **Knowledge Collection** -- Gives it something to draw on: syllabi, readings, rubrics
3. **Skills & Tools** -- Teaches it specific workflows: step-by-step recipes for the pedagogical moves you actually want

---

## Slide 4 -- What Is a Skill? (`layout-split`)

**Label:** The Basics

A **skill** is a structured procedure you write for a specific pedagogical task. It tells the model *exactly* how to handle a situation that a general system prompt can't cover on its own.

> Think of it as a **recipe**: a step-by-step set of instructions for a move you'd make as an instructor -- giving feedback on a draft, walking through a source, reading a visual artifact -- written so the model can follow it consistently.

**Key distinction:** The system prompt sets the model's general behavior. A skill decomposes a *specific* task into explicit steps the model wouldn't follow without being told.

**Stage:** Theater diagram showing three layers (System Prompt + Knowledge + Skill) behind the curtain, student interaction below

---

## Slide 5 -- Why Skills Matter (`layout-content`)

**Label:** Why Bother?

Your system prompt says "give feedback on student writing." A student submits a paragraph from their draft.

**Without a Skill** *(appears first)*
"Your paragraph has some good ideas but needs work. The thesis could be stronger, and you should add more evidence. Consider reorganizing the structure and checking for grammar issues. Also, make sure your citations are in the correct format."
*Vague, comprehensive, and unhelpful. Addresses everything at once without direction.*

**With a Feedback Skill** *(revealed on next advance)*
"You write: 'The author uses symbolism to show the complexity of identity.' I notice you're naming a technique (symbolism) but not yet showing how it works in the text. Which specific image or moment are you thinking of? Let's start there."
*Quotes the student's own words, names one issue, asks a question.*

---

## Slide 6 -- The Gap Skills Fill (`layout-split`)

**Label:** The Problem

Models can do many things well -- but they don't do them *unless you explicitly instruct them to*. A system prompt tells the model what kind of tool it is. But certain moves require a **plan, formula, or recipe** to execute consistently.

What models won't do without a skill:
- Quote a student's writing and respond below each excerpt
- Walk through a knowledge collection source step by step
- Ask *one* focused question instead of listing five observations
- Follow a rubric criterion by criterion, not all at once
- Read a cinematic image using a structured visual framework

**Stage:** Diagram showing System Prompt Alone ("knows what, not how") → System Prompt + Skill ("knows what and how")

---

## Slide 7 -- Section Divider: Composition (`layout-divider`)

**Section label:** Part I: Example 1
Targeted Writing Feedback
Composition & Writing

---

## Slide 8 -- Composition: The Vague Instruction (`layout-content`)

**Label:** Composition & Writing (progression: 1 of 3)

**Weak:** `Give helpful feedback on student writing.`

**What goes wrong?**
- Model dumps a laundry list of issues: thesis, evidence, grammar, citations -- all at once
- No procedure for *how* to engage with the student's actual text
- Student receives a wall of feedback with no clear next step

---

## Slide 9 -- Composition: Getting Warmer (`layout-content`)

**Label:** Composition & Writing (progression: 2 of 3)

**Getting There:** `When a student shares a draft, focus on one issue at a time. Quote specific passages and ask questions instead of giving answers. Keep responses concise.`

**What improved?**
- Asks for one issue at a time instead of everything at once
- Mentions quoting passages and asking questions
- Calls for concision

**What's still missing?**
- No step-by-step procedure: the model decides on its own how to structure the response
- No output format: the "quote then respond" move won't happen consistently
- No guidance on prioritizing higher-order concerns over surface-level fixes

---

## Slide 10 -- A Skill That Structures Feedback (`layout-content`)

**Label:** Composition & Writing (progression: 3 of 3)

**Skill: Targeted Writing Feedback**

Procedure:
1. Read the passage. Identify the single highest-priority issue -- argument, structure, or evidence before grammar or style.
2. Quote the specific sentence or phrase where the issue is most visible. Use a block quote.
3. Directly below the quote, name what you notice in 1-2 sentences.
4. Ask one question that helps the student rethink that moment. Do not suggest a fix.
5. Stop. Do not address additional issues until the student responds.

Format:
> [quoted excerpt from student draft]
[1-2 sentences naming what you observe]
[One question for the student]

Constraints:
- Never rewrite the student's sentence. Never offer alternative phrasing.
- If the student asks "is this good?" redirect: "What are you trying to accomplish in this paragraph?"
- If there are no higher-order concerns, then and only then address style or mechanics.

---

## Slide 11 -- Section Divider: History (`layout-divider`)

**Section label:** Example 2
Working with Sources
History & Primary Source Analysis

---

## Slide 12 -- History: The Vague Instruction (`layout-content`)

**Label:** History (progression: 1 of 3)

**Weak:** `Help students analyze the primary sources in the knowledge collection.`

**What goes wrong?**
- Model summarizes the source instead of guiding analysis
- No procedure for drawing on specific documents from the knowledge collection
- Student gets a finished interpretation rather than a thinking process

---

## Slide 13 -- History: Getting Warmer (`layout-content`)

**Label:** History (progression: 2 of 3)

**Getting There:** `When a student asks about a primary source, use the knowledge collection to find it. Walk them through the SOAPS framework. Ask questions instead of giving answers.`

**What improved?**
- References the knowledge collection explicitly
- Names a specific analytical framework
- Calls for questions over answers

**What's still missing?**
- No procedure for *how* to retrieve and present source passages
- No step-by-step sequence: model may rush through all five SOAPS questions at once
- No guidance on citing specific passages from uploaded documents as evidence

---

## Slide 14 -- A Skill That Guides Source Analysis (`layout-content`)

**Label:** History (progression: 3 of 3)

**Skill: Source Analysis with Knowledge Collection**

Procedure:
1. Retrieve the source from the knowledge collection. Quote the relevant passage -- do not paraphrase or summarize.
2. Present the passage in a block quote with its metadata (title, date, author) drawn from the uploaded file.
3. Ask the student one SOAPS question at a time, starting with Sourcing. Wait for their answer before moving to the next.
4. After the student responds, point them to a *specific phrase* in the quoted passage that supports, complicates, or challenges their answer.
5. Repeat for Occasion, Audience, Purpose, and Significance -- one at a time.
6. After all five, ask the student to synthesize: "What does the full picture reveal about this moment?"

Constraints:
- Always quote from the uploaded source. Never paraphrase a primary source document.
- Never offer an interpretation before the student has attempted one.
- If the source is not in the knowledge collection, say so. Do not invent content.
- One question per turn. Do not front-load multiple questions.

---

## Slide 15 -- Section Divider: Literature (`layout-divider`)

**Section label:** Example 3
Reading Visual Artifacts
Literature & Cultural Studies

---

## Slide 16 -- Literature: The Vague Instruction (`layout-content`)

**Label:** Literature & Cultural Studies (progression: 1 of 3)

**Weak:** `Help students analyze images and visual media.`

**What goes wrong?**
- Model describes what it sees rather than guiding the student to look
- No framework for visual analysis -- the model treats images like text to be summarized
- No connection between formal elements (composition, lighting, framing) and meaning

---

## Slide 17 -- Literature: Getting Warmer (`layout-content`)

**Label:** Literature & Cultural Studies (progression: 2 of 3)

**Getting There:** `When a student shares an image (a film still, photograph, or artwork), guide them through a visual analysis. Ask about composition, lighting, and framing. Connect these to the image's cultural context.`

**What improved?**
- Names specific visual categories to examine
- Distinguishes between formal elements and cultural meaning
- Implies a guided process rather than a dump of observations

**What's still missing?**
- No step-by-step procedure: the model may address all elements simultaneously
- No move from description to interpretation -- no scaffolding toward a claim
- No output format to keep the model from writing the analysis for the student

---

## Slide 18 -- A Skill That Teaches Visual Reading (`layout-content`)

**Label:** Literature & Cultural Studies (progression: 3 of 3)

**Skill: Reading Cinematic Images**

Procedure:
1. Ask: "What do you notice first?" Let the student describe before you respond.
2. After their description, direct attention to one formal element they haven't mentioned -- composition, lighting, color, framing, depth of field, or gaze. Ask what it does.
3. Ask how that formal choice shapes the viewer's experience. Move from *what* is in the frame to *how* the image is constructed.
4. Introduce context: ask the student to connect the visual choices to the cultural moment, genre, or argument of the work.
5. Guide them toward an interpretive claim: "Based on what you've observed, what argument is this image making?"

Framework: Description → Analysis → Interpretation
- Description: What is literally in the frame?
- Analysis: How do formal elements (light, angle, placement) create meaning?
- Interpretation: What claim can the student make, grounded in visual evidence?

Constraints:
- Never describe the image for the student. Ask them to describe it first.
- One formal element per turn. Do not list all elements at once.
- If the student jumps to interpretation before describing, redirect: "What specific visual detail supports that reading?"

---

## Slide 19 -- Section Divider: Building Blocks (`layout-divider`)

**Section label:** Part II
Building Your Own Skills

---

## Slide 20 -- Anatomy of a Skill (`layout-content`)

**Label:** Structure

Every skill follows the same basic structure. We'll write yours one piece at a time.

1. **Trigger** -- When should this skill activate?
2. **Procedure** -- What steps does the model follow, in order?
3. **Format** -- What should the output look like?
4. **Constraints** -- What should the model never do within this skill?

---

## Slide 21 -- Component 1: Trigger (`layout-split`)

Define when this skill should activate.

Template:
```
Skill: [Skill Name]
When a student [specific action or input], follow this procedure:
```

---

## Slide 22 -- Component 2: Procedure (`layout-split`)

The core of every skill. Numbered steps.

Template:
```
Procedure:
1. [First step -- what does the model do or ask?]
2. [After the student responds, what comes next?]
3. [Continue the sequence -- include wait points]
4. [Final step -- synthesis, next action, or handoff]
```

---

## Slide 23 -- Component 3: Format (`layout-split`)

Specify what the output should look like.

Template:
```
Format:
> [quoted excerpt from student work or source document]

[1-2 sentences: what you observe]
[One question for the student]
```

---

## Slide 24 -- Component 4: Constraints (`layout-split`)

What should the model never do within this skill?

Template:
```
Constraints:
- Never [specific shortcut to prevent].
- One [question / observation / element] per turn.
- If the student [common deflection], redirect by [specific alternative].
- Always [quote / cite / reference] from [source type] before responding.
```

---

## Slide 25 -- Section Divider: Strategies (`layout-divider`)

**Section label:** Part III
Strategies & Pitfalls

---

## Slide 26 -- Skills Worth Building (`layout-grid`)

- **Excerpt-and-Respond Feedback:** Quote a passage, name one observation, ask one question. Stop.
- **Source-Grounded Q&A:** Retrieve and quote from the knowledge collection before responding. Cite the document by name.
- **Rubric Walk-Through:** One criterion at a time. Quote it, ask the student to self-evaluate, discuss before moving on.
- **One-Question Concision:** Single focused question. No preamble, no list. Force the model to choose what matters most.

---

## Slide 27 -- Common Pitfalls (`layout-content`)

- **Putting Everything in the System Prompt:** Decompose workflows into separate skills. The system prompt sets identity; skills handle specific tasks.
- **Skipping the Format:** Without a format spec, the model defaults to its own structure. If you want "quote then respond," spell it out.
- **No Wait Points:** Explicit "Stop. Wait for the student to respond" instructions force turn-taking.
- **Forgetting the Knowledge Collection:** Skills that reference course materials need explicit instructions to retrieve and quote from the collection.

---

## Slide 28 -- Where Skills Live (`layout-split`)

**Label:** Integration

Two options:
- **Option 1: Append to System Prompt** -- Always-active workflow.
- **Option 2: Knowledge Collection Document** -- Retrieved when needed.

Key principle: If the model should *always* follow the skill, put it in the system prompt. If it should follow the skill only when relevant, put it in the knowledge collection.

---

## Slide 29 -- Section Divider: Hands-On (`layout-divider`)

**Section label:** Part IV
Write Your First Skill

---

## Slide 30 -- Choose Your Move (`layout-content`)

**Label:** Exercise

Pick one pedagogical move:
- Feedback on Writing
- Source Analysis
- Visual / Image Reading
- Something Else

---

## Slide 31 -- Write Your Skill (`layout-split`)

**Label:** Draft It

Use the four-part structure:
1. Trigger
2. Procedure
3. Format
4. Constraints

Full template provided with copy button.

---

## Slide 32 -- Add Your Skill (`layout-split`)

**Label:** Integrate It

- Option A: Append to System Prompt
- Option B: Upload to Knowledge Collection as .txt
- Test with realistic student input
- Iterate: add wait points, constrain output

**Stage:** Diagram showing all three layers stacking into "Your Complete AI Tool"

---

## Slide 33 -- Workshop Complete (`layout-full-dark closing-slide`)

**Label:** Workshop Complete

| Date | Session | Description |
|------|---------|-------------|
| March 16 | System Prompts &#10003; | Defined how the model responds and scaffolds learning |
| March 23 | Knowledge Collections &#10003; | Grounded the model in your course materials |
| March 30 (Today) | Skills & Tools &#10003; | Added step-by-step workflows for specific pedagogical moves |

You now have a custom AI tool with three layers: a system prompt that defines its behavior, a knowledge collection that grounds it in your materials, and skills that teach it the specific moves you make as an instructor.

ailab.gc.cuny.edu
