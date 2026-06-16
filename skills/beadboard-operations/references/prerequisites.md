---
title: "Prerequisites"
source: "https://github.com/joeblackwaslike/beadboard-ops/blob/main/website/docs/prerequisites.md"
fetched_at: "2026-06-16T13:44:17.041Z"
sha256: "d9a05db38ced8b491255540c1989862fc0db1908ca616f9bd9dba2ff6e72925c"
---

# Prerequisites

Install these before running `beadboard-ops`.

| Prerequisite | Version | Status Check | Required |
| --- | --- | --- | --- |
| Node.js | 22.x | `node -v` | ✅ Required |
| Dolt | Latest | `dolt version` | ✅ Required |
| MySQL Client | Any | `mysql --version` | ⚠️ Optional (dolt includes one) |
| BeadBoard | Latest | `ls ~/github/.../beadboard/package.json` | ✅ Required |
| Beads CLI (bd) | Latest | `bd --version` | ✅ Required |
| BeadBoard CLI (bb) | Latest | `bb --help` | ✅ Required |
| Shared Dolt Server | Running | `launchctl list \| grep dolt` | ✅ Required |
| Environment Variables | Set | `echo $BEADS_DOLT_SHARED_SERVER` | ✅ Required |

## Node.js 22

BeadBoard's Next.js 15 dashboard requires Node 22. Install via nvm:

```bash
nvm install 22
nvm use 22
```

**Verify:** `node -v` should print `v22.x.x`.

```bash
$ node -v
v22.16.0
```

:::warning Node Version Matters
Next.js 15 is incompatible with Node 26+. Always use Node 22 for BeadBoard. The launchd wrapper script handles this via `nvm use 22`.
:::

## Dolt

The shared Dolt server stores all beads data.

```bash
brew install dolt
```

**Verify:** `dolt version` should print a version string.

```bash
$ dolt version
dolt version 1.35.6
```

## MySQL Client

Used by `verify-sync.sh` for direct Dolt queries. The `dolt` binary includes a MySQL-compatible client, but you can also install standalone:

```bash
brew install mysql-client
```

**Verify:** `mysql --version` or `dolt sql` both work.

```bash
$ mysql --version
mysql  Ver 9.0.1 for macos14.4 on arm64 (Homebrew)
```

## BeadBoard

Clone the BeadBoard repo (upstream `jordanhindo`):

```bash
mkdir -p ~/github/joeblackwaslike/jordanhindo
git clone https://github.com/jordanhindo/beadboard.git ~/github/joeblackwaslike/jordanhindo/beadboard
cd ~/github/joeblackwaslike/jordanhindo/beadboard
npm install
```

**Verify:** `ls ~/github/joeblackwaslike/jordanhindo/beadboard/package.json` exists.

## Beads CLI (bd)

```bash
npm install -g beads-cli
```

**Verify:** `bd --version` prints a version string.

```bash
$ bd --version
beads-cli 0.9.2
```

## BeadBoard CLI (bb)

Install globally from the BeadBoard checkout:

```bash
cd ~/github/joeblackwaslike/jordanhindo/beadboard
npm install -g .
```

**Verify:** `bb --help` shows available commands.

```bash
$ bb --help
Usage: beadboard [command] [options]

Commands:
  start          Start the BeadBoard dashboard
  daemon         Daemon management
  agent          Agent operations
  ...
```

## Shared Dolt Server

The `com.beads.shared-dolt-server` launchd service must be running. This is managed separately from beadboard-ops.

**Verify:**

```bash
launchctl list | grep com.beads.shared-dolt-server
```

Should show the service with exit code `0` or a PID. If not loaded, check that the plist exists at `~/Library/LaunchAgents/com.beads.shared-dolt-server.plist`.

```bash
$ launchctl list | grep com.beads.shared-dolt-server
91234	0	com.beads.shared-dolt-server
```

:::tip Check Server Health
If the service shows a non-zero exit code, restart it:

```bash
launchctl kickstart -k gui/$(id -u)/com.beads.shared-dolt-server
```

:::

## Environment Variables

These should already be in `~/.zshenv`:

```bash
export BEADS_DOLT_SHARED_SERVER=1
export BEADS_DOLT_SERVER_PORT=3308
```

**Verify:** `echo $BEADS_DOLT_SHARED_SERVER` prints `1`.

If missing, add them:

```bash
echo 'export BEADS_DOLT_SHARED_SERVER=1' >> ~/.zshenv
echo 'export BEADS_DOLT_SERVER_PORT=3308' >> ~/.zshenv
source ~/.zshenv
```

:::info Why These Variables?
`BEADS_DOLT_SHARED_SERVER=1` prevents `bd init` from creating per-project Dolt instances that drift and break. `BEADS_DOLT_SERVER_PORT=3308` ensures all tools connect to the same port.
:::
