---
title: get_vercel_ci_job_run_logs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run_logs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run_logs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_vercel_ci_job_run_logs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run_logs.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a67cef930ed11686f4b9e4700438d7ac2874aecbca54d6784440c53203260931"
---

# get_vercel_ci_job_run_logs

Read logs for a Vercel CI job run.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_vercel_ci_task_run_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_run_logs) — Use get_vercel_ci_task_run_logs with Vercel MCP.
- [get_vercel_ci_job_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run) — Use get_vercel_ci_job_run with Vercel MCP.
- [get_vercel_ci_invocation_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs) — Use get_vercel_ci_invocation_logs with Vercel MCP.
- [list_vercel_ci_job_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_runs) — Use list_vercel_ci_job_runs with Vercel MCP.
- [list_vercel_ci_task_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_runs) — Use list_vercel_ci_task_runs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run_logs.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run_logs.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type             | Required | Description                                                                                                                                                   |
| ----------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationId`    | string           | Yes      | The Vercel CI invocation ID.                                                                                                                                  |
| `attempt`         | string           | Yes      | The invocation attempt number.                                                                                                                                |
| `jobDefinitionId` | string           | Yes      | The job definition ID.                                                                                                                                        |
| `runAttempt`      | string           | Yes      | The job run attempt number.                                                                                                                                   |
| `follow`          | number           | No       | Allowed values: `0`, `1`.                                                                                                                                     |
| `since`           | number           | No       | -                                                                                                                                                             |
| `level`           | Array\<string> | No       | Only return log lines with one of these levels. Allowed values: `"trace"`, `"debug"`, `"command"`, `"info"`, `"warn"`, `"error"`, `"systemError"`, `"fatal"`. |
| `teamId`          | string           | No       | Team ID to use for this operation.                                                                                                                            |
| `slug`            | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                   |


---

[View full sitemap](/docs/sitemap)
