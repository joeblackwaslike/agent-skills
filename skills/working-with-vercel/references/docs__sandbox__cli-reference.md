---
title: Sandbox CLI Reference
product: vercel
url: /docs/sandbox/cli-reference
canonical_url: "https://vercel.com/docs/sandbox/cli-reference"
last_updated: 2026-06-15
type: reference
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/python-sdk-reference
  - /docs/project-configuration/general-settings
  - /docs/sandbox/concepts/tags
  - /docs/sandbox/concepts/drives
summary: Based on the Docker CLI, you can use the Sandbox CLI to manage your Vercel Sandbox from the command line.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/cli-reference.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "9b238bb7ecd907d3283409eb606844ebaf222bf588032aff582b9a3bf0f904a8"
---

# Sandbox CLI Reference

The Sandbox CLI, based on the Docker CLI, allows you to manage sandboxes, execute commands, copy files, and more from your terminal. This page provides a complete reference for all available commands.

Use the CLI for manual testing and debugging, or use the [JS SDK](/docs/sandbox/sdk-reference) or [Python SDK](/docs/sandbox/python-sdk-reference) to automate sandbox workflows in your application.

Sandboxes are identified by **name** (unique within your project) and are **persistent by default**: when stopped, the filesystem is snapshotted and restored on the next resume. Use `sandbox remove` to delete a sandbox permanently.

## Installation

Install the Sandbox CLI globally to use all commands:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i sandbox
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i sandbox
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i sandbox
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i sandbox
    ```
  </Code>
</CodeBlock>

You can invoke the CLI using the `sandbox` or `sbx` commands in your terminal.

## Authentication

Log in to use Vercel Sandbox:

```bash filename="Terminal"
sandbox login
```

## `sandbox --help`

Get help information for all available sandbox commands:

```bash filename="terminal"
sandbox <subcommand>
```

**Description:** Interfacing with Vercel Sandbox

**Available subcommands:**

- [`list`](#sandbox-list): List all sandboxes for the specified account and project. \[alias: `ls`]
- [`create`](#sandbox-create): Create a sandbox in the specified account and project.
- [`fork`](#sandbox-fork): Fork an existing sandbox into a new one, inheriting its config and current snapshot.
- [`run`](#sandbox-run): Create or resume a sandbox and run a command in it.
- [`exec`](#sandbox-exec): Execute a command in an existing sandbox.
- [`connect`](#sandbox-connect): Start an interactive shell in an existing sandbox. \[aliases: `ssh`, `shell`]
- [`copy`](#sandbox-copy): Copy files between your local filesystem and a remote sandbox. \[alias: `cp`]
- [`stop`](#sandbox-stop): Stop the current session of one or more sandboxes.
- [`remove`](#sandbox-remove): Permanently delete one or more sandboxes and all their snapshots.
- [`config`](#sandbox-config): View and update sandbox configuration (resources, timeout, persistence, snapshot retention, network policy, tags).
- [`sessions`](#sandbox-sessions): Inspect VM sessions for a sandbox.
- [`snapshot`](#sandbox-snapshot): Take a snapshot of the filesystem of a sandbox.
- [`snapshots`](#sandbox-snapshots): Manage sandbox snapshots.
- [`drives`](#sandbox-drives): Manage sandbox drives.
- [`login`](#sandbox-login): Log in to the Sandbox CLI.
- [`logout`](#sandbox-logout): Log out of the Sandbox CLI.

For more help, try running `sandbox &lt;subcommand&gt; --help`

## `sandbox list`

List all sandboxes for the specified account and project.

```bash filename="terminal"
sandbox list [OPTIONS]
```

### Sandbox list example

```bash filename="terminal"
# List all running sandboxes
sandbox list

# List all sandboxes (including stopped ones)
sandbox list --all

# List sandboxes for a specific project
sandbox list --project my-nextjs-app

# Filter by name prefix and sort
sandbox list --name-prefix ci- --sort-by name --sort-order asc

# Filter by tag
sandbox list --tag env=staging --limit 100

# Page through results using the cursor reported by the previous page
sandbox list --cursor <token>
```

### Sandbox list options

| Option                | Alias    | Description                                                                                                                                                      |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>` | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`      | `--team` | The team you want to use with this command.                                                                                                                      |
| `--name-prefix <p>`   | -        | Filter sandboxes whose name starts with this prefix. Forces `--sort-by name`.                                                                                    |
| `--sort-by <field>`   | -        | Sort by `createdAt` (default), `name`, or `statusUpdatedAt`.                                                                                                     |
| `--sort-order <ord>`  | -        | Sort direction. `asc` or `desc` (default).                                                                                                                       |
| `--tag <key=value>`   | -        | Filter sandboxes by tag. Repeatable, but `Sandbox.list` currently filters on a single tag.                                                                       |
| `--limit <n>`         | -        | Maximum number of sandboxes per page. Default 50.                                                                                                                |
| `--cursor <token>`    | -        | Pagination cursor from a previous page.                                                                                                                          |

### Sandbox list flags

| Flag     | Short | Description                                                                        |
| -------- | ----- | ---------------------------------------------------------------------------------- |
| `--all`  | `-a`  | Show all sandboxes, including stopped ones (we only show running ones by default). |
| `--help` | `-h`  | Display help information.                                                          |

## `sandbox create`

Create a sandbox in the specified account and project.

```bash filename="terminal"
sandbox create [OPTIONS]
```

### Sandbox create example

```bash filename="terminal"
# Create a basic Node.js sandbox
sandbox create

