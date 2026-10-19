---
title: get_vercel_ci_task_run_logs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_run_logs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_run_logs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_vercel_ci_task_run_logs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_run_logs.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "beae8ef0fb63c880e711ceed1c5cc4848de40f34dc3a1649fe3b6fea6346f9c3"
---

# get_vercel_ci_task_run_logs

Get Task Run Logs With `follow=1` the response is a newline-delimited JSON stream of log lines that ends once the task run has finished and its logs are flushed, or when the stream reaches its maximum duration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_vercel_ci_job_run_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run_logs) — Use get_vercel_ci_job_run_logs with Vercel MCP.
- [get_vercel_ci_task_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_logs) — Use get_vercel_ci_task_logs with Vercel MCP.
- [list_vercel_ci_task_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_runs) — Use list_vercel_ci_task_runs with Vercel MCP.
- [Get log lines for a specific task run attempt](https://vercel.com/docs/rest-api/vercel-ci/get-log-lines-for-a-specific-task-run-attempt) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task
- [get_vercel_ci_invocation_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs) — Use get_vercel_ci_invocation_logs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_run_logs.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_run_logs.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter          | Type             | Required | Description                                                                                                                                                   |
| ------------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationId`     | string           | Yes      | The Vercel CI invocation ID.                                                                                                                                  |
| `attempt`          | string           | Yes      | The invocation attempt number.                                                                                                                                |
| `jobDefinitionId`  | string           | Yes      | The job definition ID.                                                                                                                                        |
| `runAttempt`       | string           | Yes      | The job run attempt number.                                                                                                                                   |
| `taskDefinitionId` | string           | Yes      | The task definition ID.                                                                                                                                       |
| `taskRunAttempt`   | string           | Yes      | The task run attempt number.                                                                                                                                  |
| `follow`           | number           | No       | When 1, stream log lines as newline-delimited JSON until the task run finishes. Allowed values: `0`, `1`.                                                     |
| `since`            | number           | No       | -                                                                                                                                                             |
| `level`            | Array\<string> | No       | Only return log lines with one of these levels. Allowed values: `"trace"`, `"debug"`, `"command"`, `"info"`, `"warn"`, `"error"`, `"systemError"`, `"fatal"`. |
| `teamId`           | string           | No       | Team ID to use for this operation.                                                                                                                            |
| `slug`             | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                   |


---

[View full sitemap](/docs/sitemap)
