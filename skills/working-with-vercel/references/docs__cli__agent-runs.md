---
title: vercel agent-runs
product: vercel
url: /docs/cli/agent-runs
canonical_url: "https://vercel.com/docs/cli/agent-runs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/agent-runs
  - /docs/cli/link
  - /docs/cli/global-options
  - /docs/agent-resources/vercel-mcp/tools/agent-runs
  - /docs/cli/traces
summary: Find projects with Agent Runs, list recent runs, and inspect run metadata and conversation traces from the command line.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/agent-runs.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "f6acb1da5748f47121a569da606101c035b419abbbbddbbcc73f3bda8ebff170"
---

# vercel agent-runs

The `vercel agent-runs` command reads [Agent Runs](/docs/agent-runs) data from your terminal. Use it to investigate an eve agent's lifecycle events, subagents, messages, reasoning, tool calls, and token usage.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Trace and debug eve agent runs](https://vercel.com/kb/guide/trace-and-debug-eve-agent-runs) — Inspect eve traces in Vercel Agent Runs, control captured content, export OpenTelemetry spans, and test fixes with regre
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [Agent Runs](https://eve.dev/docs/observability/agent-runs) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [list_agent_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs) — Use list_agent_runs with Vercel MCP.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [vercel activity](https://vercel.com/docs/cli/activity) — View activity events for your Vercel project or team, filtered by type, date range, and project.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/agent-runs.graph.md](/docs/cli/agent-runs.graph.md)
<!-- /docsgraph:related -->

## Usage

Find projects with Agent Runs activity, then list and inspect runs for a project:

```bash filename="terminal"
vercel agent-runs projects --scope my-team
vercel agent-runs list --scope my-team --project my-app
vercel agent-runs inspect run_1234567890 --scope my-team --project my-app
vercel agent-runs trace run_1234567890 --scope my-team --project my-app
```

Replace `run_1234567890` with a run ID from the list response. The `list`, `inspect`, and `trace` commands use your [linked project](/docs/cli/link) unless you pass `--project`. The `projects` command works at the team level. From an unlinked directory, pass [`--scope`](/docs/cli/global-options#scope) for `projects`, and both `--scope` and `--project` for the other commands. When selecting a different team from a linked directory, pass both flags to select a project in that team.

All four commands query the `production` environment by default. Use `--environment preview` for preview deployments. When inspecting a run from a filtered list, keep the same team, project, environment, and time window.

## Subcommands

### List projects

`vercel agent-runs projects` finds projects in the selected team with Agent Runs activity:

```bash filename="terminal"
vercel agent-runs projects --scope my-team --since 7d
vercel agent-runs projects --environment preview --json
```

### List runs

`vercel agent-runs list` lists runs for a project. Filter by time or title, and limit the number of results per page:

```bash filename="terminal"
vercel agent-runs list --environment preview --since 1d
vercel agent-runs list --query "checkout" --limit 20
vercel agent-runs list --project my-app --json
```

| Option | Description |
| --- | --- |
| `--query <TEXT>`, `-q` | Search runs by title. `--search` is a deprecated alias. |
| `--limit <N>`, `-n` | Number of runs per page, up to 100. |
| `--next <CURSOR>` | Continue a list using the cursor from the previous response. |

To continue a list, use the next-page command printed by the CLI. Cursor-based JSON responses expose the next cursor in `pagination.next`. Keep the same team, project, environment, and query. The cursor preserves the time window, so omit `--since` and `--until` when continuing:

```bash filename="terminal"
vercel agent-runs list --project my-app --next "$NEXT_CURSOR" --json
```

Set `NEXT_CURSOR` to the cursor from the previous response. A page can contain no runs and still provide a next cursor. Continue while a cursor is available, and start without `--next` if it is invalid or expired. If the CLI prints a numeric next-page value instead, use its complete suggested command, including the time filters.

### Inspect a run

`vercel agent-runs inspect <runId>` retrieves a run's metadata, lifecycle events, usage, and subagent data:

```bash filename="terminal"
vercel agent-runs inspect run_1234567890
vercel agent-runs inspect run_1234567890 --environment preview --json
```

### Read a trace

`vercel agent-runs trace <runId>` retrieves the conversation trace, including turns, messages, reasoning, tool calls, token usage, and tool inputs and outputs:

```bash filename="terminal"
vercel agent-runs trace run_1234567890
vercel agent-runs trace run_1234567890 --json --max-field-length 0
```

| Option | Description |
| --- | --- |
| `--max-field-length <N>` | Limit individual string fields before formatting. Defaults to 8000; positive values are capped at 50,000. Use `--json --max-field-length 0` to output fields without CLI truncation. |
| `--next <CURSOR>` | Fetch newer trace activity using a cursor from a previous response. |
| `--previous <CURSOR>` | Fetch older trace activity using a cursor from a previous response. |

Markdown output separately shortens displayed messages, reasoning, and tool inputs and outputs to 2,000 characters, even with `--max-field-length 0`. Use `--json` to retain fields omitted from the Markdown view, such as per-turn token usage, and combine it with `--max-field-length 0` for untruncated field values. This doesn't combine trace pages or restore content the service didn't return.

You can't combine `--next` and `--previous`. Use the continuation commands printed by the CLI, or the `pagination.next` and `pagination.previous` cursors in JSON output. Keep the same run, team, project, environment, and time window:

```bash filename="terminal"
vercel agent-runs trace run_1234567890 --next "$NEXT_CURSOR" --json
vercel agent-runs trace run_1234567890 --previous "$PREVIOUS_CURSOR" --json
```

Set each variable to the corresponding cursor from the previous response. A trace page may contain only part of a conversation. Follow available cursors before treating the response as the complete run.

## Shared options

These options apply to all four subcommands unless noted:

| Option | Description |
| --- | --- |
| `--environment <ENVIRONMENT>`, `-e` | Query `production` or `preview`. Defaults to `production`. |
| `--since <TIME>`, `-s` | Start of the time window, as an ISO 8601 timestamp or a relative value such as `1h` or `7d`. Without it, `list` and `projects` cover the last 12 hours. |
| `--until <TIME>`, `-u` | End of the time window. Requires `--since` and defaults to now. Accepts the same formats as `--since`. |
| `--project <NAME\|ID>`, `-p` | Override the linked project. Applies to `list`, `inspect`, and `trace`. |
| `--json` | Print the API response as JSON to standard output. Trace strings still respect `--max-field-length`. |

For example, list runs from a specific time window:

```bash filename="terminal"
vercel agent-runs list --since 7d --until 1d
```

## Use output in scripts and coding agents

Every subcommand supports `--json`. Without `--json`, `trace` renders recognized conversation turns as Markdown, including when you pipe or redirect output. If it can't find turns to render, it prints the response as JSON instead. This lets a coding agent inspect traces through shell commands without an MCP connection:

```bash filename="terminal"
vercel agent-runs list --json
vercel agent-runs trace run_1234567890 > agent-run.md
vercel agent-runs trace run_1234567890 --json --max-field-length 0 > agent-run.json
```

The trace contains only the content Agent Runs collected. Review [trace sampling](/docs/agent-runs#configure-tracing-for-existing-deployments) and [trace content settings](/docs/agent-runs#configure-agent-runs-trace-content) if expected activity or fields are missing.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel agent-runs` command:

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

## Related

- [Agent Runs](/docs/agent-runs)
- [Agent Runs tools in Vercel MCP](/docs/agent-resources/vercel-mcp/tools/agent-runs)
- [vercel traces](/docs/cli/traces)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
