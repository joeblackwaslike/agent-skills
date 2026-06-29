---
title: vercel metrics
product: vercel
url: /docs/cli/metrics
canonical_url: "https://vercel.com/docs/cli/metrics"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/observability/observability-plus
summary: Query observability metrics and inspect available metrics, dimensions, and aggregations using the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/metrics.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "a6d03a90feb0fcb55a07fca381f634e58e55fe55852cf37fb122fe88659b8686"
---

# vercel metrics

The `vercel metrics` command lets you query metrics from the command line. Querying observability metrics requires [Observability Plus](/docs/observability/observability-plus), with product-specific exceptions listed below.

> **🔒 Permissions Required**: Metrics other than Web Analytics and Speed Insights metrics

Use the schema before you build a query. The metrics schema is the source of truth for the metrics, dimensions, and aggregations available to your account.

## Usage

```bash filename="terminal"
# List queryable metrics for the current team context
vercel metrics schema

# Inspect a metric or metric prefix
vercel metrics schema <metric-or-prefix>

# Query production data for a specific project
vercel metrics <metric-id> --since 7d --granularity 1d --project project-name --prod

# Query grouped results
vercel metrics <metric-id> --group-by <dimension> --since 1d --limit 5 --project project-name --prod

# Query across every project in the current team
vercel metrics <metric-id> --all --group-by project_id --since 24h --prod
```

*Using the \`vercel metrics\` command to discover the schema before querying metrics.*

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

The `<metric-id>` positional argument specifies the metric to query. Run `vercel metrics schema` to list queryable metrics for the current team context.

```bash filename="terminal"
vercel metrics <metric-id>
vercel metrics schema
```

### Schema subcommand

Use the `schema` subcommand to discover the metrics, dimensions, and aggregations available to your account. Pass a metric ID or prefix to inspect a narrower part of the schema.

```bash filename="terminal"
vercel metrics schema
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

The `--filter` option, shorthand `-f`, applies an OData filter expression. Repeat it to combine filters with `and`.

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


---

[View full sitemap](/docs/sitemap)
