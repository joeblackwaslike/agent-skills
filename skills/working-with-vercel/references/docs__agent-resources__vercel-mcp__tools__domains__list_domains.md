---
title: list_domains
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/list_domains
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_domains with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "581224d000ddd067fa5ca677ea6f6f8027ccc871df170a1c65ad64a6919ef077"
---

# list_domains

List all the domains.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains) — Use get_domain_project_domains with Vercel MCP.
- [list_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains) — Use list_project_domains with Vercel MCP.
- [search_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains) — Use search_domains with Vercel MCP.
- [List all the domains](https://vercel.com/docs/rest-api/domains/list-all-the-domains) — GET /v5/domains — Retrieves a list of domains registered for the authenticated user or team. By default it returns the l
- [get_records](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_records) — Use get_records with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/list_domains.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/list_domains.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `limit`   | number | No       | Maximum number of domains to list from a request.           |
| `since`   | number | No       | Get domains created after this JavaScript timestamp.        |
| `until`   | number | No       | Get domains created before this JavaScript timestamp.       |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
