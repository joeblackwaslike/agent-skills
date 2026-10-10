---
source: "bd prime @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "73345c71dac25e20594f418b281ec7518ff8070f9ca65b027e8965d1c4b28d58"
---

[bd prime] If this output is truncated by your host, read the full persisted hook output before continuing; it may contain project memories and session rules not visible in the preview.

# Beads Workflow Context

> **Context Recovery**: Run `bd prime` after compaction, clear, or new session
> Hooks auto-call this in Claude Code and Codex when a beads workspace is resolved

# 🚨 SESSION CLOSE PROTOCOL 🚨

**CRITICAL**: Before saying "done" or "complete", you MUST run this checklist:

```
[ ] 1. bd close <id1> <id2> ...   (close completed issues)
[ ] 2. run quality gates          (tests, linters, builds when relevant)
[ ] 3. git status                 (check what changed)
[ ] 4. commit / push / bd dolt push as the task and repo call for
```

## Core Rules
- **Default**: Use beads for ALL task tracking (`bd create`, `bd ready`, `bd close`)
- **Prohibited**: Do NOT use TodoWrite, TaskCreate, or markdown files for task tracking
- **Workflow**: Create beads issue BEFORE writing code, mark in_progress when starting
- **Memory**: Use `bd remember "insight"` for persistent knowledge across sessions. Do NOT use MEMORY.md files — they fragment across accounts. Search with `bd memories <keyword>`.
- **Git & sync**: Commit, push, and `bd dolt push` per the task and repo conventions — follow the current instructions; no fixed conservative default.
- Session management: check `bd ready` for available work

## Essential Commands

### Finding Work
- `bd ready` - Show issues ready to work (no blockers)
- `bd list --status=open` - All open issues
- `bd list --status=in_progress` - Your active work
- `bd show <id>` - Detailed issue view with dependencies

### Creating & Updating
- `bd create --title="..." --description="..." --type=task|bug|feature --priority=2` - New issue
  - Priority: 0-4 or P0-P4 (0=critical, 2=medium, 4=backlog)
- `bd update <id> --claim` - Claim work
- `bd update <id> --title/--description/--notes/--design` - Update fields inline
- `bd close <id1> <id2> ...` - Close multiple issues at once
- `bd close <id> --reason="explanation"` - Close with reason
- **WARNING**: Do NOT use `bd edit` - it opens $EDITOR (vim/nano) which blocks agents

### Dependencies & Blocking
- `bd dep add <issue> <depends-on>` - Add dependency
- `bd blocked` - Show all blocked issues

### Sync & Collaboration
- `bd dolt push` / `bd dolt pull` - Push/pull beads to/from Dolt remote
- `bd search <query>` - Search issues by keyword

### Project Health
- `bd stats` / `bd doctor` / `bd doctor --check=conventions`

### Quality Tools
- `bd create --validate` / `--acceptance=` / `--design=` / `--notes=`
- `bd lint` - Check existing issues for missing sections

### Lifecycle & Hygiene
- `bd defer` / `bd supersede` / `bd stale` / `bd orphans` / `bd preflight` / `bd human <id>`

### Structured Workflows
- `bd formula list` / `bd mol pour <name>`

## Common Workflows

**Starting work:** `bd ready` → `bd show <id>` → `bd update <id> --claim`

**Completing work:**
```bash
bd close <id1> <id2> ...
git status
git add . && git commit -m "..."
bd dolt push
git push
```

**Creating dependent work:**
```bash
bd create --title="Implement X" --type=feature
bd create --title="Test X" --type=task
bd dep add <test-id> <feature-id>
```

## Persistent Memories

Skipped: beads storage unavailable (failed to open database: failed to initialize schema: refusing to auto-apply 17 pending schema migrations to a remote-backed database (v49 -> v66): migrating cl…) — persistent memories were NOT injected this session. Run `bd doctor`; if the store is a Dolt server, check it is running and reachable.
