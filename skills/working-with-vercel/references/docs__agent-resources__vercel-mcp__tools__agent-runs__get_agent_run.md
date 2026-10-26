---
title: get_agent_run
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/agent-runs
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/eve/agent-runs
summary: Use get_agent_run with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ed6a2dc52d7ad896e55a2598f2a7008a2e371aebdd3bdf4d08ab97867cb7e47c"
---

# get_agent_run

Use this tool with agents built with [eve](/docs/eve/agent-runs#inspect-runs-with-vercel-mcp).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_agent_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs) — Use list_agent_runs with Vercel MCP.
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [list_agent_run_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects) — Use list_agent_run_projects with Vercel MCP.
- [Agent Runs](https://eve.dev/docs/observability/agent-runs) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Agent Runs now show subagent activity on eve projects](https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects)
- [get_agent_run_trace](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace) — Use get_agent_run_trace with Vercel MCP.
- [Agent Runs](https://vercel.com/docs/eve/agent-runs) — Inspect eve agent sessions, configure trace sampling, and control the content Agent Runs receives.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run.graph.md](/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run.graph.md)
<!-- /docsgraph:related -->

Get detailed metadata for a single eve Agent Run, including events, workflow metadata, usage, and subagent breakout data. Use `list_agent_runs` first if you need to find a run ID.

| Parameter     | Type   | Required | Default | Description                                                                                                                                                                                                             |
| ------------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                               |
| `projectId`   | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`.                                                                                                                           |
| `runId`       | string | Yes      | -       | The Agent Run ID to inspect.                                                                                                                                                                                            |
| `environment` | string | No       | -       | Agent run environment, usually "production" or "preview". Defaults to "production".                                                                                                                                     |
| `period`      | string | No       | -       | Preset time range. Ignored when both from and to are provided. Defaults to the dashboard endpoint default. Allowed values: `"5m"`, `"15m"`, `"1h"`, `"6h"`, `"12h"`, `"1d"`, `"3d"`, `"7d"`, `"14d"`, `"30d"`, `"90d"`. |
| `from`        | string | No       | -       | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like "12h". Must be used with to.                                                                                                       |
| `to`          | string | No       | -       | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like "1h", or "now". Must be used with from.                                                                                                 |

**Sample prompt:** "Inspect Agent Run wrun\_123 for my project"


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
