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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "8c335a78fa9e7be9de92f9ddaf499a30d704bcf24323dd3adf24e569cda2b65d"
---

# get_project_domain

Get project domain by project id/name and domain name.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [add_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain) — Use add_project_domain with Vercel MCP.
- [get_domain_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains) — Use get_domain_project_domains with Vercel MCP.
- [get_domain_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_config) — Use get_domain_config with Vercel MCP.
- [verify_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain) — Use verify_project_domain with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name           |
| `domain`   | string | Yes      | The project domain name                                     |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
