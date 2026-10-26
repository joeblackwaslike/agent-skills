---
title: get_domain_config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_domain_config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_domain_config with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_config.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b329e162b795a96822892a179e96599f6c4ce9fde24fe3d024c9eb0c6ac9e490"
---

# get_domain_config

Get a Domain's configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain) — Use get_project_domain with Vercel MCP.
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [Get a Domain's configuration](https://vercel.com/docs/rest-api/domains/get-a-domain-s-configuration) — GET /v6/domains/{domain}/config — Get a Domain's configuration.
- [add_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain) — Use add_project_domain with Vercel MCP.
- [get_domain_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains) — Use get_domain_project_domains with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domain_config.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domain_config.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                                                                                                                                                                                                                                                         |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain`          | string | Yes      | The name of the domain.                                                                                                                                                                                                                                                                             |
| `projectIdOrName` | string | No       | The project id or name that will be associated with the domain. Use this when the domain is not yet associated with a project.                                                                                                                                                                      |
| `strict`          | string | No       | When true, the response will only include the nameservers assigned directly to the specified domain. When false and there are no nameservers assigned directly to the specified domain, the response will include the nameservers of the domain's parent zone. Allowed values: `"true"`, `"false"`. |
| `teamId`          | string | No       | Team ID to use for this operation.                                                                                                                                                                                                                                                                  |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                                         |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
