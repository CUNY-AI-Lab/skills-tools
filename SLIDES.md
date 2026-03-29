# Customizing Skills & Tools -- Slide Deck Content

> CUNY AI Lab Sandbox Workshop (32 slides)
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

## Slide 3 -- Before We Build (`layout-split`, step-reveal 1–3)

**Label:** Quick Check

Verify your setup, then identify the move you'll build today.

**Step 1:** System Prompt -- Open your model. Can you identify the role it plays, the constraints you set, and how it addresses students?

**Step 2:** Knowledge Collection -- Is a collection attached? Does your system prompt tell the model when and how to reference it?

**Step 3:** Name One Move -- Think of a specific sequence you'd want the model to follow -- not "help with writing" but something like: *read the student's sentence, identify one issue, ask a question, wait.*

> Hold onto that move. As we look at examples today, notice how each one breaks a procedure into explicit steps the model repeats with every student.

**Stage:** Vertical stack of three flow nodes (System Prompt ✓ → Knowledge Collection ✓ → Your Skill [Today badge]), each synced with corresponding step reveal.

---

## Slide 4 -- What Is a Skill? (`layout-split`)

**Label:** The Basics

A **skill** is a plain-text markdown document that teaches the model how to navigate a specific task. When activated, it injects detailed instructions into the system prompt that the model follows in context.

> Think of it as a **recipe**: a step-by-step procedure for a move you'd make as an instructor -- establishing stasis, sourcing a document, reading a cinematic frame -- written so the model can execute it consistently.

**Key distinction:** The system prompt sets general behavior. A skill decomposes a *specific* task into steps the model won't follow unprompted.

**Stage:** Theater diagram showing three layers (System Prompt + Knowledge + Skill) behind the curtain, student interaction below

---

## Slide 5 -- Why Skills Matter (`layout-content`)

**Label:** Why Bother?

Your system prompt says "help students develop research topics." A student types: "I want to write about social media and mental health."

**Without a Skill** *(appears first)*
"That's a great topic! You could narrow it by focusing on a specific platform, age group, or type of mental health impact. Consider looking at recent studies on Instagram and anxiety, or TikTok and body image. You'll also want a clear thesis statement."
*Lists options instead of asking questions. The student still has no method for choosing among them.*

**With a Stasis Theory Skill** *(revealed on next advance)*
"Your topic: social media and mental health. Let's start with the facts. What specific situation are you responding to -- something you've read, noticed, or experienced? What has happened that makes this a question worth asking right now?"
*Opens with one stasis question (conjecture), grounded in the student's own words. The skill told the model how to narrow, not just to narrow.*

---

## Slide 6 -- The Gap Skills Fill (`layout-split`)

**Label:** The Problem

Models can do many things well -- but they don't do them *unless you explicitly instruct them to*. A system prompt tells the model what kind of tool it is. But certain moves require a **plan, formula, or recipe** to execute consistently.

What models won't do without a skill:
- Walk a student through stasis theory one question at a time, narrowing with each turn
- Quote a specific passage from an uploaded source before asking an analytical question
- Ask *one* focused question instead of listing five observations
- Build on what the student just said rather than repeating a generic prompt
- Scaffold from description to analysis to interpretation across multiple turns

**Stage:** Diagram showing System Prompt Alone ("Help students develop research topics" / knows *what*, not *how*) → System Prompt + Skill ("Ask one stasis question, build on the student's last answer" / knows *what* and *how*)

---

## Slide 7 -- Section Divider: Composition (`layout-divider`)

**Section label:** Part I: Example 1
Establishing Stasis
Composition -- Stasis Theory

---

## Slide 8 -- Composition: Instruction (`layout-content`)

**Label:** Composition & Writing (progression: 1 of 2)

**Starting Point:** `When a student is developing a research topic, walk them through the four stases -- conjecture, definition, quality, and policy -- to help them narrow their question. Ask one stasis at a time.`

