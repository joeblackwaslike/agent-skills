---
title: read_access_group
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/access-groups
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use read_access_group with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "831b66e907a8476e1141745f941a8d4b3401ee0e13c17353f1c115decad5a013"
---

# read_access_group

Reads an access group.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [read_access_group_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group&source_site=vercel-docs&relationship=related) — Use read_access_group_project with Vercel MCP.
- [Reads an access group](https://vercel.com/docs/rest-api/access-groups/reads-an-access-group?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group&source_site=vercel-docs&relationship=related) — GET /v1/access-groups/{idOrName} — Allows to read an access group
- [list_access_group_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group&source_site=vercel-docs&relationship=related) — Use list_access_group_members with Vercel MCP.
- [Reads an access group project](https://vercel.com/docs/rest-api/access-groups/reads-an-access-group-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group&source_site=vercel-docs&relationship=related) — GET /v1/access-groups/{accessGroupIdOrName}/projects/{projectId} — Allows reading an access group project
- [Deletes an access group](https://vercel.com/docs/rest-api/access-groups/deletes-an-access-group?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group&source_site=vercel-docs&relationship=related) — DELETE /v1/access-groups/{idOrName} — Allows to delete an access group

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                  |
| ---------- | ------ | -------- | ---------------------------- |
| `idOrName` | string | Yes      | The access group ID or name. |
| `teamId`   | string | No       | Team ID.                     |
| `slug`     | string | No       | Team slug.                   |


---

[View full sitemap](/docs/sitemap)
