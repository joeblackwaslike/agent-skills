---
title: vercel drains
product: vercel
url: /docs/cli/drains
canonical_url: "https://vercel.com/docs/cli/drains"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/drains
  - /docs/cli/login
  - /docs/cli
  - /docs/drains/using-drains
  - /docs/drains/security
summary: List, inspect, create, update, pause, resume, and delete Vercel Drains from your terminal.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/drains.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "b5e1330f0decfa222e5b3f5abb3bdfc8067858751a748a2f733cd17caf78e2e9"
---

# vercel drains

The `vercel drains` command manages [Drains](/docs/drains) that forward logs, traces, Web Analytics, and Speed Insights data to external endpoints.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Drains: Complete observability data, anywhere](https://vercel.com/blog/introducing-vercel-drains)
- [Drains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains) — Vercel MCP tools for drains.
- [Retrieve a list of all Drains](https://vercel.com/docs/rest-api/drains/retrieve-a-list-of-all-drains) — GET /v1/drains — Allows to retrieve the list of Drains of the authenticated team.
- [Drain Audit Logs to S3](https://vercel.com/docs/drains/audit-logs-to-s3) — Learn how to configure AWS IAM and Amazon S3 so Vercel can write Audit Log Drain events to your S3 bucket.
- [Creates a Configurable Log Drain \\(deprecated\\)](https://vercel.com/docs/rest-api/logdrains/creates-a-configurable-log-drain-deprecated) — POST /v1/log-drains — Creates a configurable log drain. This endpoint must be called with a team AccessToken \\(integrati
- [Find a Drain by id](https://vercel.com/docs/rest-api/drains/find-a-drain-by-id) — GET /v1/drains/{id} — Get the information for a specific Drain by passing the drain id in the URL.

Full cross-link map for this page: [/docs/cli/drains.graph.md](/docs/cli/drains.graph.md)
<!-- /docsgraph:related -->

Sign in with [`vercel login`](/docs/cli/login), or [authenticate with a token](/docs/cli#using-in-a-cicd-environment). Commands use your current team. Pass the global `--scope` option to select another team. Listing drains doesn't require a linked project; use `--project` to filter the results.

## Usage

Run `vercel drains` without a subcommand to list drains:

```bash filename="terminal"
vercel drains
vercel drains list --scope my-team
```

*List drains for the current team or a specific team.*

| Subcommand | Description |
| --- | --- |
| [`list`](#list) | List drains. Alias: `ls`. |
| [`inspect`](#inspect) | Show a drain's configuration. |
| [`create`](#create) | Create a drain for a custom HTTP endpoint. |
| [`update`](#update) | Change a drain's configuration. |
| [`pause`](#pause-and-resume) | Stop sending data without deleting the drain. |
| [`resume`](#pause-and-resume) | Resume a paused drain. |
| [`delete`](#delete) | Permanently delete a drain. Aliases: `rm`, `del`. |

Use a drain ID from `list` wherever a command takes `<drain>`. Every subcommand accepts `--json`.

## List

List drains, optionally filtering by project:

```bash filename="terminal"
vercel drains list
vercel drains list --project my-app --json
```

*List all drains or drains that send data from one project.*

| Option | Description |
| --- | --- |
| `--project`, `-p` | Project name or ID to filter by. Without this option, list drains across the team. |
| `--limit`, `-n` | Integer from 1 to 100 for results per page. Defaults to 20. |
| `--next` | Cursor from the previous page. |
| `--json` | Write a JSON object with `drains` and `pagination` to stdout. |

To continue listing, pass the cursor from `pagination.next` in JSON output or the next-page hint in text output:

```bash filename="terminal"
vercel drains list --limit 10 --json
vercel drains list --limit 10 --next your_next_cursor_here --json
```

*Read successive pages of drains.*

`pagination.next` is `null` when there are no more results.

## Inspect

Inspect a drain's type, destination, projects, and settings:

```bash filename="terminal"
vercel drains inspect drn_example
vercel drains inspect drn_example --json
```

*Inspect a drain using its ID.*

Text output shows only the endpoint's host by default. Pass `--show-full-url` to include its path and query string. JSON output includes the full endpoint URL, which can contain credentials. The CLI omits signing secrets and redacts delivery header values in JSON output.

## Create

Provide a name, data type, and endpoint URL:

```bash filename="terminal"
vercel drains create --name app-logs --type logs --url https://example.com/drain
```

*Create a log drain for all projects on the current team.*

The CLI creates custom HTTP destinations. For traces, it uses OTLP over HTTP. The supported data types and encodings are:

| `--type` | Data | `--encoding` values |
| --- | --- | --- |
| `logs` | Logs | `json`, `ndjson` |
| `traces` | Distributed traces | `json`, `proto` |
| `analytics` | Web Analytics events | `json`, `ndjson` |
| `speed-insights` | Speed Insights metrics | `json`, `ndjson` |

Encoding defaults to `json` for every type. Use the [dashboard](/docs/drains/using-drains#configuring-drains) to configure other drain types or destinations.

### Create options

| Option | Required | Description |
| --- | --- | --- |
| `--name` | Yes | Name of the drain. |
| `--type` | Yes | One of the data types listed above. |
| `--url` | Yes | Full `http` or `https` endpoint URL. |
| `--encoding` | No | Body encoding. Defaults to `json`. |
| `--project`, `-p` | No | Comma-separated project names or IDs. Defaults to all projects on the team. |
| `--environment`, `-e` | No | Logs only. Repeat to select `production` and/or `preview`. Defaults to all environments. |
| `--source` | No | Logs only. Repeat to select `lambda`, `edge`, `static`, `external`, `build`, `firewall`, or `redirect`. Defaults to all sources. |
| `--sample-rate` | No | Percentage greater than 0 and at most 100. Fractional values are supported. Defaults to 100. |
| `--header` | No | Delivery header in `Name: value` form. Repeat to send multiple headers. |
| `--secret` | No | Signing secret for the `x-vercel-signature` header. Use `-` to read the secret from stdin. |
| `--json` | No | Return the created drain and an `outcome` of `created`. |

For example, send production function logs from selected projects:

```bash filename="terminal"
vercel drains create --name production-logs --type logs --url https://example.com/drain --project my-app,my-api --environment production --source lambda
```

*Restrict a log drain by project, environment, and source.*

To send a sample of traces using Protobuf encoding:

```bash filename="terminal"
vercel drains create --name app-traces --type traces --url https://example.com/v1/traces --encoding proto --sample-rate 10
```

*Send 10% of traces to an OTLP HTTP endpoint.*

See [securing drains](/docs/drains/security) for endpoint authentication and request signatures.

## Update

Pass a drain ID and at least one option to change. Omitted settings stay unchanged:

```bash filename="terminal"
vercel drains update drn_example --url https://example.com/new-drain
vercel drains update drn_example --sample-rate 100
```

*Change a drain's endpoint or send all data again.*

`update` accepts the create options except `--type`. The current encoding remains unchanged unless you pass `--encoding`. When provided, `--header`, `--project`, `--source`, and `--environment` replace their respective lists rather than adding to them.

Use `--all` (or `-a`) to send data from all projects again. You can't combine it with `--project`:

```bash filename="terminal"
vercel drains update drn_example --all
```

*Replace a drain's project selection with all projects on the team.*

For destinations managed by an integration, change delivery settings in that integration. Use the dashboard to change non-HTTP destinations or custom filters that the CLI can't preserve.

## Pause and resume

Pause a drain to stop delivery without deleting its configuration:

```bash filename="terminal"
vercel drains pause drn_example
vercel drains resume drn_example
```

*Pause a drain, then resume delivery.*

Data generated while a drain is paused isn't sent and can't be recovered by resuming the drain. `pause` asks for confirmation. To confirm in a script or with `--json`, pass `--yes` (or `-y`):

```bash filename="terminal"
vercel drains pause drn_example --yes --json
```

*Confirm pausing a drain and return its updated state as JSON.*

`resume` doesn't require confirmation. Pausing an already paused drain or resuming an already running drain makes no change and returns `outcome: "unchanged"` with `--json`.

## Delete

Delete a drain to permanently stop sending data to its destination:

```bash filename="terminal"
vercel drains delete drn_example
```

*Delete a drain after confirming the action.*

Deletion is permanent. Pass `--yes` (or `-y`) to confirm deletion in a script or with JSON output:

```bash filename="terminal"
vercel drains delete drn_example --yes --json
```

*Confirm deleting a drain and return the result as JSON.*

## Output and errors

With `--json`, successful commands write a JSON object to stdout. `inspect` returns a `drain` object. Mutating commands also return an `outcome`, such as `created`, `updated`, `paused`, `resumed`, or `deleted`.

Without `--json`, mutating commands write the drain ID to stdout when piped, so scripts can capture it. Status messages go to stderr.

In JSON or non-interactive mode, drain errors go to stderr as JSON with a `reason` and a nonzero exit code. For example, `pause` or `delete` without `--yes` returns `confirmation_required` when the command can't prompt.

If a create request fails with an unknown outcome, run `vercel drains list` before retrying to check whether the drain already exists.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel drains` command:

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
