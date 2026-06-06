---
name: long-term-memory
description: Pieces Long-Term Memory — what it captures, enabling it, retention limits, indefinite pinning with create_pieces_memory, the 5 keys to great queries, 15 tested prompts with exact text
---

# Pieces Long-Term Memory (LTM)

LTM is Pieces OS's passive capture engine. It watches everything you work on — code, browsers, clipboard, meetings — indexes it semantically, and makes it queryable via natural language. The goal: AI agents that know your full context, not just the current file.

## What LTM Captures

LTM operates at the OS level across all applications:

| Source | What is captured |
|--------|-----------------|
| Code editors (VS Code, JetBrains, etc.) | Open files, active project context, file paths, code edits |
| Web browsers (Chrome, Firefox, Safari, Edge) | Visited URLs, page titles, text content via OCR |
| Communication (Teams, Slack, Discord, email) | Messages, shared links, conversation context |
| Documentation (Notion, Confluence, GitHub, wikis) | Pages visited, content read, edits made |
| Terminal / command line | Commands executed, output |
| Clipboard | Every copy/paste operation — code moved between files, URLs, error messages |
| Screenshots / Vision | OCR text from all visible UI — dashboards, error dialogs, docs |
| **LTM Audio (v5.0.3+)** | Microphone input (meetings, pair programming) + system audio (presentations, webinars); local transcription only, no raw audio stored |

Roll-ups are generated every **10 minutes**. The Desktop Timeline shows blocks in 20-minute increments.

## Enabling LTM

1. Click the PiecesOS icon in the macOS menu bar (or Windows taskbar)
2. Select **"Enable Long-Term Memory Engine"**

Per-app controls: Settings → LTM → configure which applications to capture from.

**Privacy**: All processing is local. Pieces never uploads raw captures to any server. You can deny-list specific apps before they're ever captured (v6.0.0+).

## Retention Limits

| Tier | Limit | Configurable? |
|------|-------|--------------|
| Local storage | 9 months | No — hard limit, auto-deleted |
| `ask_pieces_ltm` MCP query window | 7 days | No — hard server-side limit |
| Full-text / vector search MCP tools | 9 months | No — but these reach the full history |
| `create_pieces_memory` memories | **Indefinite** | — |

**The 7-day limit only applies to `ask_pieces_ltm`.** The other 37 MCP tools — `workstream_summaries_full_text_search`, `material_identifiers`, `workstream_events_full_text_search`, etc. — can reach back the full 9-month history via explicit date filters.

The Desktop UI also shows the full 9-month Timeline.

## Indefinite Retention: `create_pieces_memory`

The only way to preserve context beyond 9 months (or ensure it is always queryable via `ask_pieces_ltm`) is to pin it explicitly using `create_pieces_memory`.

These memories are stored separately from transient workstream events. They have **no TTL** — they are explicitly described as "never-forgotten" in the tool schema.

Use it to pin:
- Architectural decisions and their rationale
- Debugging breakthroughs and root causes
- Research findings you want to recall months later
- Cross-agent handoffs (Agent A saves → Agent B retrieves later)

Example:
```
create_pieces_memory(
  summary: "Root cause of OOM crash (2026-06-01): connection pool idle_timeout was set to 0 (never expire), causing connections to accumulate. Fix: set idle_timeout=300. Reproduce: run 1000 concurrent requests with 10s delay between bursts.",
  summary_description: "OOM root cause — connection pool idle_timeout",
  project: "/Users/joe/api-server",
  files: ["/Users/joe/api-server/src/db/pool.rs"],
  externalLinks: ["https://github.com/org/api-server/pull/42"]
)
```

Later retrieval:
```
ask_pieces_ltm(
  question: "How did we fix the OOM crash in the API server?",
  topics: ["OOM", "memory", "connection pool"],
  chat_llm: "claude-sonnet-4-6"
)
```

## The 5 Keys to Great LTM Queries

All LTM queries combine these five dimensions for precision:

### 1. Time — When did it happen?

Be specific. "Past 48 hours" returns better results than "recently".

| Pattern | Examples |
|---------|----------|
| Relative | "today", "yesterday", "this week", "past 24 hours" |
| Contextual | "Thursday and Friday", "Monday morning", "end of last week" |
| Month-based | "in August", "last June", "Q3" |
| Duration | "6 months ago", "past quarter" |

For MCP tools with time filters, use `extract_temporal_range` first to convert natural language to UTC ISO 8601.

### 2. Source — Which application?

