---
title: vercel usage
product: vercel
url: /docs/cli/usage
canonical_url: "https://vercel.com/docs/cli/usage"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/rbac/access-roles
  - /docs/cli/global-options
summary: Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/usage.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "2545cdc24816f328e17550f0929903f77b7a38887f93b7198b1b4fc358e58769"
---

# vercel usage

The `vercel usage` command displays billing usage for the current billing period or a custom date range. It shows usage and costs for each service, helping you understand your resource consumption.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Access billing usage and cost data via API](https://vercel.com/changelog/access-billing-usage-cost-data-api)
- [vercel pricing](https://vercel.com/docs/cli/pricing) — Look up Hobby, Pro, and Enterprise features from the public Vercel pricing table using the CLI.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel budgets](https://vercel.com/docs/cli/budgets) — View and manage your team's on-demand spend budget from the Vercel CLI.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/usage.graph.md](/docs/cli/usage.graph.md)
<!-- /docsgraph:related -->

This is only available for Owner, Member, Developer, Security, Billing, and Enterprise Viewer [roles](/docs/rbac/access-roles#team-level-roles) for the current active team.

## Usage

```bash filename="terminal"
vercel usage
```

*Using the \`vercel usage\` command to view billing usage
for the current billing period.*

```bash filename="terminal"
vercel usage --since 2025-01-01 --until 2025-01-31
```

*Using the \`vercel usage\` command to view billing usage
for a custom date range.*

The command outputs a table showing:

- **Service**: The name of each Vercel service
- **Usage**: Resources consumed (USD or legacy MIUs)
- **Effective Cost**: The cost after any applicable discounts
- **Billed Cost**: The final amount charged

## Unique options

These are options that only apply to the `vercel usage` command.

### Since

The `--since` option, shorthand `-s`, specifies the start of the usage query. It accepts a `YYYY-MM-DD` date, an ISO 8601 timestamp, or a relative duration such as `7d`. Date-only values start at midnight in Los Angeles (Pacific) time. Relative durations count backward from now.

```bash filename="terminal"
vercel usage --since 7d
```

*Using the \`vercel usage\` command with a custom start
date.*

When you provide `--since` alone, the end defaults to now. Omit both time options to query the current billing period.

### Until

The `--until` option, shorthand `-u`, specifies the end of the usage query. It accepts the same formats as `--since`. A date-only value includes the full day in Los Angeles (Pacific) time, ending at the next midnight.

```bash filename="terminal"
vercel usage --since 2025-01-01 --until 2025-01-31
```

*Using the \`vercel usage\` command with a custom end
date.*

When using `--until`, you must also specify `--since`.

`--from` and `--to` remain supported, but print a deprecation warning. Use `--since` and `--until` for new commands.

### Breakdown

The `--breakdown` option shows usage grouped by time period instead of aggregated totals. Valid values are `daily`, `weekly`, or `monthly`.

```bash filename="terminal"
vercel usage --breakdown daily
```

*Using the \`vercel usage\` command to show daily usage
breakdown.*

```bash filename="terminal"
vercel usage --since 2025-01-01 --until 2025-01-31 --breakdown weekly
```

*Combining \`--breakdown\` with a custom date range.*

When using the breakdown mode, the output shows:

- Usage grouped by the specified period (day, week, or month)
- Per-service details for each period
- A grand total at the end

The data supports 1-day granularity with a maximum date range of 1 year.

### Format

The `--format` option, shorthand `-F`, specifies the output format. Currently, `json` is the only supported format option.

```bash filename="terminal"
vercel usage --format json
```

*Using the \`vercel usage\` command to output usage data
as JSON.*

The JSON output includes:

- `period`: The start and end dates of the query
- `context`: The user or team context
- `services`: An array of services with usage and cost details
- `totals`: Aggregated totals for all services
- `chargeCount`: The number of individual charges processed

When using `--breakdown`, the JSON output includes a `breakdown` array containing usage data for each period, plus a `grandTotal` object with aggregated totals.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel usage` command:

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
