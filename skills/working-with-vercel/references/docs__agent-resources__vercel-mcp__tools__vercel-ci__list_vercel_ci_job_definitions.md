---
title: list_vercel_ci_job_definitions
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_vercel_ci_job_definitions with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "98dbf0f6dc930d79cec559a141baaced669ff3e5c5896ab7dc2bebe429ddbf13"
---

# list_vercel_ci_job_definitions

List job definitions for a Vercel CI invocation attempt.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_vercel_ci_task_definitions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_definitions) — Use list_vercel_ci_task_definitions with Vercel MCP.
- [get_vercel_ci_job_definition](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_definition) — Use get_vercel_ci_job_definition with Vercel MCP.
- [list_vercel_ci_job_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_runs) — Use list_vercel_ci_job_runs with Vercel MCP.
- [list_vercel_ci_invocation_attempts](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocation_attempts) — Use list_vercel_ci_invocation_attempts with Vercel MCP.
- [get_vercel_ci_job_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run) — Use get_vercel_ci_job_run with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId` | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`      | string | Yes      | The invocation attempt number.                              |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
