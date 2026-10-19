---
title: vercel traces
product: vercel
url: /docs/cli/traces
canonical_url: "https://vercel.com/docs/cli/traces"
last_updated: 2026-08-25
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/tracing
  - /docs/tracing/always-on-tracing
  - /docs/cli/global-options
  - /docs/tracing/session-tracing
summary: Search spans across a team, inspect request traces, capture session traces, or manage project trace sampling rules from the terminal.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/traces.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "848ae4e584fe92e569fbfb7388cbc79807dcea99aa02d15dce039e051a13ca08"
---

# vercel traces

The `vercel traces` command lets you search spans across a team, inspect request traces, capture session traces, and manage project trace sampling rules.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs](https://eve.dev/docs/observability/agent-runs) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Search trace spans from the Vercel CLI](https://vercel.com/changelog/search-trace-spans-from-the-vercel-cli)
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [vercel alerts](https://vercel.com/docs/cli/alerts) — List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
- [vercel flags](https://vercel.com/docs/cli/flags) — Learn how to manage feature flags for your Vercel project using the vercel flags CLI command.
- [vercel project](https://vercel.com/docs/cli/project) — Perform the following commands from the terminal for your Vercel Projects: list, create, inspect, update settings, renam
- [vercel connect](https://vercel.com/docs/cli/connect) — Learn how to manage Vercel Connect connectors using the vercel connect CLI command.

Full cross-link map for this page: [/docs/cli/traces.graph.md](/docs/cli/traces.graph.md)
<!-- /docsgraph:related -->

For more information about tracing, see the [Tracing documentation](/docs/tracing).

## Usage

The `vercel traces` command supports the following operations:

- [`search`](#search) - Search spans across team projects
- [`inspect`](#inspect) - Inspect a captured trace by request ID
- [`create`](#create) - Capture a session trace for a request
- [`config`](#manage-trace-sampling-rules) - Manage trace sampling rules

## Search spans

### `search`

Without `--project`, `vercel traces search` returns up to 100 spans across all projects in the selected team. This applies even when you run it from a linked project directory. Use `--limit` to return up to 1,000 spans. By default, it searches the last hour and lists the newest spans first.

> **💡 Note:** Typed JSON Lines output and `--next` are available in Vercel CLI 64.0.0 and
> later.

```bash filename="terminal"
vercel traces search
```

*Search team spans from the last hour.*

Search requires a team scope. Use `--scope <team>` to choose a team. Otherwise, the CLI uses your linked project's or repository's team, falling back to your selected team. If no team is available, run `vercel switch <team>`.

At a repository root linked to multiple teams, pass `--scope <team>` or run from a linked project directory.

**Options:**

- `--project <name-or-id>`, `-p`: Search only this project. When omitted, search all projects in the selected team
- `--environment <environment>`: Filter by `production` or `preview`, case-insensitive
- `--service <name>`: Filter by service name
- `--name <name>`: Filter by span name
- `--kind <kind>`: Filter by span kind name, case-insensitive, or its numeric value. See [Span kinds](#span-kinds)
- `--status <status>`: Filter by `error`, `ok`, or `unset`, case-insensitive
- `--deployment-id <id>`: Filter by deployment ID
- `--request-id <id>`: Filter by request ID
- `--trace-id <id>`: Filter by trace ID
- `--span-id <id>`: Filter by span ID
- `--root`: Filter root spans only
- `-s, --since <time>`: Start time. Defaults to one hour ago
- `-u, --until <time>`: End time. Defaults to now
- `--limit <number>`, `-n`: Total number of spans to return, from 1 to 1,000. Defaults to 100
- `--next <cursor>`, `-N`: Continue a previous search from its summary's `next` value. Cannot be combined with filter options, `--project`, `--since`, or `--until`. `--limit` can change
- `--query <kql>`, `-q`: Filter spans using a KQL field expression
- `--columns <list>`: Comma-separated column keys in display order. Cannot be combined with `--json`
- `--json`, `-j`: Output JSON Lines ending with a summary line

The command combines all filters, including `--root` and `--query`, with `AND`. Search accepts no positional arguments.

**Examples:**

```bash filename="terminal"
# Find error spans from the last hour
vercel traces search --status error --since 1h

# Find production spans for one service
vercel traces search --environment production --service checkout-api

# Find every span in one trace
vercel traces search --trace-id 4bf92f3577b34da6a3ce929d0e0e4736

# Find one span in that trace
vercel traces search --trace-id 4bf92f3577b34da6a3ce929d0e0e4736 --span-id 00f067aa0ba902b7

# Find root spans
vercel traces search --root

# Search all projects in a specific team
vercel traces search --scope my-team

# Filter spans to one project
vercel traces search --scope my-team --project my-app
```

### Set a time range

Both `--since` and `--until` accept relative durations such as `30m`, `4h`, or `7d`, ISO 8601 timestamps, or `YYYY-MM-DD` dates. Relative durations count backward from the current time. Date-only values mean midnight UTC, including for `--until`.

Search a one-hour window ending 30 minutes ago:

```bash filename="terminal"
vercel traces search --since 90m --until 30m
```

The start must be before the end. Your plan determines how far back you can search. See [trace retention](/docs/tracing/always-on-tracing#retention).

### Filter with KQL

Use field expressions in `--query`. Bare text search is unsupported. For example, find spans longer than two seconds and choose the table columns:

```bash filename="terminal"
vercel traces search --query 'span.duration > 2000' --columns span.startTime,span.duration,span.name,span.kind,span.status.code
```

Results remain newest first. Search does not support sorting spans by duration.

Use `NOT` to exclude matches and a trailing `*` to match a prefix. Double-quote names containing spaces inside the shell-quoted query:

```bash filename="terminal"
vercel traces search --query 'NOT span.name:app/lib/fetch-api*'
vercel traces search --query 'NOT span.name:("GET /screenshot/v2" OR "middleware GET")'
```

You can filter by these fields:

| Fields | Query values |
| --- | --- |
| `project.id`, `deployment.id`, `environment`, `service.name` | Project, deployment, environment, or service values |
| `request.id`, `user.id`, `session.id` | Request, user, or session identifiers |
| `trace.id`, `trace.state` | Trace identifier or trace state |
| `span.id`, `parent.id`, `span.name` | Span, parent span, or span name values |
| `span.isRoot` | `1` for root spans or `0` for non-root spans |
| `span.duration` | Numeric duration in milliseconds |
| `span.kind` | Numeric span kind from 0 to 5 |
| `span.status.code` | Exact, case-sensitive values `Error`, `Ok`, or `Unset` |

Other field names search span attributes and resource attributes.

Unquoted numbers use numeric comparison, and unquoted `true` or `false` match boolean values. Double-quoted values use string comparison. The `:*` expression checks whether an attribute key exists.

### Span kinds

`--kind` accepts a name or its OpenTelemetry Protocol numeric value. Inside `--query`, use the numeric value:

```bash filename="terminal"
vercel traces search --kind server
vercel traces search --query 'span.kind:(2 OR 3)'
```

| Name | Value |
| --- | --- |
| `unspecified` | `0` |
| `internal` | `1` |
| `server` | `2` |
| `client` | `3` |
| `producer` | `4` |
| `consumer` | `5` |

### Choose output columns

The default table includes `span.startTime`, `span.duration`, `span.name`, `span.status.code`, `service.name`, `trace.id`, `span.id`, and `parent.id`, in that order. It excludes `environment`, `request.id`, and `span.kind`; add any of them with `--columns`, or select a smaller set:

```bash filename="terminal"
vercel traces search --columns span.startTime,span.duration,span.name,span.kind,span.status.code
```

The `environment` column shows the deployment environment. Missing values display `-`.

Column names are case-sensitive and cannot repeat. Use only the keys listed above. Shorthand keys such as `time`, `duration`, and `kind` are rejected. Table timestamps use UTC. The table shortens long span names and removes routing-region prefixes from request IDs. JSON Lines keeps the full values.

Table output lists the matching spans, and an empty result prints `No spans found for this period.`

### Export spans as JSON Lines

`--json` prints one JSON object per line. A span line looks like `{"type":"span","data":<event>}`. Read span fields under `.data.span` and resource fields under `.data.resource`.

```bash filename="terminal"
vercel traces search --json | jq 'select(.type == "span") | .data.span.name'
```

*Printing spans as JSON Lines and reading each span name with \`jq\`.*

Paths such as `.span.traceId` from earlier CLI versions now live under `.data`.

The last line is a summary. Its fields are top-level: `recordsReturned`, `timeRange`, `pagination` (`hasMore` and `next`), and `excludedIntervals`. `excludedIntervals` lists time ranges inside the window that the query skipped. An empty result prints only that summary line.

[`--non-interactive`](/docs/cli/global-options#non-interactive) implies `--json`.

### Continue a search with `--next`

When more spans match than `--limit` returns, table output prints a `Next page:` command. With `--json`, read `pagination.next` from the summary line.

```bash filename="terminal"
vercel traces search --next <cursor> --json
```

*Continuing a search from the cursor in the previous summary line.*

The cursor keeps the team, project, filters, and time window from the first search. You can change `--limit` on the next page.

## Inspect a request trace

### `inspect`

`get` remains a supported alias, but prints a deprecation warning. Use `inspect` for new commands.

Fetch a captured trace by request ID. The command prints a summary in the terminal by default.

```bash filename="terminal"
vercel traces inspect req_1234567890
```

*Using the \`vercel traces inspect\` command to inspect a request trace.*

`inspect` is the default subcommand, so `vercel traces req_1234567890` returns the same trace. Unlike `search`, it defaults to the linked project.

**Options:**

- `--project <name-or-id>`: Project name or ID, defaulting to the linked project
- `--json`: Output the raw trace as JSON instead of a terminal summary
- `--open`: Open the trace in the Vercel Dashboard instead of printing it
- `--view <view>`: Dashboard view to open. Accepts `timeline`, `tree`, or `waterfall`, and requires `--open`. Defaults to `timeline`

`--open` cannot be combined with `--json`.

**Examples:**

```bash filename="terminal"
# Fetch a trace from a specific team and project
vercel traces inspect req_1234567890 --scope my-team --project my-app

# Open a trace in the dashboard tree view
vercel traces inspect req_1234567890 --open --view tree

# Output the raw trace as JSON
vercel traces inspect req_1234567890 --json
```

A request ID in search results does not guarantee that `inspect` can retrieve the trace. Lookup requires a matching root span in the same project within 30 minutes after the request ID timestamp. If no matching root span exists, `inspect` returns 404. When inspecting a team-wide search result, pass its project with `--project` and use the same team scope.

To find a span's project, check the **SERVICE NAME** column in search results. The service name is usually the project name, which `--project` accepts. Add the `request.id` column to see each span's request ID in the same table:

```bash filename="terminal"
vercel traces search --scope my-team --root --columns span.startTime,span.name,service.name,request.id
```

*Listing root spans with their service names and request IDs.*

A service name that starts with `vercel.` belongs to a span that Vercel creates, and the table marks it with ▲. Your app can also set its own service name. In both cases, the service name doesn't identify the project, so read the project ID from JSON Lines output instead:

```bash filename="terminal"
vercel traces search --scope my-team --root --json |
  jq -c 'select(.type == "span") | {
    requestId: .data.span.attributes["vercel.request_id"],
    projectId: (.data.resource.attributes | .["vercel.project_id"] // .["vercel.projectId"])
  }'
```

*Printing the request ID and project ID of each root span in a team.*

Pass a request ID and its project name or ID to `inspect`, along with the same team:

```bash filename="terminal"
vercel traces inspect req_1234567890 --scope my-team --project my-app
```

## Capture a session trace

### `create`

Send a request and capture its session trace. `vercel traces create` is an alias for `vercel curl --trace`.

```bash filename="terminal"
vercel traces create /api/hello
```

*Using the \`vercel traces create\` command to capture a session trace.*

**Options:**

- `--deployment <id-or-url>`: Deployment ID or URL to target
- `--protection-bypass <secret>`: Protection bypass secret for a protected deployment
- `--json`: Output the response and request ID as JSON
- `--yes`, `-y`: Skip the production confirmation prompt

Pass curl flags after `--`.

**Examples:**

```bash filename="terminal"
# Target a specific deployment
vercel traces create /api/status --deployment https://your-project-abc123.vercel.app

# Send a POST request with a JSON body
vercel traces create /api/test -- --request POST --data '{"name": "John"}'
```

## Manage trace sampling rules

Sampling rules decide which requests [always-on tracing](/docs/tracing/always-on-tracing) collects a trace for. Each rule pairs an environment and an optional path prefix with a rate, and a project holds at most 10 rules.

The `vercel traces config` subcommands read and write those rules for the linked project, or for the project you name with `--project`. Changing rules requires a role with project update access. Running `vercel traces config` with no subcommand prints help.

The `vercel traces config` command supports the following operations:

- [`config ls`](#config-ls) - List every rule on the project
- [`config set`](#config-set) - Add a rule or change the rate of an existing rule
- [`config rm`](#config-rm) - Remove one rule or every rule for an environment

### How the CLI describes a sampling rule

| Part          | Values                            | Meaning                                                                                      |
| ------------- | --------------------------------- | -------------------------------------------------------------------------------------------- |
| `environment` | `any`, `preview`, or `production` | `any` matches requests in every environment                                                  |
| `rate`        | A whole number from 1 to 100      | The percentage of matching requests to trace                                                 |
| `requestPath` | A path prefix, such as `/api`     | Optional. A rule without one matches every path, and `ls` labels it `(all paths)`             |

Two details differ from the dashboard:

- The dashboard **Rate** field accepts 0, but the CLI accepts whole percentages from 1 to 100 and rejects both `0` and fractions such as `2.5`. To add a 0% rule that matches requests and collects nothing, use the dashboard.
- The dashboard calls a rule that covers every environment **All Environments**. On the command line, that environment is `any`.

Vercel uses the first matching rule shown by `ls`. `set` adds new rules to the bottom, so an earlier broad rule can override a later narrow rule. The CLI cannot reorder rules. To change the order, remove the rules and add them back in the order you want. See [Sampling](/docs/tracing#sampling) for overlap behavior.

### `config ls`

Alias: `config list`.

List the trace sampling rules for a project.

```bash filename="terminal"
vercel traces config ls
```

*Using the \`vercel traces config ls\` command to list trace sampling rules.*

The command prints one row per rule, along with the count against the 10-rule limit:

```text filename="stdout"
> Trace sampling rules for my-app (3 of 10 rules)

  environment  path         rate
  any          (all paths)  1%
  preview      /api         100%
  production   /api         25%
```

A project with no rules collects no traces. In that case, `ls` says so, names the command that adds a rule, and exits successfully.

**Options:**

- `--json`: Output the rules as JSON
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project

### `config set`

Add a trace sampling rule or change the rate of an existing rule.

```bash filename="terminal"
vercel traces config set <environment> <rate> [requestPath]
```

*Using the \`vercel traces config set\` command to add or update a trace sampling rule.*

A rule is identified by its environment and path prefix together. Running `set` again with the same pair changes that rule's rate instead of adding a second rule, so changing a rate takes one command. Because the pair includes the environment, `any /api` and `production /api` are two separate rules.

`set` never prompts. Its success message prints the rate the rule held before, so you can put the old value back with one more `set`:

```text filename="stdout"
> Success! Set production /api to 75% (was 10%). 3 of 10 rules.
```

Set a rate for every path in an environment by leaving the path prefix off:

**Examples:**

```bash filename="terminal"
# Trace a quarter of production traffic
vercel traces config set production 25

# Trace every preview request to one path prefix
vercel traces config set preview 100 /api

# Trace 1% of traffic in every environment
vercel traces config set any 1
```

When the project already holds 10 rules, `set` refuses the write before it changes anything and names the command that removes a rule.

**Options:**

- `--json`: Output the new rule as JSON
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project

### `config rm`

Aliases: `config remove`, `config delete`.

Remove one trace sampling rule or every rule for an environment.

```bash filename="terminal"
vercel traces config rm <environment> [requestPath]
```

*Using the \`vercel traces config rm\` command to remove trace sampling rules.*

The path prefix decides how many rules the command removes:

| Command                                        | Removes                                              |
| ---------------------------------------------- | ---------------------------------------------------- |
| `vercel traces config rm production /api`      | The one production rule with the `/api` prefix        |
| `vercel traces config rm production --default` | Only the production rule that covers all paths        |
| `vercel traces config rm production`           | Every production rule                                 |

Combining `--default` with a path prefix is an error, because the two select different rules.

`rm any` removes the rules that match every environment, not every rule on the project. To clear a project and turn always-on tracing off, run `rm` once for each of `any`, `preview`, and `production`.

`rm` always asks you to confirm. One command can remove up to 10 rules, and nothing records what those rules held afterwards, so the command lists every rule it matched with its path and rate before it asks:

```text filename="stdout"
> The following 2 rules will be removed from my-app:
  production (all paths) 25%
  production /api 75%
? Remove 2 trace sampling rules? (y/N)
```

No option skips that prompt. A session that cannot show one, such as a CI job or a coding agent, fails without changing the project and prints the command to run in a terminal instead.

When nothing matches the environment and path prefix you passed, `rm` reports that no rule matched and leaves the project unchanged.

**Options:**

- `--default`: Remove only the rule without a path prefix, keeping the per-path rules
- `--json`: Output the removed rules as JSON
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project

### JSON output for sampling rules

With `--json`, each subcommand prints only the rules it read or changed, so you can pipe the output into another tool:

```bash filename="terminal"
vercel traces config ls --json
```

```json filename="stdout"
[
  {
    "environment": "production",
    "requestPath": "/api",
    "sampleRate": 25
  }
]
```

Each field maps onto a `set` argument, so a rule from `ls --json` can go straight back in:

```bash filename="terminal"
vercel traces config set production 25 /api
```

With [`--non-interactive`](/docs/cli/global-options#non-interactive), the subcommands print JSON whether or not you pass `--json`, and the object carries the project, a status, a message, and the commands to run next.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel traces` command:

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

## Related

- [Tracing overview](/docs/tracing)
- [Always-on tracing](/docs/tracing/always-on-tracing)
- [Session tracing](/docs/tracing/session-tracing)


---

[View full sitemap](/docs/sitemap)
