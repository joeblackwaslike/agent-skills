# Workflows — the core loop

The day-to-day beads loop. Commands verified against `bd 1.0.5`.

## The loop

```sh
bd ready                       # what's unblocked and available right now
bd show <id>                   # read full context before starting
bd update <id> --claim         # atomically claim: assignee=you, status=in_progress
# ... do the work, leaving notes as you go ...
bd note <id> "found X, doing Y"
bd close <id> --reason "shipped Z in <commit/PR>"
```

Key verified details:

- **Claim is `bd update <id> --claim`** — atomically sets assignee to you and status to `in_progress`; idempotent if you already own it. (`bd ready --claim` and `bd close --claim-next` claim the next ready issue in one step.)
- **`bd note <id> "text"`** appends a timestamped note. `bd update <id> --append-notes "text"` is the equivalent on the update command (with newline separation). Prefer `bd note` for quick progress logging.
- **`bd comment <id> "text"`** is a *separate* stream from notes — use comments for discussion/review, notes for working state. Both accept `--file` and `--stdin`.
- **`bd close <id> --reason "..."`** (alias `bd done`). Add `--suggest-next` to see newly-unblocked issues, or `--continue` to auto-advance within a molecule.

## Note discipline (this is what makes survival work)

Treat notes as the durable working log. Before a long operation, after each meaningful decision, and whenever you discover something non-obvious, drop a `bd note`. The bead's notes are what a future you (or a freshly-compacted agent) reads to resume without re-deriving context.

A bead with good notes survives a context reset. A bead with just a title does not.

## Compaction recovery

When an agent's context is compacted mid-task, it can forget the bd workflow and the specific work state. `bd prime` restores it:

```sh
bd prime                  # AI-optimized workflow context (auto-detects MCP vs CLI mode)
bd prime --memories-only  # for compact-hook contexts: only persistent memories
```

`bd prime` is wired into SessionStart/PreCompact hooks (it has a `--hook-json` mode for exactly this). It outputs the workflow reminder plus persistent memories so the agent re-anchors. The note discipline above is what makes recovery actually useful — `prime` restores *how* to work; your notes restore *where you were*.

To resume a specific task after compaction: `bd prime`, then `bd show <id>` (re-read your own notes), then continue.

## Temporal layering with TodoWrite

Two different time horizons, two different tools:

| Tool | Horizon | Survives compaction? |
| --- | --- | --- |
| **bead** (`bd`) | this week / this month, cross-session | yes |
| **TodoWrite** | this hour, current turn | no |

The pattern: read a bead → spin up TodoWrite items for the immediate sub-steps → as you finish them, fold the durable outcome back into the bead's notes → TodoWrite is discarded, the bead persists. Don't put month-scale work in TodoWrite (it vanishes); don't put hour-scale checklist items in beads (they're noise in the durable graph).

## Side-quests: filing discovered work

When you discover work mid-task that shouldn't derail the current bead, file it and link it so the graph records *why* it exists:

```sh
bd create "Refactor the retry logic" -t task
bd dep add <new-id> <current-id> --type discovered-from
```

`discovered-from` is a verified dependency type (`bd dep add --type` accepts `blocks|tracks|related|parent-child|discovered-from|until|caused-by|validates|relates-to|supersedes`). It does **not** block — it's a provenance edge saying "this surfaced while working on `<current-id>`". Use `blocks` instead when the new work genuinely gates the current one.

Verify the wiring: `bd dep tree <id>` or `bd dep list <id>`.
