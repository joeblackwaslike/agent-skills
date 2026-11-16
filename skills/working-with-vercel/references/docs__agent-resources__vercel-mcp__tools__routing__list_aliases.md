---
title: list_aliases
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/list_aliases
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_aliases"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_aliases with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_aliases.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "a69ef2a0f7a0e5c4baa85bce1772e4c38b80692271bbaadaea265cc862972587"
---

# list_aliases

List aliases.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_deployment_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases) — Use list_deployment_aliases with Vercel MCP.
- [List aliases](https://vercel.com/docs/rest-api/aliases/list-aliases) — GET /v4/aliases — Retrieves a list of aliases for the authenticated User or Team. When \\`domain\\` is provided, only alia
- [list_promote_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases) — Use list_promote_aliases with Vercel MCP.
- [List Deployment Aliases](https://vercel.com/docs/rest-api/aliases/list-deployment-aliases) — GET /v2/deployments/{id}/aliases — Retrieves all Aliases for the Deployment with the given ID. The authenticated user or
- [get_alias](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/get_alias) — Use get_alias with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/list_aliases.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/list_aliases.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter              | Type                       | Required | Description                                                    |
| ---------------------- | -------------------------- | -------- | -------------------------------------------------------------- |
| `domain`               | Array\<string> \| string | No       | Get only aliases of the given domain name                      |
| `from`                 | number                     | No       | Get only aliases created after the provided timestamp          |
| `limit`                | number                     | No       | Maximum number of aliases to list from a request               |
| `projectId`            | string                     | No       | Filter aliases from the given `projectId`                      |
| `since`                | number                     | No       | Get aliases created after this JavaScript timestamp            |
| `until`                | number                     | No       | Get aliases created before this JavaScript timestamp           |
| `rollbackDeploymentId` | string                     | No       | Get aliases that would be rolled back for the given deployment |
| `teamId`               | string                     | No       | Team ID to use for this operation.                             |
| `slug`                 | string                     | No       | Team slug to use for this operation. Use instead of teamId.    |

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
