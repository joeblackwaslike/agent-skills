---
title: get_team_access_request
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/teams/get_team_access_request
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team_access_request"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/teams
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_team_access_request with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team_access_request.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "7ae76bc705856e3efc292c09e240b956ba8fdc9d4f727c64a8b58cd56605f8a7"
---

# get_team_access_request

Get access request status.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fget_team_access_request&source_site=vercel-docs&relationship=related) — Use get_team with Vercel MCP.
- [Get access request status](https://vercel.com/docs/rest-api/teams/get-access-request-status?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fget_team_access_request&source_site=vercel-docs&relationship=related) — GET /v1/teams/{teamId}/request/{userId} — Check the status of a join request. It'll respond with a 404 if the request ha
- [get_auth_user](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_auth_user?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fget_team_access_request&source_site=vercel-docs&relationship=related) — Use get_auth_user with Vercel MCP.
- [Request access to a team](https://vercel.com/docs/rest-api/teams/request-access-to-a-team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fget_team_access_request&source_site=vercel-docs&relationship=related) — POST /v1/teams/{teamId}/request — Request access to a team as a member. An owner has to approve the request. Only 100 us
- [read_access_group](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fget_team_access_request&source_site=vercel-docs&relationship=related) — Use read_access_group with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/teams/get_team_access_request.graph.md](/docs/agent-resources/vercel-mcp/tools/teams/get_team_access_request.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fget_team_access_request&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| `userId`  | string | Yes      | The unique user identifier |
| `teamId`  | string | Yes      | The unique team identifier |


---

[View full sitemap](/docs/sitemap)
