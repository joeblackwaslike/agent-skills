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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "3cf874ec986ff4d2eb1618bdc11637b78dd7e819b359cca0a0d1a920bd105f39"
---

# assign_alias

Assign an Alias.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Assign an Alias](https://vercel.com/docs/rest-api/aliases/assign-an-alias?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fassign_alias&source_site=vercel-docs&relationship=related) — POST /v2/deployments/{id}/aliases — Creates a new alias for the deployment resolved from the given deployment or alias I
- [list_deployment_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fassign_alias&source_site=vercel-docs&relationship=related) — Use list_deployment_aliases with Vercel MCP.
- [Delete an Alias](https://vercel.com/docs/rest-api/aliases/delete-an-alias?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fassign_alias&source_site=vercel-docs&relationship=related) — DELETE /v2/aliases/{aliasId} — Delete an Alias with the specified ID.
- [list_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_aliases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fassign_alias&source_site=vercel-docs&relationship=related) — Use list_aliases with Vercel MCP.
- [Get an Alias](https://vercel.com/docs/rest-api/aliases/get-an-alias?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fassign_alias&source_site=vercel-docs&relationship=related) — GET /v4/aliases/{idOrAlias} — Retrieves an Alias for the given host name or alias ID.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/assign_alias.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/assign_alias.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fassign_alias&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                      |
| ------------- | ------ | -------- | ------------------------------------------------ |
| `id`          | string | Yes      | The deployment or alias ID or URL to assign from |
| `teamId`      | string | No       | Team ID.                                         |
| `slug`        | string | No       | Team slug.                                       |
| `requestBody` | object | Yes      | Request body for this tool.                      |


---

[View full sitemap](/docs/sitemap)
