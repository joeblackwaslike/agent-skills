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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flags_project_connection.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "3f24511e5a12bc0085cc9962e72b5fec6f531e30cc0b9e33f237deb82b90b5f9"
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
