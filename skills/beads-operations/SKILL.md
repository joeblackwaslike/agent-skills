---
name: beads-operations
description: >-
  Use when running, setting up or fixing beads (`bd`) day to day: choosing bd over TodoWrite, the
  shared Dolt server on port 3308, claiming and closing work, recovering after compaction, a broken
  beads state (stale port, locked database, duplicate server), or a noisy `bd prime` injection. Not
  for a raw CLI flag lookup (working-with-beads).
metadata:
  last_updated: "2026-06-22"
---

# Beads operations

Opinionated guidance for *running* beads the way Joe does, plus a troubleshooting/maintenance runbook. For the exhaustive command reference, use the `working-with-beads` skill.

> **Precedence:** This skill **supersedes the conventions in the bundled third-party `beads` plugin skill.** Where they differ (especially server setup), follow this skill. The plugin is kept for its lifecycle hooks, commands, and task-agent — not its convention guidance.

## Decision: bd vs TodoWrite

Ask "will I need this context in 2 weeks / across sessions?" — **yes → `bd`** (durable, dependency-aware, survives compaction); **no → TodoWrite** (this-hour working copy). They layer: read a bead → spin up TodoWrite items for the current hour → update the bead's notes → TodoWrite is discarded, the bead persists.

## Reference map

- [`references/conventions.md`](references/conventions.md) — the **mandatory** setup: `--shared-server`, the shared Dolt server, port 3308, `--skip-agents`, env vars, the `bd` shell wrapper.
- [`references/workflows.md`](references/workflows.md) — the core loop, compaction recovery, discovered-from side-quests.
- [`references/troubleshooting.md`](references/troubleshooting.md) — symptom → diagnosis → recovery for the nasty states.
- [`references/long-term-maintenance.md`](references/long-term-maintenance.md) — version pin/bump, server lifecycle, backup/export, db hygiene, compaction.
- [`references/prime-customization.md`](references/prime-customization.md) — what `bd prime` injects, how `bd setup claude` wires the SessionStart/PreCompact hooks, the flag/config matrix, the `PRIME.md` override + resolution order, git-state modes, Joe's neutral PRIME.md, and the un-gunkify runbook.

## BeadBoard (the dashboard on top of `bd`)

When `bd` work is coordinated through **BeadBoard** (Joe's multi-agent dashboard): the agent-side operating contract — the Iron Law, the session lifecycle, mail, evidence — is the `beadboard-driver` skill. Running its macOS launchd services (the `:3000` dashboard, the daemon), the dashboard HTTP API, the Dolt↔JSONL sync, and the `verify-sync.sh` diagnostic is the `beadboard-operations` skill. Neither replaces this skill's `bd` conventions; they layer on top.

## When beads is broken

Go straight to [`references/troubleshooting.md`](references/troubleshooting.md). Do **not** improvise schema/server fixes — beads' shared-server states have specific recoveries, and guessing makes them worse.

## Taming `bd prime`

The session-start "Beads Workflow Context / SESSION CLOSE PROTOCOL" preamble is emitted by `bd prime`, wired as a SessionStart (and PreCompact) hook by `bd setup claude` — **not** `bd hooks install`. It ships a conservative "don't push without explicit authority" git policy and is easily duplicated across project + global `settings.json`. To change the wording, neutralize the policy, dedupe the hooks, or understand the flags / `PRIME.md` override and its resolution order, see [`references/prime-customization.md`](references/prime-customization.md).

## Niche features

Chemistry/molecules, async gates, worktrees, swarm, federation — not duplicated here. See `working-with-beads/references/cli/` (`mol.md`, `gate.md`, `worktree.md`, `swarm.md`, `federation.md`).
