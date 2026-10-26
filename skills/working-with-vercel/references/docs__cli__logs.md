---
title: vercel logs
product: vercel
url: /docs/cli/logs
canonical_url: "https://vercel.com/docs/cli/logs"
last_updated: 2026-02-10
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/logs/runtime
  - /docs/observability/observability-plus
  - /docs/cli/global-options
summary: View and filter runtime logs or CDN request records for your Vercel project.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/logs.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "16692edbcb45b7eaa4d35f7142007de0ffffc9f8c008d5e9ee89fdd8ee736a0b"
---

# vercel logs

The `vercel logs` command shows runtime logs for your project. Use `vercel logs requests` to list CDN request records.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Improvements to command line logs](https://vercel.com/changelog/improvements-to-command-line-logs)
- [vercel logs CLI command now optimized for agents with historical log querying](https://vercel.com/changelog/vercel-logs-cli-command-now-optimized-for-agents-with-historical-log)
- [vercel activity](https://vercel.com/docs/cli/activity) — View activity events for your Vercel project or team, filtered by type, date range, and project.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel alerts](https://vercel.com/docs/cli/alerts) — List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

Full cross-link map for this page: [/docs/cli/logs.graph.md](/docs/cli/logs.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This page describes `vercel logs` in Vercel CLI v64.0.0 and later. For
> earlier versions, see
> [Removed and changed options](#removed-and-changed-options).

By default, you get the latest 100 records from the last 30 minutes for the linked project, across production, preview, and custom environments. How far back you can query, and which request fields you can filter, depend on your plan. See [runtime log limits](/docs/logs/runtime#limits) and [Observability Plus limitations](/docs/observability/observability-plus#limitations).

You can find more detailed logs on the [Logs](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs\&title=Open+Logs) page in the Vercel Dashboard.

## Usage

```bash filename="terminal"
# Runtime logs from the last 30 minutes
vercel logs

# CDN request records with a 5xx status
vercel logs requests --query 'httpStatus >= 500'
```

*Using the \`vercel logs\` command to view runtime logs or CDN request records.*

## Unique options

These options only apply to the `vercel logs` command.

### Project

The `--project` option, shorthand `-p`, sets the project ID or name. It defaults to the linked project.

```bash filename="terminal"
vercel logs --project my-app
```

### Deployment

The `--deployment` option filters by a deployment ID or URL.

```bash filename="terminal"
vercel logs --deployment dpl_xxxxx
```

### Environment

The `--environment` option filters by deployment environment, including custom environments.

```bash filename="terminal"
vercel logs --environment production
```

### Query

The `-q, --query` option filters results using Vercel's supported subset of [Kibana Query Language (KQL)](https://www.elastic.co/docs/reference/query-languages/kql).

```bash filename="terminal"
vercel logs runtime --query 'level:error AND timeout'
```

*Filtering runtime logs to error entries that mention "timeout".*

The following KQL syntax is supported:

| Syntax             | Description                                 |
| ------------------ | ------------------------------------------- |
| `field:value`      | The field equals the value.                 |
| `field:(a OR b)`   | The field matches any listed value.         |
| `field:*`          | The field is present.                       |
| `field != value`   | The field does not equal the value.         |
| `field > value`, `field >= value`, `field < value`, `field <= value` | Compare a numeric field on request records, such as `httpStatus`. |
| `field:*text*`     | The field value contains `text`.            |
| `AND`, `OR`, `NOT` | Combine clauses.                            |
| `(...)`            | Group clauses.                              |

When you write a query:

| Rule | Description |
| --- | --- |
| Quoting | Wrap the complete query in single quotes. Double-quote values that contain spaces or KQL-reserved characters, including request IDs that contain colons. |
| Runtime logs | A bare word searches the message, case-insensitive. Multiple bare words combine with `AND`. |
| `requestId` | Uses the query time window. When the request is older than 30 minutes, widen the window with [`--since`](#since). |
| Fields | Run `vercel logs runtime --help` or `vercel logs requests --help` to list the fields you can filter. |

### Since

The `--since` option, shorthand `-s`, sets the start of the time window. You can use a relative duration such as `1h` or `30m`, an ISO 8601 timestamp, or `now`. If you omit it, the window starts 30 minutes before `--until`, or 30 minutes before now.

```bash filename="terminal"
vercel logs --since 2h
```

### Until

The `--until` option, shorthand `-u`, sets the end of the time window. It accepts the same values as `--since`. If you omit it, the command uses the current time.

```bash filename="terminal"
vercel logs --since 2026-01-15T10:00:00Z --until 2026-01-15T11:00:00Z
```

### Limit

The `-n, --limit` option sets the maximum number of records to return. The default is 100, and the maximum is 10,000.

```bash filename="terminal"
vercel logs --limit 500
```

### Next

The `--next` option, shorthand `-N`, continues a previous query. The cursor keeps the team, project, filter, and time window.

When the query matches more records than the command returned, table output prints a `Next page:` command. With `--json`, pass the summary line's `pagination.next` value. You can change `--limit` on the next page. Passing `--next` together with `--project`, `--deployment`, `--environment`, `--query`, `--since`, or `--until` fails with a usage error.

```bash filename="terminal"
vercel logs --next <cursor>
```

### JSON

The `--json` option prints one JSON object per line. `-F json` prints the same output.

- Each record uses `{"type":"log"|"request","data":<event>}`. Read fields under `.data`.
- The last line is a `summary` with `recordsReturned`, `timeRange`, `pagination` (`hasMore` and `next`), and `excludedIntervals`.

An empty result prints only the summary line.

```bash filename="terminal"
vercel logs runtime --query 'level:error' --json | jq 'select(.type == "log") | .data'
```

*Printing runtime logs as JSON Lines and reading each record with \`jq\`.*

[`--non-interactive`](/docs/cli/global-options#non-interactive) implies `--json`.

## Removed and changed options

If you pass a removed option, the command fails with a usage error and prints the replacement.

| Old usage                    | Replacement                                                              |
| ---------------------------- | ------------------------------------------------------------------------ |
| `--search <text>`            | `--query` with a bare word, for example `--query 'timeout'`.             |
| `--level error`              | `--query 'level:error'`.                                                 |
| `--source serverless`        | `--query 'source:function'`.                                             |
| `--source static`            | Static and CDN traffic is in `vercel logs requests`.                     |
| `--status-code 500`          | `vercel logs requests --query 'httpStatus:500'`.                         |
| `--status-code 5xx`          | `vercel logs requests --query 'httpStatus >= 500 AND httpStatus < 600'`. |
| `--request-id <id>`          | `--query 'requestId:"<id>"'`.                                            |
| `--branch <name>`            | No longer supported. Remove it from the command.                         |
| `--expand`                   | Removed. The command shows full runtime messages by default.             |
| `--no-follow`, `--no-branch` | Removed. The command runs a query for the time window you set.           |
| Positional deployment, `-d`  | `--deployment`. The `-d` shorthand is now always `--debug`.              |
| `-j` shorthand for JSON      | `--json` or `-F json`.                                                   |

`--follow` is deprecated. The command prints a warning and returns the query results instead of streaming.

## Examples

Show production runtime errors from the last hour:

```bash filename="terminal"
vercel logs runtime --environment production --query 'level:error' --since 1h
```

*Filtering production runtime logs to errors from the last hour.*

Show POST requests that missed the cache:

```bash filename="terminal"
vercel logs requests --query 'requestMethod:POST AND cacheResult:MISS'
```

*Querying CDN request records for POST requests with a cache miss.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel logs` command:

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
