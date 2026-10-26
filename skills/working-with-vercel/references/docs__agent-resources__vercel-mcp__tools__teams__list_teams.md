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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "273f5f0ebeec9b822b359d0da20ce016f1a234a648f09f59961e92a5215cc4e6"
---

# list_teams

List the [teams](/docs/accounts) you belong to.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_team_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_team_members) — Use list_team_members with Vercel MCP.
- [List all teams](https://vercel.com/docs/rest-api/teams/list-all-teams) — GET /v2/teams — Get a paginated list of all the Teams the authenticated User is a member of.
- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains) — Use list_domains with Vercel MCP.
- [vercel teams](https://vercel.com/docs/cli/teams) — Learn how to list, create, switch, invite, and manage your teams with the vercel teams CLI command.
- [list_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects) — Use list_projects with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/teams/list_teams.graph.md](/docs/agent-resources/vercel-mcp/tools/teams/list_teams.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Description                                                           |
| --------- | ------ | -------- | --------------------------------------------------------------------- |
| `limit`   | number | No       | Maximum number of Teams which may be returned.                        |
| `since`   | number | No       | Timestamp (in milliseconds) to only include Teams created since then. |
| `until`   | number | No       | Timestamp (in milliseconds) to only include Teams created until then. |

**Sample prompt:** "Show me all the teams I'm part of"

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

This workflow takes no parameters.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
