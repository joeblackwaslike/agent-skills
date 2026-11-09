---
title: vercel billing usage
product: vercel
url: /docs/cli/usage
canonical_url: "https://vercel.com/docs/cli/usage"
last_updated: 2026-10-30
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/rbac/access-roles
  - /docs/cli/global-options
summary: Learn how to view billing usage and costs, for your Vercel account using the vercel billing usage CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/usage.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "c4625f8874b4206842e299fea540f43789c68ac51074732f2e67e14903211323"
---

# vercel billing usage

The `vercel billing usage` command displays billing usage for the current billing period or a custom date range. It shows usage and costs for each service, helping you understand your resource consumption.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Access billing usage and cost data via API](https://vercel.com/changelog/access-billing-usage-cost-data-api)
- [vercel billing](https://vercel.com/docs/cli/billing) — Learn how to view usage, contracts, budgets, and invoices for your Vercel team using the vercel billing CLI command.
- [vercel billing budgets](https://vercel.com/docs/cli/budgets) — View and manage your team's on-demand spend budget from the Vercel CLI.
- [vercel pricing](https://vercel.com/docs/cli/pricing) — Look up Hobby, Pro, and Enterprise features from the public Vercel pricing table using the CLI.
- [vercel billing contract](https://vercel.com/docs/cli/contract) — Learn how to view contract commitment information for your Vercel account using the vercel billing contract CLI command.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.

Full cross-link map for this page: [/docs/cli/usage.graph.md](/docs/cli/usage.graph.md)
<!-- /docsgraph:related -->

This is only available for Owner, Member, Developer, Security, Billing, and Enterprise Viewer [roles](/docs/rbac/access-roles#team-level-roles) for the current active team.

The command is available in `vercel@65.11.0` and later, where the old name, `vercel usage`, still works but prints a deprecation warning. Use `vercel billing usage` in new scripts.

## Usage

```bash filename="terminal"
vercel billing usage
```

*Using the \`vercel billing usage\` command to view billing usage
for the current billing period.*

```bash filename="terminal"
vercel billing usage --since 2025-01-01 --until 2025-01-31
```

*Using the \`vercel billing usage\` command to view billing usage
for a custom date range.*

The command outputs separate tables for infrastructure usage and subscription licenses. Each table shows:

- **Service**: The name of each Vercel service
- **Usage**: The quantity used, in the service's unit
- **Cost**: The cost accrued before credits and discounts, in USD or legacy MIUs. It isn't the amount on your invoice.

## Unique options

These are options that only apply to the `vercel billing usage` command.

### Since

The `--since` option, shorthand `-s`, specifies the start of the usage query. It accepts a `YYYY-MM-DD` date, an ISO 8601 timestamp, or a relative duration such as `7d`. Date-only values start at midnight in Los Angeles (Pacific) time. Relative durations count backward from now.

```bash filename="terminal"
vercel billing usage --since 7d
```

*Using the \`vercel billing usage\` command with a custom start
date.*

When you provide `--since` alone, the end defaults to now. Omit both time options to query the current billing period.

### Until

The `--until` option, shorthand `-u`, specifies the end of the usage query. It accepts the same formats as `--since`. A date-only value includes the full day in Los Angeles (Pacific) time, ending at the next midnight.

```bash filename="terminal"
vercel billing usage --since 2025-01-01 --until 2025-01-31
```

*Using the \`vercel billing usage\` command with a custom end
date.*

When using `--until`, you must also specify `--since`.

`--from` and `--to` remain supported, but print a deprecation warning. Use `--since` and `--until` for new commands.

### Breakdown

The `--breakdown` option shows usage grouped by time period instead of aggregated totals. Valid values are `daily`, `weekly`, or `monthly`.

```bash filename="terminal"
vercel billing usage --breakdown daily
```

*Using the \`vercel billing usage\` command to show daily usage
breakdown.*

```bash filename="terminal"
vercel billing usage --since 2025-01-01 --until 2025-01-31 --breakdown weekly
```

*Combining \`--breakdown\` with a custom date range.*

When using the breakdown mode, the output shows:

- Usage grouped by the specified period (day, week, or month)
- Per-service details for each period
- The total cost for each period

The data supports 1-day granularity with a maximum date range of 1 year.

### Group by

The `--group-by` option shows usage grouped by a dimension instead of aggregated totals. Valid values are `project` and `region`. You can't combine `--group-by` with `--breakdown`.

```bash filename="terminal"
vercel billing usage --group-by project
```

*Using the \`vercel billing usage\` command to show usage for each
project.*

### JSON

The `--json` option prints the usage data as a single JSON object on stdout instead of a table. `--format json` still works but is deprecated.

```bash filename="terminal"
vercel billing usage --json
```

*Using the \`vercel billing usage\` command to output usage data
as JSON.*

The JSON output includes:

- `period`: The start and end of the query
- `context`: The account or team name
- `costUnit`: `USD` or `managed_infrastructure_units`, for every cost in the output
- `services`: An array of services with usage and cost details
- `totals`: Aggregated totals for all services
- `creditBalance`: The current credit balance, when available. It's omitted for custom date ranges

When using `--breakdown`, the JSON output includes a `breakdown` object with the usage for each period. When using `--group-by`, it includes a `groupBy` object with the usage for each project or region.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel billing usage` command:

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
