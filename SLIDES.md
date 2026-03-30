# Customizing Skills & Tools -- Slide Deck Content

> CUNY AI Lab Sandbox Workshop (28 slides)
> Source: `index.html`
> Note: listed in current source order.

---

## Slide 1 -- Title (`title-slide`)

**Customizing Skills & Tools**  
A Workshop for the CUNY AI Lab Sandbox  
March 30, 2026  
Developed by Stefano Morello and Zach Muhlbauer

---

## Slide 2 -- Workshop Roadmap (`layout-full-dark`)

**Label:** Workshop Series

**Three Weeks, Three Skills**

| Date | Session | Description |
|------|---------|-------------|
| March 16 | Composing System Prompts | Defined how the AI thinks, responds, and engages with students |
| March 23 | Curating Knowledge Collections | Grounded the model in course materials so it can reference real documents |
| March 30 (This Week) | Customizing Skills & Tools | Build specialized skills, tools, and workflows tailored to your courses |

Note: the first two session titles link to the published workshop decks.

---

## Slide 3 -- Pre-Flight (`layout-content`, centered, step-reveal 1-3)

**Label:** Quick Check

Verify your setup, then identify the move you'll build today.

1. **System Prompt** -- What role and constraints did you set? Have you revised or tested it?
2. **Knowledge Collection** -- Is it attached? Does the model draw on it when you test?
3. **Name One Pedagogical Move** -- Something you do as an instructor that follows a repeatable pattern.

Examples named on the slide:
- Narrowing a research topic one question at a time
- Walking a student through a source
- Guiding them from description to interpretation

Closing emphasis:
`Skills enable the model to mimic those moves.`

---

## Slide 4 -- What Is a Skill? (`layout-split`)

**Label:** The Basics

A **skill** is a structured procedure you write in markdown or plain text. It tells the model how to handle a task your system prompt can't cover on its own.

> Think of it as a **recipe** for a move you'd make as an instructor -- establishing stasis, sourcing a document, reading a cinematic frame -- written so the model executes it consistently.

**Key distinction:** The system prompt sets general behavior. A skill decomposes a *specific* task into steps the model won't follow unprompted.

Visual:
- Theater diagram with three backstage layers: System Prompt, Knowledge, Skill
- Curtain labeled `student never sees above`
- Frontstage conversation between Student and AI Model
- Captioning contrasts `What you build` with `What the student sees`

---

## Slide 5 -- Activating Skills (`layout-split`)

**Label:** Skills in Open WebUI

A skill is worth making when the move has a **repeatable structure** -- trigger, steps, output shape -- that you want the model to follow every time.

1. **Create the skill** -- Go to **Workspace -> Skills** and click **+ New Skill**. Write or paste your skill text.
2. **Add it to your model** -- Open your model card in **Workspace -> Models**. Scroll to the **Skills** section and toggle the skill on.
3. **Alternative: Paste into System Prompt** -- You *can* append skill text directly to your system prompt, but this crowds the prompt and makes it harder to maintain.

Visual:
- Carousel step 1: Workspace -> Skills screen with the New Skill button
- Carousel step 2: Workspace -> Models screen with custom models
- Carousel step 3: model card editor showing the Skills toggle

---

## Slide 6 -- Why Skills Matter (`layout-content`)

**Label:** Why Bother?

A student types: `"I want to write about social media and mental health."`

**Without a Skill** *(shown first)*  
"That's a great topic! You could narrow it by focusing on a specific platform, age group, or type of mental health impact. Consider looking at recent studies on Instagram and anxiety, or TikTok and body image. You'll also want a clear thesis statement."

Takeaway: lists options instead of asking questions. The student still has no method for choosing among them.

**With a Stasis Theory Skill** *(revealed next)*  
"Your topic: social media and mental health. Let's start with the facts. What specific situation are you responding to -- something you've read, noticed, or experienced? What has happened that makes this a question worth asking right now?"

Takeaway: opens with one stasis question, grounded in the student's own words. The skill tells the model *how* to narrow, not just to narrow.

---

## Slide 7 -- The Gap Skills Fill (`layout-split`)

**Label:** The Problem

Models can do many things, but not unless you spell it out. Certain moves need a **step-by-step recipe** to work consistently.

