---
title: edit_project_env
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/environment-variables
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use edit_project_env with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "3c85c5dc6af6047769707747539e6d0f160f2c6710f8527db088890717cefbc3"
---

# edit_project_env

Edit an environment variable.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fedit_project_env&source_site=vercel-docs&relationship=related) — Use create_project_env with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fedit_project_env&source_site=vercel-docs&relationship=related) — Use get_project_env with Vercel MCP.
- [get_custom_environment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fedit_project_env&source_site=vercel-docs&relationship=related) — Use get_custom_environment with Vercel MCP.
- [list_project_custom_environments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fedit_project_env&source_site=vercel-docs&relationship=related) — Use list_project_custom_environments with Vercel MCP.
- [filter_project_envs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fedit_project_env&source_site=vercel-docs&relationship=related) — Use filter_project_envs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fedit_project_env&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                       |
| ------------- | ------ | -------- | ------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name |
| `id`          | string | Yes      | The unique environment variable identifier        |
| `teamId`      | string | No       | Team ID.                                          |
| `slug`        | string | No       | Team slug.                                        |
| `requestBody` | object | Yes      | Request body for this tool.                       |


---

[View full sitemap](/docs/sitemap)
