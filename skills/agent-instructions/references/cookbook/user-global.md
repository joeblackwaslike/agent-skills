# Cookbook: User / Global CLAUDE.md

**For:** `~/.claude/CLAUDE.md`  
**Purpose:** Personal baseline that applies to every project on this machine  
**Target size:** 100–200 lines  

The user-global file is your identity layer. It answers: "Who is this engineer, how do they
want to work, and what can I assume is always true?" Every project benefits from this
context without having to repeat it.

---

## Template

```markdown
# Global Preferences

## Identity & Context

[Your role and background — 2–3 sentences. Include:
 - Seniority and primary domain
 - Languages you know deeply vs. ones you're learning
 - Current focus areas]

[Optional: active projects, ongoing goals]

## Communication

- Skip preamble — answer first, explain after if needed
- No sycophantic openers or repeating the question back
- Ask clarifying questions before starting ambiguous or multi-file tasks
- On multi-file tasks: show the plan with file locations before implementing
- Push back when the proposed approach is overcomplicated
- [Add any tone, format, or verbosity preferences specific to you]

## Stack & Architecture Preferences

[State your default stance for common decisions:]
- Default language for new projects: [e.g., TypeScript for APIs/tools, Python for ML/data]
- Package manager: [e.g., pnpm for Node, uv for Python]
- Async stance: [e.g., async-first for all new projects]
- [Add any recurring framework or toolchain choices]

## Code Generation

- Confirm scope before writing (full implementation vs. core logic vs. skeleton)
- Do not rewrite code that wasn't asked about
- Match async/sync to the surrounding codebase
- [Add any preferences about error handling, typing, comments, etc.]

## Shell / Scripts

- [Any shell conventions you always use — e.g., "prefer composable tools over custom code"]
- [JSON handling: "use jq in shell scripts, never inline Python parsers"]

## Skills & Tools

[List any skills or tools you always want activated — e.g.:]
- Use Serena for all code navigation and editing
- Use [skill-name] for [task]
- [Add project-type triggers: "invoke joe-stack-preferences when choosing libraries"]

## Environment

- OS: [macOS / Linux / Windows + version]
- IDE: [VS Code / Cursor / Neovim + any extensions that matter]
- Container runtime: [Docker Desktop / OrbStack / none]
- [Hardware notes that affect tool choices — e.g., Apple Silicon, available RAM]
```

---

## Section Guide

**Identity & Context** is the most important section. It lets Claude calibrate explanation
depth, pick appropriate abstraction levels, and know when to ask vs. when to act. A senior
engineer wants "here's the diff" — a junior wants "here's why." Write 2–3 sentences that
a colleague would say about you.

**Communication** sets the interaction style. These are the preferences that would otherwise
have to be re-stated every session. Focus on what you actively dislike (sycophancy, preamble,
excessive caveats) and what you need (plans before multi-file changes, pushback on bad ideas).

**Stack & Architecture Preferences** prevents Claude from making technology choices you'd
immediately reverse. State your defaults, not your rigid rules — Claude should still adapt
to existing project stacks.

**Code Generation** are the coding habits you've learned are important across all projects.
Keep this short — 3–5 bullet points of non-obvious preferences.

**Shell / Scripts** is worth its own section if you frequently work in the terminal. Your
conventions here (jq vs. Python parsers, specific CLI tools, preferred scripting patterns)
apply to every project.

**Skills & Tools** documents which skills to activate and when. Without this, Claude has to
re-learn your tool preferences every session. Copy any activation rules from your project
CLAUDE.md files that you find yourself repeating.

**Environment** is low-maintenance context. Include anything that affects tool choices —
especially M1/ARM vs. x86 for container builds, available RAM for local model inference, etc.

---

## What to Strip If Simpler

If you're writing a minimal user-global file, keep only:
- **Identity & Context** (mandatory — everything else depends on this)
- **Communication** (saves the most repetition)
- **Stack defaults** (one line each for your 1–2 main languages)

---

## Common Pitfalls

- **Too many rules:** Every line costs context. If you add 10 rules, 3 will conflict.
  Write fewer, stronger rules.
- **Project-specific content:** Build commands and team conventions belong in the project
  file, not here.
- **"Always" and "never" without reasons:** Rules without reasoning get ignored when context
  argues against them. Write the why.
- **Outdated content:** Review this file every few months. Your stack evolves; your
  instruction file should too.
