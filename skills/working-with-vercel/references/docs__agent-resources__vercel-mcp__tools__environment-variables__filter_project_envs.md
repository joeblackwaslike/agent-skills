---
title: filter_project_envs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/environment-variables
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use filter_project_envs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "5d072749f3bd4c96c4c5e5820a618b66b897c8d82777ffcc0706a68c6b12ba5b"
---

# filter_project_envs

Retrieve the environment variables of a project by id or name.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_custom_environments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Ffilter_project_envs&source_site=vercel-docs&relationship=related) — Use list_project_custom_environments with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Ffilter_project_envs&source_site=vercel-docs&relationship=related) — Use get_project_env with Vercel MCP.
- [get_custom_environment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Ffilter_project_envs&source_site=vercel-docs&relationship=related) — Use get_custom_environment with Vercel MCP.
- [edit_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Ffilter_project_envs&source_site=vercel-docs&relationship=related) — Use edit_project_env with Vercel MCP.
- [create_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Ffilter_project_envs&source_site=vercel-docs&relationship=related) — Use create_project_env with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Ffilter_project_envs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter               | Type   | Required | Description                                                                                             |
| ----------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `idOrName`              | string | Yes      | The unique project identifier or the project name                                                       |
| `gitBranch`             | string | No       | If defined, the git branch of the environment variable to filter the results (must have target=preview) |
| `decrypt`               | string | No       | If true, the environment variable value will be decrypted Allowed values: `"true"`, `"false"`.          |
| `source`                | string | No       | The source that is calling the endpoint.                                                                |
| `customEnvironmentId`   | string | No       | The unique custom environment identifier within the project                                             |
| `customEnvironmentSlug` | string | No       | The custom environment slug (name) within the project                                                   |
| `teamId`                | string | No       | Team ID.                                                                                                |
| `slug`                  | string | No       | Team slug.                                                                                              |


---

[View full sitemap](/docs/sitemap)
