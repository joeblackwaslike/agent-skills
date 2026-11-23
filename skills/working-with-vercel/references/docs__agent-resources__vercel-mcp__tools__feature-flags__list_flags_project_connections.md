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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_project_connections.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "130cfacb2f6a0f5f70835146db1b285e1a8607f36b5d4e32f0b76d7464b2e235"
---

# list_flags_project_connections

List the flag connections for a project within one team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Evaluate Vercel Flags from another project without sharing SDK keys.](https://vercel.com/changelog/evaluate-vercel-flags-from-another-project-without-sharing-sdk-keys)
- [create_flags_project_connection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flags_project_connection) — Grant another project access to a project's flags.
- [List flags project connections](https://vercel.com/docs/rest-api/feature-flags/list-flags-project-connections) — GET /v1/projects/{projectIdOrName}/feature-flags/connections — Lists the flags project connections of a project. By defa
- [get_flags_project_disconnection_link](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flags_project_disconnection_link) — Open the dashboard to disconnect a project's flags.
- [Connect a project to the flags of this project](https://vercel.com/docs/rest-api/feature-flags/connect-a-project-to-the-flags-of-this-project) — PUT /v1/projects/{projectIdOrName}/feature-flags/connections — Connects a project in the same team to the flags of this
- [Connecting Projects to Share Flags](https://vercel.com/docs/flags/vercel-flags/project-connections) — Read another project's Vercel Flags using your project's identity, without copying SDK keys.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_project_connections.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/list_flags_project_connections.graph.md)
<!-- /docsgraph:related -->

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
