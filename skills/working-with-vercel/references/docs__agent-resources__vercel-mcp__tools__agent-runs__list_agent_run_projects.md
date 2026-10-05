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
  []
summary: Use list_agent_run_projects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "09e035f6743a5e497dc4e6e36d603eac8affc74182aeb8aee23d8f575e23f4fb"
---

# list_agent_run_projects

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_agent_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_run_projects&source_site=vercel-docs&relationship=related) — Use list_agent_runs with Vercel MCP.
- [get_agent_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_run_projects&source_site=vercel-docs&relationship=related) — Use get_agent_run with Vercel MCP.
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_run_projects&source_site=vercel-docs&relationship=related)
- [get_agent_run_trace](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_run_projects&source_site=vercel-docs&relationship=related) — Use get_agent_run_trace with Vercel MCP.
- [list_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_run_projects&source_site=vercel-docs&relationship=related) — Use list_projects with Vercel MCP.
- [list_check_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/list_check_runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_run_projects&source_site=vercel-docs&relationship=related) — Use list_check_runs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects.graph.md](/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_run_projects&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

List projects in a Vercel team that have Agent Runs observability data for eve agents. The response includes run counts and average duration rollups for each project.

| Parameter     | Type   | Required | Default      | Description                                                                                                                                                                                     |
| ------------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -            | The team ID to list projects for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `environment` | string | No       | `production` | Agent run environment, usually `production` or `preview`                                                                                                                                        |
| `period`      | string | No       | -            | Preset time range. Supports `5m`, `15m`, `1h`, `6h`, `12h`, `1d`, `3d`, `7d`, `14d`, `30d`, and `90d`. Ignored when both `from` and `to` are provided.                                          |
| `from`        | string | No       | -            | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like `12h`. Must be used with `to`.                                                                             |
| `to`          | string | No       | -            | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like `1h`, or `now`. Must be used with `from`.                                                                       |

**Sample prompt:** "Which projects in my team have Agent Runs in the last 24 hours?"


---

[View full sitemap](/docs/sitemap)
