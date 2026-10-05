---
title: list_access_group_projects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/access-groups
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_access_group_projects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "5cf148dc222974b43f77e52c14e9865cfaf005ed0e626ee921be49c30a084318"
---

# list_access_group_projects

List projects of an access group.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_access_group_members](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_members?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_projects&source_site=vercel-docs&relationship=related) — Use list_access_group_members with Vercel MCP.
- [List projects of an access group](https://vercel.com/docs/rest-api/access-groups/list-projects-of-an-access-group?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_projects&source_site=vercel-docs&relationship=related) — GET /v1/access-groups/{idOrName}/projects — List projects of an access group
- [list_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_projects&source_site=vercel-docs&relationship=related) — Use list_projects with Vercel MCP.
- [list_microfrontends_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/list_microfrontends_group_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_projects&source_site=vercel-docs&relationship=related) — Use list_microfrontends_group_projects with Vercel MCP.
- [read_access_group_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_projects&source_site=vercel-docs&relationship=related) — Use read_access_group_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Flist_access_group_projects&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type    | Required | Description                                               |
| ---------- | ------- | -------- | --------------------------------------------------------- |
| `idOrName` | string  | Yes      | The ID or name of the Access Group.                       |
| `limit`    | integer | No       | Limit how many access group projects should be returned.  |
| `next`     | string  | No       | Continuation cursor to retrieve the next page of results. |
| `teamId`   | string  | No       | Team ID.                                                  |
| `slug`     | string  | No       | Team slug.                                                |


---

[View full sitemap](/docs/sitemap)
