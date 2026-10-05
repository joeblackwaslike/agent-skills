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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0de724ecc8b4f286e4bc76090ea2fb52da83a4b90af2edb6fc0d43954b1fa60f"
---

# read_access_group_project

Reads an access group project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [read_access_group](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group_project&source_site=vercel-docs&relationship=related) — Use read_access_group with Vercel MCP.
- [Reads an access group project](https://vercel.com/docs/rest-api/access-groups/reads-an-access-group-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group_project&source_site=vercel-docs&relationship=related) — GET /v1/access-groups/{accessGroupIdOrName}/projects/{projectId} — Allows reading an access group project
- [list_access_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group_project&source_site=vercel-docs&relationship=related) — Use list_access_group_projects with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group_project&source_site=vercel-docs&relationship=related) — Use get_project with Vercel MCP.
- [Delete an access group project](https://vercel.com/docs/rest-api/access-groups/delete-an-access-group-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group_project&source_site=vercel-docs&relationship=related) — DELETE /v1/access-groups/{accessGroupIdOrName}/projects/{projectId} — Allows deletion of an access group project

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group_project.graph.md](/docs/agent-resources/vercel-mcp/tools/access-groups/read_access_group_project.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Faccess-groups%2Fread_access_group_project&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter             | Type   | Required | Description                  |
| --------------------- | ------ | -------- | ---------------------------- |
| `accessGroupIdOrName` | string | Yes      | The access group ID or name. |
| `projectId`           | string | Yes      | The project ID.              |
| `teamId`              | string | No       | Team ID.                     |
| `slug`                | string | No       | Team slug.                   |


---

[View full sitemap](/docs/sitemap)
