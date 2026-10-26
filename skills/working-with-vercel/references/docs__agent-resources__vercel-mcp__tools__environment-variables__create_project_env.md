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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ffb3404a78aaa15731c737b70ef2795f7f2ce9f992c55f1a98440f97cca8c972"
---

# create_project_env

Create one or more environment variables.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [edit_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env) — Use edit_project_env with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env) — Use get_project_env with Vercel MCP.
- [list_project_custom_environments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments) — Use list_project_custom_environments with Vercel MCP.
- [get_custom_environment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment) — Use get_custom_environment with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type                       | Required | Description                                                 |
| ------------- | -------------------------- | -------- | ----------------------------------------------------------- |
| `idOrName`    | string                     | Yes      | The unique project identifier or the project name           |
| `upsert`      | string                     | No       | Allow override of environment variable if it already exists |
| `teamId`      | string                     | No       | Team ID to use for this operation.                          |
| `slug`        | string                     | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object \| Array\<object> | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