What models won't do without a skill:
- Walk through stasis theory one question at a time
- Quote a passage from an uploaded source before asking a question
- Ask *one* focused question instead of listing five
- Build on what the student just said
- Scaffold from description to analysis to interpretation

Visual:
- `System Prompt Alone` -> model knows *what* to do, not *how*
- `System Prompt + Skill` -> model knows *what* and *how*

---

## Slide 8 -- What Is a Tool? (`layout-split`)

**Label:** Tools in Open WebUI

A **tool** is a function the model can call to do something it can't do with language alone -- search the web, query your uploaded files, run code, or generate an image.

Some tools are **built in** (Web Search, Code Interpreter). Others are **custom**: written in Python or imported from the community library via **Workspace -> Tools**.

You can enable tools two ways:
1. **Per Chat** -- Click the controls icon next to the message bar to open the tools menu and toggle individual tools on for that conversation.
2. **Per Model** -- Open your model card in **Workspace -> Models** and scroll to the **Tools** section to attach custom tools permanently.

**Caveat:** Smaller models (for example Gemma 3 27B) call tools inconsistently. Use Kimi K2.5 or GLM 5 for reliable tool use.

Visual:
- Carousel: per-chat tools menu
- Carousel: Workspace -> Models
- Carousel: model card editor highlighting Capabilities and Tools

---

## Slide 9 -- Skills vs. Tools (`layout-split`)

**Label:** The Difference

A **skill** is a document you write in plain text: a procedure the model follows. A **tool** is code: a function the model calls. Both extend what your custom model can do, but they work differently.

**Skill**
- You write it
- Plain text, no code
- Tells the model *how* to handle a specific pedagogical move step by step

**Tool**
- Pre-built or imported
- Code that runs behind the scenes
- Gives the model abilities it doesn't have on its own, like searching the web or running a calculation

**Today's focus:** Skills. Tools are ready to use out of the box. Skills are what you build.

Built-in tools shown in the visual grid:
- Web Search -- current information
- Knowledge Query -- search uploaded files
- Code Execution -- run code in a sandbox
- Image Generation -- create from descriptions

---

## Slide 10 -- Section Divider: Example 1 (`layout-divider`)

**Section label:** Example 1  
**Title:** Establishing Stasis  
**Subtitle:** Composition -- Stasis Theory

---

## Slide 11 -- Composition: Before (`layout-content`)

**Label:** Composition & Writing  
**Progression:** before / starting point

**Starting Point**  
`When a student is developing a research topic, walk them through four stages -- conjecture, definition, quality, and policy -- to help them narrow their question. Ask one stasis at a time.`

What's missing:
1. Model walks through all four stages in a single response instead of pausing at each
2. No procedure for connecting the student's working topic to each stasis question
3. Treats stasis as a checklist rather than a deliberative process
4. No mechanism to let the student reformulate before moving on
5. Skips the key move: helping the student see which stasis their argument lives in

---

## Slide 12 -- Composition: After (`layout-content`)

**Label:** Composition & Writing  
**Progression:** after / strong

**Skill: Establishing Stasis for a Research Topic**

When a student is developing or narrowing a research topic, follow this procedure:

**Procedure**
1. Ask the student to state their topic in one sentence. Do not evaluate or refine it yet.
2. Conjecture: "What has happened or is happening that makes this worth investigating?" Wait for their answer. Use what they say to sharpen the next question.
3. Definition: Point to a key term in their response. "How are you defining [term]? What kind of problem is this -- legal, ethical, empirical, cultural?" Wait.
4. Quality: "What's at stake, and for whom? What makes this serious enough to argue about in an 8-page paper?" If their scope is too broad, ask them to name one specific population or context. Wait.
5. Policy: "What should be done, and by whom?" Help the student see whether their argument is making a factual claim, a definitional claim, a value judgment, or a policy proposal.
6. Ask: "Which of these four questions does your argument most need to answer?" Guide them toward a thesis grounded in that stasis.

**Format**
```text
Your topic: [student's stated topic]

[One stasis question, tied to a specific phrase the student used]
[1-2 sentences explaining why this question matters for their project]
```

---

## Slide 13 -- Section Divider: Example 2 (`layout-divider`)

**Section label:** Example 2  
**Title:** Sourcing a Document  
**Subtitle:** History -- The Sourcing Heuristic

---

## Slide 14 -- History: Before (`layout-content`)

**Label:** History  
**Progression:** before / starting point

