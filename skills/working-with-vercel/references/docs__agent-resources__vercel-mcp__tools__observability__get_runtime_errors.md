---
title: get_runtime_errors
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/observability/get_runtime_errors
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_errors"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/observability
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_runtime_errors with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_errors.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "9c5f9bb5a9e914159da7677ee8d11828ec0c2d0c4ab6e3a06ff28e9bda3c458c"
---

# get_runtime_errors

Get grouped runtime error clusters for a project. Each cluster includes the error name, occurrence count, affected routes, sample messages, and when the error was first and last seen. Use this tool to investigate production errors before querying individual entries with `get_runtime_logs`. Time ranges can span up to 7 days.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_runtime_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs) — Use get_runtime_logs with Vercel MCP.
- [list_agent_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs) — Use list_agent_runs with Vercel MCP.
- [list_agent_run_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects) — Use list_agent_run_projects with Vercel MCP.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [get_agent_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run) — Use get_agent_run with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_errors.graph.md](/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_errors.graph.md)
<!-- /docsgraph:related -->

| Parameter   | Type   | Required | Default | Description                                                                                                                         |
| ----------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID to get runtime errors for.                                                                                           |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                           |
| `since`     | string | No       | -       | Start of the window as an ISO date or relative lookback from now (e.g. "1h", "24h", "7d"). Defaults to 24h ago. Max lookback is 7d. |
| `until`     | string | No       | -       | Optional end of the window as an ISO date, relative lookback, or "now". Omit this when the end should be the current time.          |
| `routes`    | string | No       | -       | Comma-separated route paths to filter by (e.g. "/api/checkout").                                                                    |

**Sample prompt:** "Why is my production app throwing errors?"


---

[View full sitemap](/docs/sitemap)