- Code: "in VS Code", "in IntelliJ", "in PyCharm"
- Browser: "in Chrome", "in Firefox", "on GitHub"
- Communication: "in Slack", "in Teams", "in email"
- Terminal: "commands I ran", "in the terminal"

### 3. Gesture — What were you doing?

- Copy/paste: "things I copied", "what I pasted into"
- File operations: "files I opened", "files I created", "files I modified"
- Search: "what I searched for"
- Communication: "messages I sent", "links I shared"
- Commits: "code I committed"

### 4. Topic — What project or theme?

- Specific: "JWT token validation", "Redis caching", "OOM crash"
- Feature-level: "OAuth2 implementation", "API gateway security"
- Broad: "cloud security", "PCI DSS compliance", "what did I work on?"

### 5. People — Who were you working with?

- By name: "decisions with Sarah", "what David shared"
- By role: "what the security team discussed", "my manager's feedback"
- By team: "the infrastructure team's review"

## Modality Filtering (MCP)

When using `workstream_events_full_text_search` or `workstream_events_vector_search`:

| Modality | `context_type` | Use case |
|----------|---------------|----------|
| Clipboard | `"CLIPBOARD"` | Code patterns copied repeatedly; snippets moved between files |
| Screenshots/OCR | `"VISION"` | Text from dashboards, error dialogs, documentation |
| Audio/meetings | `"AUDIO"` | Meeting context, verbal decisions, pair programming |
| `audio_type` | `"INPUT"` / `"OUTPUT"` | Microphone vs. system audio |

<!-- BEGIN:auto-updated:prompts -->
## Tested Query Prompts

> Auto-fetched from pieces-app/pro_tips

Tested, practical examples organized by use case:
- **5 Daily Work Queries**: Standup generators, command line power user patterns, context restoration
- **3 Reflective Queries**: Week in review, work pattern analysis, weekly highlights
- **2 Analytical Queries**: Time efficiency audits, code pattern identification
- **Query construction patterns** and best practices
- **Usage recommendations** for integrating LTM into your workflow

### 🎯 [5 Essential Queries To Ask Pieces LTM after 2+ Months of Background Memory Formation](./guides/5%20Queries%20To%20Ask%20Pieces%20LTM%20after%202%2B%20Months%20of%20Background%20Memory%20Formation.md)

Strategic queries for senior professionals with accumulated work history:
- **2 Practical Search Queries**: Finding past conversations and research on topics
- **2 Collaboration & Efficiency Queries**: Team dynamics analysis and workflow optimization
- **1 Strategic Planning Query**: Quarterly performance reflection
- **Query best practices** and usage recommendations
- **Transition guidance** from 24-48 hour to 2+ month queries

### 📚 [How to Query LTM in Pieces Copilot](./guides/How%20to%20Query%20LTM%20in%20Pieces%20Copilot.md)

A comprehensive guide covering:
- **The 5 Keys to Great LTM Queries**: Time, Source, Gestures, Topic, and People
- **Detailed strategies** for each query element with real-world examples
- **Combining strategies** for maximum effectiveness
- **Troubleshooting tips** when queries don't return what you need
- **Quick reference** cheat sheets for common patterns

### 📊 [How to Use the Workstream Activity Timeline](./guides/How%20to%20Use%20the%20Workstream%20Activity%20Timeline.md)

A guide to your automatic work journal:
- **How Workstream Activity works**: Event capture and 20-minute summary generation
- **Timeline view**: Browse, search, and interact with your work history
- **Interactive summaries**: View, search, start chats, and share
- **Pro tips** for maximizing value from your workstream summaries
- **Common workflows** for context restoration and daily planning

### 🚀 [Navigating the Desktop App UI with the Power Menu](./guides/Navigating%20the%20Desktop%20App%20UI%20with%20the%20Power%20Menu.md)

Navigate efficiently in Pieces:
- **What the Power Menu is** and how to access it
- **Quick navigation** between Workstream Activity and Pieces Copilot
- **Keyboard shortcuts** and search tips
- **Common workflows** for seamless context switching
- **Pro tips** for staying in the flow

### ⏱️ [How to Generate a Time Breakdown with a Custom Time Range](./guides/How%20to%20Generate%20a%20Time%20Breakdown%20with%20a%20Custom%20Time%20Range.md)

A video-guided walkthrough for reconstructing billable hours:
- **What Time Breakdown is** and why configurable time ranges matter
- **Step-by-step instructions** for generating a breakdown with a specific time range
- **Use cases** for daily timesheets, weekly billing, sprint reviews, and more
- **Pro tips** for matching time ranges to billing cycles and refining output
- **Troubleshooting** for incomplete breakdowns and missing entries

