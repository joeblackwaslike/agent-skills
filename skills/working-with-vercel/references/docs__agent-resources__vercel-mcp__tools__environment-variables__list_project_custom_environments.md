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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "f626b5b6fb85799b4e1c523ee425ba6be39d8ab6c203c1ca2f98bbfa0def4120"
---

# list_project_custom_environments

Retrieve custom environments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_custom_environment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment) — Use get_custom_environment with Vercel MCP.
- [filter_project_envs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs) — Use filter_project_envs with Vercel MCP.
- [vercel environments](https://vercel.com/docs/cli/target) — Work with custom environments using the --environment option in Vercel CLI.
- [create_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env) — Use create_project_env with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env) — Use get_project_env with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`  | string | Yes      | The unique project identifier or the project name           |
| `gitBranch` | string | No       | Fetch custom environments for a specific git branch         |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
