---
title: add_project_domain
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/add_project_domain
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use add_project_domain with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f0b5d887b824a010c83b12c392b223b3fa472a19d6fb41014ffc7920fcc43d12"
---

# add_project_domain

Add a domain to a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain) — Use get_project_domain with Vercel MCP.
- [create_or_transfer_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_or_transfer_domain) — Use create_or_transfer_domain with Vercel MCP.
- [verify_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain) — Use verify_project_domain with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [Add a domain to a project](https://vercel.com/docs/rest-api/projects/add-a-domain-to-a-project) — POST /v10/projects/{idOrName}/domains — Add a domain to the project by passing its domain name and by specifying the pro

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name           |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
