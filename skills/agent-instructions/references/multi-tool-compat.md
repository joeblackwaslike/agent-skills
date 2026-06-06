# Multi-Tool Compatibility for Agent Instruction Files

When a project is used with more than one AI coding assistant — Claude Code, Codex, Gemini
CLI, and OpenCode — the instruction files need to work across all of them. The tools differ
in which file names they read, and critically in what syntax they support.

---

## Per-Tool File Reference

| Tool | File name | Format | Import syntax | Personal override |
| --- | --- | --- | --- | --- |
| Claude Code | `CLAUDE.md` or `.claude/CLAUDE.md` | Markdown | `@filename` supported | `CLAUDE.local.md` |
| Codex CLI | `AGENTS.md` | Plain Markdown | Not supported | — |
| Gemini CLI | `GEMINI.md` | Plain Markdown | Not supported | — |
| OpenCode | `AGENTS.md` or `CLAUDE.md` | Plain Markdown | Not supported | — |

**The critical difference:** Only Claude Code supports `@filename` import syntax. All other
tools treat `@CLAUDE.md` or `@AGENTS.md` literally as text — it does nothing.

---

## Decision Matrix

### Single-Tool Projects

| Tool only | What to create |
| --- | --- |
| Claude Code | `CLAUDE.md` — use `@import` freely |
| Codex | `AGENTS.md` — plain Markdown, no imports |
| Gemini CLI | `GEMINI.md` — plain Markdown |
| OpenCode | `AGENTS.md` — plain Markdown |

### Multi-Tool Projects

The canonical pattern for multi-tool projects: **write everything in `AGENTS.md`**. Make
`CLAUDE.md` a one-line redirect. Create `GEMINI.md` as a copy (or import from AGENTS.md if
Gemini gains import support in the future).

**Claude Code + Codex:**

```
AGENTS.md      ← source of truth, plain Markdown
CLAUDE.md      ← contains only: @AGENTS.md
```

Claude Code inlines `AGENTS.md` via the `@` import. Codex reads `AGENTS.md` directly.

**Claude Code + Codex + Gemini CLI:**

```
AGENTS.md      ← source of truth, plain Markdown
CLAUDE.md      ← @AGENTS.md
GEMINI.md      ← copy of AGENTS.md (or symlink)
```

**Claude Code + Codex + Gemini + OpenCode:**

```
AGENTS.md      ← source of truth, plain Markdown
CLAUDE.md      ← @AGENTS.md
GEMINI.md      ← copy of AGENTS.md
```

OpenCode reads `AGENTS.md` directly; no extra file needed.

---

## Codex Configuration

To let Codex fall back to `CLAUDE.md` when `AGENTS.md` is absent, add this to
`~/.codex/config.toml`:

```toml
project_doc_fallback_filenames = ["CLAUDE.md"]
```

This is useful for projects that predate Codex support — no need to create `AGENTS.md` if
`CLAUDE.md` already exists and is plain Markdown.

---

## @import Syntax (Claude Code Only)

Claude Code resolves `@` references at session start:

```markdown
@README.md                    # relative path from the instruction file's location
@path/to/conventions.md       # subdirectory path
@~/.claude/shared/stack.md    # absolute path
```

Limitations:
- Supports up to 4 nesting levels
- Only relative and absolute paths — no URLs
- Only Claude Code — all other tools ignore `@` lines entirely

**Common patterns:**

Redirect to source of truth:
```markdown
@AGENTS.md
```

Compose from shared files in a monorepo:
```markdown
@docs/conventions.md
@.claude/stack-preferences.md
```

Inline the project README for context:
```markdown
@README.md

## Additional Instructions
...
```

---

## Writing for Plain Markdown Compatibility

If your instruction file needs to work across all tools, write it as plain Markdown — no
`@import` lines. Structure it clearly with headers, bullets, and code blocks. Avoid Claude
Code-specific features like `@` imports or `.claude/rules/` path scoping (those are ignored
by other tools anyway).

The AGENTS.md source-of-truth pattern already enforces this: since AGENTS.md must be plain
Markdown for Codex, the content you write there will work everywhere.

---

## Updating Multi-Tool Files

When you update the source-of-truth file (`AGENTS.md`), remember to sync any copies:

- `GEMINI.md` — manual copy, or automate with a Makefile target
- `CLAUDE.md` — no update needed if it just contains `@AGENTS.md`

A simple sync command:

```bash
cp AGENTS.md GEMINI.md
```

Or in a Makefile:

```makefile
sync-instructions:
	cp AGENTS.md GEMINI.md
```
