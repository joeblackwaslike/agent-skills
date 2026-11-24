---
title: get_drive
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drives/get_drive
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/get_drive"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/drives
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/agent-resources/vercel-mcp/tools/drives/get_or_create_drive
summary: Use get_drive with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/get_drive.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "5fba5cbcdb8037ffa17e91a3c56e2bb62a74a1ec588020ca8c139a134abb31bf"
---

# get_drive

Get a drive by name or drive ID, for example to check its size, region, or whether it exists. Returns a 404 error when the drive doesn't exist. This tool never creates a drive. Use [`get_or_create_drive`](/docs/agent-resources/vercel-mcp/tools/drives/get_or_create_drive) to provision one.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get a drive](https://vercel.com/docs/rest-api/drives/get-a-drive) — GET /v1/drives/{nameOrId} — Gets an existing drive by project and name or drive ID. Returns 404 if doesn't exist.
- [delete_drive](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/delete_drive) — Use delete_drive with Vercel MCP.
- [list_drives](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/list_drives) — Use list_drives with Vercel MCP.
- [Get or create a drive](https://vercel.com/docs/rest-api/drives/get-or-create-a-drive) — POST /v1/drives/{name} — Gets an existing drive by project and name, or creates it when it does not exist.
- [Delete a drive](https://vercel.com/docs/rest-api/drives/delete-a-drive) — DELETE /v1/drives/{nameOrId} — Deletes a drive by project and name or drive ID. Attached drives cannot be deleted. Stop

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drives/get_drive.graph.md](/docs/agent-resources/vercel-mcp/tools/drives/get_drive.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                                                                       |
| ----------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `nameOrId`  | string | Yes      | The drive name or ID.                                                                                             |
| `projectId` | string | No       | The project ID or name associated with the drive. Required unless using a Vercel OIDC token scoped to a project.  |
| `teamId`    | string | No       | Team ID.                                                                                                          |
| `slug`      | string | No       | Team slug.                                                                                                        |

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
