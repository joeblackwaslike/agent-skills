---
title: "CLI Commands"
source: "https://github.com/joeblackwaslike/beadboard-ops/blob/main/website/docs/reference/cli-commands.md"
fetched_at: "2026-06-16T13:44:17.041Z"
sha256: "0a19018fb3590d1ef5a4a5a329a4b20b28df80709d53e317331010b025d40d1b"
---

# CLI Commands

## bd (Beads CLI)

<details>
<summary>Task Management (create, list, show, update, close, link, delete)</summary>

### Task Management

```bash
bd create --title="<title>" --description="<desc>" --type=task --priority=<n> --label="<labels>"
```

Create a new bead. Labels use comma-separated `key:value` pairs (e.g. `gt:agent,role:orchestrator`).

```bash
bd list [--status <status>] [--label <label>] [--assignee <id>]
```

List beads, optionally filtered by status, label, or assignee.

```bash
bd show <bead-id>
```

Display full details for a single bead.

```bash
bd update <bead-id> --status <status> [--assignee <id>] [--notes "<text>"]
```

Update bead fields. Common statuses: `open`, `in_progress`, `done`.

```bash
bd close <bead-id> --reason "<completion summary>"
```

Close a bead with a completion reason.

```bash
bd link <bead-a> <bead-b>
```

Create a relationship between two beads.

```bash
bd delete <bead-id>
```

Delete a bead (use with caution).

:::danger Destructive Operation
`bd delete` permanently removes a bead and all its associated data. There is no undo. Consider `bd close` instead for completed work.
:::

</details>

<details>
<summary>Agent State (state, heartbeat, show)</summary>

### Agent State

```bash
bd agent state <agent-bead-id> <state>
```

Set agent lifecycle state. Valid states: `spawning`, `running`, `working`, `stuck`, `done`, `stopped`.

```bash
bd agent heartbeat <agent-bead-id>
```

Record an agent heartbeat (proves liveness).

```bash
bd agent show <agent-bead-id>
```

Display agent bead details and current state.

</details>

<details>
<summary>Slots (set, clear)</summary>

### Slots

```bash
bd slot set <agent-bead-id> hook <bead-id>
```

Assign a work bead to an agent's `hook` slot.

```bash
bd slot clear <agent-bead-id> hook
```

Clear the agent's `hook` slot after completing work.

</details>

<details>
<summary>Mail (inbox, send, read, ack)</summary>

### Mail

```bash
bd mail inbox
```

List unread messages for the current agent (identified by `BB_AGENT` env var).

```bash
bd mail send --to <agent-id> --bead <bead-id> --category <CAT> --subject "<short>" --body "<details>"
```

Send a coordination message. Categories: `HANDOFF`, `BLOCKED`, `DECISION`, `INFO`.

```bash
bd mail read <message-id>
```

Read a specific message.

```bash
bd mail ack <message-id>
```

Acknowledge (mark as read) a message.

</details>

<details>
<summary>Dependencies and Graph (dep add, list, tree, cycles, relate, unrelate)</summary>

### Dependencies and Graph

```bash
bd dep add <blocked-id> <blocker-id>     # Add dependency
bd dep list <bead-id>                     # List dependencies
bd dep tree <bead-id>                     # Show dependency tree
bd dep cycles                            # Detect circular dependencies
bd dep relate <bead-a> <bead-b>          # Create non-blocking relation
bd dep unrelate <bead-a> <bead-b>        # Remove relation
```

</details>

<details>
<summary>Gates (list, check, show, resolve)</summary>

### Gates

```bash
bd gate list [--all]      # List open gates (--all includes resolved)
bd gate check [--type=bead]  # Check gate conditions
bd gate show <gate-id>    # Show gate details
bd gate resolve <gate-id> # Resolve a gate
```

</details>

<details>
<summary>Swarm and Molecules (swarm create, validate, status, list, mol show, pour, ready, progress, stale)</summary>

### Swarm and Molecules

```bash
bd swarm create <epic-id> [--coordinator <rig>] [--force]
bd swarm validate <epic-id>
bd swarm status <swarm-id>
bd swarm list

bd mol show <formula-or-mol-id>
bd mol pour <formula-id> --var key=value
bd mol ready
bd mol progress <mol-id>
bd mol stale
```

</details>

<details>
<summary>Config (set, get)</summary>

### Config

```bash
bd config set <key> <value>
```

Set a beads configuration value. Example: `bd config set export.auto true`.

