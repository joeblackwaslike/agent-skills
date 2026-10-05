---
title: get_custom_environment
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/environment-variables
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_custom_environment with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "500da5de06379896248ef1a4760395e855507876faae5cb0e8883f45765a4635"
---

# get_custom_environment

Retrieve a custom environment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_custom_environments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_custom_environment&source_site=vercel-docs&relationship=related) — Use list_project_custom_environments with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_custom_environment&source_site=vercel-docs&relationship=related) — Use get_project_env with Vercel MCP.
- [filter_project_envs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_custom_environment&source_site=vercel-docs&relationship=related) — Use filter_project_envs with Vercel MCP.
- [edit_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_custom_environment&source_site=vercel-docs&relationship=related) — Use edit_project_env with Vercel MCP.
- [create_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_custom_environment&source_site=vercel-docs&relationship=related) — Use create_project_env with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_custom_environment&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter             | Type   | Required | Description                                                 |
| --------------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`            | string | Yes      | The unique project identifier or the project name           |
| `environmentSlugOrId` | string | Yes      | The unique custom environment identifier within the project |
| `teamId`              | string | No       | Team ID.                                                    |
| `slug`                | string | No       | Team slug.                                                  |


---

[View full sitemap](/docs/sitemap)
