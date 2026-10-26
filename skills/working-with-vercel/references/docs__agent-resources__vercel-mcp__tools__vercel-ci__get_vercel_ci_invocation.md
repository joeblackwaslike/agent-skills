---
title: get_vercel_ci_invocation
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_vercel_ci_invocation with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "eab5496fe7cc8eec3a7f9b55d94629afa7ba2086e0437878907940647a85a95d"
---

# get_vercel_ci_invocation

Inspect a Vercel CI invocation attempt, including its status and conclusion.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_vercel_ci_invocation_attempts](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocation_attempts) — Use list_vercel_ci_invocation_attempts with Vercel MCP.
- [get_vercel_ci_invocation_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs) — Use get_vercel_ci_invocation_logs with Vercel MCP.
- [get_vercel_ci_invocation_tree](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_tree) — Use get_vercel_ci_invocation_tree with Vercel MCP.
- [get_vercel_ci_job_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run) — Use get_vercel_ci_job_run with Vercel MCP.
- [get_vercel_ci_job_definition](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_definition) — Use get_vercel_ci_job_definition with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation.graph.md)
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
