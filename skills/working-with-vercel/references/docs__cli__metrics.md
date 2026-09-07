---
title: vercel metrics
product: vercel
url: /docs/cli/metrics
canonical_url: "https://vercel.com/docs/cli/metrics"
last_updated: 2026-08-19
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/observability/observability-plus
  - /docs/cli/global-options
summary: List and query observability metrics, and inspect available dimensions and aggregations using the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/metrics.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "2e222f2bfbb87a1ad93cb8695503cc6d766d8ba79015b8da11423da219f0f2f4"
---

# vercel metrics

The `vercel metrics` command, also available as `vc metrics`, lets you list and query metrics from the command line. Querying observability metrics requires [Observability Plus](/docs/observability/observability-plus), with product-specific exceptions listed below.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Query observability metrics using the Vercel CLI](https://vercel.com/changelog/vercel-metrics-in-cli?from=related&source_path=%2Fdocs%2Fcli%2Fmetrics&source_site=vercel-docs&relationship=related)
- [Improve Cumulative Layout Shift \\(CLS\\) on Vercel](https://vercel.com/kb/guide/cls-on-vercel?from=related&source_path=%2Fdocs%2Fcli%2Fmetrics&source_site=vercel-docs&relationship=related) — Read, diagnose, and fix Cumulative Layout Shift on Vercel using Speed Insights and Next.js best practices.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Fmetrics&source_site=vercel-docs&relationship=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Fmetrics&source_site=vercel-docs&relationship=related) — Use the Vercel CLI to query Speed Insights metrics from your terminal.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fmetrics&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel alerts](https://vercel.com/docs/cli/alerts?from=related&source_path=%2Fdocs%2Fcli%2Fmetrics&source_site=vercel-docs&relationship=related) — List recent alerts for a linked project, a specific project, or an entire team with the Vercel CLI.
- [vercel usage](https://vercel.com/docs/cli/usage?from=related&source_path=%2Fdocs%2Fcli%2Fmetrics&source_site=vercel-docs&relationship=related) — Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.

Full cross-link map for this page: [/docs/cli/metrics.graph.md](/docs/cli/metrics.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fmetrics&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **🔒 Permissions Required**: Metrics other than Web Analytics and Speed Insights metrics

Use `vercel metrics list` before you build a query. The command lists all metrics available to your account. Use `vercel metrics schema` to inspect the dimensions and aggregations for a metric.

## Usage

```bash filename="terminal"
# List queryable metrics for the current team context
vercel metrics list

# Inspect a metric or metric prefix
vercel metrics schema <metric-or-prefix>

# Query a custom metric and filter by an attribute
vercel metrics database.duration_ms --filter "plan:pro"

# Query production data for a specific project
vercel metrics <metric-id> --since 7d --granularity 1d --project project-name --prod

# Query grouped results
vercel metrics <metric-id> --group-by <dimension> --since 1d --limit 5 --project project-name --prod

# Query across every project in the current team
vercel metrics <metric-id> --all --group-by project_id --since 24h --prod
```

*Using the \`vercel metrics\` command to discover metrics before querying them.*

## Query output

By default, `vercel metrics` prints a human-readable table or time series summary. Use `--format` to output structured JSON for scripts, agents, and continuous integration checks.

## Feature access

Web Analytics metrics are available through `vercel metrics` without Observability Plus.

Speed Insights metrics are available through `vercel metrics` without Observability Plus.

Metrics other than Web Analytics and Speed Insights metrics require [Observability Plus](/docs/observability/observability-plus).

The dashboard and CLI are complementary:

- Use product dashboards for curated views.
- Use `vercel metrics` for custom filtering, grouping, aggregations, calendar buckets, JSON output, and agent workflows.
- Use `--all` to query across every project in the current team when you need team-wide comparisons.

## Unique options

These options only apply to the `vercel metrics` command.

### Metric

The `<metric-id>` positional argument specifies the metric to query. Run `vercel metrics list` to list queryable metrics for the current team context.

```bash filename="terminal"
vercel metrics <metric-id>
vercel metrics list
```

### List subcommand

Use the `list` subcommand to list all metrics available to your account:

```bash filename="terminal"
vercel metrics list
```

### Schema subcommand

Use the `schema` subcommand to inspect the dimensions and aggregations available for a metric. Pass a metric ID or prefix to inspect a narrower part of the schema.

```bash filename="terminal"
vercel metrics schema <metric-or-prefix>
```

Use `--format` when you are building scripts or agent workflows that need to validate available fields before querying.

### Aggregation

The `--aggregation` option, shorthand `-a`, selects the aggregation for the metric.

```bash filename="terminal"
vercel metrics <metric-id> --aggregation <aggregation>
```

If omitted, the CLI uses the default aggregation from the metric schema.

### Group-by

The `--group-by` option groups results by a dimension. Repeat it to group by multiple dimensions.

```bash filename="terminal"
vercel metrics <metric-id> --group-by <dimension>
vercel metrics <metric-id> --group-by <dimension> --group-by <dimension>
```

### Filter

The `--filter` option, shorthand `-f`, filters the query. For custom metrics, use `<attribute>:<value>` to filter by an attribute:

```bash filename="terminal"
vercel metrics database.duration_ms --filter "plan:pro"
```

For other metrics, pass an OData filter expression. Repeat the option to combine filters with `and`:

```bash filename="terminal"
vercel metrics <metric-id> --filter "<dimension> eq '<value>'"
vercel metrics <metric-id> -f "<dimension> eq '<value>'" -f "<dimension> ne '<value>'"
```

### Production environment

The `--prod` option limits the query to production data. It is equivalent to `--filter "environment eq 'production'"`.

```bash filename="terminal"
vercel metrics <metric-id> --prod
```

### Since

The `--since` option, shorthand `-s`, sets the start of the time range. You can use a relative duration like `1h`, `24h`, or `7d`, a date, or an ISO timestamp. If omitted, the CLI defaults to the last hour.

```bash filename="terminal"
vercel metrics <metric-id> --since 24h
```

### Until

The `--until` option, shorthand `-u`, sets the end of the time range. If omitted, the command uses the current time.

```bash filename="terminal"
vercel metrics <metric-id> --since 24h --until 2026-03-19T12:00:00Z
```

### Granularity

The `--granularity` option, shorthand `-g`, controls the time bucket size. If omitted, the CLI computes a granularity for the selected time range.

```bash filename="terminal"
vercel metrics <metric-id> --granularity 1h --since 7d
```

### Bucket timezone

The `--bucket-timezone` option sets an IANA timezone for calendar bucket alignment. It does not shift `--since`, `--until`, or output timestamps.

```bash filename="terminal"
vercel metrics <metric-id> --since 2026-05-28 --until 2026-05-29 --granularity 1d --bucket-timezone Europe/Paris
```

### Limit

The `--limit` option, shorthand `-l`, sets the maximum number of grouped results returned per time bucket. The default is `10`.

```bash filename="terminal"
vercel metrics <metric-id> --group-by <dimension> --limit 50
```

### Order by

The `--order-by` option only applies to grouped results, so use it with `--group-by`. The default is `count`, which orders groups by the number of data points. Use `--order-by value` to order groups by the actual metric value returned by the query.

```bash filename="terminal"
vercel metrics <metric-id> --group-by <dimension> --order-by count
vercel metrics <metric-id> --group-by <dimension> --order-by value
```

### Order

The `--order` option sets the ordering direction for grouped results. It accepts `asc` or `desc`. The default is `desc`.

```bash filename="terminal"
vercel metrics <metric-id> --group-by <dimension> --order-by value --order asc
```

### Project

The `--project` option, shorthand `-p`, specifies the project name or project ID to query. Use it when you want results for a specific project. It defaults to the linked project when `--all` is not set.

```bash filename="terminal"
vercel metrics <metric-id> --project project-name --prod
```

### All

The `--all` option queries across all projects in the current team scope. It cannot be combined with `--project`.

```bash filename="terminal"
vercel metrics <metric-id> --all --group-by project_id --prod
```

### Format

The `--format` option outputs JSON instead of text. Use it for automation and agents.

```bash filename="terminal"
vercel metrics <metric-id> --format json
vercel metrics schema <metric-or-prefix> --format json
```

## Examples

Inspect the schema before building a query:

```bash filename="terminal"
vercel metrics schema <metric-or-prefix>
```

List all available metrics:

```bash filename="terminal"
vercel metrics list
```

Query a custom metric for the `pro` plan:

```bash filename="terminal"
vercel metrics database.duration_ms --filter "plan:pro"
```

Query a metric for the last seven days:

```bash filename="terminal"
vercel metrics <metric-id> --since 7d --granularity 1d --project project-name --prod
```

Query grouped results for a specific project:

```bash filename="terminal"
vercel metrics <metric-id> --group-by <dimension> --since 24h --project project-name --prod
```

Query production data across every project in the current team:

```bash filename="terminal"
vercel metrics <metric-id> --all --group-by project_id --since 24h --prod
```

Align daily buckets to a calendar timezone:

```bash filename="terminal"
vercel metrics <metric-id> --since 2026-05-28 --until 2026-05-29 --granularity 1d --bucket-timezone Europe/Paris --project project-name --prod
```

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel metrics` command:

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
