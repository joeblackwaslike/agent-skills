---
title: list_drives
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drives/list_drives
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/list_drives"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/drives
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_drives with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/list_drives.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "1d4ebb3188def9bf03979ae4c2ed7e50d3a18ef956bf97237764977118981c72"
---

# list_drives

List the drives in a project. Returns drive records and pagination. Follow `cursor` for more results. `namePrefix` filters only when `sortBy` is `name`. Listing doesn't create a drive or attach one to a sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List drives](https://vercel.com/docs/rest-api/drives/list-drives) — GET /v1/drives — Retrieves a paginated list of drives belonging to a specific project.
- [Drives CLI Reference](https://vercel.com/docs/drives/cli-reference) — Create, list, fork, and delete Vercel Drives with the vercel drives command.
- [get_drive](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives/get_drive) — Use get_drive with Vercel MCP.
- [Get a drive](https://vercel.com/docs/rest-api/drives/get-a-drive) — GET /v1/drives/{nameOrId} — Gets an existing drive by project and name or drive ID. Returns 404 if doesn't exist.
- [Delete a drive](https://vercel.com/docs/rest-api/drives/delete-a-drive) — DELETE /v1/drives/{nameOrId} — Deletes a drive by project and name or drive ID. Attached drives cannot be deleted. Stop

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drives/list_drives.graph.md](/docs/agent-resources/vercel-mcp/tools/drives/list_drives.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter    | Type   | Required | Description                                                                                                        |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `projectId`  | string | Yes      | The project ID or name associated with the drives. Required unless using a Vercel OIDC token scoped to a project.  |
| `limit`      | number | No       | Maximum number of drives to return in the response. Used for pagination. Minimum: 1. Maximum: 50. Default: `20`.   |
| `cursor`     | string | No       | Opaque pagination cursor from a previous response.                                                                 |
| `sortBy`     | string | No       | Field to sort drives by. Allowed values: `"createdAt"`, `"updatedAt"`, `"name"`. Default: `"createdAt"`.           |
| `namePrefix` | string | No       | Filter drives whose name starts with this prefix. Only valid when sortBy=name.                                     |
| `sortOrder`  | string | No       | Sort direction for results. Allowed values: `"asc"`, `"desc"`. Default: `"desc"`.                                  |
| `teamId`     | string | No       | Team ID.                                                                                                           |
| `slug`       | string | No       | Team slug.                                                                                                         |

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
