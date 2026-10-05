---
title: list_agent_runs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/agent-runs
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_agent_runs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "edbbd403e013aa80e36f29ad2210f1b3de1fa2e0e2b83789943418701cd707c9"
---

# list_agent_runs

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_agent_run_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_runs&source_site=vercel-docs&relationship=related) — Use list_agent_run_projects with Vercel MCP.
- [get_agent_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_runs&source_site=vercel-docs&relationship=related) — Use get_agent_run with Vercel MCP.
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_runs&source_site=vercel-docs&relationship=related)
- [Agent Runs](https://eve.dev/docs/observability/agent-runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_runs&source_site=vercel-docs&relationship=related) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Agent Runs now show subagent activity on eve projects](https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_runs&source_site=vercel-docs&relationship=related)
- [get_agent_run_trace](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_runs&source_site=vercel-docs&relationship=related) — Use get_agent_run_trace with Vercel MCP.
- [Agent Runs](https://vercel.com/docs/eve/agent-runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_runs&source_site=vercel-docs&relationship=related) — Inspect eve agent sessions, configure trace sampling, and control the content Agent Runs receives.
- [List task runs for a job run](https://vercel.com/docs/rest-api/vercel-ci/list-task-runs-for-a-job-run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_runs&source_site=vercel-docs&relationship=related) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs.graph.md](/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Flist_agent_runs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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
