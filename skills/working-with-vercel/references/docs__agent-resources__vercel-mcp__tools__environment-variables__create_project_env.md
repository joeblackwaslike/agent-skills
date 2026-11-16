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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "30724803d072f0b13b04d93d1700e06b8b7abe706c72690127ab473c3070a2b0"
---

# create_project_env

Create one or more environment variables.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [edit_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env) — Use edit_project_env with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env) — Use get_project_env with Vercel MCP.
- [list_project_custom_environments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments) — Use list_project_custom_environments with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [filter_project_envs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/filter_project_envs) — Use filter_project_envs with Vercel MCP.

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
