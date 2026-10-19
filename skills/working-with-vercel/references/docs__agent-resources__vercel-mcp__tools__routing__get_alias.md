---
title: get_alias
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/get_alias
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/get_alias"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_alias with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/get_alias.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "82c2b4d8263059b94fb73a9c46f3334f80023e8596d60bef583dd18a323abf85"
---

# get_alias

Retrieves an Alias for the given host name or alias ID.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get an Alias](https://vercel.com/docs/rest-api/aliases/get-an-alias) — GET /v4/aliases/{idOrAlias} — Retrieves an Alias for the given host name or alias ID.
- [list_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_aliases) — Use list_aliases with Vercel MCP.
- [assign_alias](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/assign_alias) — Use assign_alias with Vercel MCP.
- [list_promote_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases) — Use list_promote_aliases with Vercel MCP.
- [Delete an Alias](https://vercel.com/docs/rest-api/aliases/delete-an-alias) — DELETE /v2/aliases/{aliasId} — Delete an Alias with the specified ID.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/get_alias.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/get_alias.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                           |
| ----------- | ------ | -------- | --------------------------------------------------------------------- |
| `from`      | number | No       | Get the alias only if it was created after the provided timestamp     |
| `idOrAlias` | string | Yes      | The alias or alias ID to be retrieved                                 |
| `projectId` | string | No       | Get the alias only if it is assigned to the provided project ID       |
| `since`     | number | No       | Get the alias only if it was created after this JavaScript timestamp  |
| `until`     | number | No       | Get the alias only if it was created before this JavaScript timestamp |
| `teamId`    | string | No       | Team ID to use for this operation.                                    |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.           |


---

[View full sitemap](/docs/sitemap)
