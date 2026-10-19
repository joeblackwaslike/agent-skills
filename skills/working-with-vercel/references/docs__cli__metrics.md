---
title: vercel metrics
product: vercel
url: /docs/cli/metrics
canonical_url: "https://vercel.com/docs/cli/metrics"
last_updated: 2026-09-10
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/observability/observability-plus
  - /docs/observability/custom-metrics
  - /docs/cli/global-options
summary: Discover and query observability metrics, and inspect available dimensions and aggregations using the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/metrics.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "de783ff75ede02ed4c56fe3e7fb8c7fe3c8edfe8de99aee7176f7da5941991f8"
---

# vercel metrics

The `vercel metrics` command, also available as `vc metrics`, lets you discover and query metrics from the command line. Querying observability metrics requires [Observability Plus](/docs/observability/observability-plus), with product-specific exceptions listed below.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Query observability metrics using the Vercel CLI](https://vercel.com/changelog/vercel-metrics-in-cli)
- [Improve Cumulative Layout Shift \\(CLS\\) on Vercel](https://vercel.com/kb/guide/cls-on-vercel) — Read, diagnose, and fix Cumulative Layout Shift on Vercel using Speed Insights and Next.js best practices.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Speed Insights metrics from your terminal.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [Query Reference](https://vercel.com/docs/query/reference) — Use this reference to find the event types, metrics, aggregations, dimensions, and operators available in Query.
- [vercel usage](https://vercel.com/docs/cli/usage) — Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.

Full cross-link map for this page: [/docs/cli/metrics.graph.md](/docs/cli/metrics.graph.md)
<!-- /docsgraph:related -->

> **Availability**: Metrics other than Web Analytics and Speed Insights metrics are available on Enterprise and Pro plans with Observability Plus

Use `vercel metrics schema` before you build a query. Without an argument, the command lists the metrics available to your account. Pass a metric name or prefix to inspect its dimensions and aggregations.

## Usage

```bash filename="terminal"
# List queryable metrics for the current team context
vercel metrics schema

# Inspect a metric or metric prefix
vercel metrics schema <metric-or-prefix>

# Query a custom metric and filter by an attribute
vercel metrics database.duration_ms --filter 'plan:pro'

# Query production data for a specific project
vercel metrics <metric_name> --since 7d --granularity 1d --project project-name --prod

# Query grouped results
vercel metrics <metric_name> --group-by <dimension> --since 1d --limit 5 --project project-name --prod

# Query across every project in the current team
vercel metrics <metric_name> --all --group-by projectId --since 24h --prod
```

*Using the \`vercel metrics\` command to discover metrics before querying them.*

## Available metrics

Platform metric names start with `vercel.`. The tables below group metrics by prefix and describe what each metric measures. Use the full metric name as the `<metric_name>` argument:

```bash filename="terminal"
vercel metrics vercel.function_invocation.count --since 24h
```

Run `vercel metrics schema` to see the current catalog for your team, including custom metrics. To inspect the dimensions and supported aggregations for a group or a specific metric, pass its prefix or full name:

```bash filename="terminal"
vercel metrics schema vercel.function_invocation
vercel metrics schema vercel.function_invocation.function_duration_ms
```

### Requests

Prefix: `vercel.request`

| Metric name | Description |
| - | - |
| `vercel.request.count` | Number of incoming requests. |
| `vercel.request.fdt_in_bytes` | Incoming Fast Data Transfer, in bytes. |
| `vercel.request.fdt_out_bytes` | Outgoing Fast Data Transfer, in bytes. |
| `vercel.request.fdt_total_bytes` | Total Fast Data Transfer, in bytes. |
| `vercel.request.route_cpu_duration_ms` | CPU time spent routing requests, in milliseconds. |
| `vercel.request.external_rewrite_dns_ms` | DNS lookup time for external rewrites, in milliseconds. |
| `vercel.request.external_rewrite_connect_ms` | Connection time for external rewrites, in milliseconds. |

### Vercel Functions

Prefix: `vercel.function_invocation`

| Metric name | Description |
| - | - |
| `vercel.function_invocation.count` | Number of function invocations. |
| `vercel.function_invocation.function_duration_ms` | Function duration, in milliseconds. |
| `vercel.function_invocation.function_cpu_time_ms` | Active CPU time, in milliseconds. |
| `vercel.function_invocation.cpu_throttle_percent` | CPU throttling percentage. |
| `vercel.function_invocation.peak_memory_mb` | Peak memory usage, in megabytes. |
| `vercel.function_invocation.provisioned_memory_mb` | Provisioned memory, in megabytes. |
| `vercel.function_invocation.ttfb_ms` | Time to first byte, in milliseconds. |
| `vercel.function_invocation.fot_in_bytes` | Incoming Fast Origin Transfer, in bytes. |
| `vercel.function_invocation.fot_out_bytes` | Outgoing Fast Origin Transfer, in bytes. |
| `vercel.function_invocation.fot_total_bytes` | Total Fast Origin Transfer, in bytes. |

### Routing Middleware

Prefix: `vercel.middleware_invocation`

| Metric name | Description |
| - | - |
| `vercel.middleware_invocation.count` | Number of middleware invocations. |
| `vercel.middleware_invocation.request_duration_ms` | Request duration, in milliseconds. |
| `vercel.middleware_invocation.function_cpu_time_ms` | Active CPU time, in milliseconds. |
| `vercel.middleware_invocation.function_duration_gbhr` | Function duration weighted by memory, in gigabyte-hours. |
| `vercel.middleware_invocation.ttfb_ms` | Time to first byte, in milliseconds. |
| `vercel.middleware_invocation.fot_in_bytes` | Incoming Fast Origin Transfer, in bytes. |
| `vercel.middleware_invocation.fot_out_bytes` | Outgoing Fast Origin Transfer, in bytes. |
| `vercel.middleware_invocation.fot_total_bytes` | Total Fast Origin Transfer, in bytes. |

### External API requests

Prefix: `vercel.external_api_request`

| Metric name | Description |
| - | - |
| `vercel.external_api_request.count` | Number of outgoing requests to external APIs. |
| `vercel.external_api_request.request_duration_ms` | External API request duration, in milliseconds. |
| `vercel.external_api_request.transfer_bytes` | External API data transfer, in bytes. |

### AI Gateway

Prefix: `vercel.ai_gateway.request`

#### Requests and latency

| Metric name | Description |
| - | - |
| `vercel.ai_gateway.request.count` | Number of AI Gateway requests. |
| `vercel.ai_gateway.request.request_duration_ms` | Request duration, in milliseconds. |
| `vercel.ai_gateway.request.time_to_first_token_ms` | Time to first token, in milliseconds. |

#### Tokens and media

| Metric name | Description |
| - | - |
| `vercel.ai_gateway.request.input_tokens` | Number of input tokens. |
| `vercel.ai_gateway.request.output_tokens` | Number of output tokens. |
| `vercel.ai_gateway.request.cached_input_tokens` | Number of cached input tokens. |
| `vercel.ai_gateway.request.cache_creation_input_tokens` | Number of input tokens used to create a cache entry. |
| `vercel.ai_gateway.request.cache_creation1h_input_tokens` | Number of input tokens used to create a one-hour cache entry. |
| `vercel.ai_gateway.request.audio_input_tokens` | Number of audio input tokens. |
| `vercel.ai_gateway.request.audio_output_tokens` | Number of audio output tokens. |
| `vercel.ai_gateway.request.audio_duration_seconds` | Audio duration, in seconds. |
| `vercel.ai_gateway.request.image_count` | Number of images. |
| `vercel.ai_gateway.request.image_input_tokens` | Number of image input tokens. |
| `vercel.ai_gateway.request.video_count` | Number of videos. |
| `vercel.ai_gateway.request.video_input_tokens` | Number of video input tokens. |
| `vercel.ai_gateway.request.video_duration_seconds` | Video duration, in seconds. |
| `vercel.ai_gateway.request.video_fps` | Video frame rate, in frames per second. |
| `vercel.ai_gateway.request.realtime_client_message_count` | Number of realtime client messages. |
| `vercel.ai_gateway.request.realtime_session_duration_seconds` | Realtime session duration, in seconds. |

#### Tool calls and reranking

| Metric name | Description |
| - | - |
| `vercel.ai_gateway.request.gateway_tool_call_count` | Number of AI Gateway tool calls. |
| `vercel.ai_gateway.request.web_search_call_count` | Number of web search calls. |
| `vercel.ai_gateway.request.google_maps_search_call_count` | Number of Google Maps search calls. |
| `vercel.ai_gateway.request.reranking_query_count` | Number of reranking queries. |

#### Costs

All AI Gateway cost metrics use US dollars.

| Metric name | Description |
| - | - |
| `vercel.ai_gateway.request.cost` | Request cost. |
| `vercel.ai_gateway.request.gateway_cost` | AI Gateway cost. |
| `vercel.ai_gateway.request.gateway_tool_call_cost` | AI Gateway tool call cost. |
| `vercel.ai_gateway.request.model_allowlist_cost` | Model allowlist cost. |
| `vercel.ai_gateway.request.provider_allowlist_cost` | Provider allowlist cost. |
| `vercel.ai_gateway.request.region_pinning_cost` | Region pinning cost. |
| `vercel.ai_gateway.request.zdr_cost` | Zero Data Retention cost. |
| `vercel.ai_gateway.request.quota_write_cost` | Quota write cost. |
| `vercel.ai_gateway.request.reporting_write_cost` | Reporting write cost. |
| `vercel.ai_gateway.request.surcharge_cost` | Surcharge cost. |

### Web Analytics

Prefixes: `vercel.analytics.page_view` and `vercel.analytics.event`

| Metric name | Description |
| - | - |
| `vercel.analytics.page_view.count` | Number of page views. |
| `vercel.analytics.event.count` | Number of custom Web Analytics events. |

### Speed Insights

Prefix: `vercel.speed_insights`

| Metric name | Description |
| - | - |
| `vercel.speed_insights.cls` | Cumulative Layout Shift (CLS) score. |
| `vercel.speed_insights.fcp_ms` | First Contentful Paint (FCP), in milliseconds. |
| `vercel.speed_insights.inp_ms` | Interaction to Next Paint (INP), in milliseconds. |
| `vercel.speed_insights.lcp_ms` | Largest Contentful Paint (LCP), in milliseconds. |
| `vercel.speed_insights.ttfb_ms` | Time to first byte (TTFB), in milliseconds. |

### Firewall

Prefix: `vercel.firewall_action`

| Metric name | Description |
| - | - |
| `vercel.firewall_action.count` | Number of Firewall actions. |

### AI traffic

Prefix: `vercel.ai_traffic`

| Metric name | Description |
| - | - |
| `vercel.ai_traffic.count` | Number of requests from AI bots. |
| `vercel.ai_traffic.crawler.count` | Number of requests from AI crawlers. |
| `vercel.ai_traffic.assistant.count` | Number of requests from AI assistants. |
| `vercel.ai_traffic.markdown_requests.count` | Number of requests from AI bots that requested `text/markdown`. |
| `vercel.ai_traffic.failed_requests.count` | Number of failed requests from AI bots. |

### BotID

Prefix: `vercel.bot_id_check`

| Metric name | Description |
| - | - |
| `vercel.bot_id_check.count` | Number of BotID checks. |

### Image Optimization

Prefix: `vercel.image_transformation`

| Metric name | Description |
| - | - |
| `vercel.image_transformation.count` | Number of image transformations. |
| `vercel.image_transformation.request_duration_ms` | Transformation duration, in milliseconds. |
| `vercel.image_transformation.source_size_bytes` | Original image size, in bytes. |
| `vercel.image_transformation.optimized_size_bytes` | Optimized image size, in bytes. |
| `vercel.image_transformation.compression_ratio` | Image compression ratio. |
| `vercel.image_transformation.size_change_percent` | Image size change, as a percentage. |

### Incremental Static Regeneration

Prefix: `vercel.isr_operation`

| Metric name | Description |
| - | - |
| `vercel.isr_operation.count` | Number of Incremental Static Regeneration (ISR) operations. |
| `vercel.isr_operation.read_bytes` | Data read, in bytes. |
| `vercel.isr_operation.read_units` | Number of read units. |
| `vercel.isr_operation.write_bytes` | Data written, in bytes. |
| `vercel.isr_operation.write_units` | Number of write units. |

### Drive

Prefix: `vercel.drive`

| Metric name | Description |
| - | - |
| `vercel.drive.read_bytes` | Data read, in bytes. |
| `vercel.drive.write_bytes` | Data written, in bytes. |
| `vercel.drive.storage_bytes` | Storage size, in bytes. |

### Vercel Sandbox

Prefix: `vercel.sandbox`

| Metric name | Description |
| - | - |
| `vercel.sandbox.cpu_total_time_ms` | Active CPU time, in milliseconds. |
| `vercel.sandbox.cpu_usage` | CPU usage, as a percentage. |
| `vercel.sandbox.memory_used_bytes` | Memory usage, in bytes. |
| `vercel.sandbox.memory_peak_gb_hr` | Peak memory, in gigabyte-hours. |
| `vercel.sandbox.memory_requested_gb_hr` | Provisioned memory, in gigabyte-hours. |
| `vercel.sandbox.public_ingress_bytes` | Incoming public data transfer, in bytes. |
| `vercel.sandbox.public_egress_bytes` | Outgoing public data transfer, in bytes. |

### Vercel Queues

Prefix: `vercel.queue_operation`

| Metric name | Description |
| - | - |
| `vercel.queue_operation.count` | Number of queue operations. |
| `vercel.queue_operation.delivery_count` | Message delivery count. |
| `vercel.queue_operation.message_age_on_receive_ms` | Message age when received, in milliseconds. |
| `vercel.queue_operation.retention_seconds` | Message retention period, in seconds. |
| `vercel.queue_operation.visibility_timeout` | Message visibility timeout, in seconds. |

### Workflows

Prefix: `vercel.workflow_operation`

| Metric name | Description |
| - | - |
| `vercel.workflow_operation.runs` | Number of workflow runs created. |
| `vercel.workflow_operation.run_completed` | Number of completed workflow runs. |
| `vercel.workflow_operation.run_failed` | Number of failed workflow runs. |
| `vercel.workflow_operation.run_cancelled` | Number of canceled workflow runs. |
| `vercel.workflow_operation.steps` | Number of workflow steps created. |
| `vercel.workflow_operation.step_completed` | Number of completed workflow steps. |
| `vercel.workflow_operation.step_failed` | Number of failed workflow steps. |
| `vercel.workflow_operation.step_cancelled` | Number of canceled workflow steps. |

### Custom metrics

[Custom metrics](/docs/observability/custom-metrics) use the names you pass to `metric()` in your application, such as `database.duration_ms`. Their names and prefixes depend on your application, so they don't appear in the platform tables above.

Run `vercel metrics schema` to discover your team's custom metrics, then inspect a name or prefix before querying:

```bash filename="terminal"
vercel metrics schema database
vercel metrics database.duration_ms --filter 'plan:pro'
```

## Query output

By default, `vercel metrics` prints a human-readable table or time series summary. Use `--format` to output structured JSON for scripts, agents, and continuous integration checks.

## Feature access

Web Analytics metrics are available through `vercel metrics` without Observability Plus.

Speed Insights metrics are available through `vercel metrics` without Observability Plus.

Metrics other than Web Analytics and Speed Insights metrics require [Observability Plus](/docs/observability/observability-plus).

The dashboard and CLI are complementary:

- Use product dashboards for curated views.
- Use `vercel metrics` for custom filtering, grouping, aggregations, JSON output, and agent workflows.
- Use `--all` to query across every project in the current team when you need team-wide comparisons.

## Unique options

These options only apply to the `vercel metrics` command.

### Metric

The `<metric_name>` positional argument specifies the full metric name to query, such as `vercel.function_invocation.count` or `database.duration_ms`. Run `vercel metrics schema` to list queryable metrics for the current team context.

```bash filename="terminal"
vercel metrics <metric_name>
vercel metrics schema
```

### Schema subcommand

Use the `schema` subcommand to inspect the dimensions and aggregations available for a metric. Pass a metric name or prefix to inspect a narrower part of the schema.

```bash filename="terminal"
vercel metrics schema
vercel metrics schema <metric-or-prefix>
```

Use `--format` when you are building scripts or agent workflows that need to validate available fields before querying.

### Aggregation

The `--aggregation` option, shorthand `-a`, selects the aggregation for the metric.

```bash filename="terminal"
vercel metrics <metric_name> --aggregation <aggregation>
```

If omitted, the CLI selects a supported aggregation based on the metric's unit. Use `vercel metrics schema <metric-or-prefix>` to inspect the available aggregations.

### Group-by

The `--group-by` option groups results by a dimension. Repeat it to group by multiple dimensions.

```bash filename="terminal"
vercel metrics <metric_name> --group-by <dimension>
vercel metrics <metric_name> --group-by <dimension> --group-by <dimension>
```

### Filter

The `--filter` option, shorthand `-f`, filters the query using Vercel's supported subset of [Kibana Query Language (KQL)](https://www.elastic.co/docs/reference/query-languages/kql). For custom metrics, use `<attribute>:<value>` to filter by an attribute:

```bash filename="terminal"
vercel metrics database.duration_ms --filter 'plan:pro'
```

For platform metrics, use a dimension from the metric schema:

```bash filename="terminal"
vercel metrics <metric_name> --filter 'environment:production'
vercel metrics <metric_name> --filter 'httpStatus >= 500'
vercel metrics <metric_name> --filter 'requestPath:(/docs* OR /guides*)'
```

The following KQL syntax is supported:

| Syntax | Description | Example |
| - | - | - |
| `field:value`, `field = value`, or `field == value` | Match a value. Values are interpreted using the dimension's type. | `environment:production` |
| `field != value`, `field > value`, `field >= value`, `field < value`, or `field <= value` | Exclude a value or compare numeric dimensions. | `httpStatus >= 500` |
| `field:(value1 OR value2)` | Match any of several values for one dimension. | `country:(US OR DE)` |
| `field:*`, `field=*`, or `field==*` | Match data where the dimension exists. | `errorCode:*` |
| `field:prefix*`, `field:*suffix`, or `field:*text*` | Match a string by prefix, suffix, or substring. | `requestPath:/api/*` |
| `field =~ "pattern"` | Match a string using a regular expression. The pattern must be double-quoted. | `requestPath =~ "^/api/(v1\|v2)/"` |
| `AND`, `OR`, `NOT`, or `-expression` | Combine or negate expressions. Adjacent expressions imply `AND`. | `environment:production AND NOT country:US` |
| `(expression)` | Control how expressions are grouped. | `(country:US OR country:DE) AND deviceType:mobile` |

Wrap the complete filter in single quotes in your shell. Double-quote values that contain spaces or KQL-reserved characters. Use a backslash to escape the next character in a quoted or unquoted value:

```bash filename="terminal"
vercel metrics <metric_name> --filter 'requestPath:"/pricing enterprise"'
```

Repeat `--filter` to combine filters with `AND`:

```bash filename="terminal"
vercel metrics <metric_name> -f 'country:US' -f 'deviceType != mobile'
```

The filter implementation is KQL-inspired and does not support every KQL feature. The following limits apply:

- Filter dimensions must be available to the selected metric. Run `vercel metrics schema <metric-or-prefix>` to inspect them.
- Numeric dimensions require finite numeric values, and boolean dimensions require `true` or `false`.
- Wildcards and regular expressions require string dimensions. Wildcards are only supported at the beginning or end of a value; infix patterns such as `i*d` are rejected.
- Bare quoted phrases and unfielded wildcard searches are not supported.
- KQL nested-object syntax and Lucene fuzzy, proximity, and boosting operators are not supported.
- Each filter can contain up to 2,048 characters and 8 levels of nesting. A query can contain up to 50 expression nodes across all filters.

OData filter syntax is deprecated. Use KQL for new queries.

### Production environment

The `--prod` option limits the query to production data. It is equivalent to `--filter 'environment:production'`.

```bash filename="terminal"
vercel metrics <metric_name> --prod
```

### Since

The `--since` option, shorthand `-s`, sets the start of the time range. You can use a relative duration like `1h`, `24h`, or `7d`, a date, or an ISO timestamp. If omitted, the CLI defaults to the last hour.

```bash filename="terminal"
vercel metrics <metric_name> --since 24h
```

### Until

The `--until` option, shorthand `-u`, sets the end of the time range. If omitted, the command uses the current time.

```bash filename="terminal"
vercel metrics <metric_name> --since 24h --until 2026-03-19T12:00:00Z
```

### Granularity

The `--granularity` option, shorthand `-g`, controls the time bucket size. If omitted, the CLI computes a granularity for the selected time range.

```bash filename="terminal"
vercel metrics <metric_name> --granularity 1h --since 7d
```

### Limit

The `--limit` option, shorthand `-l`, sets the maximum number of grouped results returned per time bucket. The default is `10`.

```bash filename="terminal"
vercel metrics <metric_name> --group-by <dimension> --limit 50
```

### Order by

The `--order-by` option only applies to grouped results, so use it with `--group-by`. The default is `count` when the metric supports counting data points and `value` otherwise. Use `--order-by value` to order groups by the actual metric value returned by the query.

```bash filename="terminal"
vercel metrics <metric_name> --group-by <dimension> --order-by count
vercel metrics <metric_name> --group-by <dimension> --order-by value
```

### Order

The `--order` option sets the ordering direction for grouped results. It accepts `asc` or `desc`. The default is `desc`.

```bash filename="terminal"
vercel metrics <metric_name> --group-by <dimension> --order-by value --order asc
```

### Project

The `--project` option, shorthand `-p`, specifies the project name or project ID to query. Use it when you want results for a specific project. It defaults to the linked project when `--all` is not set.

```bash filename="terminal"
vercel metrics <metric_name> --project project-name --prod
```

### All

The `--all` option queries across all projects in the current team scope. It cannot be combined with `--project`.

```bash filename="terminal"
vercel metrics <metric_name> --all --group-by projectId --prod
```

### Format

The `--format` option outputs JSON instead of text. Use it for automation and agents.

```bash filename="terminal"
vercel metrics <metric_name> --format json
vercel metrics schema <metric-or-prefix> --format json
```

## Examples

Inspect the schema before building a query:

```bash filename="terminal"
vercel metrics schema <metric-or-prefix>
```

List all available metrics:

```bash filename="terminal"
vercel metrics schema
```

Query a custom metric for the `pro` plan:

```bash filename="terminal"
vercel metrics database.duration_ms --filter 'plan:pro'
```

Query a metric for the last seven days:

```bash filename="terminal"
vercel metrics <metric_name> --since 7d --granularity 1d --project project-name --prod
```

Query grouped results for a specific project:

```bash filename="terminal"
vercel metrics <metric_name> --group-by <dimension> --since 24h --project project-name --prod
```

Query production data across every project in the current team:

```bash filename="terminal"
vercel metrics <metric_name> --all --group-by projectId --since 24h --prod
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
