---
title: get_or_create_drive
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drives/get_or_create_drive
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/get_or_create_drive"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/drives
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/regions
summary: Use get_or_create_drive with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/get_or_create_drive.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f49535a166a4e370369a3726287e004c73a69d483acda36508ebc66d29e869ef"
---

# get_or_create_drive

Get an existing drive by name in a project, or create it when it doesn't exist. `maxSizeBytes` and `region` apply only when the call creates the drive. They don't resize or move an existing one. This tool doesn't start a sandbox or attach the drive to a session.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_drive](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/get_drive) — Use get_drive with Vercel MCP.
- [Get or create a drive](https://vercel.com/docs/rest-api/drives/get-or-create-a-drive) — POST /v1/drives/{name} — Gets an existing drive by project and name, or creates it when it does not exist.
- [delete_drive](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/delete_drive) — Use delete_drive with Vercel MCP.
- [Get a drive](https://vercel.com/docs/rest-api/drives/get-a-drive) — GET /v1/drives/{nameOrId} — Gets an existing drive by project and name or drive ID. Returns 404 if doesn't exist.
- [fork_drive](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/fork_drive) — Use fork_drive with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drives/get_or_create_drive.graph.md](/docs/agent-resources/vercel-mcp/tools/drives/get_or_create_drive.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                                                        |
| ------------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| `name`        | string | Yes      | Name for the drive. Must be unique per project and URL-safe (alphanumeric, hyphens, underscores).  |
| `teamId`      | string | No       | Team ID.                                                                                           |
| `slug`        | string | No       | Team slug.                                                                                         |
| `requestBody` | object | No       | Request body for this tool.                                                                        |

### Request body fields

| Field          | Type    | Required | Description                                                                                                                                                                                |
| -------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `projectId`    | string  | No       | The project ID or name to associate the drive with. Required unless using a Vercel OIDC token scoped to a project.                                                                         |
| `maxSizeBytes` | integer | No       | Maximum drive size in bytes. Must be a multiple of 4096. Defaults to 1 TiB (1 GiB on Hobby). The maximum is 16 TiB. Request a higher quota at [vercel.com/help](https://vercel.com/help).  |
| `region`       | string  | No       | [Region](/docs/regions) where the drive is stored. Defaults to `iad1`.                                                                                                                     |

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
