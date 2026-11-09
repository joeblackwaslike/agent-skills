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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flags_project_disconnection_link.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "cc2034e793ff32e037d5a8fe3818a347759e524a274a77e9031b5fd0ca11c91a"
---

# get_flags_project_disconnection_link

Get the source project's Flags Connections page, where you can disconnect the selected consumer. This tool checks the source project's team and returns `requires_user_action` with `mutationExecuted: false`. It does not revoke access.

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
