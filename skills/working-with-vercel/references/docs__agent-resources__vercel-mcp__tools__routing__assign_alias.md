---
title: assign_alias
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/assign_alias
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/assign_alias"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use assign_alias with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/assign_alias.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "d040316f48bb6b9a7ee0bec182b1d496ed31e27258df066684a74d3f16f28c28"
---

# assign_alias

Assign an Alias.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Assign an Alias](https://vercel.com/docs/rest-api/aliases/assign-an-alias) — POST /v2/deployments/{id}/aliases — Creates a new alias for the deployment resolved from the given deployment or alias I
- [get_alias](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/get_alias) — Use get_alias with Vercel MCP.
- [list_deployment_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases) — Use list_deployment_aliases with Vercel MCP.
- [Delete an Alias](https://vercel.com/docs/rest-api/aliases/delete-an-alias) — DELETE /v2/aliases/{aliasId} — Delete an Alias with the specified ID.
- [list_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_aliases) — Use list_aliases with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/assign_alias.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/assign_alias.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `id`          | string | Yes      | The deployment or alias ID or URL to assign from            |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
