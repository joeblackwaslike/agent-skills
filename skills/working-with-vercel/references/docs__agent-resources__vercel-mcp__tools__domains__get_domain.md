---
title: get_domain
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_domain
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_domain with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a5344019ea54cefebed3f6496b8787baa2563f2fedd8c3a3dd134656c4a3c290"
---

# get_domain

Get information for a single domain in an account or team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain) — Use get_project_domain with Vercel MCP.
- [get_domain_verification_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record) — Use get_domain_verification_record with Vercel MCP.
- [get_domain_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_config) — Use get_domain_config with Vercel MCP.
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification) — Use get_domain_contact_verification with Vercel MCP.
- [get_domain_availability](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_availability) — Use get_domain_availability with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domain.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domain.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `domain`  | string | Yes      | The name of the domain.                                     |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
