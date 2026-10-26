---
title: get_project
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/get_project
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/projects
summary: Use get_project with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "3fb771a9054570a3c511718c1c99fc4fd5fe8eb994eb55da6cd8b5b0005721db"
---

# get_project

Get a [project](/docs/projects) by ID or name, including its configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_microfrontends_config_for_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project) — Use get_microfrontends_config_for_project with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env) — Use get_project_env with Vercel MCP.
- [get_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain) — Use get_project_domain with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [get_connector_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/get_connector_project_connection) — Use get_connector_project_connection with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/get_project.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/get_project.graph.md)
<!-- /docsgraph:related -->

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name           |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |

**Sample prompt:** "Get details about my next-js-blog project"

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter   | Type   | Required | Default | Description                                                                                   |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`. |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                     |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
