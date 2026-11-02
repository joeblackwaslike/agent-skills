---
title: vercel alerts
product: vercel
url: /docs/cli/alerts
canonical_url: "https://vercel.com/docs/cli/alerts"
last_updated: 2026-09-10
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/alerts
  - /docs/cli/monitors
  - /docs/agent/investigation
  - /docs/cli/global-options
summary: List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/alerts.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "19320df4ab4cf670a359b14f78ac1198332853a0c35ca2a944d29f1b8630104c"
---

# vercel alerts

The `vercel alerts` command lists recent [alerts](/docs/alerts) for the linked project, a specific project, or an entire team. The `inspect` subcommand shows details for a single alert group, and the `rules` subcommand tree manages monitors from the terminal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Pull anomaly alert details using the Vercel CLI](https://vercel.com/changelog/pull-anomaly-alert-details-using-the-vercel-cli)
- [vercel activity](https://vercel.com/docs/cli/activity) — View activity events for your Vercel project or team, filtered by type, date range, and project.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [vercel security](https://vercel.com/docs/cli/security) — Inspect the security posture of your Vercel team from the terminal: run every security check, list findings, and scope t
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Configure alerts](https://vercel.com/docs/alerts/configure-alerts) — Configure alert rules and notification destinations for Vercel Observability alerts.

Full cross-link map for this page: [/docs/cli/alerts.graph.md](/docs/cli/alerts.graph.md)
<!-- /docsgraph:related -->

By default, `vercel alerts` reads alerts for the linked project from the last 24 hours. You can change the scope with `--project` or `--all`, filter by alert type, change the time range, and switch between table, AI investigation, or JSON output.

Use this command when you want to inspect alert activity from the terminal without opening the dashboard.

## Usage

```bash filename="terminal"
# List alerts for the linked project from the last 24 hours
vercel alerts

# List team-wide alerts
vercel alerts --all

# Filter by alert type and time range
vercel alerts --type usage_anomaly --since 2026-03-01T00:00:00.000Z
```

*Using the \`vercel alerts\` command to list recent alerts for a project or team.*

## Unique options

These options only apply to the `vercel alerts` command.

### Project

The `--project` option, shorthand `-p`, lists alerts for a specific project and overrides the linked project. Pass the project name (the name shown in the dashboard and `vercel project ls`) or its ID, for example `my-app` or `prj_abc123`.

```bash filename="terminal"
vercel alerts --project my-app
```

You can't combine `--project` with `--all`.

### All

The `--all` option, shorthand `-a`, lists team-wide alerts instead of using the linked project.

```bash filename="terminal"
vercel alerts --all
```

You must be in team scope to use `--all`.

### Type

The `--type` option filters by alert type. You can repeat the flag or pass comma-separated values.

```bash filename="terminal"
vercel alerts --type usage_anomaly
vercel alerts --type usage_anomaly,error_anomaly
vercel alerts --type usage_anomaly --type error_anomaly
```

Filter by custom alert type:

```bash filename="terminal"
vercel alerts --type custom_alert
```

### AI

The `--ai` option prints AI investigation sections instead of the default table output.

This view includes the alert title, resolved time, summary, and key findings when that data is available.

```bash filename="terminal"
vercel alerts --ai
```

### Since

The `--since` option, shorthand `-s`, sets the start of the time range. Use an ISO 8601 timestamp.

If you don't pass `--since` or `--until`, the command defaults to the last 24 hours.

```bash filename="terminal"
vercel alerts --since 2026-03-01T00:00:00.000Z
```

### Until

The `--until` option, shorthand `-u`, sets the end of the time range. Use an ISO 8601 timestamp.

```bash filename="terminal"
vercel alerts --since 2026-03-01T00:00:00.000Z --until 2026-03-02T00:00:00.000Z
```

`--since` must be earlier than `--until`.

### Limit

The `--limit` option sets the maximum number of alert groups to return.

The supported range is 1 through 100.

```bash filename="terminal"
vercel alerts --limit 25
```

### Format

The `--format` option supports `json` output for scripting and automation.

```bash filename="terminal"
vercel alerts --format json
```

When you use `--format json`, the command returns a `groups` array with the alert group payload from the API.

## List alert examples

List alerts for the linked project:

```bash filename="terminal"
vercel alerts
```

List team-wide alerts:

```bash filename="terminal"
vercel alerts --all
```

Filter by usage and error anomalies:

```bash filename="terminal"
vercel alerts --type usage_anomaly --type error_anomaly
```

Print AI investigation summaries for a custom time range:

```bash filename="terminal"
vercel alerts --ai --since 2026-03-01T00:00:00.000Z --until 2026-03-02T00:00:00.000Z
```

Export alerts as JSON:

```bash filename="terminal"
vercel alerts --format json
```

## Subcommands

### `inspect`

Show details for a single alert group.

```bash filename="terminal"
vercel alerts inspect <groupId>
```

#### Arguments

| Name | Description |
| --- | --- |
| `groupId` | Required. ID of the alert group to inspect. |

#### Options

| Option | Description |
| --- | --- |
| `--format` | Output format. Supports `json`. |
| `-p, --project` | Project name or ID to filter by, for example `my-app` or `prj_abc123`. Overrides the auto-detected linked project. |
| `-a, --all` | Use team-wide scope. Ignores linked project auto-scoping. |

#### Inspect alert examples

Inspect a group in the linked project:

```bash filename="terminal"
vercel alerts inspect grp_abc123
```

Inspect as JSON:

```bash filename="terminal"
vercel alerts inspect grp_abc123 --format json
```

### `rules`

> **💡 Note:** The `vercel alerts rules` commands are deprecated. Use
> [`vercel monitors`](/docs/cli/monitors) to manage monitors from the terminal.

The `rules` subcommands keep working and map 1:1 to `vercel monitors`. They accept the same options and request bodies, but JSON output keys differ; see [Migrate from `vercel alerts rules`](/docs/cli/monitors#migrate-from-vercel-alerts-rules):

| Deprecated command | Replacement |
| --- | --- |
| `vercel alerts rules ls` | [`vercel monitors ls`](/docs/cli/monitors#ls) |
| `vercel alerts rules schema` | [`vercel monitors schema`](/docs/cli/monitors#schema) |
| `vercel alerts rules create` | [`vercel monitors add`](/docs/cli/monitors#add) |
| `vercel alerts rules inspect` | [`vercel monitors inspect`](/docs/cli/monitors#inspect) |
| `vercel alerts rules rm` | [`vercel monitors rm`](/docs/cli/monitors#rm) |
| `vercel alerts rules update` | [`vercel monitors update`](/docs/cli/monitors#update) |

See [`vercel monitors`](/docs/cli/monitors) for the full subcommand reference.

## Related resources

- To learn how to configure and receive alerts, see [Alerts](/docs/alerts).
- If you want to automatically investigate alerts with AI, see [Agent Investigation](/docs/agent/investigation).

To create and manage monitors from the terminal, see
[`vercel monitors`](/docs/cli/monitors).

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel alerts` command:

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
