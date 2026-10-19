---
title: get_vercel_ci_invocation_logs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_vercel_ci_invocation_logs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "3dc85ed6def5aed8503297245d2ee97fd887d57dd791363ab8a7c83990d3e2d6"
---

# get_vercel_ci_invocation_logs

Read logs for a Vercel CI invocation attempt.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_vercel_ci_invocation](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation) — Use get_vercel_ci_invocation with Vercel MCP.
- [get_vercel_ci_job_run_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run_logs) — Use get_vercel_ci_job_run_logs with Vercel MCP.
- [list_vercel_ci_invocation_attempts](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocation_attempts) — Use list_vercel_ci_invocation_attempts with Vercel MCP.
- [get_vercel_ci_task_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_logs) — Use get_vercel_ci_task_logs with Vercel MCP.
- [get_vercel_ci_task_run_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_run_logs) — Use get_vercel_ci_task_run_logs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type             | Required | Description                                                                                                                                                   |
| -------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationId` | string           | Yes      | The Vercel CI invocation ID.                                                                                                                                  |
| `attempt`      | string           | Yes      | The invocation attempt number.                                                                                                                                |
| `level`        | Array\<string> | No       | Only return log lines with one of these levels. Allowed values: `"trace"`, `"debug"`, `"command"`, `"info"`, `"warn"`, `"error"`, `"systemError"`, `"fatal"`. |
| `teamId`       | string           | No       | Team ID to use for this operation.                                                                                                                            |
| `slug`         | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                   |


---

[View full sitemap](/docs/sitemap)
