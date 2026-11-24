---
title: join_team
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/teams/join_team
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/join_team"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/teams
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use join_team with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/join_team.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "63f9f8698dffaa1362c54137b4401b74b91d7de240accafab71ecd7a041a8d32"
---

# join_team

Join a team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Join a team](https://vercel.com/docs/rest-api/teams/join-a-team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fjoin_team&source_site=vercel-docs&relationship=related) — POST /v1/teams/{teamId}/members/teams/join — Join a team with a provided invite code or team ID.
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fjoin_team&source_site=vercel-docs&relationship=related) — Use get_team with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fjoin_team&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [create_connector](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/create_connector?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fjoin_team&source_site=vercel-docs&relationship=related) — Use create_connector with Vercel MCP.
- [accept_project_transfer_request](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/accept_project_transfer_request?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fjoin_team&source_site=vercel-docs&relationship=related) — Use accept_project_transfer_request with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/teams/join_team.graph.md](/docs/agent-resources/vercel-mcp/tools/teams/join_team.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Fjoin_team&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | Yes      | The unique team identifier  |
| `requestBody` | object | Yes      | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
