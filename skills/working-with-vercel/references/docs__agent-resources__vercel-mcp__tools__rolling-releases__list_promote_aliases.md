---
title: list_promote_aliases
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/rolling-releases
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_promote_aliases with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "79f1db1425c65c14b91cfa40a0d1143fb9148406f0826b4713f9b1202c628f99"
---

# list_promote_aliases

Gets a list of aliases with status for the current promote.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_aliases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Flist_promote_aliases&source_site=vercel-docs&relationship=related) — Use list_aliases with Vercel MCP.
- [Gets a list of aliases with status for the current promote](https://vercel.com/docs/rest-api/projects/gets-a-list-of-aliases-with-status-for-the-current-promote?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Flist_promote_aliases&source_site=vercel-docs&relationship=related) — GET /v1/projects/{projectId}/promote/aliases — Get a list of aliases related to the last promote request with their mapp
- [list_deployment_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Flist_promote_aliases&source_site=vercel-docs&relationship=related) — Use list_deployment_aliases with Vercel MCP.
- [List Deployment Aliases](https://vercel.com/docs/rest-api/aliases/list-deployment-aliases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Flist_promote_aliases&source_site=vercel-docs&relationship=related) — GET /v2/deployments/{id}/aliases — Retrieves all Aliases for the Deployment with the given ID. The authenticated user or
- [List aliases](https://vercel.com/docs/rest-api/aliases/list-aliases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Flist_promote_aliases&source_site=vercel-docs&relationship=related) — GET /v4/aliases — Retrieves a list of aliases for the authenticated User or Team. When \\`domain\\` is provided, only alia

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Flist_promote_aliases&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter    | Type    | Required | Description                                                                   |
| ------------ | ------- | -------- | ----------------------------------------------------------------------------- |
| `projectId`  | string  | Yes      | The project ID.                                                               |
| `limit`      | number  | No       | Maximum number of aliases to list from a request (max 100).                   |
| `since`      | number  | No       | Get aliases created after this epoch timestamp.                               |
| `until`      | number  | No       | Get aliases created before this epoch timestamp.                              |
| `failedOnly` | boolean | No       | Filter results down to aliases that failed to map to the requested deployment |
| `teamId`     | string  | No       | Team ID.                                                                      |
| `slug`       | string  | No       | Team slug.                                                                    |


---

[View full sitemap](/docs/sitemap)
