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
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "047138ef9d90b32f56c65cc12122a5086f96db43456d62bbdfa5e5ebd22bfae8"
---

# create_flags_project_connection

Connect two projects in the same team. The source owns the flags; the consumer receives read and evaluate access across environments. Your consumer project's OIDC token selects the environment. Connections do not permit flag changes.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_flags_project_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_project_connections) — List the projects that share flags with a project.
- [Evaluate Vercel Flags from another project without sharing SDK keys.](https://vercel.com/changelog/evaluate-vercel-flags-from-another-project-without-sharing-sdk-keys)
- [get_flags_project_disconnection_link](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flags_project_disconnection_link) — Open the dashboard to disconnect a project's flags.
- [Connect a project to the flags of this project](https://vercel.com/docs/rest-api/feature-flags/connect-a-project-to-the-flags-of-this-project) — PUT /v1/projects/{projectIdOrName}/feature-flags/connections — Connects a project in the same team to the flags of this
- [List flags project connections](https://vercel.com/docs/rest-api/feature-flags/list-flags-project-connections) — GET /v1/projects/{projectIdOrName}/feature-flags/connections — Lists the flags project connections of a project. By defa
- [Disconnect a project from the flags of this project](https://vercel.com/docs/rest-api/feature-flags/disconnect-a-project-from-the-flags-of-this-project) — DELETE /v1/projects/{projectIdOrName}/feature-flags/connections/{consumerProjectId} — Disconnects a project from the fla

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flags_project_connection.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flags_project_connection.graph.md)
<!-- /docsgraph:related -->

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
