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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d1efea5a36419e88622c68c79eb39e0f568a3d921537060396b5f9eb71ece5f9"
---

# get_project_trace

Get a project trace by request ID.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get a project trace by request ID](https://vercel.com/docs/rest-api/projects/get-a-project-trace-by-request-id?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_project_trace&source_site=vercel-docs&relationship=related) — GET /v1/projects/traces — Returns the OTEL trace for a given Vercel CLI request.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_project_trace&source_site=vercel-docs&relationship=related) — Use get_project with Vercel MCP.
- [get_project_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_project_trace&source_site=vercel-docs&relationship=related) — Use get_project_token with Vercel MCP.
- [get_project_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_project_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_project_trace&source_site=vercel-docs&relationship=related) — Use get_project_check with Vercel MCP.
- [get_microfrontends_config_for_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_project_trace&source_site=vercel-docs&relationship=related) — Use get_microfrontends_config_for_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability/get_project_trace.graph.md](/docs/agent-resources/vercel-mcp/tools/observability/get_project_trace.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_project_trace&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                         |
| ----------- | ------ | -------- | --------------------------------------------------- |
| `projectId` | string | Yes      | The project ID                                      |
| `requestId` | string | Yes      | The Vercel CLI request ID associated with the trace |
| `teamId`    | string | No       | Team ID.                                            |
| `slug`      | string | No       | Team slug.                                          |


---

[View full sitemap](/docs/sitemap)
