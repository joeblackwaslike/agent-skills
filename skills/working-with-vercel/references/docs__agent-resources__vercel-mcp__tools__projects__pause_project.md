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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "7ad1eb408430b6af95b71432182790e058eadf8157fd87afd00a0b0bf208f719"
---

# pause_project

Pause a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [unpause_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/unpause_project) — Use unpause_project with Vercel MCP.
- [Pause a project](https://vercel.com/docs/rest-api/projects/pause-a-project) — POST /v1/projects/{projectId}/pause — Pause a project by passing its project \\`id\\` in the URL. If the project does not
- [Unpause a project](https://vercel.com/docs/rest-api/projects/unpause-a-project) — POST /v1/projects/{projectId}/unpause — Unpause a project by passing its project \\`id\\` in the URL. If the project does
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [Managing projects](https://vercel.com/docs/projects/managing-projects) — Learn how to manage your projects through the Vercel Dashboard.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/pause_project.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/pause_project.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectId`   | string  | Yes      | The unique project identifier                               |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter   | Type   | Required | Default | Description                                                                                   |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`. |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                     |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
