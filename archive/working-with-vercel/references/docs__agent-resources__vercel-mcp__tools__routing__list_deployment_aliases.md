---
title: list_deployment_aliases
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_deployment_aliases with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "09467471cd696ed7c2fc4fa379089b45e75d40539c92315e48137a9ea7fef25c"
---

# list_deployment_aliases

List Deployment Aliases.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_aliases) — Use list_aliases with Vercel MCP.
- [List Deployment Aliases](https://vercel.com/docs/rest-api/aliases/list-deployment-aliases) — GET /v2/deployments/{id}/aliases — Retrieves all Aliases for the Deployment with the given ID. The authenticated user or
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.
- [list_promote_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases) — Use list_promote_aliases with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The ID of the deployment the aliases should be listed for   |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
