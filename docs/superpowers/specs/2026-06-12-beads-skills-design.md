# Design: beads skills (`working-with-beads` + `beads-operations`)

**Date:** 2026-06-12
**Repo:** `agent-skills`
**Status:** Approved design → implementation planning

## Context

`bd` (beads) is the task-management tool mandated across all of Joe's projects (per global CLAUDE.md: always `bd init --shared-server --skip-agents`; one shared Dolt server at `~/.beads/shared-server`, port 3308). It has a fast, sometimes-daily release cadence, so documentation goes stale quickly, and it has many nasty failure modes (stale ports, orphan/duplicate Dolt servers, db-name mismatch, per-project vs shared-server drift) that can derail an agent mid-task.

An existing third-party beads plugin (`beads-marketplace`, repo `gastownhall/beads`, plugin v1.0.4) ships **one** skill (`beads`) backed by 30 commands, 15 resource docs, a `task-agent`, and lifecycle hooks. It is useful but: (a) documents **none** of Joe's shared-server conventions, (b) has version drift (skill claims min bd `0.60.0`; installed brew bd is `1.0.5`), and (c) its CLI reference can fall out of sync with the installed binary.

**Goal:** two well-QA'd skills in the `agent-skills` repo that (1) keep an always-accurate beads reference pinned to the installed binary, and (2) capture Joe's conventions, workflows, and a comprehensive troubleshooting/maintenance runbook — replacing reliance on the drift-prone third-party plugin.

This builds directly on the repo's existing doc-fetch + freshness + Makefile/CI infrastructure and the `authoring-agent-skills` conventions (created 2026-06-11).

## Decisions (from brainstorming)

| Decision | Choice |
| --- | --- |
| Deliverable form | Two skills in `agent-skills` (not a plugin fork) |
| Reference source | **Both**, pinned to the version tag: CLI ref generated from the local pinned `bd` binary + repo `docs/*.md` fetched at the tag |
| Version pinning | `brew pin beads` now (freeze 1.0.5) + a tracked `PINNED_VERSION` file; bumps require signoff |
| Skill B porting depth | Curated + QA'd, Joe's conventions first; port only resource files that survive QA, refreshed against the pinned binary; defer niche features to the generated reference |
| Skill B name | `beads-operations` |
| Third-party plugin fate | **Keep** it (update to 1.0.5); our skills layer on top as the authoritative reference + conventions. Not uninstalled — its lifecycle hooks (auto-`bd prime`), 30 commands, and task-agent are machinery our skills don't replace. |
| Out of scope | `beadbox`/beadsBoard desktop GUI and `beadboard-driver` (separate backlog item) |

**Premise correction (verified 2026-06-12):** the third-party plugin is *not* abandoned/stale-by-design — its `plugin.json` is `1.0.5` at both the `v1.0.5` tag and `main`, tracking the binary in lockstep. Only the *local installed copy* lags at 1.0.4 (the marketplace clone is behind origin; no recent `/plugin update`). So "out of date" is a one-version local-snapshot issue, trivially fixed — it is **not** the justification for our own skills. The real justification is content: Joe's shared-server conventions are absent from the plugin, plus stronger QA, troubleshooting, and version-pinned docs.

## Architecture

### Skill A — `working-with-beads` (auto-generated doc-wrapper)

Follows the `authoring-agent-skills` doc-wrapper conventions.

```text
skills/working-with-beads/
├── SKILL.md                  # reference map + "how to use"; metadata.last_updated
├── PINNED_VERSION            # bd=1.0.5  plugin=1.0.4  tag=v1.0.5  (source of truth for the pin)
├── scripts/
│   └── update_docs.js        # reads PINNED_VERSION; generates + fetches; freshness-stamps
└── references/
    ├── cli/                  # GENERATED from local pinned bd
    │   ├── _index.md         # `bd help` top-level command tree
    │   └── <subcommand>.md   # `bd <cmd> --help` (and nested subcommands)
    ├── prime.md              # GENERATED: `bd prime` output
    └── docs/                 # FETCHED from gastownhall/beads @ tag v1.0.5
        ├── README.md
        └── *.md              # ADVANCED, ADO_CONFIG, ADAPTIVE_IDS, FEDERATION, ...
```

**`update_docs.js` behavior:**

1. Read `PINNED_VERSION` → `{ bd, plugin, tag }`.
2. **CLI generation (needs `bd`):** run `bd help`, parse the command tree, run `bd <cmd> --help` for each subcommand (recursing into nested groups like `dep`, `epic`, `gate`, `swarm`, `federation`), and `bd prime`. Write each as a `references/cli/*.md` / `prime.md` body, wrapped via `withFrontmatter` (source = `bd <cmd> --help @ <bd version>`).
   - If `bd` is **absent** (e.g. CI) or its `bd version` ≠ pinned `bd`: **skip CLI generation**, `log()` the skip, do **not** fail the run.
3. **Repo-docs fetch (no `bd` needed):** list `docs/` via the GitHub contents API **at `tag`**, fetch each raw `.md` + `README.md`, wrap via `withFrontmatter` (source = raw URL @ tag). Because the tag is pinned, content is stable → no weekly churn.

   **Resolved facts (verified 2026-06-12):** canonical repo is **`gastownhall/beads`** (`steveyegge/beads` 301-redirects to it — both API and brew homepage resolve here). Tag **`v1.0.5` exists** and matches the installed binary. There is **no root `llms.txt`**, so discovery is the GitHub contents API on `docs/` at the tag (`GET /repos/gastownhall/beads/contents/docs?ref=v1.0.5`), fetching each entry's `download_url`. The installed plugin lagging at 1.0.4 is expected and informational only.
