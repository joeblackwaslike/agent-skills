# Scope Hierarchy for AI Instruction Files

AI coding assistants load instruction files from multiple locations, combining them at
session start. Understanding which level to use — and why — is the most important decision
when setting up agent instructions.

---

## The Five Scope Levels

### 1. Managed Policy (highest priority)

| | |
| --- | --- |
| **File** | macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md` |
| | Linux/WSL: `/etc/claude-code/CLAUDE.md` |
| | Windows: `C:\Program Files\ClaudeCode\CLAUDE.md` |
| **Set by** | System administrator |
| **Applies to** | All users on the machine |
| **Overridable** | No — takes precedence over all user files |

Use for organization-wide security policies, compliance requirements, or coding standards that
must apply to everyone. Most individual developers never touch this level.

---

### 2. User / Global

| | |
| --- | --- |
| **File** | `~/.claude/CLAUDE.md` (Claude Code) |
| | `~/.codex/AGENTS.md` (Codex — less common) |
| **Set by** | You |
| **Applies to** | All projects on your machine |
| **Overridable** | By project-level files |

This is your personal identity layer. Put things here that are true across every project:
your communication preferences, default stack choices, global skill activation rules,
hardware notes, and tool conventions. The goal is that you never have to re-explain who you
are or how you like to work.

**What belongs here:**
- Your role, background, and technical depth
- Communication preferences (verbosity, format, asking vs. doing)
- Default languages, frameworks, and async stance
- Global skill invocation rules
- IDE, OS, and environment notes
- Cross-project tool conventions (linter settings, package managers, etc.)

**What does NOT belong here:**
- Build commands or project-specific paths (they vary)
- Team conventions (they belong in the project file)
- Anything that would confuse Claude in an unrelated project

---

### 3. Project Root

| | |
| --- | --- |
| **File** | `./CLAUDE.md` or `./.claude/CLAUDE.md` |
| **Also** | `./AGENTS.md` for Codex; see `multi-tool-compat.md` |
| **Set by** | Project maintainer (usually checked into version control) |
| **Applies to** | All collaborators on this project |
| **Overridable** | By `CLAUDE.local.md` and `.claude/rules/` |

This is your team's shared context. It should contain things a new contributor would need to
know that aren't discoverable from the code itself: non-obvious conventions, architectural
decisions, build/test commands, and workflow habits.

**What belongs here:**
- Build, test, lint, and dev-server commands
- Project structure (if non-obvious)
- Key architectural decisions and their reasons
- Non-obvious conventions ("we use `zod` for all runtime validation, never manual checks")
- Team workflow rules (PR process, commit format, etc.)
- Skill activation rules specific to this project

**What does NOT belong here:**
- Your personal preferences (use `CLAUDE.local.md`)
- Multi-step tutorials or runbooks (use a skill or docs)
- Reference material (use `@import` or a skill)

---

### 4. Local / Personal (gitignored)

| | |
| --- | --- |
| **File** | `./CLAUDE.local.md` |
| **Set by** | You |
| **Applies to** | You, on this repo only |
| **Shared** | Never — add to `.gitignore` |

Use when you work on a team project and have personal preferences that shouldn't pollute
the shared instruction file: your preferred test data paths, local URL overrides, sandbox
credentials, etc.

---

### 5. Subdirectory / Path-Scoped

Claude Code supports loading additional instruction files in two ways:

**Option A: Nested `CLAUDE.md`**

A `CLAUDE.md` file anywhere in the directory tree loads automatically when Claude reads
files in that directory. Good for monorepo packages with distinct conventions.

```
myrepo/
├── CLAUDE.md          ← always loaded
├── packages/
│   ├── api/
│   │   └── CLAUDE.md  ← loaded when Claude touches files under packages/api/
│   └── web/
│       └── CLAUDE.md  ← loaded when Claude touches files under packages/web/
```

**Option B: `.claude/rules/` with path frontmatter**

Create `.md` files in `.claude/rules/`. Each file includes YAML frontmatter with a `paths`
field; Claude loads it only when working in matching files. This is better when you want
rules to live in one place rather than scattered across the tree.

```
.claude/rules/api-conventions.md
.claude/rules/frontend-patterns.md
```

```markdown
---
paths:
  - "src/api/**/*.ts"
  - "src/handlers/**"
---

Use async/await throughout. Never use callbacks.
All handlers must return `ApiResponse<T>`.
```

Supported glob patterns: `**`, `*`, `?`, and character classes.

---

## Load Order and Precedence

Claude Code loads files in this order, with later entries taking precedence:

```
1. Managed policy  (~highest priority)
2. User global     (~/.claude/CLAUDE.md)
3. Project root    (./CLAUDE.md or ./.claude/CLAUDE.md)
4. CLAUDE.local.md (./CLAUDE.local.md)
5. .claude/rules/* + nested CLAUDE.md files  (loaded as needed)
```

Files don't override each other wholesale — all loaded content is combined. Later-loaded
files simply appear later in the combined context, which can influence how Claude weighs
conflicting instructions.

---

## Tool Equivalents

| Level | Claude Code | Codex | Gemini CLI | OpenCode |
| --- | --- | --- | --- | --- |
| User-global | `~/.claude/CLAUDE.md` | `~/.codex/AGENTS.md` | `~/.gemini/GEMINI.md` | `~/.opencode/config` |
| Project root | `CLAUDE.md` | `AGENTS.md` | `GEMINI.md` | `AGENTS.md` or `CLAUDE.md` |
| Local/personal | `CLAUDE.local.md` | — | — | — |
| Subdirectory | Nested `CLAUDE.md` or `.claude/rules/*.md` | Nested `AGENTS.md` | — | — |
| Import syntax | `@filename` (supported) | Not supported | Not supported | Not supported |

---

## @import Syntax (Claude Code Only)

Claude Code supports inlining other files with `@`:

```markdown
@README.md                   ← relative to the instruction file's location
@path/to/conventions.md      ← subdirectory path
@~/.claude/shared-stack.md   ← absolute path
```

Imports are resolved at session start. Supports up to 4 nesting levels. Use this to:
- Keep a single source of truth shared across multiple instruction files
- Import a project README into the CLAUDE.md without duplicating it
- Share conventions across a monorepo's root and package-level files
