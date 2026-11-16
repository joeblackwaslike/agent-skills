---
title: list_project_domains
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/list_project_domains
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_project_domains with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "b742279bbfc91d4947515dbebc5aecc71a66474596506c15738003e79ceb54e0"
---

# list_project_domains

Retrieve project domains by project by id or name.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_project_domains) — Use get_domain_project_domains with Vercel MCP.
- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains) — Use list_domains with Vercel MCP.
- [Retrieve project domains by project by id or name](https://vercel.com/docs/rest-api/projects/retrieve-project-domains-by-project-by-id-or-name) — GET /v9/projects/{idOrName}/domains — Retrieve the domains associated with a given project by passing either the project
- [List Project Domains by Apex Domain](https://vercel.com/docs/rest-api/domains/list-project-domains-by-apex-domain) — GET /v1/domains/{domain}/project-domains — List all project domains associated with an apex domain owned by the authenti
- [get_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain) — Use get_project_domain with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter             | Type   | Required | Description                                                                                                                                                      |
| --------------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idOrName`            | string | Yes      | The unique project identifier or the project name                                                                                                                |
| `production`          | string | No       | Filters only production domains when set to `true`. Allowed values: `"true"`, `"false"`. Default: `"false"`.                                                     |
| `target`              | string | No       | Filters on the target of the domain. Can be either "production", "preview" Allowed values: `"production"`, `"preview"`.                                          |
| `customEnvironmentId` | string | No       | The unique custom environment identifier within the project                                                                                                      |
| `gitBranch`           | string | No       | Filters domains based on specific branch.                                                                                                                        |
| `redirects`           | string | No       | Excludes redirect project domains when "false". Includes redirect project domains when "true" (default). Allowed values: `"true"`, `"false"`. Default: `"true"`. |
| `redirect`            | string | No       | Filters domains based on their redirect target.                                                                                                                  |
| `verified`            | string | No       | Filters domains based on their verification status. Allowed values: `"true"`, `"false"`.                                                                         |
| `limit`               | number | No       | Maximum number of domains to list from a request (max 100).                                                                                                      |
| `since`               | number | No       | Get domains created after this JavaScript timestamp.                                                                                                             |
| `until`               | number | No       | Get domains created before this JavaScript timestamp.                                                                                                            |
| `order`               | string | No       | Domains sort order by createdAt Allowed values: `"ASC"`, `"DESC"`. Default: `"DESC"`.                                                                            |
| `teamId`              | string | No       | Team ID to use for this operation.                                                                                                                               |
| `slug`                | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                      |

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
