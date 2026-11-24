---
title: Drives
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drives
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  - /docs/sandbox/concepts/drives
  - /docs/agent-resources/vercel-mcp/tools/drives/list_drives
  - /docs/agent-resources/vercel-mcp/tools/drives/get_drive
  - /docs/agent-resources/vercel-mcp/tools/drives/get_or_create_drive
  - /docs/regions
summary: Vercel MCP tools for drives.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "fe2ff68612d53f55b17ead1c57b608497c1b094194b0ea79fbfd22ee6b73af1f"
---

# Drives

Create and manage [drives](/docs/sandbox/concepts/drives), the persistent storage that a sandbox mounts as a directory and that outlives any single sandbox. You can list a project's drives, inspect one by name or ID, create or reopen one, fork one into an independent copy, and delete drives you no longer need.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Drives CLI Reference](https://vercel.com/docs/drives/cli-reference) — Create, list, fork, and delete Vercel Drives with the vercel drives command.
- [JS SDK Reference](https://vercel.com/docs/drives/sdk-reference) — Create, list, fork, and delete Vercel Drives with the JavaScript and TypeScript SDK.
- [List drives](https://vercel.com/docs/rest-api/drives/list-drives) — GET /v1/drives — Retrieves a paginated list of drives belonging to a specific project.
- [Vercel Drives](https://vercel.com/docs/drives) — Keep workspace files, caches, and datasets across Vercel Sandbox runs with persistent storage.
- [Python SDK Reference](https://vercel.com/docs/drives/python-sdk-reference) — Create, list, fork, and delete Vercel Drives with the Vercel Sandbox Python SDK.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drives.graph.md](/docs/agent-resources/vercel-mcp/tools/drives.graph.md)
<!-- /docsgraph:related -->

## `delete_drive`

Permanently delete a drive and its stored data. Attached drives can't be deleted. Stop or replace the sandbox session using the drive, then retry. Use [`list_drives`](/docs/agent-resources/vercel-mcp/tools/drives/list_drives) afterward to verify removal.

## Parameters

| Parameter   | Type    | Required | Description                                                                                                       |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `nameOrId`  | string  | Yes      | The drive name or ID.                                                                                             |
| `projectId` | string  | No       | The project ID or name associated with the drive. Required unless using a Vercel OIDC token scoped to a project.  |
| `teamId`    | string  | No       | Team ID.                                                                                                          |
| `slug`      | string  | No       | Team slug.                                                                                                        |
| `confirm`   | boolean | Yes      | Required. Set to true to permanently delete this resource. Value: `true`.                                         |

## `fork_drive`

Fork an existing drive into a new drive in the same project. The fork starts with the source drive's contents and inherits its region and maximum size, but is otherwise independent, so writes to the fork don't affect the source. Returns a conflict error when a drive with the new name already exists. Read the result back with [`get_drive`](/docs/agent-resources/vercel-mcp/tools/drives/get_drive).

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

## `get_drive`

Get a drive by name or drive ID, for example to check its size, region, or whether it exists. Returns a 404 error when the drive doesn't exist. This tool never creates a drive. Use [`get_or_create_drive`](/docs/agent-resources/vercel-mcp/tools/drives/get_or_create_drive) to provision one.

## Parameters

| Parameter   | Type   | Required | Description                                                                                                       |
| ----------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `nameOrId`  | string | Yes      | The drive name or ID.                                                                                             |
| `projectId` | string | No       | The project ID or name associated with the drive. Required unless using a Vercel OIDC token scoped to a project.  |
| `teamId`    | string | No       | Team ID.                                                                                                          |
| `slug`      | string | No       | Team slug.                                                                                                        |

## `get_or_create_drive`

Get an existing drive by name in a project, or create it when it doesn't exist. `maxSizeBytes` and `region` apply only when the call creates the drive. They don't resize or move an existing one. This tool doesn't start a sandbox or attach the drive to a session.

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

## `list_drives`

List the drives in a project. Returns drive records and pagination. Follow `cursor` for more results. `namePrefix` filters only when `sortBy` is `name`. Listing doesn't create a drive or attach one to a sandbox.

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
