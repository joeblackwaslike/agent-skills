---
title: get_auth_token
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/authentication/get_auth_token
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/authentication/get_auth_token"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/authentication
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_auth_token with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/authentication/get_auth_token.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "895c07cd5cb677b57f82825153f5e2f620f6d1dbfc64b2cd8a3881c453448928"
---

# get_auth_token

Get Auth Token Metadata.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get Auth Token Metadata](https://vercel.com/docs/rest-api/authentication/get-auth-token-metadata?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication%2Fget_auth_token&source_site=vercel-docs&relationship=related) — GET /v5/user/tokens/{tokenId} — Retrieve metadata about an authentication token belonging to the currently authenticated
- [get_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication%2Fget_auth_token&source_site=vercel-docs&relationship=related) — Use get_edge_config_token with Vercel MCP.
- [get_project_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication%2Fget_auth_token&source_site=vercel-docs&relationship=related) — Use get_project_token with Vercel MCP.
- [get_auth_user](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_auth_user?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication%2Fget_auth_token&source_site=vercel-docs&relationship=related) — Use get_auth_user with Vercel MCP.
- [Authentication](https://vercel.com/docs/rest-api/authentication?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication%2Fget_auth_token&source_site=vercel-docs&relationship=related) — Endpoints in the authentication group of the Vercel REST API Reference.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/authentication/get_auth_token.graph.md](/docs/agent-resources/vercel-mcp/tools/authentication/get_auth_token.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication%2Fget_auth_token&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokenId` | string | Yes      | The identifier of the token to retrieve. The special value "current" may be supplied, which returns the metadata for the token that the current HTTP request is authenticated with. |


---

[View full sitemap](/docs/sitemap)