### 🎤 [How to Enable LTM Audio Capture](./guides/How%20to%20Enable%20LTM%20Audio%20Capture.md)

A video-guided walkthrough for capturing audio context:
- **macOS permissions callout** with link to the dedicated permissions guide
- **Two methods to enable** — Desktop App (User Profile) and PiecesOS Toolbar with platform-specific instructions
- **Role-specific query examples** for developers, managers, PMs, lawyers, accountants, consultants, and executives
- **Privacy and control** — toggle on/off anytime, local processing, no raw audio storage

### 🔒 [How to Set Up macOS Permissions for LTM Audio](./guides/How%20to%20Set%20Up%20macOS%20Permissions%20for%20LTM%20Audio.md)

A step-by-step guide to enabling LTM Audio on macOS:
- **Prerequisites**: Version requirements and what to update first
- **Enabling LTM Audio**: Two ways to activate the feature in Pieces
- **Granting Microphone Access**: Allow PiecesOS to capture your voice and ambient audio
- **Granting Screen & System Audio Recording**: Allow PiecesOS to capture system audio output
- **Verification**: Confirm audio context is flowing into your Long-Term Memory
- **Troubleshooting**: Common permission issues and how to resolve them

### 📋 [How to Create and Save Custom Summary Templates](./guides/How%20to%20Create%20and%20Save%20Custom%20Summary%20Templates.md)

A video-guided walkthrough for building your own single-click summaries:
- **What Custom Summary Templates are** and why they save time
- **Step-by-step instructions** for creating, configuring, and saving a template
- **11 use case examples** with copyable prompts: project updates, research roundups, client reports, meeting digests, and more
- **Pro tips** for naming, scoping, and maintaining your template library
- **Troubleshooting** for output that's too broad, too sparse, or missing templates

### 💳 [How to Apply a Discount Code at Checkout for Pieces Pro or Enterprise](./guides/How%20to%20Apply%20a%20Discount%20Code%20at%20Checkout%20for%20Pieces%20Pro%20or%20Enterprise.md)

A video-guided walkthrough for applying discounts during checkout:
- **Step-by-step instructions** for the full checkout flow from the Upgrade button to purchase completion
- **Finding the discount field** — the green "Add discount" text above credit card fields
- **Who Benefits from Upgrading?** — Use cases for developers, managers, consultants, lawyers, accountants, executives, and educators
- **Troubleshooting** for invalid codes, missing discounts, and existing subscriptions

### 🔄 [Quick Update Guide: Pieces for Developers (Linux/Snap)](./guides/How%20to%20Update%20Pieces%20Snap%20Packages.md)

A simple 4-step process to update Pieces on Linux:
- **Step 1 - Shutdown**: Gracefully quit both Desktop App and PiecesOS
- **Step 2 - Check Versions**: Compare installed versions (optional)
- **Step 3 - Update**: Refresh Snap packages
- **Step 4 - Launch**: Restart PiecesOS, then Desktop App
- **Troubleshooting** tips for common issues

### 🔌 MCP Guides (`guides/MCP/`)

