---
title: verify_project_domain
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use verify_project_domain with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "52f9842038f8de660e87f778bf98b25c0d608f8b6a6205027c841219e523e54c"
---

# verify_project_domain

Attempts to verify a project domain with `verified = false` by checking the correctness of the project domain's `verification` challenge.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Verify project domain](https://vercel.com/docs/rest-api/projects/verify-project-domain) — POST /v9/projects/{idOrName}/domains/{domain}/verify — Attempts to verify a project domain with \\`verified = false\\` by
- [get_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain) — Use get_project_domain with Vercel MCP.
- [add_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain) — Use add_project_domain with Vercel MCP.
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification) — Use get_domain_contact_verification with Vercel MCP.
- [list_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains) — Use list_project_domains with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `idOrName`    | string  | Yes      | The unique project identifier or the project name           |
| `domain`      | string  | Yes      | The domain name you want to verify                          |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |

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
