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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_teams.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "e7aaf8f84144a9cce15349c86c3f6adbf80ba43d44a5614c51897b016c63f438"
---

# list_teams

List the [teams](/docs/accounts) you belong to.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_team_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_team_members) — Use list_team_members with Vercel MCP.
- [vercel teams](https://vercel.com/docs/cli/teams) — Learn how to list, create, switch, invite, and manage your teams with the vercel teams CLI command.
- [List all teams](https://vercel.com/docs/rest-api/teams/list-all-teams) — GET /v2/teams — Get a paginated list of all the Teams the authenticated User is a member of. An app-principal token need
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team) — Use get_team with Vercel MCP.
- [List Organization Teams](https://vercel.com/docs/rest-api/organizations/list-organization-teams) — GET /v1/organizations/{organizationId}/teams — List up to 100 teams in an organization, each enriched with the team's sl

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