**Starting Point**  
`When a student asks about a primary source, retrieve it from the knowledge collection and walk them through its rhetorical situation using SOAPS. Ask questions one element at a time rather than summarizing.`

What's missing:
1. Model paraphrases the source instead of quoting from the uploaded document
2. No procedure for retrieving and presenting specific passages as evidence
3. Rushes through all SOAPS dimensions in a single response
4. Student receives a finished reading rather than a structured inquiry
5. No requirement to ground each analytical move in the source's own language

---

## Slide 15 -- History: After (`layout-content`)

**Label:** History  
**Progression:** after / strong

**Skill: Sourcing a Primary Document**

When a student asks about or encounters a primary source from the course, follow this procedure:

**Procedure**
1. Retrieve the document from the knowledge collection. Quote a key passage -- do not paraphrase or summarize.
2. Present the passage in a block quote with its metadata (title, date, author) drawn from the uploaded file.
3. Ask: "Who created this document, and what was their position or stake?" Wait for the student's answer.
4. After they respond, point to a *specific phrase* in the quoted passage that supports, complicates, or challenges their answer.
5. Ask: "When and where was this written? What was happening at that moment that shaped what the author could say?" Wait.
6. Ask: "Who was the intended audience? How does knowing that change what the document means?" Wait.
7. After all three sourcing moves, ask: "Given what you now know about the author, the moment, and the audience -- what can this source tell us, and what can't it?"

**Format**
```text
> [quoted passage from uploaded source]
-- [Author], [Title], [Date]

[One sourcing question]
[1-2 sentences connecting the question to a specific phrase in the passage]
```

---

## Slide 16 -- Section Divider: Example 3 (`layout-divider`)

**Section label:** Example 3  
**Title:** Reading the Frame  
**Subtitle:** Literature -- Cinematic Mise-en-Scene

---

## Slide 17 -- Literature: Before (`layout-content`)

**Label:** Literature & Cultural Studies  
**Progression:** before / starting point

**Starting Point**  
`When a student shares a film still or visual artifact, guide them from describing formal elements -- composition, lighting, framing -- toward interpreting how those choices construct meaning in context.`

What's missing:
1. Model describes the image for the student instead of directing their attention
2. No scaffolding from observation to formal analysis to interpretive claim
3. Treats all visual elements at once rather than isolating one per turn
4. No mechanism to keep the student doing the looking and the arguing
5. Skips the gap between "what's in the frame" and "what argument it makes"

---

## Slide 18 -- Literature: After (`layout-content`)

**Label:** Literature & Cultural Studies  
**Progression:** after / strong

**Skill: Reading Cinematic Images**

When a student uploads a film still, photograph, or visual artifact -- or asks about an image from the knowledge collection -- follow this procedure:

**Procedure**
1. If the student uploaded an image, use it directly. If they reference a visual from the course, retrieve it from the knowledge collection and present it. If the image is not in the collection, say so.
2. Ask: "What do you notice first?" Let the student describe before you respond.
3. After their description, direct attention to one formal element they haven't mentioned -- composition, lighting, color, framing, depth of field, or gaze. Ask what it does.
4. Ask how that formal choice shapes the viewer's experience. Move from *what* is in the frame to *how* the image is constructed.
5. Introduce context: ask the student to connect the visual choices to the cultural moment, genre, or argument of the work. If relevant context exists in the knowledge collection, quote it.
6. Guide them toward an interpretive claim: "Based on what you've observed, what argument is this image making?"

**Framework:** Description -> Analysis -> Interpretation
- Description: What is literally in the frame?
- Analysis: How do formal elements (light, angle, placement) create meaning?
- Interpretation: What claim can the student make, grounded in visual evidence?

---

## Slide 19 -- Section Divider: Building Blocks (`layout-divider`)

**Section label:** Building Blocks  
**Title:** Writing Your Own Skills

---

## Slide 20 -- Anatomy of a Skill (`layout-content`, centered)

**Label:** Structure

Every skill has three parts.

1. **Trigger** -- When should this skill activate?
2. **Procedure** -- What steps does the model follow, in order?
3. **Format** -- What should the output look like?

---

## Slide 21 -- Trigger (`layout-split`)

**Label:** Component 1

Define when this skill should activate. A clear trigger keeps the model from applying the wrong procedure to the wrong task.

