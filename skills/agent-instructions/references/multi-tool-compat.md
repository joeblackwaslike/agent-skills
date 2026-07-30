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

The canonical pattern: **write everything in `AGENTS.md`** (plain Markdown — the lowest common
denominator every tool reads), then point the other tools' files at it. **Prefer symlinks over
copies** so there is a single source with zero sync drift.

**Claude Code + Codex:**

```
AGENTS.md      ← source of truth, plain Markdown
CLAUDE.md      ← contains only: @AGENTS.md
```

Claude Code inlines `AGENTS.md` via the `@` import; Codex reads `AGENTS.md` directly.

**Claude Code + Codex + Gemini CLI:**

```
AGENTS.md      ← source of truth, plain Markdown
CLAUDE.md      ← @AGENTS.md
GEMINI.md      → symlink to AGENTS.md
```

Gemini has no import syntax, so `GEMINI.md` can't be `@AGENTS.md`. A **symlink** keeps it byte-
identical to the source with nothing to sync:

```bash
ln -sf AGENTS.md GEMINI.md
```

**+ OpenCode:** OpenCode reads `AGENTS.md` directly — no extra file needed.

### Claude-only extras: keep them out of the shared file

Tool-specific wiring — which Claude Code skill/hook to invoke, `@import` composition — does
**not** belong in the shared `AGENTS.md`; Codex and Gemini would render it as dead text. Put it
in a separate `claude-extras.md` and compose it **only** on the Claude side:

```
AGENTS.md            ← universal standards (every tool)
claude-extras.md     ← Claude-only tool wiring (skills, hooks)
CLAUDE.md            ← @AGENTS.md
                       @claude-extras.md
```

Codex and Gemini get `AGENTS.md` alone (via symlink); Claude gets both. This keeps universal
rules truly universal while still using Claude-specific features.

### Progressive disclosure: keep the always-on file lean

`AGENTS.md` is read on **every** session across **every** tool, so it's expensive real estate.
Keep it to durable, universal rules; push heavy or contextual detail (framework/library lists,
verification gates, domain playbooks) into **skills** that load on demand. Register those skills
in each tool you use (e.g. `~/.claude/skills`, `~/.codex/skills`, `~/.gemini/skills`) so coverage
is preserved everywhere — then `AGENTS.md` can point to the skill instead of inlining the detail.

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

## Keeping the Files in Sync

**Prefer symlinks — then there is nothing to sync.** `CLAUDE.md` = `@AGENTS.md` (Claude
resolves it live), and `GEMINI.md` (plus any tool-specific `AGENTS.md` in `~/.codex`, `~/.gemini`,
etc.) are symlinks to the one canonical source:

```bash
ln -sf /path/to/AGENTS.md GEMINI.md
```

Editing `AGENTS.md` updates every tool instantly — no copy step, no drift.

**Use copies only when symlinks aren't viable** (Windows without symlink support, or a file that
must be committed as real content). Then automate the copy so it can't rot:

```makefile
sync-instructions:
	cp AGENTS.md GEMINI.md
```

**Parts that genuinely can't be symlinked** — tool-specific transforms, command/prompt
directories, MCP config blocks — belong in a small **projection script** (`compile.sh` or a
Makefile) that regenerates each tool's config from the canonical source. Keep it idempotent, and
back up any live config it overwrites.
