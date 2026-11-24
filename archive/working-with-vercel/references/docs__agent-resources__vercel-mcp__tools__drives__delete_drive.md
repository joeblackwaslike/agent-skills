---
title: delete_drive
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drives/delete_drive
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/delete_drive"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/drives
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/agent-resources/vercel-mcp/tools/drives/list_drives
summary: Use delete_drive with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/delete_drive.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "db8e07d6f8f1ef9c0cfbba1aeb9c5d2dfd845770617c2b56c95f29d040db5a78"
---

# delete_drive

Permanently delete a drive and its stored data. Attached drives can't be deleted. Stop or replace the sandbox session using the drive, then retry. Use [`list_drives`](/docs/agent-resources/vercel-mcp/tools/drives/list_drives) afterward to verify removal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Delete a drive](https://vercel.com/docs/rest-api/drives/delete-a-drive) — DELETE /v1/drives/{nameOrId} — Deletes a drive by project and name or drive ID. Attached drives cannot be deleted. Stop
- [get_drive](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/get_drive) — Use get_drive with Vercel MCP.
- [Drives CLI Reference](https://vercel.com/docs/drives/cli-reference) — Create, list, fork, and delete Vercel Drives with the vercel drives command.
- [Get a drive](https://vercel.com/docs/rest-api/drives/get-a-drive) — GET /v1/drives/{nameOrId} — Gets an existing drive by project and name or drive ID. Returns 404 if doesn't exist.
- [JS SDK Reference](https://vercel.com/docs/drives/sdk-reference) — Create, list, fork, and delete Vercel Drives with the JavaScript and TypeScript SDK.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drives/delete_drive.graph.md](/docs/agent-resources/vercel-mcp/tools/drives/delete_drive.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type    | Required | Description                                                                                                       |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `nameOrId`  | string  | Yes      | The drive name or ID.                                                                                             |
| `projectId` | string  | No       | The project ID or name associated with the drive. Required unless using a Vercel OIDC token scoped to a project.  |
| `teamId`    | string  | No       | Team ID.                                                                                                          |
| `slug`      | string  | No       | Team slug.                                                                                                        |
| `confirm`   | boolean | Yes      | Required. Set to true to permanently delete this resource. Value: `true`.                                         |

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
