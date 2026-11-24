---
title: get_flags_project_disconnection_link
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/get_flags_project_disconnection_link
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flags_project_disconnection_link"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/flags/vercel-flags/project-connections
summary: "Open the dashboard to disconnect a project's flags."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flags_project_disconnection_link.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "d22e0d5d6503755e4cd9ae85b6aad974ec6fd6ced00a4bbdb1c2880251b11a70"
---

# get_flags_project_disconnection_link

Get the source project's Flags Connections page, where you can disconnect the selected consumer. This tool checks the source project's team and returns `requires_user_action` with `mutationExecuted: false`. It does not revoke access.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_flags_project_connections](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_project_connections) — List the projects that share flags with a project.
- [create_flags_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flags_project_connection) — Grant another project access to a project's flags.
- [Evaluate Vercel Flags from another project without sharing SDK keys.](https://vercel.com/changelog/evaluate-vercel-flags-from-another-project-without-sharing-sdk-keys)
- [Disconnect a project from the flags of this project](https://vercel.com/docs/rest-api/feature-flags/disconnect-a-project-from-the-flags-of-this-project) — DELETE /v1/projects/{projectIdOrName}/feature-flags/connections/{consumerProjectId} — Disconnects a project from the fla
- [List flags project connections](https://vercel.com/docs/rest-api/feature-flags/list-flags-project-connections) — GET /v1/projects/{projectIdOrName}/feature-flags/connections — Lists the flags project connections of a project. By defa
- [Connect a project to the flags of this project](https://vercel.com/docs/rest-api/feature-flags/connect-a-project-to-the-flags-of-this-project) — PUT /v1/projects/{projectIdOrName}/feature-flags/connections — Connects a project in the same team to the flags of this

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flags_project_disconnection_link.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flags_project_disconnection_link.graph.md)
<!-- /docsgraph:related -->

Set `projectIdOrName` to the source and `consumerProjectId` to the consumer. On a project-scoped MCP connection, connect to the source project.

## Example

```json
{
  "teamId": "team_example",
  "projectIdOrName": "prj_source",
  "consumerProjectId": "prj_consumer"
}
```

Open the returned URL, find the consumer under projects that can read the source's flags, and select **Remove Connection**. This removes access across environments. Use `list_flags_project_connections` to verify removal.

You need permission to manage connections on the source to complete this action. You don't need access to the consumer. See [Project Connections permissions](/docs/flags/vercel-flags/project-connections#required-permissions).

## Parameters

| Parameter           | Type   | Required | Description                       |
| ------------------- | ------ | -------- | --------------------------------- |
| `projectIdOrName`   | string | Yes      | The project id or name            |
| `consumerProjectId` | string | Yes      | The connected consumer project id |
| `teamId`            | string | Yes      | Team ID.                          |

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
