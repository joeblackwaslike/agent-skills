---
title: update_project
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/update_project
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_project with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "493878f1712881f1309a5441a492698d89422ee76816f85e1733e52625b86502"
---

# update_project

Update an existing project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_version?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project&source_site=vercel-docs&relationship=related) — Use update_version with Vercel MCP.
- [update_project_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_project_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project&source_site=vercel-docs&relationship=related) — Use update_project_check with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [update_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project&source_site=vercel-docs&relationship=related) — Use update_rolling_release_config with Vercel MCP.
- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project&source_site=vercel-docs&relationship=related) — Use update_project_protection_bypass with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/update_project.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/update_project.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                       |
| ------------- | ------ | -------- | ------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name |
| `teamId`      | string | No       | Team ID.                                          |
| `slug`        | string | No       | Team slug.                                        |
| `requestBody` | object | Yes      | Request body for this tool.                       |


---

[View full sitemap](/docs/sitemap)
