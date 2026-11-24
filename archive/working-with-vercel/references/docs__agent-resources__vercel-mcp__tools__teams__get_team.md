---
title: get_team
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/teams/get_team
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/teams
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_team with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "10aa0d971a4600d2b6b7a8f78353f203493eb70893bd4b0f7198ad0fcd543ab8"
---

# get_team

Get a Team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_teams](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_teams) — Use list_teams with Vercel MCP.
- [list_team_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_team_members) — Use list_team_members with Vercel MCP.
- [Create a Team](https://vercel.com/docs/rest-api/teams/create-a-team) — POST /v1/teams — Create a new Team under your account. You need to send a POST request with the desired Team slug, and..
- [get_tld](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld) — Use get_tld with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/teams/get_team.graph.md](/docs/agent-resources/vercel-mcp/tools/teams/get_team.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `teamId`  | string | Yes      | Team ID to use for this operation.                          |

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
