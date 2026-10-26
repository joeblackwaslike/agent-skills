---
title: read_access_group_project
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group_project
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group_project"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/access-groups
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use read_access_group_project with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group_project.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "dd17c759946ed139a1f75375e706ceb29fa6388c46a888cf9a84b6c93413abcf"
---

# read_access_group_project

Reads an access group project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [read_access_group](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group) — Use read_access_group with Vercel MCP.
- [Reads an access group project](https://vercel.com/docs/rest-api/access-groups/reads-an-access-group-project) — GET /v1/access-groups/{accessGroupIdOrName}/projects/{projectId} — Allows reading an access group project
- [list_access_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects) — Use list_access_group_projects with Vercel MCP.
- [list_access_groups](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_groups) — Use list_access_groups with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group_project.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group_project.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter             | Type   | Required | Description                                                 |
| --------------------- | ------ | -------- | ----------------------------------------------------------- |
| `accessGroupIdOrName` | string | Yes      | The access group ID or name.                                |
| `projectId`           | string | Yes      | The project ID.                                             |
| `teamId`              | string | No       | Team ID to use for this operation.                          |
| `slug`                | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
