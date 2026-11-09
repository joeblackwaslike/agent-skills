---
title: create_flags_project_connection
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/create_flags_project_connection
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flags_project_connection"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/flags/vercel-flags/project-connections
summary: "Grant another project access to a project's flags."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flags_project_connection.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "ae0492dadb14673b43d2b6cdfb0f11b013b2ce8a34dd1790dc3279d4e179451b"
---

# create_flags_project_connection

Connect two projects in the same team. The source owns the flags; the consumer receives read and evaluate access across environments. Your consumer project's OIDC token selects the environment. Connections do not permit flag changes.

Set `projectIdOrName` to the source and `requestBody.consumerProjectId` to the consumer. Confirm both projects before creating the connection. On a project-scoped MCP connection, connect to the source project.

## Example

```json
{
  "teamId": "team_example",
  "projectIdOrName": "prj_source",
  "requestBody": {
    "consumerProjectId": "prj_consumer"
  }
}
```

The response identifies both projects and the connection's creator and creation time. Read it back with `list_flags_project_connections`. An existing connection returns a conflict; inspect it before retrying.

## Required permissions

Your MCP OAuth grant must cover both projects. You need permission to manage connections on the source and view the consumer. See [Project Connections permissions](/docs/flags/vercel-flags/project-connections#required-permissions).

## Parameters

| Parameter         | Type   | Required | Description                 |
| ----------------- | ------ | -------- | --------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name      |
| `teamId`          | string | No       | Team ID.                    |
| `slug`            | string | No       | Team slug.                  |
| `requestBody`     | object | Yes      | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
