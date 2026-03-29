# Open WebUI Skills and Tools: A comprehensive research brief

**Skills and Tools are how Open WebUI transforms a basic chatbot into a specialized assistant that follows expert instructions and takes real-world actions.** Skills are reusable plain-text instruction sets (think: detailed SOPs for the AI), while Tools are executable capabilities that let the AI interact with the outside world — searching the web, running code, or querying databases. Together with system prompts and knowledge collections, they form a four-layer customization stack that faculty can use to build purpose-built AI assistants without writing code. This report synthesizes findings from official Open WebUI documentation, GitHub discussions, Reddit community threads, and tutorial resources to provide a workshop-ready reference for the CUNY AI Lab's professional development series.

## Skills are instruction playbooks, not executable code

The most important distinction to establish early in any workshop: **Skills are plain-text markdown documents**, not software. A Skill teaches the AI *how to think about a task* by injecting detailed instructions into its system prompt. Think of it as handing a new colleague a detailed standard operating procedure before asking them to do a job. Skills were introduced as an experimental feature in recent Open WebUI releases and sit under **Workspace → Skills** in the interface.

Skills have two activation methods. The first is **per-chat invocation**: typing `$` in the chat input opens a skill picker, and selecting a skill injects its full content directly into the system prompt for that conversation. This is quick and ad hoc — perfect for grabbing a specific set of instructions when needed. The second method is **model-binding**: attaching skills permanently to a custom model via Workspace → Models → Edit → Skills. This uses a clever lazy-loading architecture where only a lightweight manifest (the skill's name and description) is injected into the system prompt. The AI receives a special `view_skill` tool and can decide on its own whether to load the full instructions. This keeps the context window efficient — **only skills the AI actually needs get loaded**, which reduces token consumption and speeds up responses.

Creating a skill is straightforward. Navigate to Workspace → Skills → "+ New Skill," give it a name and description, then write markdown instructions in the content field. Skills can also be imported from `.md` files with optional YAML frontmatter (specifying `name` and `description`) or from JSON exports. They follow the same access control system as other workspace resources — private by default, shareable with specific users or groups.

A community contributor on GitHub summarized the efficiency case well: "The main reason you want skills on Open WebUI is its efficiency property, because skills are just strings — very lightweight. When your LLM needs to do something, it can decide only to load skills that are necessary, and this reduces your input prompts immensely."

## Tools give the AI hands to act in the world

While Skills tell the AI *how* to approach a task, **Tools give the AI *new capabilities* to actually do things** — search the web, fetch URLs, generate images, run calculations, query knowledge bases, and more. Tools are the mechanism by which an AI assistant stops being a pure text generator and starts being an agent that can take actions.

Open WebUI organizes tools into six categories:

- **Native features** (built into the platform): web search, URL fetching, image generation, memory, and RAG retrieval — toggled on/off in Admin Settings
- **Workspace tools**: community-created or custom Python scripts installed via Workspace → Tools
- **Native MCP servers**: external tool servers connected via the Model Context Protocol over HTTP
- **MCP via proxy**: local tool servers connected through the MCPO proxy
- **OpenAPI servers**: standard REST APIs exposed as tools
- **Open Terminal**: full shell access in an isolated Docker container (advanced)

For the CUNY Sandbox deployment, the most relevant categories are **native features** (already built in) and **built-in system tools** available when Native Function Calling mode is enabled. These system tools are extensive and include `search_web`, `fetch_url`, `list_knowledge`, `query_knowledge_files`, `search_memories`, `add_memory`, `write_note`, `execute_code`, `generate_image`, `view_skill`, and `get_current_timestamp`, among others. Each category can be individually enabled or disabled per model in the Model Editor, giving administrators granular control over what each custom model can do.

Tool calling operates in two modes. **Default Mode** (legacy) works with any model by injecting a prompt template that guides the AI to request tool use, but it is slower and less reliable. **Native Mode** (recommended for modern models) leverages the AI model's built-in function-calling capability, enabling faster responses, multi-step tool chaining, and an "interleaved thinking" pattern where the model reasons between tool calls. Native Mode requires capable models — the documentation specifically recommends frontier models for reliable agentic behavior. Smaller models like Gemma 3 27B handle tool calling inconsistently; for the CUNY Sandbox, Kimi K2.5 and GLM 5 are recommended for reliable tool use.

## The four-layer customization stack and how the pieces connect

For faculty coming from earlier workshops on system prompts and knowledge collections, it helps to see how Skills and Tools fit into the full picture. Open WebUI offers a **four-layer customization stack** for building specialized AI assistants:

**Layer 1 — System prompt:** The foundational personality and behavioral instructions. This is where you define the AI's role, tone, boundaries, and rules. System prompts support dynamic variables like `{{USER_NAME}}`, `{{CURRENT_DATE}}`, and `{{CURRENT_TIME}}` that auto-populate with real values. Best practice: embed variables in full sentences ("Today is {{CURRENT_DATE}}" rather than the variable alone).

**Layer 2 — Knowledge collections:** Domain-specific documents uploaded via RAG (Retrieval-Augmented Generation). The AI searches these when answering questions. Critical caveat: **when Native Function Calling is enabled, knowledge is NOT automatically injected** into the AI's context. The system prompt must explicitly instruct the model to use knowledge tools (e.g., "When users ask questions, first use `list_knowledge` to see what knowledge is available, then use `query_knowledge_files` to search before answering").

**Layer 3 — Skills:** Reusable instruction sets for specific tasks. A writing-workshop model might have skills for "APA Citation Style," "Peer Review Rubric," and "Thesis Statement Development." The AI can load these on demand without bloating every conversation.

**Layer 4 — Tools:** Executable capabilities. Web search for current information, code execution for data analysis, image generation for visual content, memory for persistent facts across conversations.

In the model editor (Workspace → Models → Edit), all four layers converge. A single custom model can have a system prompt, bound knowledge collections, attached skills, enabled tools, and specific capability toggles — creating a purpose-built assistant that combines personality, domain expertise, procedural knowledge, and real-world capabilities.

## Dynamic variables and signposting make prompts context-aware

Open WebUI supports **Jinja2-style template variables** that auto-populate in system prompts and slash-command prompts. The full list of available variables:

| Variable | What it provides | Example output |
| --- | --- | --- |
| `{{USER_NAME}}` | Current user's display name | "Dr. Martinez" |
| `{{USER_EMAIL}}` | Current user's email | "martinez@gc.cuny.edu" |
| `{{USER_LANGUAGE}}` | User's selected language | "en-US" |
| `{{USER_LOCATION}}` | User's location (requires HTTPS + opt-in) | "New York, NY" |
| `{{USER_BIO}}` | User's profile bio | Set in Settings → Account |
| `{{CURRENT_DATE}}` | Today's date | "2026-03-29" |
| `{{CURRENT_TIME}}` | Current time | "14:30:05" |
| `{{CURRENT_DATETIME}}` | Combined date and time | Full timestamp |
| `{{CURRENT_WEEKDAY}}` | Day of the week | "Sunday" |
| `{{CURRENT_TIMEZONE}}` | User's timezone | "America/New_York" |
| `{{CLIPBOARD}}` | User's clipboard content | Requires clipboard access |

**Signposting** — the practice of explicitly referencing available resources within system prompts — is essential when using Native Mode. Because native function calling changes how knowledge retrieval works, system prompts should explicitly tell the model what resources are available and when to use them. A well-signposted system prompt might read:

```text
You are a first-year writing tutor for {{USER_NAME}}. Today is {{CURRENT_DATE}}.

When students ask about citation formats, use the $ skill "APA Style Guide" for detailed rules.
When students ask about course policies, search the attached knowledge base using query_knowledge_files.
When students need current information about a topic, use search_web to find recent sources.
Always check your knowledge base before answering content questions.
```

This pattern — explicitly naming the resources and specifying *when* to use each one — dramatically improves reliability compared to hoping the model figures it out on its own.

## Thinking tags and chain-of-thought configurations

Open WebUI **auto-detects XML-like thinking tags** in model output (such as `<think>...</think>` or `<thought>...</thought>`) and renders them in a **collapsible UI element** labeled "Thought" or "Thinking." This means students and faculty can see the AI's reasoning process without it cluttering the final response — a pedagogically valuable feature for teaching critical engagement with AI outputs.

Key configuration details: the `reasoning_tags` parameter allows customization of which tags trigger collapsible rendering. This can be set per-chat (Chat Controls → Advanced Parameters), per-model (Workspace → Models → Edit → Advanced Parameters), or globally (Admin Panel → Settings → Models). In Native Mode, reasoning content is preserved and sent back to the model during tool-call loops, enabling "interleaved thinking" where the model reasons between actions. One known issue: `<thinking>` tags added manually in system prompts can sometimes interfere with the built-in thinking mode detection, so it's best to let the model generate these naturally or use the `reasoning_tags` parameter rather than hardcoding tags in prompts.

## Common pitfalls every workshop should address

Community discussions across GitHub and Reddit reveal several recurring frustrations that a workshop should proactively address:

**Tool calling is inconsistent with smaller models.** This is the single most-reported pain point. Users consistently report that local models under 30B parameters often fail to call tools reliably — they ignore tool availability, produce malformed JSON, or call tools with wrong parameters. The official documentation states plainly: "Agentic tool calling requires high-quality models to work reliably." For a faculty workshop, this means being upfront about which models on the CUNY Sandbox work well with tools and which don't. Smaller models like Gemma 3 27B are unreliable for tool use; Kimi K2.5 and GLM 5 are recommended alternatives.

**Knowledge disappears in Native Mode.** When Native Function Calling is enabled, the traditional RAG injection pipeline is bypassed. Knowledge collections are no longer automatically searched and injected — the model must actively call knowledge tools. Multiple GitHub issues document faculty-equivalent users being confused when their carefully curated knowledge bases suddenly "stop working" after a mode change. The fix is signposting: explicitly telling the model in the system prompt to use `query_knowledge_files` and `list_knowledge` tools. Alternatively, disabling Native Mode for a specific model restores automatic RAG injection.

**Access control silently drops tools.** Attaching a tool to a model does not bypass the platform's access control. When a user chats with a model, Open WebUI checks whether that user has read access to each attached tool. **Tools the user cannot access are silently skipped** — no error message, no notification. This means a workshop facilitator who builds a model with specific tools may find that participants can't use those tools if permissions weren't properly configured.

**Terminology is genuinely confusing.** The community repeatedly flags this. Open WebUI has Tools, Functions, Pipes, Filters, Actions, Pipelines, and now Skills — each with a specific meaning. A GitHub commenter with 17 upvotes wrote: "There needs to be better documentation on this. I'm getting all mixed up with tools and pipelines and it's driving me bonkers." For a faculty audience, the workshop should focus exclusively on the **Skills** and **native tool features** layer, acknowledging that Functions/Pipes/Filters exist for developers but aren't needed for most faculty use cases.

**Security risks of custom tools are real.** Workspace Tools execute arbitrary Python code on the server. The official documentation warns: "Granting a user the ability to create or import Tools is equivalent to giving them shell access to the server." For the CUNY Sandbox, administrators should pre-install and vet any custom tools rather than giving faculty Tool creation permissions.

## Faculty-relevant examples and educational use cases

For humanities and social science faculty, the most immediately useful configurations combine system prompts, knowledge collections, and skills — with native tools providing supporting capabilities like web search and knowledge retrieval. Here are concrete examples tailored to the workshop audience:

**First-year writing assistant.** System prompt establishes a Socratic tutoring persona that asks guiding questions rather than writing for students. A "Thesis Development" skill provides step-by-step instructions for helping students craft and refine thesis statements. A "Peer Review Rubric" skill loads the department's evaluation criteria. Knowledge collection contains the course syllabus, assignment sheets, and style guide. Native tools enable web search for finding example sources and `query_knowledge_files` for checking course policies.

**Primary source analysis tool for history.** System prompt instructs the AI to guide students through sourcing heuristics — who created the document, when, for whom, and why — before interpreting content. Skills include "Document Contextualization" (instructions for placing a source in historical context) and "Bias Detection" (framework for identifying perspective and bias in primary sources). Knowledge collection contains curated primary source documents. The `{{CURRENT_DATE}}` variable helps the model correctly calculate historical time distances.

**Media studies research assistant.** System prompt creates a critical media analysis persona that applies specific theoretical frameworks. Skills provide instructions for different analytical approaches (semiotics, political economy, audience reception). Knowledge collection contains assigned readings and theoretical texts. Web search tool enabled for finding current media examples.

The community hub at openwebui.com hosts numerous pre-built tools and model presets relevant to education, including academic writing enhancement bots, research tutors, and citation formatting assistants. The **Haervwe/open-webui-tools** collection on GitHub offers 20+ specialized tools including an arXiv search tool for academic paper discovery that requires no API key.

## The CUNY AI Lab workshop series context

The CUNY AI Lab (CAIL), launched in February 2026, is a faculty- and staff-led initiative at the CUNY Graduate Center jointly administered by Graduate Center Digital Initiatives, the Teaching and Learning Center, Mina Rees Library, and the American Social History Project. The Sandbox at chat.ailab.gc.cuny.edu runs Open WebUI with a privacy-by-design philosophy — providers don't retain or train on user data.

The four workshop companion repositories (system-prompting, knowledge-collections, skills-tools, sandbox-docs) at github.com/cuny-ai-lab follow a scaffolded pedagogical progression: first understanding how to communicate with AI (system prompts), then how to give it domain expertise (knowledge collections), then how to give it specialized procedures and capabilities (skills and tools), with sandbox documentation as reference material. Note that as of late March 2026, these repositories are not yet publicly accessible — they may be private, in-development, or restricted to workshop participants.

The program targets nontechnical academics across disciplines. The associated Focused Inquiry Group is led by a doctoral student in English Literature, and the application explicitly states "no prior knowledge of generative AI or large language models is required." This signals that workshop materials should prioritize conceptual clarity over technical detail, use discipline-relevant examples, and focus on the layers of customization that faculty can configure through the web interface rather than code.

## Conclusion: what matters most for the workshop

The most critical insight for workshop design is that **Skills and native tool features represent the accessible frontier** of Open WebUI customization for nontechnical users. Skills require zero coding — they're just well-structured markdown documents — and native tools like web search, knowledge retrieval, and memory are toggled on with checkboxes. The workshop should build on participants' existing knowledge of system prompts and knowledge collections by showing how Skills add *procedural expertise* (the AI knows how to follow specific workflows) and Tools add *agency* (the AI can take actions beyond generating text).

Three practical priorities stand out. First, always signpost in system prompts — explicitly tell the model what resources are available and when to use them, especially when Native Mode is enabled. Second, match expectations to model capability: tool calling works reliably with larger models like Kimi K2.5 and GLM 5 but struggles with smaller ones like Gemma 3 27B, so exercises should use models known to work well on the CUNY Sandbox. Third, start simple: have participants build a single skill (a teaching-relevant SOP in markdown), attach it to a model alongside a knowledge collection, enable web search, and watch how the layers interact. The conceptual framework of system prompt (personality) + knowledge (expertise) + skills (procedures) + tools (capabilities) maps naturally onto how faculty already think about preparing a teaching assistant — you give them a role, background readings, specific instructions, and the right equipment.
