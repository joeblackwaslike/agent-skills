---
title: get_vercel_ci_task_logs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_logs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_logs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_vercel_ci_task_logs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_logs.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "b5f9fc5df5de3476608aafe21f4489ebefb5126f51b065b3c608a52f98b2ce3b"
---

# get_vercel_ci_task_logs

Returns log lines for the tasks of an invocation attempt in a single request, grouped by task. Tasks can be narrowed by name and by conclusion, for example `conclusion=failed` to fetch only the logs of failed tasks.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_vercel_ci_task_run_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_run_logs) — Use get_vercel_ci_task_run_logs with Vercel MCP.
- [get_vercel_ci_invocation_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs) — Use get_vercel_ci_invocation_logs with Vercel MCP.
- [get_vercel_ci_job_run_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run_logs) — Use get_vercel_ci_job_run_logs with Vercel MCP.
- [list_vercel_ci_task_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_runs) — Use list_vercel_ci_task_runs with Vercel MCP.
- [Get log lines for the tasks of an invocation attempt](https://vercel.com/docs/rest-api/vercel-ci/get-log-lines-for-the-tasks-of-an-invocation-attempt) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/task-logs — Returns log lines for the tasks of an invoca

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_logs.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_logs.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type             | Required | Description                                                                                                                                                   |
| -------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationId` | string           | Yes      | The Vercel CI invocation ID.                                                                                                                                  |
| `attempt`      | string           | Yes      | The invocation attempt number.                                                                                                                                |
| `task`         | Array\<string> | No       | Only return tasks with one of these names (e.g., "web#test").                                                                                                 |
| `conclusion`   | Array\<string> | No       | Only return completed tasks with one of these conclusions. Allowed values: `"succeeded"`, `"cached"`, `"failed"`, `"skipped"`.                                |
| `level`        | Array\<string> | No       | Only return log lines with one of these levels. Allowed values: `"trace"`, `"debug"`, `"command"`, `"info"`, `"warn"`, `"error"`, `"systemError"`, `"fatal"`. |
| `limit`        | number           | No       | Maximum number of tasks to return (default: 10, max: 25).                                                                                                     |
| `teamId`       | string           | No       | Team ID to use for this operation.                                                                                                                            |
| `slug`         | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                   |


---

[View full sitemap](/docs/sitemap)
