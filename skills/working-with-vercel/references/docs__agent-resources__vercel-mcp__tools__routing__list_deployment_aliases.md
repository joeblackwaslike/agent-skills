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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "41f6f76f5b12f7274b5d1eb05bef854365b68faa6e77efcedbae99fcbde82386"
---

# list_deployment_aliases

List Deployment Aliases.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_aliases) — Use list_aliases with Vercel MCP.
- [List Deployment Aliases](https://vercel.com/docs/rest-api/aliases/list-deployment-aliases) — GET /v2/deployments/{id}/aliases — Retrieves all Aliases for the Deployment with the given ID. The authenticated user or
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.
- [list_promote_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases) — Use list_promote_aliases with Vercel MCP.
- [assign_alias](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/assign_alias) — Use assign_alias with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The ID of the deployment the aliases should be listed for   |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