What's missing *(step-reveal)*:
1. Model walks through all four stases in a single response instead of pausing at each
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
2. Conjecture: "What has happened or is happening that makes this worth investigating?" Wait for their answer. Use what they say to sharpen the next question.
3. Definition: Point to a key term in their response. "How are you defining [term]? What kind of problem is this -- legal, ethical, empirical, cultural?" Wait.
4. Quality: "What's at stake, and for whom? What makes this serious enough to argue about in an 8-page paper?" If their scope is too broad, ask them to name one specific population or context. Wait.
5. Policy: "What should be done, and by whom?" Help the student see whether their argument is making a factual claim, a definitional claim, a value judgment, or a policy proposal.
6. Ask: "Which of these four questions does your argument most need to answer?" Guide them toward a thesis grounded in that stasis.

Format:
Your topic: [student's stated topic]
[One stasis question, tied to a specific phrase the student used]
[1-2 sentences explaining why this question matters for their project]

Constraints:
- One stasis per turn. Do not list all four at once.
- Never rewrite the student's topic. Ask questions that help them rewrite it themselves.
- Each question must build on a specific distinction or clarification the student made in their previous response -- do not repeat generic stasis prompts.
- If the student says "I don't know," point them back to a phrase from their earlier response and ask what it assumes.
- After all four stases, always ask the student to choose which stasis their argument lives in -- do not choose for them.

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

## Slide 12 -- A Skill That Sources a Document (`layout-content`)

**Label:** History (progression: 2 of 2)

**Skill: Sourcing a Primary Document**

Procedure:
1. Retrieve the document from the knowledge collection. Quote a key passage -- do not paraphrase or summarize.
2. Present the passage in a block quote with its metadata (title, date, author) drawn from the uploaded file.
3. Ask: "Who created this document, and what was their position or stake?" Wait for the student's answer.
4. After they respond, point to a *specific phrase* in the quoted passage that supports, complicates, or challenges their answer.
5. Ask: "When and where was this written? What was happening at that moment that shaped what the author could say?" Wait.
6. Ask: "Who was the intended audience? How does knowing that change what the document means?" Wait.
7. After all three sourcing moves, ask: "Given what you now know about the author, the moment, and the audience -- what can this source tell us, and what can't it?"

Format:
> [quoted passage from uploaded source]
-- [Author], [Title], [Date]
[One sourcing question]
[1-2 sentences connecting the question to a specific phrase in the passage]

Constraints:
- Always quote from the uploaded source. Never paraphrase a primary document.
- Never offer an interpretation before the student has attempted one.
- If the source is not in the knowledge collection, say so. Do not invent content.
- One question per turn. Do not front-load multiple sourcing questions.
- Each question must build on the student's previous answer -- do not repeat generic prompts.

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
1. If the student uploaded an image, use it directly. If they reference a visual from the course, retrieve it from the knowledge collection and present it. If the image is not in the collection, say so.
2. Ask: "What do you notice first?" Let the student describe before you respond.
3. After their description, direct attention to one formal element they haven't mentioned -- composition, lighting, color, framing, depth of field, or gaze. Ask what it does.
4. Ask how that formal choice shapes the viewer's experience. Move from *what* is in the frame to *how* the image is constructed.
5. Introduce context: ask the student to connect the visual choices to the cultural moment, genre, or argument of the work. If relevant context exists in the knowledge collection, quote it.
6. Guide them toward an interpretive claim: "Based on what you've observed, what argument is this image making?"

Framework: Description → Analysis → Interpretation
- Description: What is literally in the frame?
- Analysis: How do formal elements (light, angle, placement) create meaning?
- Interpretation: What claim can the student make, grounded in visual evidence?

Constraints:
- Never describe the image for the student. Ask them to describe it first.
- One formal element per turn. Do not list all elements at once.
- If the student jumps to interpretation before describing, redirect: "What specific visual detail supports that reading?"
- When drawing on knowledge collection materials for context, quote the relevant passage -- do not paraphrase.

---

## Slide 16 -- Section Divider: Building Blocks (`layout-divider`)

**Section label:** Part II
Building Your Own Skills

---

## Slide 17 -- Anatomy of a Skill (`layout-content`)

**Label:** Structure

Every skill follows the same basic structure. We'll write yours one piece at a time.

1. **Trigger** -- When should this skill activate?
2. **Procedure** -- What steps does the model follow, in order?
3. **Format** -- What should the output look like?
4. **Constraints** -- What should the model never do within this skill?

---

## Slide 18 -- Component 1: Trigger (`layout-split`)

Define when this skill should activate. A clear trigger keeps the model from applying the wrong procedure to the wrong task.

- What student action starts this workflow?
- Does it activate when they share a draft? Ask about a source? Upload an image?
- Should it run automatically, or only when the student asks?

Template:
```
Skill: [Skill Name]
When a student [specific action or input], follow this procedure:
```

---

## Slide 19 -- Component 2: Procedure (`layout-split`)

The core of every skill. Numbered steps that tell the model exactly what to do, in what order. This is what turns a vague instruction into a reliable workflow.

- What should happen first? What comes next?
- Where should the model wait for the student before continuing?
- Should it quote, cite, or reference specific materials?

Template:
```
Procedure:
1. [First step -- what does the model do or ask?]
2. [After the student responds, what comes next?]
3. [Continue the sequence -- include wait points]
4. [Final step -- synthesis, next action, or handoff]
```

---

## Slide 20 -- Component 3: Format (`layout-split`)

Specify what the output should look like. Format instructions are what make the model quote student writing in block quotes, respond underneath, or keep responses to one question at a time.

- Should the model quote the student's text?
- Should each response end with a question?
- How long should a response be?

Template:
```
Format:
> [quoted excerpt from student work or source document]

[1-2 sentences: what you observe]
[One question for the student]
```

---

## Slide 21 -- Component 4: Constraints (`layout-split`)

What should the model *never* do within this skill? Skill-level constraints are more specific than system-prompt constraints. They address the particular ways this workflow could go wrong.

- What shortcut will the model take if you don't prevent it?
- How should it redirect when students push back?
- Should it limit itself to one question or one observation per turn?

Template:
```
Constraints:
- Never [specific shortcut to prevent].
- One [question / observation / element] per turn.
- If the student [common deflection], redirect by [specific alternative].
- Always [quote / cite / reference] from [source type] before responding.
```

---

## Slide 22 -- Section Divider: Strategies (`layout-divider`)

**Section label:** Part III
Strategies & Pitfalls

---

## Slide 23 -- Skills Worth Building (`layout-grid`)

- **Excerpt-and-Respond Feedback:** Quote a passage from the student's draft in a block quote. Name one observation directly below it. Ask one question. Stop.
- **Source-Grounded Q&A:** When a student asks a question answerable from the knowledge collection, retrieve and quote the relevant passage before responding. Cite the document by name.
- **Rubric Walk-Through:** Walk the student through one rubric criterion at a time. For each, quote the criterion, ask the student to evaluate their own work against it, and discuss before moving on.
- **One-Question Concision:** Respond with a single focused question. No preamble, no list of observations. If the model would normally say five things, force it to choose the one that matters most.

---

## Slide 24 -- Common Pitfalls (`layout-content`)

**Label:** Watch Out

- **Putting Everything in the System Prompt:** A 2,000-word system prompt with five embedded procedures confuses the model. Decompose workflows into separate skills. The system prompt sets identity; skills handle specific tasks.
- **Skipping the Format:** Without a format spec, the model defaults to its own structure -- usually a long paragraph or numbered list. If you want "quote then respond," you have to spell it out.
- **No Wait Points:** If your procedure has five steps, the model may execute all five in one response. Explicit "Stop. Wait for the student to respond" instructions force turn-taking.
- **Forgetting the Knowledge Collection:** Skills that reference course materials need explicit instructions to retrieve and quote from the knowledge collection. Without them, the model draws on its own training instead of your documents.

---

## Slide 25 -- Where Skills Live (`layout-split`)

**Label:** Integration

Two options:
- **Option 1: Append to System Prompt** -- Add the skill directly to the end of your system prompt in the model card. Best for a single, always-active workflow.
- **Option 2: Knowledge Collection Document** -- Save the skill as a `.txt` file and upload it to your knowledge collection. Best for multiple skills the model can retrieve as needed.

**Key principle:** If the model should *always* follow the skill, put it in the system prompt. If it should follow the skill only when relevant, put it in the knowledge collection where retrieval handles the routing.

**Stage:** Diagram showing "Always Active" (skill appended to system prompt) vs. "Retrieved When Needed" (skill saved as .txt in knowledge collection)

---

## Slide 26 -- Tools: Instruction (`layout-content`)

**Label:** Tools in Open WebUI (progression: 1 of 2)

**Starting Point:** `Enable web search and knowledge query on your model so it can look things up during a conversation. Turn on tools in the model settings or per chat.`

What's missing *(step-reveal)*:
1. No distinction between skills (plain text you write) and tools (code the model calls)
2. Doesn't specify *which* tools to enable or why -- turning everything on adds noise
3. No guidance on model selection: smaller models (e.g. Gemma 3 27B) handle tool calling inconsistently
4. No connection between tools and the skill that should use them
5. Student-facing behavior unchanged -- enabling a tool doesn't mean the model knows when to use it

---

## Slide 27 -- Skills vs. Tools (`layout-split`)

**Label:** Tools in Open WebUI (progression: 2 of 2)

A **skill** is a plain-text markdown document you write. A **tool** is code -- a function the model calls to do something it can't do with language alone.

**Per Chat:** Click **+** in the message bar and toggle tools on. Good for experimenting.
**Per Model:** **Workspace → Models → Tools**. Every conversation with that model gets access.

**Caveat:** Smaller models (e.g. Gemma 3 27B) handle tool calling inconsistently. Use a larger model like Kimi K2.5 or GLM 5 for reliable tool use.

**Stage:** Skill (plain text) vs. Tool (code) diagram + 2×2 grid of built-in tools:
- **Web Search** -- Current information beyond your uploads
- **Knowledge Query** -- Search uploaded files by content
- **Code Execution** -- Run code in a sandbox
- **Image Generation** -- Create images from descriptions

---

## Slide 28 -- Section Divider: Hands-On (`layout-divider`)

**Section label:** Part V
Write Your First Skill
Pick one pedagogical move from your course and turn it into a step-by-step recipe.

---

## Slide 29 -- Choose Your Move (`layout-content`)

**Label:** Exercise

Think of one thing you do as an instructor that the model should learn to do. Which of these is closest to the skill you want to build?

- Feedback on Writing
- Source Analysis
- Visual / Image Reading
- Something Else

---

## Slide 30 -- Write Your Skill (`layout-split`)

**Label:** Draft It

Use the four-part structure to write a skill for the move you chose.

1. **Trigger** -- When does this skill activate? *(step-reveal)*
2. **Procedure** -- Write 3-5 numbered steps. Include wait points. *(step-reveal)*
3. **Format** -- What should each response look like? *(step-reveal)*
4. **Constraints** -- What should the model never do? *(step-reveal)*

Full template provided with copy button.

---

## Slide 31 -- Add Your Skill (`layout-split`)

**Label:** Integrate It

Now connect your skill to the model you built in the previous workshops.

- **Option A: Append to System Prompt** -- Open your model card in Workspace → Models. Paste the skill at the end of your system prompt. Save. *(step-reveal)*
- **Option B: Upload to Knowledge Collection** -- Save your skill as a `.txt` file. Upload to Workspace → Knowledge. *(step-reveal)*
- **Test it** -- Open a new chat. Trigger the skill with a realistic student input. Does it follow the procedure? *(step-reveal)*
- **Iterate:** If the model skips steps, add "Stop. Wait for the student." If it dumps everything at once, add "One [X] per turn." *(step-reveal)*

**Stage:** Diagram showing all three layers (System Prompt + Knowledge Collection + Your Skill) stacking into "Your Complete AI Tool"

---

## Slide 32 -- Workshop Complete (`layout-full-dark closing-slide`)

**Label:** Workshop Complete

| Date | Session | Description |
|------|---------|-------------|
| March 16 | System Prompts ✓ | Defined how the model responds and scaffolds learning |
| March 23 | Knowledge Collections ✓ | Grounded the model in your course materials |
| March 30 (Today) | Skills & Tools ✓ | Added step-by-step workflows for specific pedagogical moves |

You now have a custom AI tool with three layers: a system prompt that defines its behavior, a knowledge collection that grounds it in your materials, and skills that teach it the specific moves you make as an instructor. Keep testing, keep iterating, and keep building.

ailab.gc.cuny.edu
