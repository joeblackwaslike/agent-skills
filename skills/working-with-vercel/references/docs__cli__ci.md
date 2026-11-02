---
title: vercel ci
product: vercel
url: /docs/cli/ci
canonical_url: "https://vercel.com/docs/cli/ci"
last_updated: 2026-10-07
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/ci
  - /docs/cli/global-options
summary: List, inspect, search logs, and rerun Vercel CI runs from the command line.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/ci.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "a880eb4f0afd3f109471a3c3877dcdadccc0b93cb99a97892432bcb291bff7df"
---

# vercel ci

The `vercel ci` command lets you enable repositories and inspect or rerun [Vercel CI](/docs/ci) runs. Use Vercel CLI 64.3.1 or later. Run commands from a GitHub repository with an `origin` remote, or select another remote with `vercel ci enable --remote <NAME>` when enabling CI.

Select the team that owns the CI run, or pass [`--scope <team>`](/docs/cli/global-options#scope).

> **💡 Note:** Vercel CI is in Beta. Features and configuration may change.

## Usage

List runs, inspect the current commit, or read its failed task logs:

```bash filename="terminal"
vercel ci ls
vercel ci inspect
vercel ci logs --failed
```

*Using the \`vercel ci\` command to investigate a repository's CI runs.*

## Subcommands

### Enable a repository

`vercel ci enable` enables Vercel CI for the current Git repository. The repository must connect to a project on the selected team and must not connect to projects on other teams.

```bash filename="terminal"
vercel ci enable
vercel ci enable --remote origin --scope your-team
```

With one Git remote, the CLI selects it automatically. With multiple remotes, it prompts you to select one.

| Option | Description |
| --- | --- |
| `--remote <NAME>` | Select an existing Git remote without the picker. Required with multiple remotes in non-interactive mode. |

Running the command again for an enabled repository leaves its settings unchanged.

### List runs

`vercel ci ls` (also `vercel ci list`) lists runs for the current branch. Filter runs or view every branch:

```bash filename="terminal"
vercel ci ls --branch main
vercel ci ls --all-branches --status failed
vercel ci ls --format json
```

| Option | Description |
| --- | --- |
| `--branch <name>` | List runs for this branch. Defaults to the current branch. |
| `--all-branches` | List runs across every branch. Can't combine with `--branch` or `--commit`. |
| `--commit <sha>` | Filter by commit on the current branch or the branch selected with `--branch`. |
| `--status <status>` | Filter by `queued`, `running`, `succeeded`, `failed`, or `skipped`. |
| `--limit <number>` | Results per page. Defaults to 20, with a maximum of 100. |
| `--next <cursor>` | Fetch the next page using a cursor from the previous response. |

### Inspect a run

`vercel ci inspect [run]` shows a run's jobs and tasks. Find a run ID with `vercel ci ls`, or omit it to inspect the current commit:

```bash filename="terminal"
vercel ci inspect
vercel ci inspect your_run_id_here --attempt 1
vercel ci inspect --wait
```

| Option | Description |
| --- | --- |
| `--attempt <number>` | Inspect a specific attempt. Defaults to the latest attempt. |
| `--wait` | Wait up to 10 minutes for completion and exit with code `1` if the run fails. Stopping the wait doesn't cancel the run. |

### Read task logs

`vercel ci logs [run]` reads task logs for a run. Omit the run ID to use the current commit:

```bash filename="terminal"
vercel ci logs --failed
vercel ci logs --task 'web#test' --level error --level fatal
vercel ci logs --grep ECONNRESET
vercel ci logs your_run_id_here --task 'web#build' --follow
```

| Option | Description |
| --- | --- |
| `--failed` | Show only failed tasks. Can't combine with `--follow`. |
| `--task <name>` | Select a task, such as `web#test`. Repeat to select multiple tasks. |
| `--level <level>` | Filter by log level. Repeat to select multiple levels. |
| `--grep <text>` | Match text in log lines across the run, ignoring case. |
| `--attempt <number>` | Read a specific attempt. Defaults to the latest attempt. |
| `--limit <number>` | Maximum tasks to show. Defaults to 10, with a maximum of 25. |
| `--follow`, `-f` | Stream one task's logs. Requires one `--task`. JSON output uses JSON Lines. Stopping doesn't cancel the run. |

Accepted log levels are `trace`, `debug`, `command`, `info`, `warn`, `error`, `systemError`, and `fatal`.

### Search recent runs

`vercel ci grep <text>` searches task logs across recent runs. By default, it searches the last 20 runs on the current branch:

```bash filename="terminal"
vercel ci grep ECONNRESET
vercel ci grep "out of memory" --all-branches --status failed --runs 50
```

| Option | Description |
| --- | --- |
| `--branch <name>` | Search this branch. Defaults to the current branch. |
| `--all-branches` | Search every branch. Can't combine with `--branch`. |
| `--status <status>` | Filter by the latest attempt's status: `queued`, `running`, `succeeded`, `failed`, or `skipped`. |
| `--runs <number>` | Maximum recent runs to search. Defaults to 20, with a maximum of 50. The search may stop before reaching this limit. The CLI reports when results are incomplete. |
| `--level <level>` | Filter by the same log levels as `vercel ci logs`. Repeat to select multiple levels. |

### Rerun a finished run

`vercel ci rerun [run]` starts a new attempt of a finished run. Without a run ID, it selects a failed run for the current commit. To rerun a succeeded or skipped run, provide its ID:

```bash filename="terminal"
vercel ci rerun
vercel ci rerun your_run_id_here --wait
```

The `--wait` option waits up to 10 minutes and exits with code `1` if the new attempt fails. Stopping the wait doesn't cancel the run.

## Output format

Every subcommand accepts `--format json` (shorthand `-F json`) or `--json` for machine-readable output:

```bash filename="terminal"
vercel ci inspect --json
vercel ci logs your_run_id_here --task 'web#build' --follow --json
```

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel ci` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
