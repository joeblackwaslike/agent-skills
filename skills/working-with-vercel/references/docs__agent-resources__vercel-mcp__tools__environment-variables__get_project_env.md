---
title: get_project_env
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/environment-variables
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_project_env with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0c4d395fbce9741c710fbdaa17dc0d4fd597e46441997a33906a33b92648856c"
---

# get_project_env

Retrieve the decrypted value of an environment variable of a project by id.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_custom_environment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_project_env&source_site=vercel-docs&relationship=related) — Use get_custom_environment with Vercel MCP.
- [edit_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_project_env&source_site=vercel-docs&relationship=related) — Use edit_project_env with Vercel MCP.
- [get_shared_env_var](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_shared_env_var?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_project_env&source_site=vercel-docs&relationship=related) — Use get_shared_env_var with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_project_env&source_site=vercel-docs&relationship=related) — Use get_project with Vercel MCP.
- [filter_project_envs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_project_env&source_site=vercel-docs&relationship=related) — Use filter_project_envs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_project_env&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                                                            |
| ---------- | ------ | -------- | ---------------------------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name                      |
| `id`       | string | Yes      | The unique ID for the environment variable to get the decrypted value. |
| `teamId`   | string | No       | Team ID.                                                               |
| `slug`     | string | No       | Team slug.                                                             |


---

[View full sitemap](/docs/sitemap)
