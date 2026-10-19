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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "f763aab2d063dde0da6070b2b1fd6ee0edfaa6441f6b96f2256538cf13fcb5ec"
---

# get_domain_config

Get a Domain's configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain) — Use get_project_domain with Vercel MCP.
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [Get a Domain's configuration](https://vercel.com/docs/rest-api/domains/get-a-domain-s-configuration) — GET /v6/domains/{domain}/config — Get a Domain's configuration.
- [get_domain_verification_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record) — Use get_domain_verification_record with Vercel MCP.
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification) — Use get_domain_contact_verification with Vercel MCP.

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
