---
title: create_or_transfer_domain
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/create_or_transfer_domain
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_or_transfer_domain"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_or_transfer_domain with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_or_transfer_domain.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ea4864d98c5ae6a188205ab6e7578977c28e667bc9f372d27659daa515ba5b4e"
---

# create_or_transfer_domain

Add an existing domain to the Vercel platform.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [add_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain) — Use add_project_domain with Vercel MCP.
- [create_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_record) — Use create_record with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [verify_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain) — Use verify_project_domain with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/create_or_transfer_domain.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/create_or_transfer_domain.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
