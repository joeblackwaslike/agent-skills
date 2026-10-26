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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f687f34a3a280400647fd6566ee13242a7e22a19116395f699efd796c5852ce2"
---

# get_custom_environment

Retrieve a custom environment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_project_custom_environments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments) — Use list_project_custom_environments with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env) — Use get_project_env with Vercel MCP.
- [filter_project_envs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs) — Use filter_project_envs with Vercel MCP.
- [edit_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env) — Use edit_project_env with Vercel MCP.
- [create_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env) — Use create_project_env with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter             | Type   | Required | Description                                                 |
| --------------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`            | string | Yes      | The unique project identifier or the project name           |
| `environmentSlugOrId` | string | Yes      | The unique custom environment identifier within the project |
| `teamId`              | string | No       | Team ID to use for this operation.                          |
| `slug`                | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
