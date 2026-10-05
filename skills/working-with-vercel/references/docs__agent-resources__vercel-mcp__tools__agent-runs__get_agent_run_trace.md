---
title: get_agent_run_trace
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/agent-runs
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_agent_run_trace with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "96cb4ce085321ef98d1d76e1362e9d48b008121ff2e2b892ab327490d4147182"
---

# get_agent_run_trace

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_agent_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Fget_agent_run_trace&source_site=vercel-docs&relationship=related) — Use get_agent_run with Vercel MCP.
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Fget_agent_run_trace&source_site=vercel-docs&relationship=related)
- [Agent Runs](https://eve.dev/docs/observability/agent-runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Fget_agent_run_trace&source_site=vercel-docs&relationship=related) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Fget_agent_run_trace&source_site=vercel-docs&relationship=related)
- [list_agent_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Fget_agent_run_trace&source_site=vercel-docs&relationship=related) — Use list_agent_runs with Vercel MCP.
- [list_agent_run_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Fget_agent_run_trace&source_site=vercel-docs&relationship=related) — Use list_agent_run_projects with Vercel MCP.
- [Agent Runs now show subagent activity on eve projects](https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Fget_agent_run_trace&source_site=vercel-docs&relationship=related)
- [Agent Runs](https://vercel.com/docs/eve/agent-runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Fget_agent_run_trace&source_site=vercel-docs&relationship=related) — Inspect eve agent sessions, configure trace sampling, and control the content Agent Runs receives.
- [vercel traces](https://vercel.com/docs/cli/traces?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Fget_agent_run_trace&source_site=vercel-docs&relationship=related) — Search spans, inspect request traces, capture session traces, or manage trace sampling rules for a project from the term

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace.graph.md](/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fagent-runs%2Fget_agent_run_trace&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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


---

[View full sitemap](/docs/sitemap)
