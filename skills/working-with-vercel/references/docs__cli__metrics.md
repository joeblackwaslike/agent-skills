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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "8d3dca690f91e005993b8fd5eaf9d5e5928017da030c835ea067f0e872c13b90"
---

# vercel metrics

The `vercel metrics` command lets you query observability data for your teams and projects. You can also inspect the schema to list available metrics, or inspect a metric or metric prefix to discover valid aggregations and dimensions before running a query.

This command requires [Observability Plus](/docs/observability/observability-plus).

> **🔒 Permissions Required**: Metrics

## Usage

```bash filename="terminal"
# Query metrics for the linked project
vercel metrics vercel.request.count

# Query a specific project by name or ID
vercel metrics vercel.request.count --project my-app --group-by route --since 24h

# Query metrics across all projects in the current team
vercel metrics vercel.request.count --all --group-by project_id --since 24h

# Inspect the schema for a metric prefix
vercel metrics schema vercel.request
```

*Using the \`vercel metrics\` command to query observability data or inspect the
available schema for a metric.*

## Query output

By default, `vercel metrics` prints a human-readable table or time series summary. Use `--format json` to output structured JSON for automation or agents.

## Unique options

These options only apply to the `vercel metrics` command.

### Metric

The `<metric>` positional argument specifies the metric ID to query. Provide it whenever you run the default query form. The [`schema` subcommand](#schema-subcommand) works without a metric ID and lists all available metrics.

```bash filename="terminal"
vercel metrics vercel.request.count
```

To list all available metrics, use:

```bash filename="terminal"
vercel metrics schema
```

To inspect a metric or metric prefix and see its available aggregations and dimensions, use:

```bash filename="terminal"
vercel metrics schema vercel.request
```

### Aggregation

The `--aggregation` option, shorthand `-a`, specifies the aggregation function for the selected metric.

```bash filename="terminal"
vercel metrics vercel.request.route_cpu_duration_ms --aggregation p95
```

If omitted, the CLI uses the default aggregation from the metric schema.

### Group-by

The `--group-by` option groups results by one or more dimensions. Repeat it to group by multiple dimensions.

```bash filename="terminal"
vercel metrics vercel.request.count --group-by route
vercel metrics vercel.request.count --group-by project_id --group-by route
```

### Filter

The `--filter` option, shorthand `-f`, applies an OData filter expression.

```bash filename="terminal"
vercel metrics vercel.request.count --filter "route eq '/api/logs'"
```

### Since

The `--since` option sets the start of the time range. You can use a relative duration like `1h`, `24h`, or `7d`, or an ISO timestamp. If omitted, the CLI defaults to the last hour.

```bash filename="terminal"
vercel metrics vercel.request.count --since 24h
```

### Until

The `--until` option sets the end of the time range. If omitted, the command uses the current time.

```bash filename="terminal"
vercel metrics vercel.request.count --since 24h --until 2026-03-19T12:00:00Z
```

### Granularity

The `--granularity` option, shorthand `-g`, controls the time bucket size. If omitted, the CLI computes an appropriate granularity for the selected time range.

```bash filename="terminal"
vercel metrics vercel.request.count --granularity 1h --since 7d
```

### Limit

The `--limit` option sets the maximum number of grouped results returned per time bucket. The default is `10`.

```bash filename="terminal"
vercel metrics vercel.request.count --group-by route --limit 50
```

### Project

The `--project` option, shorthand `-p`, specifies the project name or project ID to query. It defaults to the linked project when `--all` is not set.

```bash filename="terminal"
vercel metrics vercel.request.count --project my-app
vercel metrics vercel.request.count --project prj_123456789
```

### All

The `--all` option queries across all projects in the current team scope. It cannot be combined with `--project`.

```bash filename="terminal"
vercel metrics vercel.request.count --all --group-by project_id
```

### Format

The `--format` option outputs JSON instead of text. This is useful for automation and agents.

```bash filename="terminal"
vercel metrics vercel.request.count --format json
vercel metrics schema vercel.request --format json
```

## Schema subcommand

Use the `schema` subcommand to:

- list all available metrics with `vercel metrics schema`
- inspect the dimensions and aggregations supported for a specific metric or metric prefix with `vercel metrics schema <metric-id-or-prefix>`

```bash filename="terminal"
vercel metrics schema
vercel metrics schema vercel.request
vercel metrics schema vercel.request.count --format json
```

This is useful when building queries interactively or scripting queries that need to validate available fields first.

## Examples

Query request volume by route for the last 24 hours:

```bash filename="terminal"
vercel metrics vercel.request.count --aggregation sum --group-by route --since 24h
```

Query p95 latency by route for a specific project:

```bash filename="terminal"
vercel metrics vercel.request.route_cpu_duration_ms --project my-app --aggregation p95 --group-by route --since 24h
```

Query team-wide traffic grouped by project:

```bash filename="terminal"
vercel metrics vercel.request.count --all --aggregation sum --group-by project_id --since 24h
```

Inspect the schema before building a query:

```bash filename="terminal"
vercel metrics schema vercel.request
```


---

[View full sitemap](/docs/sitemap)
