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
  - /docs/agent-runs
summary: Use list_agent_runs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "850979f0d0c4c804bc81ba0c599873c08e41da3776ded47eb5db23d320642adc"
---

# list_agent_runs

Use this tool with agents built with [eve](/docs/agent-runs#inspect-runs-with-vercel-mcp).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [list_agent_run_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects) — Use list_agent_run_projects with Vercel MCP.
- [get_agent_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run) — Use get_agent_run with Vercel MCP.
- [Agent Runs now show subagent activity on eve projects](https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects)
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability)
- [vercel agent-runs](https://vercel.com/docs/cli/agent-runs) — Find projects with Agent Runs, list recent runs, and inspect run metadata and conversation traces from the command line.
- [List task runs for a job run](https://vercel.com/docs/rest-api/vercel-ci/list-task-runs-for-a-job-run) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task
- [List runs for a check](https://vercel.com/docs/rest-api/checks-v2/list-runs-for-a-check) — GET /v2/projects/{projectIdOrName}/checks/{checkId}/runs — List all runs associated with a given check.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs.graph.md](/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs.graph.md)
<!-- /docsgraph:related -->

List Agent Runs for a Vercel project. The response includes summaries, status, model, trigger, token usage, time series, and pagination metadata for eve agent activity.

| Parameter     | Type   | Required | Default | Description                                                                                                                                                                                                             |
| ------------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                               |
| `projectId`   | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`.                                                                                                                           |
| `environment` | string | No       | -       | Agent run environment, usually "production" or "preview". Defaults to "production".                                                                                                                                     |
| `period`      | string | No       | -       | Preset time range. Ignored when both from and to are provided. Defaults to the dashboard endpoint default. Allowed values: `"5m"`, `"15m"`, `"1h"`, `"6h"`, `"12h"`, `"1d"`, `"3d"`, `"7d"`, `"14d"`, `"30d"`, `"90d"`. |
| `from`        | string | No       | -       | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like "12h". Must be used with to.                                                                                                       |
| `to`          | string | No       | -       | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like "1h", or "now". Must be used with from.                                                                                                 |
| `page`        | number | No       | -       | 1-based page number. Defaults to 1.                                                                                                                                                                                     |
| `pageSize`    | number | No       | -       | Number of runs per page. The dashboard endpoint caps this at 100.                                                                                                                                                       |
| `search`      | string | No       | -       | Server-side title search for Agent Runs.                                                                                                                                                                                |

**Sample prompt:** "Show me the latest production Agent Runs for my project"

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
