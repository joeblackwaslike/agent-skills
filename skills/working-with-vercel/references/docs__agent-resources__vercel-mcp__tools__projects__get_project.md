---
title: get_project
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/get_project
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/projects
summary: Use get_project with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "af93abbda64896d93fa84430a8c08af9d6728059e8b02a6d9b8478caab8d06f6"
---

# get_project

Get a [project](/docs/projects) by ID or name, including its configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project&source_site=vercel-docs&relationship=related) — Use get_project_env with Vercel MCP.
- [get_project_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_project_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project&source_site=vercel-docs&relationship=related) — Use get_project_check with Vercel MCP.
- [get_microfrontends_config_for_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project&source_site=vercel-docs&relationship=related) — Use get_microfrontends_config_for_project with Vercel MCP.
- [get_project_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project&source_site=vercel-docs&relationship=related) — Use get_project_token with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/get_project.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/get_project.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter  | Type   | Required | Description                                       |
| ---------- | ------ | -------- | ------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name |
| `teamId`   | string | No       | Team ID.                                          |
| `slug`     | string | No       | Team slug.                                        |

**Sample prompt:** "Get details about my next-js-blog project"


---

[View full sitemap](/docs/sitemap)
