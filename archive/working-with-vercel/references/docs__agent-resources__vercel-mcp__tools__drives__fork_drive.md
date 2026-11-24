---
title: fork_drive
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drives/fork_drive
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/fork_drive"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/drives
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/agent-resources/vercel-mcp/tools/drives/get_drive
summary: Use fork_drive with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/fork_drive.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "34edacd48584558bbb828504ac664c25ef79d4a4778c4651787276cc755d365f"
---

# fork_drive

Fork an existing drive into a new drive in the same project. The fork starts with the source drive's contents and inherits its region and maximum size, but is otherwise independent, so writes to the fork don't affect the source. Returns a conflict error when a drive with the new name already exists. Read the result back with [`get_drive`](/docs/agent-resources/vercel-mcp/tools/drives/get_drive).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Fork a drive](https://vercel.com/docs/rest-api/drives/fork-a-drive) — POST /v1/drives/{name}/fork — Fork the provided drive into a new one with the provided name, inheriting the region and m
- [Vercel Drives is now generally available](https://vercel.com/changelog/vercel-drives-is-now-generally-available)
- [get_or_create_drive](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/get_or_create_drive) — Use get_or_create_drive with Vercel MCP.
- [list_drives](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/list_drives) — Use list_drives with Vercel MCP.
- [Drives CLI Reference](https://vercel.com/docs/drives/cli-reference) — Create, list, fork, and delete Vercel Drives with the vercel drives command.
- [delete_drive](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/delete_drive) — Use delete_drive with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drives/fork_drive.graph.md](/docs/agent-resources/vercel-mcp/tools/drives/fork_drive.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                                                                       |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `name`        | string | Yes      | Name of the source drive to fork.                                                                                 |
| `projectId`   | string | No       | The project ID or name associated with the drive. Required unless using a Vercel OIDC token scoped to a project.  |
| `teamId`      | string | No       | Team ID.                                                                                                          |
| `slug`        | string | No       | Team slug.                                                                                                        |
| `requestBody` | object | No       | Request body for this tool.                                                                                       |

### Request body fields

| Field  | Type   | Required | Description                                                                                                                      |
| ------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `name` | string | Yes      | Name for the forked drive. Must be unique per project and URL-safe (alphanumeric, hyphens, underscores). Maximum 64 characters.  |

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