```bash
bd config get <key>
```

Read a configuration value.

</details>

<details>
<summary>Hooks (install, run)</summary>

### Hooks

```bash
bd hooks install
```

Install git hooks that sync Dolt data on commit/checkout. In Husky repos, add `command -v bd >/dev/null 2>&1 && bd hooks run <hook> "$@" || true` to tracked `.husky/<hook>` files instead.

```bash
bd hooks run <hook-name> [args...]
```

Run a specific hook manually.

:::tip Husky Repos
In Husky repos, `bd hooks install` writes to the gitignored `.husky/_` directory, which gets wiped on `pnpm install`. Add beads integration to tracked `.husky/<hook>` files instead.
:::

</details>

<details>
<summary>Export (export)</summary>

### Export

```bash
bd export -o .beads/issues.jsonl
```

Export beads from Dolt to JSONL. With `bd config set export.auto true`, this runs automatically on git hooks.

</details>

<details>
<summary>Init (init)</summary>

### Init

```bash
bd init --shared-server --skip-agents
```

Initialize beads in a project. Always use `--shared-server` to connect to the shared Dolt server on `:3308` instead of spawning a per-project instance.

:::warning Always Use --shared-server
Running `bd init` without `--shared-server` creates a per-project Dolt server that will drift and break. The `BEADS_DOLT_SHARED_SERVER=1` env var provides a safety net, but the flag is belt-and-suspenders.
:::

</details>

<details>
<summary>Comments (comments, comments add)</summary>

### Comments

```bash
bd comments <bead-id>                    # List comments
bd comments add <bead-id> "<text>"       # Add inline comment
bd comments add <bead-id> -f <file>      # Add comment from file
```

</details>

<details>
<summary>Ready (ready)</summary>

### Ready

```bash
bd ready
```

List beads that are ready to work (all blockers resolved).

</details>

---

## bb (BeadBoard CLI)

:::info Two CLIs, One System
`bd` manages tasks (beads). `bb` manages agent coordination. They work together -- `bd` writes data, `bb` routes agents. Both are required for the full BeadBoard workflow.
:::

```bash
bb agent register --name <role>
```

Register an agent with the BeadBoard coordination system.

```bash
bb agent state --set <state>
```

Set the current agent's state in BeadBoard.

```bash
bb agent reserve --scope <scope>
```

Reserve a work scope for the current agent.

```bash
bb start
```

Start the BeadBoard dashboard (Next.js on `:3000`).

```bash
bb daemon start
```

Start the execution daemon (currently a forward-compatible stub; see [Architecture](/docs/architecture/components/daemon)).

---

## launchctl

The four patterns used for BeadBoard service management:

```bash
# Check service status
launchctl list | grep -E 'beadboard|beads'

# Restart a service (force kill + relaunch)
launchctl kickstart -k gui/$(id -u)/com.beadboard.dashboard

# Load a service (first time or after unload)
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.beadboard.dashboard.plist

# Unload a service
launchctl bootout gui/$(id -u)/com.beadboard.dashboard
```

Replace `com.beadboard.dashboard` with `com.beadboard.daemon` or `com.beads.shared-dolt-server` as needed.

---

## Ops Scripts

| Script | Purpose |
|--------|---------|
| `install.sh` | Makes wrappers executable, kills anything on `:3000`, symlinks plists into `~/Library/LaunchAgents/`, bootstraps both launchd services, symlinks the beadboard-driver skill into `~/.claude/skills/` and `~/.codex/skills/`. Idempotent. |
| `uninstall.sh` | Bootouts both launchd services, removes plist symlinks from `~/Library/LaunchAgents/`, removes skill symlinks. Leaves the BeadBoard checkout and Dolt service untouched. |
| `bin/start-dashboard.sh` | nvm wrapper that resolves Node 22, then runs `npm run dev` in the BeadBoard checkout. Used as the launchd `ProgramArguments` for `com.beadboard.dashboard`. |
| `bin/start-bb-daemon.sh` | Forward-compatible daemon supervisor. Runs `beadboard daemon start`, looks for a standalone daemon process via `pgrep`, and either blocks on its PID (real supervisor mode) or exits cleanly (current stub mode). |
| `bin/verify-sync.sh` | Dolt-to-JSONL sync auditor. Connects to the shared Dolt server, discovers project databases, compares bead counts, checks hook and export status. See [verify-sync reference](/docs/reference/verify-sync). |