Guides for connecting AI agents to your Pieces Long-Term Memory via the Model Context Protocol. The Pieces MCP server — expanded significantly in [Pieces 5.0.3](./releases/Whats%20New%20in%20Pieces%205.0.3.md#expanded-mcp-server-richer-long-term-memory-access-in-cursor-claude-code--more) — exposes 39 tools covering full-text search, vector search, batch retrieval, temporal filtering, and cross-agent memory creation.

**[→ MCP Guides Index](./guides/MCP/README.md)** — Start here for an overview of all MCP documentation.

| Guide | What it covers |
|-------|---------------|
| **[Pieces MCP and LTM Tools Reference](./guides/MCP/Pieces%20MCP%20and%20LTM%20Tools%20Reference.md)** | Complete reference for all 39 MCP tools: `ask_pieces_ltm`, `create_pieces_memory`, 14 full-text search tools, 5 vector search tools, `material_identifiers`, `extract_temporal_range`, and 16 batch snapshot tools — with parameters, examples, and agent instructions. |
| **[Agent Setups & Integrations](./guides/MCP/Agent%20Setups%20%26%20Integrations/README.md)** | Step-by-step setup guides for 19 MCP-compatible tools: Cursor, Claude Desktop, Claude Code, VS Code, Windsurf, Goose, Cline, Continue.dev, JetBrains IDEs, Zed, GitHub Copilot, OpenAI Codex CLI, Google Gemini CLI, Amazon Q Developer, ChatGPT Developer Mode, Raycast, Rovo Dev CLI, and more. Includes transport support matrix (stdio / SSE / Streamable HTTP) and stdio-to-HTTP bridge instructions. |
| **[Connecting to PiecesOS via Ngrok](./guides/MCP/Connecting%20to%20PiecesOS%20from%20the%20Outside%20World%20via%20Ngrok.md)** | Expose your local PiecesOS over HTTPS using ngrok so cloud-based agents (Claude web, ChatGPT, GitHub Actions, Zapier) can reach your Long-Term Memory. Includes auto-discovery scripts for Bash and PowerShell. |
| **[Bridging Local MCP Clients with mcp-remote](./guides/MCP/Bridging%20Local%20MCP%20Clients%20to%20Remote%20Servers%20with%20mcp-remote.md)** | Connect stdio-only clients (Claude Desktop JSON config, Zed, Raycast) to any remote MCP server. Covers transport strategy, OAuth 2.1, bearer token injection, and a catalog of public remote MCP servers. |

## Quick Start

1. **Ready to practice?** Start with the 10 example queries for 24-48 hours and try them yourself
2. **Been using Pieces for 2+ months?** Explore the 5 strategic queries for deeper insights and performance management
3. **New to LTM?** Dive into the comprehensive guide to understand the fundamentals
4. **Want to get the most out of Workstream Activity?** Learn how your automatic work journal captures and summarizes your work
5. **Need to navigate faster?** Learn the Power Menu to jump between views seamlessly
6. **Want to become a power user?** Experiment with combining different query elements and refine your approach
7. **Want to connect Cursor, Claude, or Goose to your memory?** Start with the [MCP Guides Index](./guides/MCP/README.md) and pick your tool

## Key Principles

The best LTM queries combine these elements:
- ⏰ **Time** — When did it happen? ("yesterday", "last week", "in August")
- 📱 **Source** — Where did it happen? ("in VS Code", "from Teams", "in Chrome")
- ✋ **Gestures** — What were you doing? ("copied", "searched", "created")
- 🎯 **Topic** — What project or theme? ("customer portal authentication", "cloud security")
- 👥 **People** — Who were you working with? ("Sarah", "the security team")

**Remember**: Write naturally, like you're asking a colleague. You don't need all five elements—even one or two will get you great results.

## What LTM Captures

LTM automatically captures context from:
- Code editors and IDEs (VS Code, IntelliJ, etc.)
- Web browsers (Chrome, Firefox, Safari)
- Communication tools (Teams, Slack, Discord)
- Documentation platforms (Notion, Confluence, GitHub)
- Terminal and command line
- **Microphone & system audio** — meetings, pair programming sessions, video calls, and presentations (enable via [LTM Audio](./guides/How%20to%20Enable%20LTM%20Audio%20Capture.md), introduced in [Pieces 5.0.3](./releases/Whats%20New%20in%20Pieces%205.0.3.md))

All of this becomes searchable through natural language queries—no need to remember exact details or file names.

## Getting Started

The best way to get good at LTM queries? **Just start asking.** Try different phrasings, experiment with time references, and see what works. You'll get the hang of it quickly.

For questions or support, reach out to your Pieces administrator or check out the Pieces documentation.

---

*Unlock the full potential of your work with Pieces—learn LTM queries, Workstream Activity, and efficient navigation.*
<!-- END:auto-updated:prompts -->

## Desktop Timeline & Summaries

The Pieces Desktop app provides UI access to the full 9-month history:

- **Timeline**: chronological roll-ups, expandable by day, 20-minute blocks
- **Conversational Search**: chat interface with suggested prompts
- **Single-Click Summary Presets**:
  - "What's Top of Mind"
  - "Standup Update"
  - "Day Recap"
  - "AI Habits"
  - "Discover"

**v6.0.0 additions**: Agentic LTM (multi-turn reasoning across memory), Reflection Mode (self-correcting reasoning), Google Calendar integration (calendar events as context), Meeting Prep (structured pre-reads), Granular LTM Data Management (clear by time, modality, or app).

**v5.1.0 additions**: Scheduled summaries (daily/weekly/custom cadence), Copilot Modality Focus (filter by clipboard/audio/vision), Copilot Response Follow-Up.

**v5.0.3 additions**: LTM Audio (mic + system audio capture).
