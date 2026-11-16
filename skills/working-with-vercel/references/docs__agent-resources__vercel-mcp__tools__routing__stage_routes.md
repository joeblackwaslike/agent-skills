---
title: stage_routes
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/stage_routes
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use stage_routes with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "03d07cfb0b6eb0d94e04aec23da75f760f7acd34c6e0d54e8d2cc84e9a1360d1"
---

# stage_routes

Stage routing rules.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [stage_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects) — Use stage_redirects with Vercel MCP.
- [Stage routing rules](https://vercel.com/docs/rest-api/project-routes/stage-routing-rules) — PUT /v1/projects/{projectId}/routes — Stage routing rules for a project. Set \\`overwrite\\` to true to replace all existi
- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes) — Use list_project_routes with Vercel MCP.
- [generate_route](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/generate_route) — Use generate_route with Vercel MCP.
- [Delete routing rules](https://vercel.com/docs/rest-api/project-routes/delete-routing-rules) — DELETE /v1/projects/{projectId}/routes — Delete one or more routing rules from a project by ID. Stages a new version wit

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/stage_routes.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/stage_routes.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

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
