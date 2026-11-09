---
title: list_flags_project_connections
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_project_connections
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_project_connections"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: List the projects that share flags with a project.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_project_connections.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "f575b9aad8efde8a9bc3c49ae3370b6dba99a9f5f7a70979313f94eeb0d2ba2a"
---

# list_flags_project_connections

List the flag connections for a project within one team.

Use `role: "source"` (the default) to list projects that can read this project's flags. Use `role: "consumer"` to list projects whose flags it can read. Connections apply across environments.

On a project-scoped MCP connection, the selected project and team come from the route. Your OAuth grant must include that project, and you need permission to list its connections.

## Example

```json
{
  "teamId": "team_example",
  "projectIdOrName": "prj_source",
  "role": "source"
}
```

The response contains a `data` array with the source and consumer project IDs, available names, and creation details.

## Parameters

| Parameter         | Type   | Required | Description                                                                                                           |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                                                                                |
| `role`            | string | No       | List connections where this project is the source (default) or the consumer Allowed values: `"source"`, `"consumer"`. |
| `teamId`          | string | No       | Team ID.                                                                                                              |
| `slug`            | string | No       | Team slug.                                                                                                            |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
