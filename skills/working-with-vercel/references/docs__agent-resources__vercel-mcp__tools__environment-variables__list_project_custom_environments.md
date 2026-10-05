---
title: list_project_custom_environments
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/environment-variables
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_project_custom_environments with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "dcc4146d50926c434e00590509c1ddb49fe9ecf349c152ca6c1965d2530a4741"
---

# list_project_custom_environments

Retrieve custom environments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_custom_environment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Flist_project_custom_environments&source_site=vercel-docs&relationship=related) — Use get_custom_environment with Vercel MCP.
- [filter_project_envs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Flist_project_custom_environments&source_site=vercel-docs&relationship=related) — Use filter_project_envs with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Flist_project_custom_environments&source_site=vercel-docs&relationship=related) — Use get_project_env with Vercel MCP.
- [create_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Flist_project_custom_environments&source_site=vercel-docs&relationship=related) — Use create_project_env with Vercel MCP.
- [Retrieve custom environments](https://vercel.com/docs/rest-api/environment/retrieve-custom-environments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Flist_project_custom_environments&source_site=vercel-docs&relationship=related) — GET /v9/projects/{idOrName}/custom-environments — Retrieve custom environments for the project. Must not be named 'Produ

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Flist_project_custom_environments&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                         |
| ----------- | ------ | -------- | --------------------------------------------------- |
| `idOrName`  | string | Yes      | The unique project identifier or the project name   |
| `gitBranch` | string | No       | Fetch custom environments for a specific git branch |
| `teamId`    | string | No       | Team ID.                                            |
| `slug`      | string | No       | Team slug.                                          |


---

[View full sitemap](/docs/sitemap)
