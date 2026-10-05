---
title: create_project_env
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/environment-variables
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_project_env with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "c2495d8efdf38869b75b7f611a538f2396acc5e38b939d82c1b1fd26c1bbb1ef"
---

# create_project_env

Create one or more environment variables.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [edit_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fcreate_project_env&source_site=vercel-docs&relationship=related) — Use edit_project_env with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fcreate_project_env&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fcreate_project_env&source_site=vercel-docs&relationship=related) — Use get_project_env with Vercel MCP.
- [list_project_custom_environments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fcreate_project_env&source_site=vercel-docs&relationship=related) — Use list_project_custom_environments with Vercel MCP.
- [get_custom_environment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fcreate_project_env&source_site=vercel-docs&relationship=related) — Use get_custom_environment with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fcreate_project_env&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type                       | Required | Description                                                 |
| ------------- | -------------------------- | -------- | ----------------------------------------------------------- |
| `idOrName`    | string                     | Yes      | The unique project identifier or the project name           |
| `upsert`      | string                     | No       | Allow override of environment variable if it already exists |
| `teamId`      | string                     | No       | Team ID.                                                    |
| `slug`        | string                     | No       | Team slug.                                                  |
| `requestBody` | object \| Array\<object> | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
