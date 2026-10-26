---
title: get_vercel_ci_job_run
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_vercel_ci_job_run with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "6c4362ea2cef21b2410a03aa34d45c670346a6ea2f2f53b3361e52deaad80b6d"
---

# get_vercel_ci_job_run

Inspect a job run within a Vercel CI invocation attempt.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_vercel_ci_job_definition](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_definition) — Use get_vercel_ci_job_definition with Vercel MCP.
- [list_vercel_ci_job_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_runs) — Use list_vercel_ci_job_runs with Vercel MCP.
- [get_vercel_ci_job_run_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run_logs) — Use get_vercel_ci_job_run_logs with Vercel MCP.
- [list_vercel_ci_task_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_runs) — Use list_vercel_ci_task_runs with Vercel MCP.
- [list_vercel_ci_job_definitions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions) — Use list_vercel_ci_job_definitions with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run.graph.md)
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
