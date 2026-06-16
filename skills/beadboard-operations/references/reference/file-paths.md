---
title: "File Paths & Conventions"
source: "https://github.com/joeblackwaslike/beadboard-ops/blob/main/website/docs/reference/file-paths.md"
fetched_at: "2026-06-16T13:44:17.041Z"
sha256: "e331449ad754853b8b0ca65e8c3a6aad80e2da6c5dab4ccec694b669438c4e56"
---

# File Paths & Conventions

## Repositories

| What | Path |
|------|------|
| beadboard-ops repo | `~/github/joeblackwaslike/beadboard-ops/` |
| BeadBoard checkout | `~/github/joeblackwaslike/jordanhindo/beadboard/` |

:::info Two Repos
beadboard-ops (this repo) contains operational scaffolding. The BeadBoard repo contains the actual application code, dashboard, and driver skill source.
:::

## Shared Dolt Server

| What | Path |
|------|------|
| Server data directory | `~/.beads/shared-server/dolt/` |
| Server config | `~/.beads/shared-server/dolt/config.yaml` |
| Server log | `~/.beads/shared-server/dolt-server.log` |
| Server startup script | `~/.beads/start-shared-server.sh` |

## Service Logs

| What | Path |
|------|------|
| Dashboard stdout | `/tmp/beadboard-dashboard.log` |
| Dashboard stderr | `/tmp/beadboard-dashboard.err` |
| Daemon stdout | `/tmp/beadboard-daemon.log` |
| Daemon stderr | `/tmp/beadboard-daemon.err` |

:::warning Logs in /tmp/ Are Ephemeral
macOS clears `/tmp/` on reboot. If you need to preserve logs for debugging, copy them before restarting. Dolt logs at `~/.beads/shared-server/` persist across reboots.
:::

## launchd Plists

| What | Path |
|------|------|
| Dashboard plist | `~/Library/LaunchAgents/com.beadboard.dashboard.plist` (symlink to `beadboard-ops/launchd/`) |
| Daemon plist | `~/Library/LaunchAgents/com.beadboard.daemon.plist` (symlink to `beadboard-ops/launchd/`) |
| Dolt server plist | `~/Library/LaunchAgents/com.beads.shared-dolt-server.plist` |

## Driver Skill

| What | Path |
|------|------|
| Claude Code skill | `~/.claude/skills/beadboard-driver` (symlink) |
| Codex CLI skill | `~/.codex/skills/beadboard-driver` (symlink) |
| Skill source | `~/github/joeblackwaslike/jordanhindo/beadboard/skills/beadboard-driver/` |

## Per-Project Beads Data

| What | Path |
|------|------|
| Beads data directory | `<project>/.beads/` |
| Issues export | `<project>/.beads/issues.jsonl` |
| Export state | `<project>/.beads/export-state.json` |
| Git hooks | `<project>/.beads/hooks/` |

:::note Database Naming Convention
Dolt database names use underscores where project directories use hyphens. Example: `my-cool-project` becomes `my_cool_project` in Dolt. The `verify-sync.sh` script handles this mapping automatically.
:::

## Conventions

- **Database naming**: Dolt database names use underscores where the project directory uses hyphens. Example: project `my-project` maps to database `my_project`.
- **Skill symlinks**: `install.sh` creates symlinks (not copies) so the skill always reflects the current BeadBoard checkout.
- **Plist symlinks**: `install.sh` symlinks plists from the ops repo into `~/Library/LaunchAgents/` so edits to the source plists take effect on next `launchctl bootstrap`.
- **Log location**: `/tmp/` is used for logs because launchd services run outside the repo directory and `/tmp/` is always writable. Logs are cleared on reboot.

:::tip Symlinks, Not Copies
Both plist files and driver skill paths use symlinks. This means edits to the source files in the beadboard-ops and BeadBoard repos take effect immediately (after a service restart for plists).
:::
