---
title: get_project_trace
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/observability/get_project_trace
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_project_trace"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/observability
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_project_trace with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_project_trace.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "d9eac5305e69a296c460c17259eafe0fa256c9f609929d55d9be9aaf5d7aa5cc"
---

# get_project_trace

Get a project trace by request ID.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get a project trace by request ID](https://vercel.com/docs/rest-api/projects/get-a-project-trace-by-request-id) — GET /v1/projects/traces — Returns the OTEL trace for a given Vercel CLI request.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.
- [get_microfrontends_config_for_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project) — Use get_microfrontends_config_for_project with Vercel MCP.
- [get_project_deletion_link](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deletion_link) — Use get_project_deletion_link with Vercel MCP.
- [list_project_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_route_versions) — Use list_project_route_versions with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability/get_project_trace.graph.md](/docs/agent-resources/vercel-mcp/tools/observability/get_project_trace.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId` | string | Yes      | The project ID                                              |
| `requestId` | string | Yes      | The Vercel CLI request ID associated with the trace         |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
