---
title: list_teams
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/teams/list_teams
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_teams"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/teams
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/accounts
summary: Use list_teams with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_teams.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "628ef78253c0ccb528a9964e18e7c478e2c46da335e3b7ce7e05137603847b00"
---

# list_teams

List the [teams](/docs/accounts) you belong to.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_team_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_team_members?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_teams&source_site=vercel-docs&relationship=related) — Use list_team_members with Vercel MCP.
- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_teams&source_site=vercel-docs&relationship=related) — Use list_domains with Vercel MCP.
- [List all teams](https://vercel.com/docs/rest-api/teams/list-all-teams?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_teams&source_site=vercel-docs&relationship=related) — GET /v2/teams — Get a paginated list of all the Teams the authenticated User is a member of.
- [list_supported_tlds](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_supported_tlds?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_teams&source_site=vercel-docs&relationship=related) — Use list_supported_tlds with Vercel MCP.
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_teams&source_site=vercel-docs&relationship=related) — Use get_team with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/teams/list_teams.graph.md](/docs/agent-resources/vercel-mcp/tools/teams/list_teams.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fteams%2Flist_teams&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Description                                                           |
| --------- | ------ | -------- | --------------------------------------------------------------------- |
| `limit`   | number | No       | Maximum number of Teams which may be returned.                        |
| `since`   | number | No       | Timestamp (in milliseconds) to only include Teams created since then. |
| `until`   | number | No       | Timestamp (in milliseconds) to only include Teams created until then. |

**Sample prompt:** "Show me all the teams I'm part of"


---

[View full sitemap](/docs/sitemap)