Questions on the slide:
- What student action starts this workflow?
- Does it activate when they share a draft? Ask about a source? Upload an image?
- Should it run automatically, or only when the student asks?

Template:
```text
Skill: [Skill Name]
When a student [specific action or input], follow this procedure:
```

Prompt to participants:
`Your turn: What pedagogical move are you trying to teach the model? Name the student action that should trigger it.`

---

## Slide 22 -- Procedure (`layout-split`)

**Label:** Component 2

The core of every skill. Numbered steps that tell the model what to do, in what order, and when to wait.

Questions on the slide:
- What should happen first? What comes next?
- Where should the model wait for the student before continuing?
- Should it quote, cite, or reference specific materials?

Template:
```text
Procedure:
1. [First step -- what does the model do or ask?]
2. [After the student responds, what comes next?]
3. [Continue the sequence -- include wait points]
4. [Final step -- synthesis, next action, or handoff]
```

Prompt to participants:
`Your turn: Write 3-5 numbered steps. Think about the sequence you follow when you do this yourself as an instructor.`

---

## Slide 23 -- Format (`layout-split`)

**Label:** Component 3

Specify what the output should look like. Without a format, the model structures responses however it wants.

Questions on the slide:
- Should the model quote the student's text?
- Should each response end with a question?
- How long should a response be?

Template:
```text
Format:
> [quoted excerpt from student work or source document]

[1-2 sentences: what you observe]
[One question for the student]
```

Prompt to participants:
`Your turn: Write a short format template. What should each response from the model actually look like?`

---

## Slide 24 -- Section Divider: Hands-On (`layout-divider`)

**Section label:** Hands-On  
**Title:** Write Your First Skill  
**Subtitle:** Pick one pedagogical move from your course and turn it into a step-by-step recipe.

---

## Slide 25 -- Choose Your Move (`layout-content`, centered)

**Label:** Exercise

Which is closest to the skill you want to build?

- **Establishing Stasis** -- Narrow a research topic one question at a time
- **Sourcing a Document** -- Quote, then ask who, when, for whom
- **Reading the Frame** -- Describe -> analyze -> interpret
- **Something Else** -- Any repeatable pedagogical move

---

## Slide 26 -- Write Your Skill (`layout-split`)

**Label:** Draft It

Use the four-part structure to write a skill for the move you chose.

Step-reveal cards:
1. **Trigger** -- What student action starts this?
2. **Procedure** -- 3-5 numbered steps with wait points
3. **Format** -- What does each response look like?

Template:
```text
Skill: [Name]
When a student [trigger action], follow this procedure:

Procedure:
1. [First step]
2. [Second step -- include wait points]
3. [Third step]

Format:
> [quoted text from student or source]

[Observation in 1-2 sentences]
[One question]
```

---

## Slide 27 -- Add Your Skill (`layout-split`)

**Label:** Integrate It

Connect the skill you wrote to the model you built in the previous workshops. The slide points back to slide 5 for the workflow.

1. **Create the skill** -- Go to **Workspace -> Skills**, click **+ New Skill**, and paste in what you wrote.
2. **Add it to your model** -- Open your model card in **Workspace -> Models**. Scroll to the **Skills** section and toggle it on.

Step-reveal follow-up:
- **Test It** -- Open a new chat. Trigger the skill with realistic student input. Does it follow the procedure?
- **Iterate** -- If the model skips steps, add wait points. If it dumps everything, add `"one per turn."`

Visual:
- Layer 1: System Prompt -- role, constraints, tone
- Layer 2: Knowledge Collection -- syllabus, rubric, readings, sources
- Layer 3: Your Skill -- step-by-step recipe for a specific move
- Result: `Your Complete AI Tool` -- directive + sources + workflows

---

## Slide 28 -- Workshop Complete (`layout-full-dark closing-slide`)

**Label:** Workshop Complete

**What You've Built**

| Date | Session | Description |
|------|---------|-------------|
| March 16 | System Prompts | Role, constraints, tone |
| March 23 | Knowledge Collections | Grounded in your materials |
| March 30 (Today) | Skills & Tools | Step-by-step workflows |

Closing copy:

You now have a custom AI tool with three modular layers that can be tested as a configuration and refined iteratively. That way, you can see what each component contributes and where to focus before you introduce it in the classroom.

Link shown on slide: `ailab.gc.cuny.edu`
