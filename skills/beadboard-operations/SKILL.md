---
name: beadboard-operations
description: Use when running, operating, or troubleshooting the BeadBoard dashboard and its macOS launchd services — `com.beadboard.dashboard` (Next.js UI on :3000), `com.beadboard.daemon`, install.sh/uninstall.sh, the dashboard HTTP API, the Dolt↔JSONL sync architecture (`export.auto`, the `.beads/issues.jsonl` file-watcher), the `verify-sync.sh` diagnostic, env vars (`BEADS_DOLT_SHARED_SERVER`, `BEADS_DOLT_SERVER_PORT`, `BB_AGENT`), service file paths, and the operating/maintenance runbooks. Invoke on "dashboard won't start", "beadboard service", "launchctl beadboard", "is BeadBoard running", "verify-sync", "JSONL drift", "kickstart the dashboard", "EADDRINUSE on 3000". This is the ops/infra layer. For the agent-side coordination contract (the Iron Law, session lifecycle, mail categories, agent states, evidence flow) use `beadboard-driver`; for day-to-day `bd` conventions/troubleshooting use `beads-operations`; for the shared Dolt server internals use `working-with-dolt`.
metadata:
  last_updated: "2026-06-16"
---

# BeadBoard operations

The **ops / infrastructure** layer for [BeadBoard](https://github.com/jordanhindo/beadboard) — how it runs as always-on macOS launchd services on Joe's machine. This skill mirrors the docs from the [beadboard-ops](https://github.com/joeblackwaslike/beadboard-ops) repo (the operational glue: launchd units, install/uninstall scripts, and driver-skill wiring; it does not fork BeadBoard itself).

> **Two layers, two skills.** BeadBoard splits cleanly:
> - **Agent coordination contract** (the Iron Law, the 9-step session lifecycle, mail categories, agent states, evidence) → the **`beadboard-driver`** skill. *This skill does not duplicate it.*
> - **Operations / infrastructure** (services, dashboard, daemon, Dolt↔JSONL sync, diagnostics, runbooks) → **this skill.**

## What beadboard-ops manages

| Unit | What | Logs |
| --- | --- | --- |
| `com.beadboard.dashboard` | Next.js 15 dashboard on `:3000` (KeepAlive, auto-restart) | `/tmp/beadboard-dashboard.{log,err}` |
| `com.beadboard.daemon` | Execution daemon (RunAtLoad one-shot, forward-compatible stub) | `/tmp/beadboard-daemon.{log,err}` |
| `com.beads.shared-dolt-server` | Shared Dolt SQL server on `:3308` (managed separately) | `~/.beads/shared-server/dolt-server.log` |

## Quick health check

```bash
launchctl list | grep beadboard                                  # 2 units, exit code 0
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000   # -> 200
launchctl kickstart -k gui/$(id -u)/com.beadboard.dashboard      # force-restart dashboard
tail -f /tmp/beadboard-dashboard.err                             # dashboard boot errors
./bin/verify-sync.sh                                             # audit Dolt <-> JSONL across all projects
```

## Reference map

All files in [`references/`](references/) are auto-fetched from the beadboard-ops repo (`website/docs/`) and freshness-stamped (`source`/`fetched_at`/`sha256`). Re-sync with `make update-beadboard-operations`.

**Start here**
- [`references/overview.md`](references/overview.md) · [`references/prerequisites.md`](references/prerequisites.md) · [`references/installation.md`](references/installation.md)

**Architecture**
- [`references/architecture/system-overview.md`](references/architecture/system-overview.md) — component map, data flow, the two-CLI (`bd`/`bb`) model
- [`references/architecture/data-flow.md`](references/architecture/data-flow.md) — the 8-step bead lifecycle; the dual-write (Dolt + JSONL) pattern
- [`references/architecture/dolt-integration.md`](references/architecture/dolt-integration.md) — `export.auto`, the JSONL-as-notification-channel design, drift prevention, the sync audit/remediation
- Components: [`beads-cli`](references/architecture/components/beads-cli.md) · [`dashboard`](references/architecture/components/dashboard.md) · [`daemon`](references/architecture/components/daemon.md) · [`dolt-server`](references/architecture/components/dolt-server.md) · [`driver-skill`](references/architecture/components/driver-skill.md)

**Integration**
- [`references/integration/launchd-services.md`](references/integration/launchd-services.md) — the three LaunchAgents, KeepAlive/RunAtLoad choices, wrapper scripts, `launchctl` lifecycle
- [`references/integration/dashboard-api.md`](references/integration/dashboard-api.md) — the dashboard's HTTP API surface (agents, beads, runtime, swarm, missions, SSE)
- [`references/integration/agent-integration.md`](references/integration/agent-integration.md) — the agent session protocol (cross-reference; the contract itself lives in `beadboard-driver`)
- [`references/integration/plugin-surface-area.md`](references/integration/plugin-surface-area.md) — where plugins/MCP/hooks could extend BeadBoard

**Reference**
- [`references/reference/cli-commands.md`](references/reference/cli-commands.md) — `bd`/`bb`/`launchctl`/ops-script command index
- [`references/reference/environment-variables.md`](references/reference/environment-variables.md) — `BEADS_DOLT_SHARED_SERVER`, `BEADS_DOLT_SERVER_PORT`, `BB_AGENT`, launchd env (`~/.zshenv`, not `~/.zshrc`)
- [`references/reference/file-paths.md`](references/reference/file-paths.md) — repos, Dolt data dir, plists, skill symlinks, per-project `.beads/`
- [`references/reference/verify-sync.md`](references/reference/verify-sync.md) — the sync diagnostic: columns, sync statuses, exit codes, remediation

**Runbooks**
- [`references/runbooks/operating.md`](references/runbooks/operating.md) — day-to-day: health checks, restarts, live logs, tracked projects, agent status, port conflicts
- [`references/runbooks/maintenance.md`](references/runbooks/maintenance.md) — diagnostics: "dashboard won't start" tree, exit codes, EADDRINUSE/MODULE_NOT_FOUND/nvm, Dolt locks, upgrades, `dolt_gc()`

## Related skills

- **`beadboard-driver`** — the agent-side operating contract (Iron Law, session lifecycle, mail, evidence). Use it when an agent is *executing work* through BeadBoard; use **this** skill when you're *operating the infrastructure* underneath it.
- **`beads-operations`** — Joe's `bd` conventions (shared-server setup, the ready→claim→note→close loop) and the bd-level troubleshooting runbook.
- **`working-with-beads`** — the exact `bd` CLI reference at the pinned version.
- **`working-with-dolt`** — the `dolt` CLI + the shared `dolt sql-server` runbook (port 3308) that this skill's services depend on.
