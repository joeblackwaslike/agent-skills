---
title: pause_project
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/pause_project
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/pause_project"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use pause_project with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/pause_project.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "dfa5ec6bf4493dd93d54bbb33e1139493a4e53b3694ec37df4ac83daea12e095"
---

# pause_project

Pause a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [unpause_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/unpause_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fpause_project&source_site=vercel-docs&relationship=related) — Use unpause_project with Vercel MCP.
- [Pause your project](https://vercel.com/kb/guide/pause-your-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fpause_project&source_site=vercel-docs&relationship=related) — Use a webhook to pause your project based on spend management.
- [Pause a project](https://vercel.com/docs/rest-api/projects/pause-a-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fpause_project&source_site=vercel-docs&relationship=related) — POST /v1/projects/{projectId}/pause — Pause a project by passing its project \\`id\\` in the URL. If the project does not
- [Unpause a project](https://vercel.com/docs/rest-api/projects/unpause-a-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fpause_project&source_site=vercel-docs&relationship=related) — POST /v1/projects/{projectId}/unpause — Unpause a project by passing its project \\`id\\` in the URL. If the project does
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fpause_project&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fpause_project&source_site=vercel-docs&relationship=related) — Use update_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/pause_project.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/pause_project.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fpause_project&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                   |
| ------------- | ------- | -------- | ----------------------------- |
| `projectId`   | string  | Yes      | The unique project identifier |
| `teamId`      | string  | No       | Team ID.                      |
| `slug`        | string  | No       | Team slug.                    |
| `requestBody` | unknown | No       | Request body for this tool.   |


---

[View full sitemap](/docs/sitemap)
