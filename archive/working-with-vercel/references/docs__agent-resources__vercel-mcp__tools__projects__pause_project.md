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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/pause_project.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "ebe4bc55a0b7daa4ef7639602180bca348c341e984ba8a2fcccb1aeada70907e"
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
