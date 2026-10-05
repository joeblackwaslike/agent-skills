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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "e042b11318b406f242520a1ecdd18b1cce575ee6af343289da330b0e43ea27aa"
---

# add_project_domain

Add a domain to a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_or_transfer_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/create_or_transfer_domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fadd_project_domain&source_site=vercel-docs&relationship=related) — Use create_or_transfer_domain with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fadd_project_domain&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fadd_project_domain&source_site=vercel-docs&relationship=related) — Use update_project with Vercel MCP.
- [Add a domain to a project](https://vercel.com/docs/rest-api/projects/add-a-domain-to-a-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fadd_project_domain&source_site=vercel-docs&relationship=related) — POST /v10/projects/{idOrName}/domains — Add a domain to the project by passing its domain name and by specifying the pro
- [list_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fadd_project_domain&source_site=vercel-docs&relationship=related) — Use list_project_domains with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fadd_project_domain&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                       |
| ------------- | ------ | -------- | ------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name |
| `teamId`      | string | No       | Team ID.                                          |
| `slug`        | string | No       | Team slug.                                        |
| `requestBody` | object | Yes      | Request body for this tool.                       |


---

[View full sitemap](/docs/sitemap)
