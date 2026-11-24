---
title: update_shared_env_variable
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/environment-variables/update_shared_env_variable
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/update_shared_env_variable"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/environment-variables
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_shared_env_variable with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/update_shared_env_variable.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "21487bfc75da0ce2e8df5c81a06a169797424edeb2e67d5c89acc48a7315417d"
---

# update_shared_env_variable

Updates one or more shared environment variables.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Share environment variables across your Team and Projects](https://vercel.com/changelog/share-environment-variables-across-your-team-and-projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fupdate_shared_env_variable&source_site=vercel-docs&relationship=related)
- [get_shared_env_var](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_shared_env_var?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fupdate_shared_env_variable&source_site=vercel-docs&relationship=related) — Use get_shared_env_var with Vercel MCP.
- [edit_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/edit_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fupdate_shared_env_variable&source_site=vercel-docs&relationship=related) — Use edit_project_env with Vercel MCP.
- [create_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/create_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fupdate_shared_env_variable&source_site=vercel-docs&relationship=related) — Use create_project_env with Vercel MCP.
- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fupdate_shared_env_variable&source_site=vercel-docs&relationship=related) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can
- [Updates one or more shared environment variables](https://vercel.com/docs/rest-api/environment/updates-one-or-more-shared-environment-variables?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fupdate_shared_env_variable&source_site=vercel-docs&relationship=related) — PATCH /v1/env — Updates a given Shared Environment Variable for a Team.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/update_shared_env_variable.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/update_shared_env_variable.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fupdate_shared_env_variable&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