# Create a sandbox with an explicit name
sandbox create --name my-sandbox

# Create a sandbox with 1 vCPU and open an interactive shell
sandbox create --vcpus 1 --connect

# Create a Python sandbox with custom timeout
sandbox create --runtime python3.13 --timeout 1h

# Create sandbox with port forwarding
sandbox create --publish-port 8080 --project my-project

# Create sandbox silently (no output)
sandbox create --silent

# Create sandbox from a snapshot
sandbox create --snapshot snap_abc123

# Create a non-persistent (ephemeral) sandbox
sandbox create --name ci-job --non-persistent

# Tag a sandbox at creation time
sandbox create --name my-sandbox --tag env=staging --tag team=infra

# Set snapshot expiration and retention
sandbox create --name my-sandbox --snapshot-expiration 7d --keep-last-snapshots 1

# Create sandbox without Internet access
sandbox create --network-policy deny-all

# Create sandbox with restricted Internet access (limited to Vercel's AI gateway)
sandbox create --allowed-domain ai-gateway.vercel.sh

# Mount a drive with read-only access (requires private beta access and beta CLI)
sandbox create --mount cache:/data:read-only
```

### Sandbox create options

| Option                              | Alias    | Description                                                                                                                                                      |
| ----------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`                   | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>`               | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`                    | `--team` | The team you want to use with this command.                                                                                                                      |
| `--name <name>`                     | -        | Sandbox name (unique per project). Generated if omitted. Names cannot be changed after creation.                                                                 |
| `--runtime <runtime>`               | -        | Choose between Node.js ('node26', 'node24', or 'node22') or Python ('python3.13'). We'll use Node.js 24 by default.                                              |
| `--timeout <duration>`              | -        | How long the sandbox can run before we automatically stop it. Examples: '5m', '1h'. We'll stop it after 5 minutes by default.                                    |
| `--publish-port <port>`             | `-p`     | Make a port from your sandbox accessible via a public URL. Repeatable.                                                                                           |
| `--snapshot <snapshot_id>`          | `-s`     | Create the sandbox from a previously saved snapshot. To fork from another sandbox by name, use [`sandbox fork`](#sandbox-fork) instead.                          |
| `--env <key=value>`                 | `-e`     | Default environment variables for sandbox commands. Repeatable.                                                                                                  |
| `--tag <key=value>`                 | `-t`     | Key-value tag. Up to five. Repeatable. See [Tags](/docs/sandbox/concepts/tags).                                                                                  |
| `--mount <drive:path[:mode]>`       | -        | Mount a drive onto the sandbox. Repeatable. `mode` can be `read-write` (default) or `read-only`. See [Drives](/docs/sandbox/concepts/drives) to access the beta. |
| `--snapshot-expiration <duration>`  | -        | Default snapshot TTL (e.g. `7d`, `30d`). Use `none` or `0` for no expiration.                                                                                    |
| `--keep-last-snapshots <count>`     | -        | Retention policy: keep only the N (1–10) most recent snapshots of this sandbox.                                                                                  |
| `--keep-last-snapshots-for <dur>`   | -        | Expiration applied to kept snapshots. Use `none` or `0` for no expiration.                                                                                       |
| `--delete-evicted-snapshots <bool>` | -        | `true` (default) deletes evicted snapshots immediately; `false` keeps them until their existing expiration. See [Snapshot retention](#snapshot-retention).       |
| `--network-policy <mode>`           | -        | Base network mode to start the sandbox with ('allow-all' - default or 'deny-all'). Leave unset if using more specific rules.                                     |
| `--allowed-domain <domain>`         | -        | List of domains (or pattern) to allow access to (only applicable in 'custom' mode). Use wildcard `*` to match multiple domains or subdomains.                    |
| `--allowed-cidr <cidr>`             | -        | List of address ranges to allow access to (only applicable in 'custom' mode). Traffic to those addresses will bypass domain matching.                            |
| `--denied-cidr <cidr>`              | -        | List of address ranges to deny access to (only applicable in 'custom' mode). Those take precedence over allowed domains and addresses.                           |

### Sandbox create flags

| Flag               | Short | Description                                                                  |
| ------------------ | ----- | ---------------------------------------------------------------------------- |
| `--non-persistent` | -     | Disable filesystem persistence between sessions. The sandbox is ephemeral.   |
| `--silent`         | -     | Create the sandbox without writing the sandbox name to stdout.               |
| `--connect`        | -     | Start an interactive shell session after creating the sandbox.               |
| `--help`           | `-h`  | Display help information.                                                    |

### Snapshot retention

A persistent sandbox snapshots its filesystem every time a session stops, so its snapshots accumulate over time. Use `--keep-last-snapshots` to keep only the N most recent. When a new snapshot brings the total above the limit, the oldest snapshots are no longer kept. The `--delete-evicted-snapshots` flag controls what happens to them: delete them immediately, or leave them to expire on their own.

- `--keep-last-snapshots <count>`: keep only the N most recent snapshots. `count` must be an integer from 1 to 10. This flag enables the retention policy, and the two flags below require it.
- `--keep-last-snapshots-for <duration>`: the expiration applied to the snapshots you keep, for example `7d` or `30d`. Use `none` or `0` for no expiration. When omitted, kept snapshots fall back to the sandbox's default snapshot expiration (`--snapshot-expiration`).
- `--delete-evicted-snapshots <true|false>`: what happens to a snapshot once it is no longer among the most recent kept ones. `true` (the default) deletes it immediately; `false` keeps it until its existing expiration instead.

## `sandbox fork`

Fork an existing sandbox into a new one. The fork is seeded from the source sandbox's current snapshot and inherits its config. Any option you pass overrides the copied value. If the source has no current snapshot, the fork falls back to creating a fresh sandbox with the source's runtime plus the copied config.

`env` is **not** copied (encrypted server-side); pass `--env` to set environment variables on the fork. Tags passed via `--tag` fully replace the source's tags (no per-key merge).

```bash filename="terminal"
sandbox fork [OPTIONS] <source>
```

### Sandbox fork example

```bash filename="terminal"
# Fork with every supported field copied from the source
sandbox fork my-source

# Override the name and bump vCPUs; env vars must be re-supplied
sandbox fork my-source --name my-forked-sandbox --vcpus 4 --env FOO=1
```

### Sandbox fork options

| Option                              | Alias    | Description                                                                                                                                                      |
| ----------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`                   | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>`               | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`                    | `--team` | The team you want to use with this command.                                                                                                                      |
| `--name <name>`                     | -        | Name for the forked sandbox. Must be unique per project. Generated if omitted.                                                                                   |
| `--timeout <duration>`              | -        | Override the session timeout inherited from the source.                                                                                                          |
| `--vcpus <count>`                   | -        | Override the vCPU count. Each vCPU includes 2048 MB of memory.                                                                                                   |
| `--publish-port <port>`             | `-p`     | Publish a port. Repeatable. Replaces the inherited port list if provided.                                                                                        |
| `--env <key=value>`                 | `-e`     | Environment variables for the fork. Not copied from the source. Repeatable.                                                                                      |
| `--tag <key=value>`                 | `-t`     | Tag the fork. Repeatable. When provided, fully replaces the tags copied from the source.                                                                         |
| `--snapshot-expiration <duration>`  | -        | Override the default snapshot TTL (e.g. `7d`, `30d`). Use `none` or `0` for no expiration.                                                                       |
| `--keep-last-snapshots <count>`     | -        | Override the retention policy (1–10).                                                                                                                            |
| `--keep-last-snapshots-for <dur>`   | -        | Expiration applied to kept snapshots. Use `none` or `0` for no expiration.                                                                                       |
| `--delete-evicted-snapshots <bool>` | -        | `true` (default) deletes evicted snapshots immediately; `false` keeps them until their existing expiration. See [Snapshot retention](#snapshot-retention).        |
| `--network-policy <mode>`           | -        | Override the base network mode (`allow-all` or `deny-all`). Leave unset to use the inherited rules or `--allowed-domain` / `--allowed-cidr` / `--denied-cidr`.   |
| `--allowed-domain <domain>`         | -        | Domain to allow traffic to (creates a custom network policy). Supports wildcards.                                                                                |
| `--allowed-cidr <cidr>`             | -        | CIDR to allow traffic to. Takes precedence over `--allowed-domain`.                                                                                              |
| `--denied-cidr <cidr>`              | -        | CIDR to deny traffic to. Takes precedence over allowed domains and CIDRs.                                                                                        |

### Sandbox fork flags

| Flag               | Short | Description                                                                  |
| ------------------ | ----- | ---------------------------------------------------------------------------- |
| `--non-persistent` | -     | Disable filesystem persistence between sessions on the fork.                 |
| `--silent`         | -     | Create the fork without writing its name to stdout.                          |
| `--connect`        | -     | Start an interactive shell session after creating the fork.                  |
| `--help`           | `-h`  | Display help information.                                                    |

### Sandbox fork arguments

| Argument   | Description                                |
| ---------- | ------------------------------------------ |
| `<source>` | Name of the sandbox to fork from.          |

## `sandbox config`

View and update sandbox configuration. Each subcommand updates one parameter; all parameters are also available together through the SDK's [`sandbox.update()`](/docs/sandbox/sdk-reference#sandbox.update).

```bash filename="terminal"
sandbox config <subcommand> <name> [VALUE | OPTIONS]
```

### Sandbox config subcommands

| Subcommand                                                   | Description                                                                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `sandbox config list <name>`                                 | Print the current configuration of a sandbox.                                                                |
| `sandbox config vcpus <name> <count>`                        | Update vCPU allocation. Each vCPU includes 2048 MB RAM.                                                      |
| `sandbox config timeout <name> <duration>`                   | Update the session timeout (e.g. `5m`, `1h`).                                                                |
| `sandbox config persistent <name> <true\|false>`             | Enable or disable filesystem persistence between sessions.                                                   |
| `sandbox config snapshot-expiration <name> <duration\|none>` | Update the default snapshot TTL.                                                                             |
| `sandbox config keep-last-snapshots <name> <count>`          | Keep only the N (1–10) most recent snapshots of this sandbox.                                                |
| `sandbox config keep-last-snapshots-for <name> <dur\|none>`  | Expiration applied to kept snapshots.                                                                        |
| `sandbox config delete-evicted-snapshots <name> <bool>`      | Whether evicted snapshots are deleted immediately.                                                           |
| `sandbox config current-snapshot <name> <snapshot-id>`       | Roll back the sandbox to a specific snapshot. New sessions resume from it.                                   |
| `sandbox config network-policy <name> [OPTIONS]`             | Update the network firewall (see options below).                                                             |
| `sandbox config ports <name> [-p PORT ...]`                  | Replace the exposed port list. Omit `-p` to clear all ports.                                                 |
| `sandbox config tags <name> [--tag key=value ...]`           | Replace the tag set. Omit `--tag` to clear all tags.                                                         |

### Sandbox config example

```bash filename="terminal"
# Inspect the current configuration of a sandbox
sandbox config list my-sandbox

# Update vCPUs and timeout
sandbox config vcpus my-sandbox 4
sandbox config timeout my-sandbox 30m

# Toggle persistence
sandbox config persistent my-sandbox false

# Update snapshot retention
sandbox config snapshot-expiration my-sandbox 14d
sandbox config keep-last-snapshots my-sandbox 1

# Replace the exposed port list
sandbox config ports my-sandbox -p 3000 -p 8000

# Clear all exposed ports
sandbox config ports my-sandbox

# Replace the tag set
sandbox config tags my-sandbox --tag env=production --tag team=infra

# Roll back to a previous snapshot
sandbox config current-snapshot my-sandbox snap_abc123

# Update the sandbox firewall to deny all egress traffic
sandbox config network-policy my-sandbox --network-policy deny-all

# Update the sandbox firewall to allow all egress traffic
sandbox config network-policy my-sandbox --mode allow-all

# Update the sandbox firewall to specific rules
sandbox config network-policy my-sandbox --allowed-domain vercel.com --allowed-domain ai-gateway.vercel.sh
```

### Sandbox config network-policy options

| Option                      | Alias    | Description                                                                                                                                   |
| --------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `--network-policy <mode>`   | `--mode` | Base network mode to update the sandbox to ('allow-all' - default, 'deny-all'). Leave unset if using more specific rules.                     |
| `--allowed-domain <domain>` | -        | List of domains (or pattern) to allow access to (only applicable in 'custom' mode). Use wildcard `*` to match multiple domains or subdomains. |
| `--allowed-cidr <cidr>`     | -        | List of address ranges to allow access to (only applicable in 'custom' mode). Traffic to those addresses will bypass domain matching.         |
| `--denied-cidr <cidr>`      | -        | List of address ranges to deny access to (only applicable in 'custom' mode). Those take precedence over allowed domains and addresses.        |

### Sandbox config network-policy flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### Sandbox config network-policy arguments

| Argument | Description                       |
| -------- | --------------------------------- |
| `<name>` | The sandbox to update (by name).  |

## `sandbox copy`

Copy files between your local filesystem and a remote sandbox.

```bash filename="terminal"
sandbox copy [OPTIONS] <SOURCE> <DESTINATION>
```

### Sandbox copy example

```bash filename="terminal"
# Copy file from local to sandbox
sandbox copy ./local-file.txt my-sandbox:/app/remote-file.txt

# Copy file from sandbox to local
sandbox copy my-sandbox:/app/output.log ./output.log

# Copy directory from sandbox to local
sandbox copy my-sandbox:/app/dist/ ./build/
```

### Sandbox copy options

| Option                | Alias    | Description                                                                                                                                                      |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>` | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`      | `--team` | The team you want to use with this command.                                                                                                                      |

### Sandbox copy flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### Sandbox copy arguments

| Argument        | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `<SOURCE>`      | Source path. Either a local file, or `<name>:<path>` for a sandbox file.     |
| `<DESTINATION>` | Destination path. Either a local file, or `<name>:<path>` for a sandbox file. |

## `sandbox exec`

Execute a command in an existing sandbox.

```bash filename="terminal"
sandbox exec [OPTIONS] <name> -- <command> [...args]
```

### Sandbox exec example

```bash filename="terminal"
# Execute a simple command in a sandbox
sandbox exec my-sandbox -- ls -la

# Run with environment variables
sandbox exec --env DEBUG=true my-sandbox -- npm test

# Execute interactively with sudo
sandbox exec --interactive --sudo my-sandbox -- sh

# Run command in specific working directory
sandbox exec --workdir /app my-sandbox -- python script.py

# Stop the current session after the command exits
sandbox exec --stop my-sandbox -- npm build
```

### Sandbox exec options

| Option                  | Alias    | Description                                                                                                                                                      |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`       | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>`   | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`        | `--team` | The team you want to use with this command.                                                                                                                      |
| `--workdir <directory>` | `-w`     | Set the directory where you want the command to run.                                                                                                             |
| `--env <key=value>`     | `-e`     | Set environment variables for your command.                                                                                                                      |

### Sandbox exec flags

| Flag            | Short | Description                                        |
| --------------- | ----- | -------------------------------------------------- |
| `--sudo`        | -     | Run the command with admin privileges.             |
| `--interactive` | `-i`  | Run the command in an interactive shell.           |
| `--tty`         | `-t`  | Enable terminal features for interactive commands. |
| `--stop`        | -     | Stop the current session when the command exits.   |
| `--help`        | `-h`  | Display help information.                          |

### Sandbox exec arguments

| Argument    | Description                                                |
| ----------- | ---------------------------------------------------------- |
| `<name>`    | The name of the sandbox where you want to run the command. |
| `<command>` | The command you want to run.                               |
| `[...args]` | Additional arguments for your command.                     |

## `sandbox connect`

Start an interactive shell in an existing sandbox.

```bash filename="terminal"
sandbox connect [OPTIONS] <name>
```

### Sandbox connect example

```bash filename="terminal"
# Connect to an existing sandbox
sandbox connect my-sandbox

# Connect with a specific working directory
sandbox connect --workdir /app my-sandbox

# Connect with environment variables and sudo
sandbox connect --env DEBUG=true --sudo my-sandbox
```

### Sandbox connect options

| Option                  | Alias    | Description                                                                                                                                                      |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`       | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>`   | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`        | `--team` | The team you want to use with this command.                                                                                                                      |
| `--workdir <directory>` | `-w`     | Set the directory where you want the command to run.                                                                                                             |
| `--env <key=value>`     | `-e`     | Set environment variables for your command.                                                                                                                      |

### Sandbox connect flags

| Flag                  | Short | Description                                                                                                  |
| --------------------- | ----- | ------------------------------------------------------------------------------------------------------------ |
| `--sudo`              | -     | Run the command with admin privileges.                                                                       |
| `--no-extend-timeout` | -     | Do not extend the sandbox timeout while running an interactive command. Only affects interactive executions. |
| `--help`              | `-h`  | Display help information.                                                                                    |

### Sandbox connect arguments

| Argument | Description                                              |
| -------- | -------------------------------------------------------- |
| `<name>` | The name of the sandbox where you want to start a shell. |

## `sandbox stop`

Stop the current session of one or more sandboxes. For persistent sandboxes (the default), the filesystem is snapshotted first so the sandbox can be resumed later with the same name. To delete a sandbox permanently, use [`sandbox remove`](#sandbox-remove).

```bash filename="terminal"
sandbox stop [OPTIONS] <name> [...name]
```

### Sandbox stop example

```bash filename="terminal"
# Stop a single sandbox
sandbox stop my-sandbox

# Stop multiple sandboxes
sandbox stop my-sandbox another-sandbox

# Stop sandbox for a specific project
sandbox stop --project my-project my-sandbox
```

### Sandbox stop options

| Option                | Alias    | Description                                                                                                                                                      |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>` | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`      | `--team` | The team you want to use with this command.                                                                                                                      |

### Sandbox stop flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### Sandbox stop arguments

| Argument    | Description                               |
| ----------- | ----------------------------------------- |
| `<name>`    | The name of the sandbox you want to stop. |
| `[...name]` | Additional sandbox names to stop.         |

## `sandbox remove`

Permanently delete one or more sandboxes, along with all of their snapshots and sessions. Once removed, a sandbox cannot be recovered. Use this instead of `sandbox stop` when you no longer need the sandbox at all.

```bash filename="terminal"
sandbox remove <name> [...name]
```

### Sandbox remove example

```bash filename="terminal"
# Delete a single sandbox
sandbox remove my-sandbox

# Delete multiple sandboxes
sandbox remove my-sandbox another-sandbox
```

### Sandbox remove arguments

| Argument    | Description                                 |
| ----------- | ------------------------------------------- |
| `<name>`    | The name of the sandbox you want to delete. |
| `[...name]` | Additional sandbox names to delete.         |

## `sandbox run`

Create (or resume) a sandbox and run a command in it. When `--name` matches an existing sandbox, the sandbox is resumed and any create-only flags are ignored.

```bash filename="terminal"
sandbox run [OPTIONS] -- <command> [...args]
```

### Sandbox run example

```bash filename="terminal"
# Run a simple Node.js script in a fresh sandbox
sandbox run -- node --version

# Run with custom environment and timeout
sandbox run --env NODE_ENV=production --timeout 10m -- npm start

# Run interactively with port forwarding
sandbox run --interactive --publish-port 3000 --tty -- npm run dev

# Resume an existing sandbox if it exists; otherwise create it
sandbox run --name my-sandbox -- npm test

# Stop the current session when the command exits
sandbox run --name my-sandbox --stop -- npm build

# Permanently delete the sandbox after the command exits
sandbox run --rm -- python3 script.py

# Run a command with a read-only drive mounted (requires private beta access and beta CLI)
sandbox run --mount cache:/data:read-only -- ls /data
```

### Sandbox run options

`sandbox run` accepts every option from [`sandbox create`](#sandbox-create) plus every option from [`sandbox exec`](#sandbox-exec). The most common are repeated below.

| Option                        | Alias    | Description                                                                                                                                                      |
| ----------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--project <project>`         | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`              | `--team` | The team you want to use with this command.                                                                                                                      |
| `--name <name>`               | -        | Resume an existing sandbox with this name, or create it if it doesn't exist.                                                                                     |
| `--runtime <runtime>`         | -        | Choose between Node.js ('node26', 'node24', or 'node22') or Python ('python3.13'). We'll use Node.js 24 by default.                                              |
| `--timeout <duration>`        | -        | How long the sandbox can run before we automatically stop it. Examples: '5m', '1h'. We'll stop it after 5 minutes by default.                                    |
| `--publish-port <port>`       | `-p`     | Make a port from your sandbox accessible via a public URL.                                                                                                       |
| `--workdir <directory>`       | `-w`     | Set the directory where you want the command to run.                                                                                                             |
| `--env <key=value>`           | `-e`     | Set environment variables for your command.                                                                                                                      |
| `--tag <key=value>`           | `-t`     | Key-value tag. Repeatable. See [Tags](/docs/sandbox/concepts/tags).                                                                                              |
| `--mount <drive:path[:mode]>` | -        | Mount a drive onto the sandbox. Repeatable. `mode` can be `read-write` (default) or `read-only`. See [Drives](/docs/sandbox/concepts/drives) to access the beta. |

### Sandbox run flags

| `--token <token>`             | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |

| Flag               | Short | Description                                                                              |
| ------------------ | ----- | ---------------------------------------------------------------------------------------- |
| `--sudo`           | -     | Run the command with admin privileges.                                                   |
| `--interactive`    | `-i`  | Run the command in an interactive shell.                                                 |
| `--tty`            | `-t`  | Enable terminal features for interactive commands.                                       |
| `--non-persistent` | -     | Disable filesystem persistence between sessions (when creating a new sandbox).           |
| `--stop`           | -     | Stop the current session when the command exits. Mutually exclusive with `--rm`.         |
| `--rm`             | -     | Permanently delete the sandbox when the command exits. Mutually exclusive with `--stop`. |
| `--help`           | `-h`  | Display help information.                                                                |

### Sandbox run arguments

| Argument    | Description                            |
| ----------- | -------------------------------------- |
| `<command>` | The command you want to run.           |
| `[...args]` | Additional arguments for your command. |

## `sandbox snapshot`

Take a snapshot of the filesystem of a sandbox. Stops the sandbox automatically.

```bash filename="terminal"
sandbox snapshot [OPTIONS] <name>
```

### Sandbox snapshot example

```bash filename="terminal"
# Create a snapshot of a running sandbox
sandbox snapshot my-sandbox --stop

# Create a snapshot that expires 14 days after its last use
sandbox snapshot my-sandbox --stop --expiration 14d

# Create a snapshot that never expires
sandbox snapshot my-sandbox --stop --expiration 0
```

### Sandbox snapshot options

| Option                      | Alias    | Description                                                                                                                                                      |
| --------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`           | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>`       | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`            | `--team` | The team you want to use with this command.                                                                                                                      |
| `--expiration <expiration>` | -        | The snapshot [expiration period](/docs/sandbox/concepts/snapshots#snapshot-limits) since the snapshot was last used. Examples: `1d`, `14d`. The default is 30 days.                        |

### Sandbox snapshot flags

| Flag       | Short | Description                                                 |
| ---------- | ----- | ----------------------------------------------------------- |
| `--stop`   | -     | Confirm that the sandbox will be stopped when snapshotting. |
| `--silent` | -     | Don't write snapshot ID to stdout.                          |
| `--help`   | `-h`  | Display help information.                                   |

### Sandbox snapshot arguments

| Argument | Description                          |
| -------- | ------------------------------------ |
| `<name>` | The name of the sandbox to snapshot. |

## `sandbox snapshots`

Manage sandbox snapshots.

```bash filename="terminal"
sandbox snapshots <subcommand> [OPTIONS]
```

### Sandbox snapshots subcommands

- `list`: List snapshots for the specified account and project. \[alias: `ls`]
- `get`: Get details of a snapshot.
- `delete`: Delete one or more snapshots. \[aliases: `rm`, `remove`]
- `tree`: Walk the snapshot ancestry tree for a sandbox.

## `sandbox snapshots list`

List snapshots for the specified account and project.

```bash filename="terminal"
sandbox snapshots list [OPTIONS]
```

### Sandbox snapshots list example

```bash filename="terminal"
# List snapshots for the current project
sandbox snapshots list

# List snapshots for a specific project
sandbox snapshots list --project my-project

# Filter snapshots by sandbox name
sandbox snapshots list --name my-sandbox

# Page through results
sandbox snapshots list --limit 50 --cursor <token>
```

### Sandbox snapshots list options

| Option                | Alias    | Description                                                                                                                                                      |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>` | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`      | `--team` | The team you want to use with this command.                                                                                                                      |
| `--name <name>`       | -        | Filter snapshots by the sandbox they belong to.                                                                                                                  |
| `--sort-order <ord>`  | -        | Sort direction. `asc` or `desc` (default).                                                                                                                       |
| `--limit <n>`         | -        | Maximum number of snapshots per page. Default 50.                                                                                                                |
| `--cursor <token>`    | -        | Pagination cursor from a previous page.                                                                                                                          |

### Sandbox snapshots list flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

## `sandbox snapshots get`

Get details of a snapshot.

```bash filename="terminal"
sandbox snapshots get [OPTIONS] <snapshot_id>
```

### Sandbox snapshots get example

```bash filename="terminal"
# Get details of a specific snapshot
sandbox snapshots get snap_1234567890

# Get snapshot details for a specific project
sandbox snapshots get --project my-project snap_1234567890
```

### Sandbox snapshots get options

| Option                | Alias    | Description                                                                                                                                                      |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>` | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`      | `--team` | The team you want to use with this command.                                                                                                                      |

### Sandbox snapshots get flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### Sandbox snapshots get arguments

| Argument        | Description                         |
| --------------- | ----------------------------------- |
| `<snapshot_id>` | The ID of the snapshot to retrieve. |

## `sandbox snapshots delete`

Delete one or more snapshots.

```bash filename="terminal"
sandbox snapshots delete [OPTIONS] <snapshot_id> [...snapshot_id]
```

### Sandbox snapshots delete example

```bash filename="terminal"
# Delete a single snapshot
sandbox snapshots delete snap_1234567890

# Delete multiple snapshots for a specific project
sandbox snapshots delete --project my-project snap_1234567890 snap_0987654321
```

### Sandbox snapshots delete options

| Option                | Alias    | Description                                                                                                                                                      |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>` | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`      | `--team` | The team you want to use with this command.                                                                                                                      |

### Sandbox snapshots delete flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### Sandbox snapshots delete arguments

| Argument           | Description                        |
| ------------------ | ---------------------------------- |
| `<snapshot_id>`    | Snapshot ID to delete.             |
| `[...snapshot_id]` | Additional snapshot IDs to delete. |

## `sandbox snapshots tree`

Walk the snapshot ancestry tree starting from a sandbox's current snapshot. Snapshots form a parent → child tree whenever you create a sandbox from another snapshot.

```bash filename="terminal"
sandbox snapshots tree [OPTIONS] <name>
```

### Sandbox snapshots tree example

```bash filename="terminal"
# Walk ancestors of the sandbox's current snapshot (default)
sandbox snapshots tree my-sandbox

# Walk descendants
sandbox snapshots tree my-sandbox --sort-order asc

# Continue from a specific snapshot
sandbox snapshots tree my-sandbox --cursor snap_abc123
```

### Sandbox snapshots tree options

| Option                | Alias    | Description                                                                                                |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `--sort-order <ord>`  | -        | `desc` (default) walks ancestors; `asc` walks descendants.                                                 |
| `--cursor <token>`    | -        | Snapshot ID to start walking from. Defaults to the sandbox's current snapshot.                             |
| `--limit <n>`         | -        | Maximum number of nodes per page.                                                                          |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token).                      |
| `--project <project>` | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use.         |
| `--scope <team>`      | `--team` | The team you want to use with this command.                                                                |

### Sandbox snapshots tree arguments

| Argument | Description                                  |
| -------- | -------------------------------------------- |
| `<name>` | The sandbox whose snapshot tree to walk.     |

## `sandbox sessions`

Inspect VM sessions for a sandbox. A session represents one running VM instance of a sandbox; persistent sandboxes can have many sessions over time, separated by snapshots.

```bash filename="terminal"
sandbox sessions <subcommand>
```

### Sandbox sessions subcommands

- `list`: List sessions for a sandbox. \[alias: `ls`]

## `sandbox sessions list`

List sessions for a sandbox.

```bash filename="terminal"
sandbox sessions list [OPTIONS] <name>
```

### Sandbox sessions list example

```bash filename="terminal"
# List running sessions
sandbox sessions list my-sandbox

# List all sessions (including stopped ones)
sandbox sessions list my-sandbox --all

# Sort and paginate
sandbox sessions list my-sandbox --sort-order asc --limit 100
```

### Sandbox sessions list options

| Option                | Alias    | Description                                                                          |
| --------------------- | -------- | ------------------------------------------------------------------------------------ |
| `--sort-order <ord>`  | -        | Sort direction. `asc` or `desc` (default).                                           |
| `--limit <n>`         | -        | Maximum number of sessions per page. Default 50.                                     |
| `--cursor <token>`    | -        | Pagination cursor from a previous page.                                              |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). |
| `--project <project>` | -        | The project to use.                                                                  |
| `--scope <team>`      | `--team` | The team to use with this command.                                                   |

### Sandbox sessions list flags

| Flag    | Short | Description                                                          |
| ------- | ----- | -------------------------------------------------------------------- |
| `--all` | `-a`  | Show all sessions, including stopped ones (default: running only).   |

### Sandbox sessions list arguments

| Argument | Description                                       |
| -------- | ------------------------------------------------- |
| `<name>` | The name of the sandbox whose sessions to list.   |

## `sandbox drives`

> **🔒 Permissions Required**: Drives

Drives are persistent storage that can be mounted into a sandbox. To learn more, see [Drives](/docs/sandbox/concepts/drives).

Once you are added to the [private beta](https://vercel.com/changelog/drives-for-vercel-sandbox-in-private-beta), install the beta version of the `sandbox` CLI:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i sandbox@beta
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i sandbox@beta
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i sandbox@beta
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i sandbox@beta
    ```
  </Code>
</CodeBlock>

```bash filename="terminal"
sandbox drives <subcommand>
```

### Sandbox drives subcommands

- `list`: List drives for the specified account and project. \[alias: `ls`]
- `get-or-create`: Create a drive if it doesn't exist, or retrieve the existing drive.
- `delete`: Delete one or more drives. \[aliases: `rm`, `remove`]

## `sandbox drives list`

List drives for the specified account and project.

```bash filename="terminal"
sandbox drives list [OPTIONS]
```

### Sandbox drives list example

```bash filename="terminal"
# List drives
sandbox drives list

# Filter drives by name and sort ascending
sandbox drives list --name-prefix cache- --sort-order asc

# Page through results using the cursor reported by the previous page
sandbox drives list --limit 100 --cursor <token>
```

### Sandbox drives list options

| Option                | Alias    | Description                                                                                                                                                      |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--name-prefix <p>`   | -        | Filter drives whose name starts with this prefix.                                                                                                                |
| `--sort-order <ord>`  | -        | Sort direction. `asc` or `desc` (default).                                                                                                                       |
| `--limit <n>`         | -        | Maximum number of drives per page. Default 50.                                                                                                                   |
| `--cursor <token>`    | -        | Pagination cursor from a previous page.                                                                                                                          |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>` | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`      | `--team` | The team you want to use with this command.                                                                                                                      |

### Sandbox drives list flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

## `sandbox drives get-or-create`

Create a drive if it doesn't exist, or retrieve the existing drive with the same name.

```bash filename="terminal"
sandbox drives get-or-create [OPTIONS] <name>
```

### Sandbox drives get-or-create example

```bash filename="terminal"
# Create or retrieve a drive with the default 100 GiB maximum size
sandbox drives get-or-create cache

# Create or retrieve a drive with a maximum size of 10 GiB
sandbox drives get-or-create cache --max-size 10737418240
```

### Sandbox drives get-or-create options

| Option                | Alias    | Description                                                                                                                                                      |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--max-size <bytes>`  | -        | Maximum drive size in bytes, defaults to 100 GiB.                                                                                    |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>` | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`      | `--team` | The team you want to use with this command.                                                                                                                      |

### Sandbox drives get-or-create flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### Sandbox drives get-or-create arguments

| Argument | Description                           |
| -------- | ------------------------------------- |
| `<name>` | The name of the drive to get or create. |

## `sandbox drives delete`

Delete one or more drives. You can't delete a drive while it's attached to a sandbox.

```bash filename="terminal"
sandbox drives delete [OPTIONS] <name> [...name]
```

### Sandbox drives delete example

```bash filename="terminal"
# Delete one drive
sandbox drives delete cache

# Delete multiple drives
sandbox drives delete cache build-artifacts
```

### Sandbox drives delete options

| Option                | Alias    | Description                                                                                                                                                      |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token <token>`     | -        | Your [Vercel authentication token](/kb/guide/how-do-i-use-a-vercel-api-access-token). If you don't provide it, we'll use a stored token or prompt you to log in. |
| `--project <project>` | -        | The [project name or ID](/docs/project-configuration/general-settings#project-id) you want to use with this command.                                             |
| `--scope <team>`      | `--team` | The team you want to use with this command.                                                                                                                      |

### Sandbox drives delete flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### Sandbox drives delete arguments

| Argument    | Description                        |
| ----------- | ---------------------------------- |
| `<name>`    | The name of the drive to delete.   |
| `[...name]` | Additional drive names to delete.  |

## `sandbox login`

Log in to the Sandbox CLI.

```bash filename="terminal"
sandbox login
```

### Sandbox login example

```bash filename="terminal"
# Log in to the Sandbox CLI
sandbox login
```

### Sandbox login flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

## `sandbox logout`

Log out of the Sandbox CLI.

```bash filename="terminal"
sandbox logout
```

### Sandbox logout example

```bash filename="terminal"
# Log out of the Sandbox CLI
sandbox logout
```

### Sandbox logout flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

## CLI examples

### Your first sandbox

Create a sandbox and run a command in one step:

```bash
sandbox run echo "Hello Sandbox!"
```

You'll see output like:

```
Creating sandbox... ✓
Running command...
Hello Sandbox!
Sandbox stopped.
```

### Create a long-running sandbox

For interactive work, create a named sandbox that stays running:

```bash
sandbox create --name my-sandbox --timeout 30m
```

`sandbox create` prints the sandbox's `name`. Use that name to interact with the sandbox. Because persistent sandboxes can be resumed, you can also reconnect later by running `sandbox exec my-sandbox -- ...` or `sandbox connect my-sandbox`.

### Execute commands in your sandbox

Run commands using the sandbox name:

```bash
# Check the environment
sandbox exec my-sandbox -- node --version

# Install packages
sandbox exec my-sandbox -- npm init -y
sandbox exec my-sandbox -- npm install express

# Create files
sandbox exec my-sandbox -- touch server.js
```

### Copy files to/from sandbox

Test local code in the sandbox:

```bash
# Copy your code to the sandbox
sandbox copy ./my-app.js my-sandbox:/home/sandbox/

# Run it
sandbox exec my-sandbox -- node /home/sandbox/my-app.js

# Copy results back
sandbox copy my-sandbox:/home/sandbox/output.json ./results.json
```

### Interactive shell access

Work inside the sandbox like it's your machine:

```bash
sandbox exec --interactive --tty my-sandbox -- bash
```

Now you're inside the sandbox! Try:

```bash
pwd                    # See where you are
ls -la                 # List files
node -e "console.log('Inside!')"  # Run Node.js
exit                   # Leave when done
```

### Stop your sandbox

When finished:

```bash
sandbox stop my-sandbox
```

### Test AI-generated code interactively

```bash
# Create a named sandbox
NAME=$(sandbox create --name "ai-test-$(date +%s)" --timeout 15m --silent)

# Copy AI-generated code
sandbox copy ./ai-generated.js $NAME:/app/

# Test it interactively
sandbox exec --interactive --tty $NAME -- bash
# Now inside: cd /app && node ai-generated.js

# Clean up (remove permanently)
sandbox remove $NAME
```

### Debug a failing build

```bash
# Create a named sandbox with more time
sandbox create --name debug-build --timeout 1h

# Copy your project
sandbox copy ./my-project/ debug-build:/app/

# Try building
sandbox exec --workdir /app debug-build -- npm run build

# If it fails, debug interactively
sandbox exec -it debug-build -- bash
```

### Run a development server

```bash
# Create with port exposure
sandbox create --name dev --timeout 30m --publish-port 3000

# Start your dev server
sandbox exec --workdir /app dev -- npm run dev

# Access at the provided URL (printed by `sandbox create`)
# Visit: https://<random-id>.vercel.run
```


---

[View full sitemap](/docs/sitemap)
