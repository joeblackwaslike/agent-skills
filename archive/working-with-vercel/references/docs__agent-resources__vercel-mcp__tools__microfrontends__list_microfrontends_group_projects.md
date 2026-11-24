---
title: list_microfrontends_group_projects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/microfrontends/list_microfrontends_group_projects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/list_microfrontends_group_projects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/microfrontends
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_microfrontends_group_projects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/list_microfrontends_group_projects.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "c6198845881d944e319de5be3dd8a6d87db949824dc8bb430b49226169b8658e"
---

# list_microfrontends_group_projects

List projects in a microfrontends group.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_microfrontends_config_for_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Flist_microfrontends_group_projects&source_site=vercel-docs&relationship=related) — Use get_microfrontends_config_for_project with Vercel MCP.
- [List microfrontends groups](https://vercel.com/docs/rest-api/microfrontends/list-microfrontends-groups?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Flist_microfrontends_group_projects&source_site=vercel-docs&relationship=related) — GET /v1/microfrontends/groups — Get the microfrontends group IDs for a team.
- [list_access_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Flist_microfrontends_group_projects&source_site=vercel-docs&relationship=related) — Use list_access_group_projects with Vercel MCP.
- [list_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Flist_microfrontends_group_projects&source_site=vercel-docs&relationship=related) — Use list_projects with Vercel MCP.
- [get_microfrontends_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Flist_microfrontends_group_projects&source_site=vercel-docs&relationship=related) — Use get_microfrontends_config with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/microfrontends/list_microfrontends_group_projects.graph.md](/docs/agent-resources/vercel-mcp/tools/microfrontends/list_microfrontends_group_projects.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Flist_microfrontends_group_projects&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `groupId` | string | Yes      | The microfrontends group ID. |
| `teamId`  | string | No       | Team ID.                     |
| `slug`    | string | No       | Team slug.                   |


---

[View full sitemap](/docs/sitemap)
