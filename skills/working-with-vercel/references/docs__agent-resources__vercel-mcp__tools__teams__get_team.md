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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "7cfd979f3919a94194cf281128000375f1b2021ce26dae3d561f0ba39a051458"
---

# get_team

Get a Team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_tld](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld) — Use get_tld with Vercel MCP.
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [list_event_types](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_event_types) — Use list_event_types with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.
- [get_configuration](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration) — Use get_configuration with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/teams/get_team.graph.md](/docs/agent-resources/vercel-mcp/tools/teams/get_team.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `teamId`  | string | Yes      | Team ID to use for this operation.                          |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
