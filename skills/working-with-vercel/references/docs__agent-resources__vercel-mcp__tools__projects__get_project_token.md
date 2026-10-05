---
title: get_project_token
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/get_project_token
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_token"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_project_token with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_token.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "f6f9e1e423d096fab9883ff6bee19b5ddba33334eac9c9d511366787da9a04ec"
---

# get_project_token

Generate a project OIDC token.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project_token&source_site=vercel-docs&relationship=related) — Use get_project with Vercel MCP.
- [Generate a project OIDC token](https://vercel.com/docs/rest-api/projects/generate-a-project-oidc-token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project_token&source_site=vercel-docs&relationship=related) — POST /v1/projects/{idOrName}/token — Generates an OIDC token for the project and returns it.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project_token&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [get_auth_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/authentication/get_auth_token?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project_token&source_site=vercel-docs&relationship=related) — Use get_auth_token with Vercel MCP.
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project_token&source_site=vercel-docs&relationship=related) — Use get_project_env with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/get_project_token.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/get_project_token.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fget_project_token&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `idOrName`    | string | Yes      | The project ID or name      |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
