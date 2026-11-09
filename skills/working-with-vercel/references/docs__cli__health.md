---
title: vercel health
product: vercel
url: /docs/cli/health
canonical_url: "https://vercel.com/docs/cli/health"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Read Vercel platform status, active incidents, scheduled maintenance, and recently resolved incidents from your terminal.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/health.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "c8cda540678a20bcad9b509b5e1f8cbb870c7ada15ca37c3575c51dbee13aee4"
---

# vercel health

The `vercel health` command reads the public [Vercel status page](https://www.vercel-status.com). Use it to check platform status and incidents without signing in or linking a project. The report covers the platform, regardless of your selected team or project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel doctor](https://vercel.com/docs/cli/doctor) — Learn how to check your Vercel CLI setup and fix problems with the vercel doctor CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel security](https://vercel.com/docs/cli/security) — Inspect the security posture of your Vercel team from the terminal: run every security check, list findings, and triage
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel changelog](https://vercel.com/docs/cli/changelog) — Read recent Vercel product updates and search the changelog from your terminal using the Vercel CLI.

Full cross-link map for this page: [/docs/cli/health.graph.md](/docs/cli/health.graph.md)
<!-- /docsgraph:related -->

## Usage

Run the command to see the current status:

```bash filename="terminal"
vercel health
```

*Read the current Vercel platform status.*

The report includes the status description and last update time, followed by:

- Components that aren't operational.
- Active incidents and their latest updates.
- Scheduled maintenance, when present.
- Recent incidents resolved during the last seven days.

Text output includes incident links and displays timestamps in UTC. Both text and JSON reports go to stdout; the CLI version banner and errors go to stderr.

The command takes no positional arguments or subcommands. The older `status-page` alias still works but is deprecated. Use `health` in new scripts.

## Unique options

### JSON output

Use `--json` to return structured output for scripts and agents:

```bash filename="terminal"
vercel health --json
```

*Read the status report as JSON.*

The response contains these fields:

| Field | Description |
| --- | --- |
| `page` | The status page's name, URL, and `updatedAt` timestamp. |
| `status` | The overall `indicator` and human-readable `description`. |
| `components` | Individual components, including operational ones. Each has an ID, name, group, and status. |
| `incidents` | Active incidents and recent incidents resolved within seven days, sorted by `startedAt`, newest first. |
| `scheduledMaintenances` | Scheduled maintenance entries, including their status, time window, affected components, and URL. |
| `since` | The timestamp seven days before the request, used to filter resolved incidents. |

An incident has `resolvedAt: null` while it remains open. Active incidents remain in the report even if they started more than seven days ago. Each incident also includes its impact, affected components, status-page URL, and updates.

## Examples

### Extract the status description

With [jq](https://jqlang.org/) installed, extract the current description:

```bash filename="terminal"
vercel health --json | jq -r '.status.description'
```

*Read the platform status description from JSON output.*

When the status page reports no issues, the output is:

```text filename="output"
All Systems Operational
```

### List active incidents

Filter on `resolvedAt` to list only active incidents:

```bash filename="terminal"
vercel health --json | jq -r '.incidents[] | select(.resolvedAt == null) | .name'
```

*Print active incident names, one per line.*

This produces no lines when there are no active incidents. To inspect all component states, read the `components` array instead of relying on the text report, which lists only non-operational components.

## Exit status and errors

The command exits successfully when it retrieves the report, even if the status page reports an outage. Scripts should inspect `status.indicator`, component states, or incidents to decide whether to continue.

If the CLI can't retrieve the report, it exits with a nonzero code. With `--json`, errors are JSON objects on stderr containing a `reason` and `message`. Network failures, rate limiting, and unexpected status-page responses are retrieval errors, not reports that the platform is operational.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel health` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
