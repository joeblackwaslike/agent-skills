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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "004355085fc85bc3645d65f60e141e00ff0b645e9f015a7821c6e2e4f93609dd"
---

# list_domains

List all the domains.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Flist_domains&source_site=vercel-docs&relationship=related) — Use list_project_domains with Vercel MCP.
- [List all the domains](https://vercel.com/docs/rest-api/domains/list-all-the-domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Flist_domains&source_site=vercel-docs&relationship=related) — GET /v5/domains — Retrieves a list of domains registered for the authenticated user or team. By default it returns the l
- [list_teams](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_teams?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Flist_domains&source_site=vercel-docs&relationship=related) — Use list_teams with Vercel MCP.
- [list_supported_tlds](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_supported_tlds?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Flist_domains&source_site=vercel-docs&relationship=related) — Use list_supported_tlds with Vercel MCP.
- [list_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_aliases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Flist_domains&source_site=vercel-docs&relationship=related) — Use list_aliases with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/list_domains.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/list_domains.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Flist_domains&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                           |
| --------- | ------ | -------- | ----------------------------------------------------- |
| `limit`   | number | No       | Maximum number of domains to list from a request.     |
| `since`   | number | No       | Get domains created after this JavaScript timestamp.  |
| `until`   | number | No       | Get domains created before this JavaScript timestamp. |
| `teamId`  | string | No       | Team ID.                                              |
| `slug`    | string | No       | Team slug.                                            |


---

[View full sitemap](/docs/sitemap)
