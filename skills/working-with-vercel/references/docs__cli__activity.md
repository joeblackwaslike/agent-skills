---
title: vercel activity
product: vercel
url: /docs/cli/activity
canonical_url: "https://vercel.com/docs/cli/activity"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/activity-log
  - /docs/cli/global-options
summary: View activity events for your Vercel project or team, filtered by type, date range, and project.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/activity.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "3c1cdde85e10e97788735819ba5c792a18b6615eb07e8cfc47dd2055822dc53c"
---

# vercel activity

The `vercel activity` command displays [activity events](/docs/activity-log) for your linked project. You can filter events by type, date range, and project, or view all events across your team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [vercel alerts](https://vercel.com/docs/cli/alerts) — List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel agent-runs](https://vercel.com/docs/cli/agent-runs) — Find projects with Agent Runs, list recent runs, and inspect run metadata and conversation traces from the command line.

Full cross-link map for this page: [/docs/cli/activity.graph.md](/docs/cli/activity.graph.md)
<!-- /docsgraph:related -->

By default, running `vercel activity` shows events scoped to the linked project. Use `--all` to see all events across your team, or `--project` to target a specific project. The output shows which project or team the events are for.

## Usage

```bash filename="terminal"
# List events for the linked project
vercel activity

# List all team events from the last 30 days
vercel activity --all --since 30d

# Filter by event type
vercel activity --type deployment --since 7d
```

*Using the \`vercel activity\` command to view activity events.*

## Unique options

These options only apply to the `vercel activity` command.

### Type

The `--type` option filters events by event type. You can repeat the flag or use comma-separated values. Run `vercel activity types` to see all available event types.

```bash filename="terminal"
# Single type
vercel activity --type deployment

# Multiple types with repeated flags
vercel activity --type deployment --type project-created

# Comma-separated types
vercel activity --type deployment,project-created
```

### Since

The `--since` option, shorthand `-s`, shows events after a specific date. You can use ISO 8601 format or relative values like `1d`, `7d`, or `30d`.

```bash filename="terminal"
vercel activity --since 7d
vercel activity --since 2026-01-01T00:00:00Z
```

### Until

The `--until` option, shorthand `-u`, shows events before a specific date. Accepts the same formats as `--since`.

```bash filename="terminal"
vercel activity --since 30d --until 7d
```

### Project

The `--project` option, shorthand `-p`, filters events by a specific project name or ID. This overrides the auto-detected linked project.

```bash filename="terminal"
vercel activity --project my-app
```

### All

The `--all` option, shorthand `-a`, shows all events across your team instead of scoping to the linked project.

```bash filename="terminal"
vercel activity --all --since 30d
```

You can't use `--all` and `--project` together.

### Limit

The `--limit` option specifies the maximum number of events to return. The default is 20, and the maximum is 100.

```bash filename="terminal"
vercel activity --limit 50
```

### Next

The `--next` option paginates through results. After each page, the command prints the value to pass to `--next` for the following page.

```bash filename="terminal"
vercel activity --next 1706140800000
```

### JSON

The `--json` option prints the events as JSON, which makes it easier to pipe to other tools like [jq](https://jqlang.github.io/jq/):

```bash filename="terminal"
vercel activity --json | jq '.events[]'
```

The JSON output also includes a `scope` object that shows which project or team the events are for. It has the `teamSlug` and, when the events are for one project, the `projectName` and `projectIds`:

```bash filename="terminal"
vercel activity --json | jq '.scope'
```

## Subcommands

### `vercel activity types`

Lists all available event types with descriptions. Use this to find valid values for the `--type` filter.

```bash filename="terminal"
vercel activity types
vercel activity types --json
```

## Examples

List deployment events from the last week:

```bash filename="terminal"
vercel activity --type deployment --since 7d
```

List all team events and output as JSON:

```bash filename="terminal"
vercel activity --all --json | jq '.events[] | {type, text: .text}'
```

Paginate through results:

```bash filename="terminal"
vercel activity --limit 10
# Use the --next value from the output to get the next page
vercel activity --limit 10 --next 1706140800000
```

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel activity` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
