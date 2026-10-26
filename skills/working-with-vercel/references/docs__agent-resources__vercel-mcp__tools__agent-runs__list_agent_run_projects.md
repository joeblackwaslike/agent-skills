---
title: list_agent_run_projects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/agent-runs
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/eve/agent-runs
summary: Use list_agent_run_projects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "0fe36c7cc688f99a30a6e1408383dfb53d113f1fba439fad1eded5fce076bc1e"
---

# list_agent_run_projects

Use this tool with agents built with [eve](/docs/eve/agent-runs#inspect-runs-with-vercel-mcp).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_agent_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs) — Use list_agent_runs with Vercel MCP.
- [get_agent_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run) — Use get_agent_run with Vercel MCP.
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [list_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects) — Use list_projects with Vercel MCP.
- [get_observability_configuration_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects) — Use get_observability_configuration_projects with Vercel MCP.
- [get_agent_run_trace](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace) — Use get_agent_run_trace with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects.graph.md](/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects.graph.md)
<!-- /docsgraph:related -->

List projects in a Vercel team that have Agent Runs observability data for eve agents. The response includes run counts and average duration rollups for each project.

| Parameter     | Type   | Required | Default | Description                                                                                                                                                                                                             |
| ------------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                               |
| `environment` | string | No       | -       | Agent run environment, usually "production" or "preview". Defaults to "production".                                                                                                                                     |
| `period`      | string | No       | -       | Preset time range. Ignored when both from and to are provided. Defaults to the dashboard endpoint default. Allowed values: `"5m"`, `"15m"`, `"1h"`, `"6h"`, `"12h"`, `"1d"`, `"3d"`, `"7d"`, `"14d"`, `"30d"`, `"90d"`. |
| `from`        | string | No       | -       | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like "12h". Must be used with to.                                                                                                       |
| `to`          | string | No       | -       | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like "1h", or "now". Must be used with from.                                                                                                 |

**Sample prompt:** "Which projects in my team have Agent Runs in the last 24 hours?"


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
