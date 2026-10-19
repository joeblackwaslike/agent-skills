---
title: get_vercel_ci_invocation_tree
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_tree
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_tree"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_vercel_ci_invocation_tree with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_tree.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "38fb3b881081ccc216ff43b2b8388394b5d0e62dc38faa74cf89f89ac8c09fcd"
---

# get_vercel_ci_invocation_tree

Returns an invocation attempt together with every job definition, its latest job run, and the task definitions and active task runs of that job run. Defaults to the latest attempt when `attempt` is omitted. With `follow=1` the response is a newline-delimited JSON stream: a `{"type":"tree", ...}` event with the full tree is sent immediately and again whenever it changes, and a final `{"type":"end","reason":...}` event is sent when the attempt finishes (`completed`) or the stream reaches its maximum duration (`timeout`), after which clients should reconnect.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_vercel_ci_invocation](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation) — Use get_vercel_ci_invocation with Vercel MCP.
- [get_vercel_ci_invocation_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs) — Use get_vercel_ci_invocation_logs with Vercel MCP.
- [get_vercel_ci_task_run_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_run_logs) — Use get_vercel_ci_task_run_logs with Vercel MCP.
- [list_vercel_ci_invocation_attempts](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocation_attempts) — Use list_vercel_ci_invocation_attempts with Vercel MCP.
- [get_vercel_ci_job_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run) — Use get_vercel_ci_job_run with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_tree.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_tree.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                                                             |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `invocationId` | string | Yes      | The Vercel CI invocation ID.                                                                            |
| `attempt`      | string | No       | Invocation attempt to return. Defaults to the latest attempt.                                           |
| `follow`       | number | No       | When 1, stream the tree as newline-delimited JSON until the attempt finishes. Allowed values: `0`, `1`. |
| `teamId`       | string | No       | Team ID to use for this operation.                                                                      |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId.                                             |


---

[View full sitemap](/docs/sitemap)
