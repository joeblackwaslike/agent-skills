---
title: get_domain_project_domains
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_domain_project_domains with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "d1f286828d5d6bbfe9e5e91d142f8e029789050c52dfcec3e5fb7d3ccdfc5d81"
---

# get_domain_project_domains

List all project domains associated with an apex domain owned by the authenticated account.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains) — Use list_domains with Vercel MCP.
- [list_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains) — Use list_project_domains with Vercel MCP.
- [get_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain) — Use get_project_domain with Vercel MCP.
- [List Project Domains by Apex Domain](https://vercel.com/docs/rest-api/domains/list-project-domains-by-apex-domain) — GET /v1/domains/{domain}/project-domains — List all project domains associated with an apex domain owned by the authenti
- [get_records](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_records) — Use get_records with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                   |
| --------- | ------ | -------- | ------------------------------------------------------------- |
| `domain`  | string | Yes      | The apex domain name.                                         |
| `limit`   | number | No       | Maximum number of project domains to list from a request.     |
| `since`   | number | No       | Get project domains created after this JavaScript timestamp.  |
| `until`   | number | No       | Get project domains created before this JavaScript timestamp. |
| `teamId`  | string | No       | Team ID to use for this operation.                            |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId.   |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
