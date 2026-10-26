---
title: list_vercel_ci_task_definitions
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_definitions
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_definitions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_vercel_ci_task_definitions with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_definitions.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "fd05395fd2a436f005a1c063eae6b4455214be8a1c426d0c6e4f0a06bb2409e1"
---

# list_vercel_ci_task_definitions

List Task Definitions


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_vercel_ci_job_definitions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions) — Use list_vercel_ci_job_definitions with Vercel MCP.
- [list_vercel_ci_task_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_runs) — Use list_vercel_ci_task_runs with Vercel MCP.
- [list_vercel_ci_job_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_runs) — Use list_vercel_ci_job_runs with Vercel MCP.
- [List all task definitions for a job run](https://vercel.com/docs/rest-api/vercel-ci/list-all-task-definitions-for-a-job-run) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task
- [get_vercel_ci_job_definition](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_definition) — Use get_vercel_ci_job_definition with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_definitions.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_definitions.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId`    | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`         | string | Yes      | The invocation attempt number.                              |
| `jobDefinitionId` | string | Yes      | The job definition ID.                                      |
| `runAttempt`      | string | Yes      | The job run attempt number.                                 |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
