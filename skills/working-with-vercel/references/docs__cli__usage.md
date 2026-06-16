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
summary: Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/usage.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "6a903d9ff57fd8136033fc5fcfe3ac29e9138a84d12a518fb24c08dab0684b98"
---

# vercel usage

The `vercel usage` command displays billing usage for the current billing period or a custom date range. It shows usage and costs for each service, helping you understand your resource consumption.

This is only available for Owner, Member, Developer, Security, Billing, and Enterprise Viewer [roles](/docs/rbac/access-roles#team-level-roles) for the current active team.

## Usage

```bash filename="terminal"
vercel usage
```

*Using the \`vercel usage\` command to view billing usage
for the current billing period.*

```bash filename="terminal"
vercel usage --from 2025-01-01 --to 2025-01-31
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

### From

The `--from` option specifies the start date for the usage query. The date is interpreted as midnight in Los Angeles (Pacific) time.

```bash filename="terminal"
vercel usage --from 2025-01-01 --to 2025-01-31
```

*Using the \`vercel usage\` command with a custom start
date.*

When using `--from`, you must also specify `--to`.

### To

The `--to` option specifies the end date for the usage query. The date is interpreted as end of day (23:59:59) in Los Angeles (Pacific) time.

```bash filename="terminal"
vercel usage --from 2025-01-01 --to 2025-01-31
```

*Using the \`vercel usage\` command with a custom end
date.*

When using `--to`, you must also specify `--from`.

### Breakdown

The `--breakdown` option shows usage grouped by time period instead of aggregated totals. Valid values are `daily`, `weekly`, or `monthly`.

```bash filename="terminal"
vercel usage --breakdown daily
```

*Using the \`vercel usage\` command to show daily usage
breakdown.*

```bash filename="terminal"
vercel usage --from 2025-01-01 --to 2025-01-31 --breakdown weekly
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


---

[View full sitemap](/docs/sitemap)