4. Track `docsChanged`; if anything changed, `setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0,10))`.
5. Exit non-zero only on genuine failure (e.g. tag fetch fully fails); a missing `bd` is a graceful skip, not a failure.

**Makefile:** add `update-working-with-beads` target (+ `.PHONY`). Auto-discovered by `update-all`/CI via the existing glob. The graceful-skip keeps weekly CI green without `bd` installed.

**Pinning workflow:** `PINNED_VERSION` is the single source of truth. To bump: edit it, `brew unpin beads && brew upgrade beads && brew pin beads` (or install the target version), then `make update-working-with-beads`. All under explicit signoff.

### Skill B — `beads-operations` (curated usage + maintenance + troubleshooting)

Topic skill, hand-written and QA'd against the pinned binary.

```text
skills/beads-operations/
├── SKILL.md                      # decision framework (bd vs TodoWrite); conventions up front; metadata.last_updated
└── references/
    ├── conventions.md            # --shared-server, shared Dolt server (~/.beads/shared-server, port 3308), --skip-agents, BEADS_DOLT_SHARED_SERVER
    ├── workflows.md              # ready→claim→note→close; compaction recovery; temporal layering (bd + TodoWrite); discovered-from
    ├── troubleshooting.md        # THE big QA'd runbook (see below)
    └── long-term-maintenance.md  # version bumps, pin workflow, server lifecycle, backup/export, db hygiene, compaction
```

Niche features (chemistry/molecules, async gates, worktrees, swarm, federation) are **not** re-documented here — short pointers send the agent to `working-with-beads/references/cli/`.

### Troubleshooting runbook (`beads-operations/references/troubleshooting.md`)

Symptom-first; each entry = **symptom → diagnosis command → recovery steps**. Every asserted failure mode/flag is **verified against the pinned `bd`** before being written (no guessing).

Seeded from the plugin's `TROUBLESHOOTING.md` where still correct:

- Dolt server won't start (needs a git repo).
- Embedded vs server mode sync delay (3–5s).
- Cloud-storage filesystem locking → `disk I/O error (522)` / `database is locked` (move `.beads/` off iCloud/Dropbox/etc.).
- Database not initialized.

Plus the shared-server failure modes the plugin omits (Joe's real pain points):

- Stale ports / orphan or duplicate Dolt servers on 3308.
- Per-project server vs shared server drift; db-name mismatch.
- `--shared-server` not used → silent per-project server creation.
- `--skip-agents` interaction and the `bd` shell-function wrapper.
- Recovery for "beads got into a weird/nasty config mid-session."

## What we reuse vs rebuild

- **Reuse (QA'd / refreshed):** decision framework, temporal layering, workflow loop, dependency model, the correct parts of the plugin troubleshooting doc.
- **Rebuild from the binary:** anything asserting flags/commands/versions → generated from `bd help`/`--help`, so it can't be stale.
- **Drop:** version-specific claims, conventions that conflict with Joe's setup.

## Registration & freshness (per `authoring-agent-skills`)

- `AGENTS.md` — add both skills to the Available Skills table + a Common Workflows bullet ("Beads task management").
- `README.md` — add both to the skills list.
- `Makefile` — add `update-working-with-beads` (Skill B ships no fetch script → no target).
- Version bump — `.claude-plugin/plugin.json` + `.codex-plugin/plugin.json` (currently 1.8.0 → 1.9.0).
- Post-push — `/plugin update agent-skills@agent-marketplace`.

## Migration & activation (final phase, after the skills exist)

Keep the third-party plugin; make our skills authoritative.

1. **Update the installed plugin to 1.0.5** — `/plugin update beads@beads-marketplace` (brings the local 1.0.4 clone in lockstep with the binary). Keep its hooks (auto-`bd prime`), commands, and task-agent.
2. **Establish precedence** — `beads-operations/SKILL.md` carries an explicit note: it **supersedes the bundled `beads` skill's conventions** (especially the shared-server setup the plugin omits). This avoids conflicting guidance from two active beads skills.
3. **Repoint global activation** — update the "Beads for task management" section of `~/.claude/CLAUDE.md` (user-level) to reference `agent-skills:beads-operations` (conventions/workflows/troubleshooting) and `agent-skills:working-with-beads` (CLI reference), stating ours take precedence on conventions. Use the `agent-instructions` skill for this edit. **This is a user-level file outside the repo** — done as a distinct, signoff-gated step, not part of the repo commit.

## Verification

1. `make update-working-with-beads` locally generates `references/cli/*`, `prime.md`, and `references/docs/*` at tag `v1.0.5`, all freshness-stamped.
2. `make list-update-scripts` shows the beads script; a simulated no-`bd` env (or version mismatch) skips CLI generation gracefully without failing.
3. `brew list --pinned` shows `beads`; `PINNED_VERSION` matches `bd version`.
4. `beads-operations` references resolve (no dangling links); troubleshooting entries' diagnosis commands run against the real pinned `bd`.
5. Spot-check that generated CLI docs match `bd <cmd> --help` for a few commands (create, dep, gate, swarm).
6. Registration edits reviewed via `git diff`; commit under signoff.

## Out of scope

- Forking/replacing the third-party plugin's commands/agents/hooks.
- `beadbox`/beadsBoard desktop GUI and `beadboard-driver` (separate effort).
- Auto-bumping the pin (always signoff-gated).
