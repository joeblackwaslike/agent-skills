---
title: get_project_domain
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/get_project_domain
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_project_domain with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "420adfc9bfbd8f8e3d5192abf580a207c198b0cd2c1d1b70bb914dc5e0613f74"
---

# get_project_domain

Get project domain by project id/name and domain name.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [add_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain) — Use add_project_domain with Vercel MCP.
- [get_domain_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_config) — Use get_domain_config with Vercel MCP.
- [verify_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain) — Use verify_project_domain with Vercel MCP.
- [get_domain_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains) — Use get_domain_project_domains with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name           |
| `domain`   | string | Yes      | The project domain name                                     |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
