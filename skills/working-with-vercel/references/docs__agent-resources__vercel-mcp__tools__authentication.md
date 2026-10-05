---
title: Authentication
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/authentication
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/authentication"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for authentication.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/authentication.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "e36c54398462c76c844742e2db4c58335f377cdc585e5eb4b404e4d34ba0d36a"
---

# Authentication

Inspect metadata for an authentication token and exchange a Single Sign-On (SSO) token for authentication credentials. Use these tools when working with token-based access to your Vercel account.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Authentication](https://vercel.com/docs/rest-api/authentication?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication&source_site=vercel-docs&relationship=related) — Endpoints in the authentication group of the Vercel REST API Reference.
- [SSO Token Exchange](https://vercel.com/docs/rest-api/authentication/sso-token-exchange?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication&source_site=vercel-docs&relationship=related) — POST /v1/integrations/sso/token — During the autorization process, Vercel sends the user to the provider \\\[redirectLogin
- [Get Auth Token Metadata](https://vercel.com/docs/rest-api/authentication/get-auth-token-metadata?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication&source_site=vercel-docs&relationship=related) — GET /v5/user/tokens/{tokenId} — Retrieve metadata about an authentication token belonging to the currently authenticated
- [List Auth Tokens](https://vercel.com/docs/rest-api/authentication/list-auth-tokens?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication&source_site=vercel-docs&relationship=related) — GET /v6/user/tokens — Retrieve a list of the current User's authentication tokens.
- [Create an Auth Token](https://vercel.com/docs/rest-api/authentication/create-an-auth-token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication&source_site=vercel-docs&relationship=related) — POST /v3/user/tokens — Creates and returns a new authentication token for the currently authenticated User. The \\`bearer

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/authentication.graph.md](/docs/agent-resources/vercel-mcp/tools/authentication.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fauthentication&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `exchange_sso_token`

SSO Token Exchange.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `requestBody` | object | Yes      | Request body for this tool. |

## `get_auth_token`

Get Auth Token Metadata.

## Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokenId` | string | Yes      | The identifier of the token to retrieve. The special value "current" may be supplied, which returns the metadata for the token that the current HTTP request is authenticated with. |


---

[View full sitemap](/docs/sitemap)
