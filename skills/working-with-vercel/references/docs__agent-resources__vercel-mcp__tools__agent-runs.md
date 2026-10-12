---
title: Agent Runs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/agent-runs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for agent runs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "75dd444611b838a8b6afc83d9c55e5d2c0124738b14bc9737afaea3c8b8e8b0f"
---

# Agent Runs

Inspect runs from agents built with eve in your Vercel projects. You can review run status and usage, then examine traces with messages and tool calls to debug agent behavior.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs](https://eve.dev/docs/observability/agent-runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs&source_site=vercel-docs&relationship=related) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs&source_site=vercel-docs&relationship=related)
- [Agent Runs now show subagent activity on eve projects](https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs&source_site=vercel-docs&relationship=related)
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs&source_site=vercel-docs&relationship=related)
- [Agent Runs](https://vercel.com/docs/eve/agent-runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs&source_site=vercel-docs&relationship=related) — Inspect eve agent sessions, configure trace sampling, and control the content Agent Runs receives.
- [Observability](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs&source_site=vercel-docs&relationship=related) — Vercel MCP tools for observability.
- [eve](https://vercel.com/docs/eve?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs&source_site=vercel-docs&relationship=related) — Build and deploy durable backend AI agents with eve, an open-source, filesystem-first framework.
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [List task runs for a job run](https://vercel.com/docs/rest-api/vercel-ci/list-task-runs-for-a-job-run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs&source_site=vercel-docs&relationship=related) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/agent-runs.graph.md](/docs/agent-resources/vercel-mcp/tools/agent-runs.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `get_agent_run`

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).

Get detailed metadata for a single eve Agent Run, including events, workflow metadata, usage, and subagent breakout data. Use `list_agent_runs` first if you need to find a run ID.

| Parameter     | Type   | Required | Default      | Description                                                                                                                                                                                        |
| ------------- | ------ | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -            | The team ID for the Agent Run. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool.       |
| `projectId`   | string | Yes      | -            | The project ID for the Agent Run. Alternatively the project slug can be used. Project IDs start with 'prj\_'. Can be found by reading `.vercel/project.json` (projectId) or using `list_projects`. |
| `runId`       | string | Yes      | -            | The Agent Run ID to inspect                                                                                                                                                                        |
| `environment` | string | No       | `production` | Agent run environment, usually `production` or `preview`                                                                                                                                           |
| `period`      | string | No       | -            | Preset time range. Supports `5m`, `15m`, `1h`, `6h`, `12h`, `1d`, `3d`, `7d`, `14d`, `30d`, and `90d`. Ignored when both `from` and `to` are provided.                                             |
| `from`        | string | No       | -            | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like `12h`. Must be used with `to`.                                                                                |
| `to`          | string | No       | -            | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like `1h`, or `now`. Must be used with `from`.                                                                          |

**Sample prompt:** "Inspect Agent Run wrun\_123 for my project"

## `get_agent_run_trace`

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).

Get the trace for a single eve Agent Run, including turns, messages, reasoning, tool calls, token usage, and tool input or output when available. Use this tool to debug exact agent behavior in production.

| Parameter        | Type   | Required | Default      | Description                                                                                                                                                                                        |
| ---------------- | ------ | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`         | string | Yes      | -            | The team ID for the Agent Run. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool.       |
| `projectId`      | string | Yes      | -            | The project ID for the Agent Run. Alternatively the project slug can be used. Project IDs start with 'prj\_'. Can be found by reading `.vercel/project.json` (projectId) or using `list_projects`. |
| `runId`          | string | Yes      | -            | The Agent Run ID to inspect                                                                                                                                                                        |
| `environment`    | string | No       | `production` | Agent run environment, usually `production` or `preview`                                                                                                                                           |
| `period`         | string | No       | -            | Preset time range. Supports `5m`, `15m`, `1h`, `6h`, `12h`, `1d`, `3d`, `7d`, `14d`, `30d`, and `90d`. Ignored when both `from` and `to` are provided.                                             |
| `from`           | string | No       | -            | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like `12h`. Must be used with `to`.                                                                                |
| `to`             | string | No       | -            | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like `1h`, or `now`. Must be used with `from`.                                                                          |
| `maxFieldLength` | number | No       | 8000         | Maximum length for individual string fields in the returned trace. Use 0 to disable truncation.                                                                                                    |

**Sample prompt:** "Show me the tool calls and messages from Agent Run wrun\_123"

## `list_agent_run_projects`

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).

List projects in a Vercel team that have Agent Runs observability data for eve agents. The response includes run counts and average duration rollups for each project.

| Parameter     | Type   | Required | Default      | Description                                                                                                                                                                                     |
| ------------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -            | The team ID to list projects for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `environment` | string | No       | `production` | Agent run environment, usually `production` or `preview`                                                                                                                                        |
| `period`      | string | No       | -            | Preset time range. Supports `5m`, `15m`, `1h`, `6h`, `12h`, `1d`, `3d`, `7d`, `14d`, `30d`, and `90d`. Ignored when both `from` and `to` are provided.                                          |
| `from`        | string | No       | -            | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like `12h`. Must be used with `to`.                                                                             |
| `to`          | string | No       | -            | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like `1h`, or `now`. Must be used with `from`.                                                                       |

**Sample prompt:** "Which projects in my team have Agent Runs in the last 24 hours?"

## `list_agent_runs`

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).

List Agent Runs for a Vercel project. The response includes summaries, status, model, trigger, token usage, time series, and pagination metadata for eve agent activity.

| Parameter     | Type   | Required | Default      | Description                                                                                                                                                                                             |
| ------------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -            | The team ID to list Agent Runs for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool.       |
| `projectId`   | string | Yes      | -            | The project ID to list Agent Runs for. Alternatively the project slug can be used. Project IDs start with 'prj\_'. Can be found by reading `.vercel/project.json` (projectId) or using `list_projects`. |
| `environment` | string | No       | `production` | Agent run environment, usually `production` or `preview`                                                                                                                                                |
| `period`      | string | No       | -            | Preset time range. Supports `5m`, `15m`, `1h`, `6h`, `12h`, `1d`, `3d`, `7d`, `14d`, `30d`, and `90d`. Ignored when both `from` and `to` are provided.                                                  |
| `from`        | string | No       | -            | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like `12h`. Must be used with `to`.                                                                                     |
| `to`          | string | No       | -            | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like `1h`, or `now`. Must be used with `from`.                                                                               |
| `page`        | number | No       | 1            | Page number                                                                                                                                                                                             |
| `pageSize`    | number | No       | -            | Number of runs per page. The dashboard endpoint caps this at 100.                                                                                                                                       |
| `search`      | string | No       | -            | Server-side title search for Agent Runs                                                                                                                                                                 |

**Sample prompt:** "Show me the latest production Agent Runs for my project"


---

[View full sitemap](/docs/sitemap)
